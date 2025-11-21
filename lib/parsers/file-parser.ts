import * as XLSX from 'xlsx';
import OpenAI from 'openai';
import { NormalizedData } from '@/lib/types/report';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Parse a financial file (PDF or Excel) and extract structured financial data
 * Falls back to OpenAI Vision API if library parsing fails
 */
export async function parseFinancialFile(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<NormalizedData> {
  const isPDF = mimeType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf');
  const isExcel = 
    mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    mimeType === 'application/vnd.ms-excel' ||
    fileName.toLowerCase().endsWith('.xlsx') ||
    fileName.toLowerCase().endsWith('.xls');

  console.log(`Parsing file: ${fileName}, type: ${mimeType}, size: ${fileBuffer.length} bytes, isPDF: ${isPDF}, isExcel: ${isExcel}`);

  try {
    if (isPDF) {
      console.log('Attempting PDF parse...');
      const result = await parsePDF(fileBuffer);
      console.log('PDF parse successful');
      return result;
    } else if (isExcel) {
      console.log('Attempting Excel parse...');
      const result = await parseExcel(fileBuffer);
      console.log('Excel parse successful');
      return result;
    } else {
      throw new Error(`Unsupported file type: ${mimeType}. Supported types: PDF, XLS, XLSX`);
    }
  } catch (error) {
    console.error('Library parsing failed:', error);
    console.error('Error details:', {
      fileName,
      mimeType,
      bufferSize: fileBuffer.length,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined,
    });
    
    // Try OpenAI Vision as fallback (only if API key is available)
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        `Failed to parse file ${fileName} with library parser. ` +
        `OpenAI Vision fallback is not available (OPENAI_API_KEY not set). ` +
        `Library error: ${error instanceof Error ? error.message : 'Unknown'}. ` +
        `Please ensure your file is a valid PDF or Excel file, or configure OpenAI API key for fallback parsing.`
      );
    }
    
    try {
      console.log('Falling back to OpenAI Vision...');
      const result = await parseWithOpenAIVision(fileBuffer, fileName, mimeType);
      console.log('OpenAI Vision parse successful');
      return result;
    } catch (visionError) {
      console.error('OpenAI Vision fallback also failed:', visionError);
      
      // Check if it's an API key or credits issue
      const visionErrorMsg = visionError instanceof Error ? visionError.message : 'Unknown error';
      let helpfulMessage = '';
      
      if (visionErrorMsg.includes('insufficient_quota') || visionErrorMsg.includes('billing') || visionErrorMsg.includes('credits')) {
        helpfulMessage = 'OpenAI account has insufficient credits. Please add credits to your OpenAI account.';
      } else if (visionErrorMsg.includes('invalid_api_key') || visionErrorMsg.includes('authentication')) {
        helpfulMessage = 'OpenAI API key is invalid. Please check your OPENAI_API_KEY in .env.local';
      } else {
        helpfulMessage = visionErrorMsg;
      }
      
      throw new Error(
        `Failed to parse file ${fileName} with both library and OpenAI Vision. ` +
        `Library error: ${error instanceof Error ? error.message : 'Unknown'}. ` +
        `OpenAI Vision error: ${helpfulMessage}`
      );
    }
  }
}

/**
 * Parse PDF using pdf-parse library
 */
async function parsePDF(buffer: Buffer): Promise<NormalizedData> {
  // pdf-parse is a CommonJS module, need to handle it carefully in Next.js
  let pdfParse;
  try {
    // In Next.js/Turbopack, we need to use dynamic import with specific handling
    const pdfParseModule = await import('pdf-parse') as any;
    
    // The module might export differently - check all possibilities
    if (typeof pdfParseModule === 'function') {
      pdfParse = pdfParseModule;
    } else if (pdfParseModule.default) {
      if (typeof pdfParseModule.default === 'function') {
        pdfParse = pdfParseModule.default;
      } else if (pdfParseModule.default.default && typeof pdfParseModule.default.default === 'function') {
        pdfParse = pdfParseModule.default.default;
      }
    }
    
    // If still not found, try accessing the module's exports directly
    if (typeof pdfParse !== 'function') {
      // Check if it's a namespace with a default property
      const moduleExports = pdfParseModule;
      if (moduleExports && typeof moduleExports === 'object') {
        // Try to find any function export
        for (const key in moduleExports) {
          if (typeof moduleExports[key] === 'function') {
            pdfParse = moduleExports[key];
            console.log(`Found pdf-parse function at key: ${key}`);
            break;
          }
        }
      }
    }
    
    if (typeof pdfParse !== 'function') {
      console.error('pdf-parse module structure:', {
        type: typeof pdfParseModule,
        keys: Object.keys(pdfParseModule || {}),
        hasDefault: 'default' in (pdfParseModule || {}),
        defaultType: typeof (pdfParseModule as any)?.default,
      });
      throw new Error('pdf-parse module does not export a function');
    }
  } catch (importError) {
    console.error('Failed to import pdf-parse:', importError);
    throw new Error(`Failed to import pdf-parse: ${importError instanceof Error ? importError.message : 'Unknown error'}`);
  }
  
  console.log('pdf-parse imported successfully, parsing buffer...');
  const data = await pdfParse(buffer);
  const text = data.text;
  
  if (!text || text.length === 0) {
    console.warn('PDF parsed but no text extracted');
  } else {
    console.log(`PDF text extracted, length: ${text.length} characters`);
  }

  // Extract year (look for 4-digit year)
  const yearMatch = text.match(/\b(20\d{2})\b/);
  const year = yearMatch ? parseInt(yearMatch[1]) : null;

  // Financial term mappings (Dutch and common terms)
  const patterns = {
    revenue: [
      /omzet[:\s]*€?\s*([\d.,]+)/i,
      /revenue[:\s]*€?\s*([\d.,]+)/i,
      /opbrengst[:\s]*€?\s*([\d.,]+)/i,
      /totale\s*opbrengst[:\s]*€?\s*([\d.,]+)/i,
    ],
    direct_costs: [
      /kostprijs[:\s]*€?\s*([\d.,]+)/i,
      /directe\s*kosten[:\s]*€?\s*([\d.,]+)/i,
      /cost\s*of\s*goods\s*sold[:\s]*€?\s*([\d.,]+)/i,
    ],
    opex: [
      /operationele\s*kosten[:\s]*€?\s*([\d.,]+)/i,
      /bedrijfskosten[:\s]*€?\s*([\d.,]+)/i,
      /operating\s*expenses[:\s]*€?\s*([\d.,]+)/i,
      /overige\s*kosten[:\s]*€?\s*([\d.,]+)/i,
    ],
    net_profit: [
      /nettowinst[:\s]*€?\s*([\d.,]+)/i,
      /net\s*profit[:\s]*€?\s*([\d.,]+)/i,
      /winst[:\s]*€?\s*([\d.,]+)/i,
      /resultaat[:\s]*€?\s*([\d.,]+)/i,
    ],
    cash: [
      /kas[:\s]*€?\s*([\d.,]+)/i,
      /cash[:\s]*€?\s*([\d.,]+)/i,
      /liquide\s*middelen[:\s]*€?\s*([\d.,]+)/i,
      /bank[:\s]*€?\s*([\d.,]+)/i,
    ],
    receivables: [
      /vorderingen[:\s]*€?\s*([\d.,]+)/i,
      /debiteuren[:\s]*€?\s*([\d.,]+)/i,
      /receivables[:\s]*€?\s*([\d.,]+)/i,
    ],
    payables: [
      /schulden[:\s]*€?\s*([\d.,]+)/i,
      /crediteuren[:\s]*€?\s*([\d.,]+)/i,
      /payables[:\s]*€?\s*([\d.,]+)/i,
    ],
    equity: [
      /eigen\s*vermogen[:\s]*€?\s*([\d.,]+)/i,
      /equity[:\s]*€?\s*([\d.,]+)/i,
      /kapitaal[:\s]*€?\s*([\d.,]+)/i,
    ],
    total_assets: [
      /totaal\s*activa[:\s]*€?\s*([\d.,]+)/i,
      /total\s*assets[:\s]*€?\s*([\d.,]+)/i,
      /totaal\s*bezittingen[:\s]*€?\s*([\d.,]+)/i,
    ],
    current_liabilities: [
      /kortlopende\s*schulden[:\s]*€?\s*([\d.,]+)/i,
      /current\s*liabilities[:\s]*€?\s*([\d.,]+)/i,
    ],
  };

  const extractNumber = (patterns: RegExp[]): number | null => {
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        // Remove dots (thousand separators) and replace comma with dot
        const cleaned = match[1].replace(/\./g, '').replace(',', '.');
        const num = parseFloat(cleaned);
        if (!isNaN(num)) return num;
      }
    }
    return null;
  };

  const revenue = extractNumber(patterns.revenue);
  const direct_costs = extractNumber(patterns.direct_costs);
  const opex = extractNumber(patterns.opex);
  const net_profit = extractNumber(patterns.net_profit);
  const cash = extractNumber(patterns.cash);
  const receivables = extractNumber(patterns.receivables);
  const payables = extractNumber(patterns.payables);
  const equity = extractNumber(patterns.equity);
  const total_assets = extractNumber(patterns.total_assets);
  const current_liabilities = extractNumber(patterns.current_liabilities);

  // Calculate current_assets if we have cash and receivables
  const current_assets = cash !== null && receivables !== null ? (cash + receivables) : null;

  const missing_fields: string[] = [];
  if (!revenue) missing_fields.push('revenue');
  if (!net_profit) missing_fields.push('net_profit');
  if (!cash) missing_fields.push('cash');
  if (!equity) missing_fields.push('equity');

  return {
    year,
    pnl: {
      revenue,
      direct_costs,
      opex,
      net_profit,
    },
    balance: {
      cash,
      receivables,
      payables,
      equity,
      total_assets,
      current_liabilities,
      current_assets,
    },
    missing_fields: missing_fields.length > 0 ? missing_fields : undefined,
  };
}

/**
 * Parse Excel file using xlsx library
 */
async function parseExcel(buffer: Buffer): Promise<NormalizedData> {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  
  // Try to find the sheet with financial data
  let sheet = workbook.Sheets[workbook.SheetNames[0]];
  
  // Convert to JSON for easier parsing
  const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

  // Look for year in first few rows
  let year: number | null = null;
  for (let i = 0; i < Math.min(5, jsonData.length); i++) {
    const row = jsonData[i] as any[];
    for (const cell of row) {
      if (typeof cell === 'number' && cell >= 2000 && cell <= 2100) {
        year = cell;
        break;
      }
      if (typeof cell === 'string') {
        const yearMatch = cell.match(/\b(20\d{2})\b/);
        if (yearMatch) {
          year = parseInt(yearMatch[1]);
          break;
        }
      }
    }
    if (year) break;
  }

  // Search for financial terms in all sheets
  const allText = jsonData.flat().join(' ').toLowerCase();
  
  const extractValue = (terms: string[]): number | null => {
    for (const term of terms) {
      // Look for the term in the data
      for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i] as any[];
        for (let j = 0; j < row.length; j++) {
          const cell = row[j];
          if (cell && typeof cell === 'string' && cell.toLowerCase().includes(term)) {
            // Look for number in adjacent cells
            if (j + 1 < row.length && typeof row[j + 1] === 'number') {
              return row[j + 1];
            }
            if (i + 1 < jsonData.length) {
              const nextRow = jsonData[i + 1] as any[];
              if (nextRow && j < nextRow.length && typeof nextRow[j] === 'number') {
                return nextRow[j];
              }
            }
          }
        }
      }
    }
    return null;
  };

  const revenue = extractValue(['omzet', 'revenue', 'opbrengst']);
  const direct_costs = extractValue(['kostprijs', 'directe kosten', 'cogs']);
  const opex = extractValue(['operationele kosten', 'bedrijfskosten', 'opex']);
  const net_profit = extractValue(['nettowinst', 'net profit', 'winst', 'resultaat']);
  const cash = extractValue(['kas', 'cash', 'liquide middelen', 'bank']);
  const receivables = extractValue(['vorderingen', 'debiteuren', 'receivables']);
  const payables = extractValue(['schulden', 'crediteuren', 'payables']);
  const equity = extractValue(['eigen vermogen', 'equity', 'kapitaal']);
  const total_assets = extractValue(['totaal activa', 'total assets']);
  const current_liabilities = extractValue(['kortlopende schulden', 'current liabilities']);

  const current_assets = cash !== null && receivables !== null ? (cash + receivables) : null;

  const missing_fields: string[] = [];
  if (!revenue) missing_fields.push('revenue');
  if (!net_profit) missing_fields.push('net_profit');
  if (!cash) missing_fields.push('cash');
  if (!equity) missing_fields.push('equity');

  return {
    year,
    pnl: {
      revenue,
      direct_costs,
      opex,
      net_profit,
    },
    balance: {
      cash,
      receivables,
      payables,
      equity,
      total_assets,
      current_liabilities,
      current_assets,
    },
    missing_fields: missing_fields.length > 0 ? missing_fields : undefined,
  };
}

/**
 * Fallback: Parse using OpenAI Vision API
 * Note: OpenAI Vision only supports images, not PDFs directly
 * For PDFs, we need to convert them to images first or use a different approach
 */
async function parseWithOpenAIVision(
  buffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<NormalizedData> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  
  // OpenAI Vision API only supports images, not PDFs
  // For PDFs, we need to use a different approach or convert to image
  if (mimeType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')) {
    throw new Error('OpenAI Vision API does not support PDF files directly. Please use a valid PDF parser library or convert the PDF to images first.');
  }
  
  // For Excel files, we can't use Vision API either
  if (mimeType.includes('excel') || fileName.toLowerCase().endsWith('.xlsx') || fileName.toLowerCase().endsWith('.xls')) {
    throw new Error('OpenAI Vision API does not support Excel files. Please use the Excel parser library.');
  }
  
  // Only proceed if it's an image
  const base64 = buffer.toString('base64');
  const dataUrl = `data:${mimeType};base64,${base64}`;

  console.log(`Calling OpenAI Vision API for file: ${fileName} (${buffer.length} bytes)`);
  
  let response;
  try {
    response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `Je bent een expert in het lezen van financiële documenten. Extracteer de volgende financiële gegevens uit het document en geef ze terug als JSON in dit exacte formaat:
{
  "year": 2024,
  "pnl": {
    "revenue": 150000,
    "direct_costs": 45000,
    "opex": 53000,
    "net_profit": 52000
  },
  "balance": {
    "cash": 18000,
    "receivables": 32000,
    "payables": 12000,
    "equity": 44000,
    "total_assets": 110000,
    "current_liabilities": 35000,
    "current_assets": 50000
  },
  "missing_fields": []
}

Als een veld niet gevonden kan worden, gebruik null. Voeg ontbrekende velden toe aan missing_fields array.`,
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Lees dit financiële document (${fileName}) en extracteer de financiële gegevens. Geef alleen de JSON terug, geen andere tekst.`,
          },
          {
            type: 'image_url',
            image_url: {
              url: dataUrl,
            },
          },
        ],
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.1,
    });
  } catch (apiError: any) {
    console.error('OpenAI API call failed:', apiError);
    
    // Check for specific error types
    if (apiError?.status === 429 || apiError?.code === 'insufficient_quota' || apiError?.message?.includes('quota')) {
      throw new Error('OpenAI account has insufficient credits/quota. Please add credits to your OpenAI account at https://platform.openai.com/account/billing');
    } else if (apiError?.status === 401 || apiError?.code === 'invalid_api_key') {
      throw new Error('OpenAI API key is invalid. Please check your OPENAI_API_KEY in .env.local');
    } else if (apiError?.status === 402 || apiError?.message?.includes('billing')) {
      throw new Error('OpenAI billing issue. Please check your OpenAI account billing settings at https://platform.openai.com/account/billing');
    } else {
      throw new Error(`OpenAI API error: ${apiError?.message || apiError?.error?.message || 'Unknown error'}`);
    }
  }

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from OpenAI Vision API');
  }

  try {
    const parsed = JSON.parse(content);
    console.log('OpenAI Vision response parsed successfully');
    return parsed as NormalizedData;
  } catch (parseError) {
    console.error('Failed to parse OpenAI JSON response:', parseError);
    console.error('Response content:', content.substring(0, 500));
    throw new Error(`Failed to parse OpenAI response as JSON: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
  }
}


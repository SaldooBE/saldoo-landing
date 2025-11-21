import OpenAI from 'openai';
import { CompactContext, NormalizedData, KPIs, ReportData } from '@/lib/types/report';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Validate OpenAI API key on module load
if (!process.env.OPENAI_API_KEY) {
  console.warn('WARNING: OPENAI_API_KEY is not set in environment variables');
}

/**
 * Generate financial analysis report using OpenAI
 */
export async function generateReport(
  context: CompactContext,
  normalizedData: NormalizedData,
  kpis: KPIs
): Promise<ReportData> {
  // Build the prompt
  const prompt = buildPrompt(context, normalizedData, kpis);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Je bent een financieel adviseur die duidelijke, begrijpelijke rapporten schrijft voor ondernemers zonder financiële achtergrond. Schrijf altijd in het Nederlands, gebruik de jij-vorm, en maak alle cijfers cursief met markdown (bijvoorbeeld *€52.000* of *34%*).`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const reportData = JSON.parse(content) as ReportData;
    
    // Validate structure
    if (!reportData.intro || !reportData.cards || !Array.isArray(reportData.cards)) {
      throw new Error('Invalid report structure from OpenAI');
    }

    return reportData;
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
}

function buildPrompt(
  context: CompactContext,
  normalizedData: NormalizedData,
  kpis: KPIs
): string {
  const { pnl, balance, year } = normalizedData;

  let prompt = `Schrijf een financieel analyse rapport voor een ondernemer. Het rapport moet ongeveer 5 pagina's lang zijn en bestaat uit een intro, meerdere cards/secties, actiepunten en een disclaimer.

CONTEXT VAN DE ONDERNEMER:
- Rechtsvorm: ${context.rechtsvorm}
- Sector: ${context.sector}
- Gewenst netto inkomen per maand: ${context.gewenst_netto_inkomen ? `€${context.gewenst_netto_inkomen.toLocaleString('nl-NL')}` : 'niet opgegeven'}
- Aantal werknemers: ${context.aantal_werknemers || 'geen'}
- Verwachte omzetgroei: ${context.verwachte_groei ? `${context.verwachte_groei}%` : 'niet opgegeven'}
- Investeringsplannen: ${context.investeringsplannen === 'ja' ? `Ja, €${context.investeringsbedrag?.toLocaleString('nl-NL') || 'bedrag niet opgegeven'}` : 'Nee'}
${context.risicos ? `- Risico's/aansprakelijkheden: ${context.risicos}` : ''}
- Verwachtingen van de analyse: ${context.analyse_verwachtingen.join(', ')}
${context.analyse_specifiek ? `- Specifieke vragen: ${context.analyse_specifiek}` : ''}

FINANCIËLE CIJFERS (Boekjaar ${year || 'onbekend'}):
Resultatenrekening:
- Omzet: ${pnl.revenue ? `€${pnl.revenue.toLocaleString('nl-NL')}` : 'niet beschikbaar'}
- Directe kosten: ${pnl.direct_costs ? `€${pnl.direct_costs.toLocaleString('nl-NL')}` : 'niet beschikbaar'}
- Operationele kosten: ${pnl.opex ? `€${pnl.opex.toLocaleString('nl-NL')}` : 'niet beschikbaar'}
- Nettowinst: ${pnl.net_profit ? `€${pnl.net_profit.toLocaleString('nl-NL')}` : 'niet beschikbaar'}

Balans:
- Cash: ${balance.cash ? `€${balance.cash.toLocaleString('nl-NL')}` : 'niet beschikbaar'}
- Vorderingen: ${balance.receivables ? `€${balance.receivables.toLocaleString('nl-NL')}` : 'niet beschikbaar'}
- Crediteuren: ${balance.payables ? `€${balance.payables.toLocaleString('nl-NL')}` : 'niet beschikbaar'}
- Eigen vermogen: ${balance.equity ? `€${balance.equity.toLocaleString('nl-NL')}` : 'niet beschikbaar'}
- Totaal activa: ${balance.total_assets ? `€${balance.total_assets.toLocaleString('nl-NL')}` : 'niet beschikbaar'}
- Kortlopende schulden: ${balance.current_liabilities ? `€${balance.current_liabilities.toLocaleString('nl-NL')}` : 'niet beschikbaar'}

KERNINDICATOREN (KPI's):
- Winstmarge: ${kpis.winstmarge !== null ? `${kpis.winstmarge.toFixed(2)}%` : 'niet berekenbaar'}
- Kostenratio: ${kpis.kostenratio !== null ? `${kpis.kostenratio.toFixed(2)}%` : 'niet berekenbaar'}
- Liquiditeit (current ratio): ${kpis.liquiditeit !== null ? kpis.liquiditeit.toFixed(2) : 'niet berekenbaar'}
- Solvabiliteit: ${kpis.solvabiliteit !== null ? `${kpis.solvabiliteit.toFixed(2)}%` : 'niet berekenbaar'}

INSTRUCTIES:
1. Schrijf een introductie die de ondernemer welkom heet en het doel van het rapport uitlegt.
2. Maak cards/secties met de volgende onderwerpen (pas aan op basis van beschikbare data):
   - Kerncijfers: Overzicht van omzet, winst, en belangrijkste financiële cijfers
   - Kostenstructuur: Analyse van de kosten en hoe deze zich verhouden tot de omzet
   - Liquiditeit: Uitleg over de liquiditeitspositie en wat dit betekent
   - Solvabiliteit: Uitleg over de solvabiliteit en financiële buffer
   ${context.rechtsvorm === 'eenmanszaak' ? '- Fiscaliteit: Belastingaspecten specifiek voor eenmanszaak' : ''}
   - Actiepunten: Concrete aanbevelingen voor verbetering

3. Geef 3-5 concrete actiepunten die de ondernemer kan oppakken.
4. Sluit af met een disclaimer dat dit rapport informatief is en geen vervanging van persoonlijk advies.

BELANGRIJK:
- Gebruik markdown voor cursieve cijfers: *€52.000* of *34%*
- Schrijf in begrijpelijke taal, zonder jargon
- Geef context bij cijfers (wat betekent dit voor de ondernemer?)
- Focus op de verwachtingen die de ondernemer heeft genoemd
- Als rechtsvorm eenmanszaak is, besteed extra aandacht aan fiscale aspecten

Geef het rapport terug als JSON in dit formaat:
{
  "intro": "Inleidende tekst...",
  "cards": [
    {
      "title": "Kerncijfers",
      "body": ["Paragraaf 1...", "Paragraaf 2..."]
    },
    {
      "title": "Kostenstructuur",
      "body": ["Paragraaf 1...", "Paragraaf 2..."]
    }
  ],
  "actions": ["Actiepunt 1", "Actiepunt 2", "Actiepunt 3"],
  "disclaimer": "Dit rapport is informatief..."
}`;

  return prompt;
}


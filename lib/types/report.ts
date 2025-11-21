// Type definitions for reports and financial data

export type ReportStatus = 'draft' | 'context_completed' | 'uploaded' | 'parsed' | 'generated' | 'error';

export interface Report {
  id: string;
  client_id: string;
  context_json: Record<string, any> | null;
  files_json: FileMetadata[] | null;
  normalized_json: NormalizedData | null;
  kpis_json: KPIs | null;
  report_json: ReportData | null;
  status: ReportStatus;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface FileMetadata {
  name: string;
  path: string;
  size: number;
  type: string;
  uploaded_at: string;
}

export interface NormalizedData {
  year: number | null;
  pnl: {
    revenue: number | null;
    direct_costs: number | null;
    opex: number | null;
    net_profit: number | null;
  };
  balance: {
    cash: number | null;
    receivables: number | null;
    payables: number | null;
    equity: number | null;
    total_assets: number | null;
    current_liabilities: number | null;
    current_assets?: number | null;
  };
  missing_fields?: string[];
}

export interface KPIs {
  winstmarge: number | null; // net_profit / revenue * 100
  kostenratio: number | null; // (revenue - net_profit) / revenue * 100
  liquiditeit: number | null; // current_assets / current_liabilities
  solvabiliteit: number | null; // equity / total_assets * 100
}

export interface CompactContext {
  rechtsvorm: string;
  sector: string;
  gewenst_netto_inkomen: number | null;
  aantal_werknemers: number | null;
  verwachte_groei: number | null;
  investeringsplannen: string;
  investeringsbedrag: number | null;
  risicos: string | null;
  analyse_verwachtingen: string[];
  analyse_specifiek: string | null;
}

export interface ReportData {
  intro: string;
  cards: Array<{
    title: string;
    body: string[];
  }>;
  actions: string[];
  disclaimer: string;
}



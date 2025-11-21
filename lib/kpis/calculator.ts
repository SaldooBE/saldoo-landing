import { NormalizedData, KPIs } from '@/lib/types/report';

/**
 * Calculate financial KPIs from normalized financial data
 */
export function calculateKPIs(normalizedData: NormalizedData): KPIs {
  const { pnl, balance } = normalizedData;

  // Winstmarge: net_profit / revenue * 100
  const winstmarge = 
    pnl.revenue && pnl.revenue > 0 && pnl.net_profit !== null
      ? (pnl.net_profit / pnl.revenue) * 100
      : null;

  // Kostenratio: (revenue - net_profit) / revenue * 100
  const kostenratio =
    pnl.revenue && pnl.revenue > 0 && pnl.net_profit !== null
      ? ((pnl.revenue - pnl.net_profit) / pnl.revenue) * 100
      : null;

  // Liquiditeit (current ratio): current_assets / current_liabilities
  const liquiditeit =
    balance.current_assets !== null &&
    balance.current_assets !== undefined &&
    balance.current_liabilities !== null &&
    balance.current_liabilities !== undefined &&
    balance.current_liabilities > 0
      ? balance.current_assets / balance.current_liabilities
      : null;

  // Solvabiliteit: equity / total_assets * 100
  const solvabiliteit =
    balance.equity !== null &&
    balance.equity !== undefined &&
    balance.total_assets !== null &&
    balance.total_assets !== undefined &&
    balance.total_assets > 0
      ? (balance.equity / balance.total_assets) * 100
      : null;

  return {
    winstmarge: winstmarge !== null ? Math.round(winstmarge * 100) / 100 : null,
    kostenratio: kostenratio !== null ? Math.round(kostenratio * 100) / 100 : null,
    liquiditeit: liquiditeit !== null ? Math.round(liquiditeit * 100) / 100 : null,
    solvabiliteit: solvabiliteit !== null ? Math.round(solvabiliteit * 100) / 100 : null,
  };
}



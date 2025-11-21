import { CompactContext } from '@/lib/types/report';

/**
 * Prepare compact context from full questionnaire answers for AI analysis
 */
export function prepareContextForAI(contextJson: Record<string, any>): CompactContext {
  return {
    rechtsvorm: contextJson.rechtsvorm || 'onbekend',
    sector: contextJson.sector || 'onbekend',
    gewenst_netto_inkomen: contextJson.netto_inkomen || null,
    aantal_werknemers: contextJson.aantal_werknemers || null,
    verwachte_groei: contextJson.omzetgroei || null,
    investeringsplannen: contextJson.investeringsplannen || 'nee',
    investeringsbedrag: contextJson.investeringsbedrag || null,
    risicos: contextJson.privérisico || null,
    analyse_verwachtingen: Array.isArray(contextJson.analyse_verwachtingen)
      ? contextJson.analyse_verwachtingen
      : [],
    analyse_specifiek: contextJson.analyse_specifiek || null,
  };
}



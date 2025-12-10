// DUMMY DATA GENERATOR
// This file contains all dummy data for demo purposes.
// All data will be replaced with real customer data later.

import { NormalizedData, KPIs } from '@/lib/types/report';

// ============================================================================
// CLIENT DATA
// ============================================================================

export interface Client {
  id: string;
  name: string;
  sector: string;
  ondernemingsnummer: string;
  status: 'actief' | 'sync' | 'fout';
  lastSync?: string;
  tags?: string[];
  financials?: {
    omzet: number;
    balanstotaal: number;
    winst: number;
  };
  kpis?: KPIs;
  healthScore?: number;
}

export const dummyClients: Client[] = [
  {
    id: '1',
    name: 'TechSolutions BV',
    sector: 'IT',
    ondernemingsnummer: 'BE 0123.456.789',
    status: 'actief',
    lastSync: '2 uur geleden',
    tags: ['starter', 'groei'],
    financials: {
      omzet: 450000,
      balanstotaal: 320000,
      winst: 125000
    },
    kpis: {
      winstmarge: 27.78,
      kostenratio: 72.22,
      liquiditeit: 1.85,
      solvabiliteit: 65.5
    },
    healthScore: 85
  },
  {
    id: '2',
    name: 'Bakkerij De Smet',
    sector: 'Horeca',
    ondernemingsnummer: 'BE 0234.567.890',
    status: 'actief',
    lastSync: '1 dag geleden',
    tags: ['horeca'],
    financials: {
      omzet: 280000,
      balanstotaal: 180000,
      winst: 45000
    },
    kpis: {
      winstmarge: 16.07,
      kostenratio: 83.93,
      liquiditeit: 1.2,
      solvabiliteit: 55.0
    },
    healthScore: 72
  },
  {
    id: '3',
    name: 'Consultant Partners',
    sector: 'Vrij beroep',
    ondernemingsnummer: 'BE 0345.678.901',
    status: 'actief',
    lastSync: '3 uur geleden',
    tags: ['consultant'],
    financials: {
      omzet: 180000,
      balanstotaal: 95000,
      winst: 85000
    },
    kpis: {
      winstmarge: 47.22,
      kostenratio: 52.78,
      liquiditeit: 2.1,
      solvabiliteit: 78.5
    },
    healthScore: 92
  },
  {
    id: '4',
    name: 'Bouwbedrijf Van Hove',
    sector: 'Bouw',
    ondernemingsnummer: 'BE 0456.789.012',
    status: 'sync',
    lastSync: '5 minuten geleden',
    tags: ['bouw'],
    financials: {
      omzet: 650000,
      balanstotaal: 480000,
      winst: 98000
    },
    kpis: {
      winstmarge: 15.08,
      kostenratio: 84.92,
      liquiditeit: 1.45,
      solvabiliteit: 62.3
    },
    healthScore: 68
  },
  {
    id: '5',
    name: 'Zorgpraktijk De Vries',
    sector: 'Zorg',
    ondernemingsnummer: 'BE 0567.890.123',
    status: 'actief',
    lastSync: '1 uur geleden',
    tags: ['zorg'],
    financials: {
      omzet: 320000,
      balanstotaal: 210000,
      winst: 110000
    },
    kpis: {
      winstmarge: 34.38,
      kostenratio: 65.62,
      liquiditeit: 1.75,
      solvabiliteit: 70.2
    },
    healthScore: 88
  },
  {
    id: '6',
    name: 'Handelsonderneming Janssens',
    sector: 'Handel',
    ondernemingsnummer: 'BE 0678.901.234',
    status: 'actief',
    lastSync: '4 uur geleden',
    tags: ['handel'],
    financials: {
      omzet: 520000,
      balanstotaal: 380000,
      winst: 75000
    },
    kpis: {
      winstmarge: 14.42,
      kostenratio: 85.58,
      liquiditeit: 1.3,
      solvabiliteit: 58.7
    },
    healthScore: 65
  },
  {
    id: '7',
    name: 'Marketing Agency Pro',
    sector: 'Diensten',
    ondernemingsnummer: 'BE 0789.012.345',
    status: 'fout',
    lastSync: '3 dagen geleden',
    tags: ['starter'],
    financials: {
      omzet: 195000,
      balanstotaal: 125000,
      winst: 42000
    },
    kpis: {
      winstmarge: 21.54,
      kostenratio: 78.46,
      liquiditeit: 1.6,
      solvabiliteit: 68.0
    },
    healthScore: 75
  },
  {
    id: '8',
    name: 'Restaurant Le Bon Goût',
    sector: 'Horeca',
    ondernemingsnummer: 'BE 0890.123.456',
    status: 'actief',
    lastSync: '2 uur geleden',
    tags: ['horeca'],
    financials: {
      omzet: 380000,
      balanstotaal: 250000,
      winst: 68000
    },
    kpis: {
      winstmarge: 17.89,
      kostenratio: 82.11,
      liquiditeit: 1.25,
      solvabiliteit: 60.5
    },
    healthScore: 70
  },
  {
    id: '9',
    name: 'IT Consultancy Group',
    sector: 'IT',
    ondernemingsnummer: 'BE 0901.234.567',
    status: 'actief',
    lastSync: '30 minuten geleden',
    tags: ['consultant', 'groei'],
    financials: {
      omzet: 720000,
      balanstotaal: 550000,
      winst: 195000
    },
    kpis: {
      winstmarge: 27.08,
      kostenratio: 72.92,
      liquiditeit: 1.95,
      solvabiliteit: 72.8
    },
    healthScore: 90
  },
  {
    id: '10',
    name: 'Fysiotherapie Centrum',
    sector: 'Zorg',
    ondernemingsnummer: 'BE 1012.345.678',
    status: 'actief',
    lastSync: '1 uur geleden',
    tags: ['zorg'],
    financials: {
      omzet: 240000,
      balanstotaal: 165000,
      winst: 78000
    },
    kpis: {
      winstmarge: 32.5,
      kostenratio: 67.5,
      liquiditeit: 1.8,
      solvabiliteit: 73.5
    },
    healthScore: 82
  },
  {
    id: '11',
    name: 'Autowerkplaats De Bruyn',
    sector: 'Diensten',
    ondernemingsnummer: 'BE 1123.456.789',
    status: 'sync',
    lastSync: '10 minuten geleden',
    tags: [],
    financials: {
      omzet: 295000,
      balanstotaal: 220000,
      winst: 52000
    },
    kpis: {
      winstmarge: 17.63,
      kostenratio: 82.37,
      liquiditeit: 1.4,
      solvabiliteit: 64.2
    },
    healthScore: 73
  },
  {
    id: '12',
    name: 'Webdesign Studio',
    sector: 'IT',
    ondernemingsnummer: 'BE 1234.567.890',
    status: 'actief',
    lastSync: '6 uur geleden',
    tags: ['starter'],
    financials: {
      omzet: 165000,
      balanstotaal: 98000,
      winst: 48000
    },
    kpis: {
      winstmarge: 29.09,
      kostenratio: 70.91,
      liquiditeit: 1.7,
      solvabiliteit: 71.0
    },
    healthScore: 78
  },
  {
    id: '13',
    name: 'Advocatenkantoor Verstraeten',
    sector: 'Vrij beroep',
    ondernemingsnummer: 'BE 1345.678.901',
    status: 'actief',
    lastSync: '2 uur geleden',
    tags: ['consultant'],
    financials: {
      omzet: 420000,
      balanstotaal: 310000,
      winst: 155000
    },
    kpis: {
      winstmarge: 36.9,
      kostenratio: 63.1,
      liquiditeit: 2.0,
      solvabiliteit: 75.5
    },
    healthScore: 91
  },
  {
    id: '14',
    name: 'Groothandel Voeding BV',
    sector: 'Handel',
    ondernemingsnummer: 'BE 1456.789.012',
    status: 'actief',
    lastSync: '3 uur geleden',
    tags: ['handel'],
    financials: {
      omzet: 890000,
      balanstotaal: 680000,
      winst: 125000
    },
    kpis: {
      winstmarge: 14.04,
      kostenratio: 85.96,
      liquiditeit: 1.35,
      solvabiliteit: 59.8
    },
    healthScore: 67
  },
  {
    id: '15',
    name: 'Architectenbureau',
    sector: 'Vrij beroep',
    ondernemingsnummer: 'BE 1567.890.123',
    status: 'actief',
    lastSync: '1 dag geleden',
    tags: ['consultant'],
    financials: {
      omzet: 275000,
      balanstotaal: 195000,
      winst: 95000
    },
    kpis: {
      winstmarge: 34.55,
      kostenratio: 65.45,
      liquiditeit: 1.85,
      solvabiliteit: 72.0
    },
    healthScore: 86
  }
];

// ============================================================================
// FINANCIAL DATA (NormalizedData)
// ============================================================================

export const getClientFinancials = (clientId: string, year: number = 2024): NormalizedData | null => {
  const client = dummyClients.find(c => c.id === clientId);
  if (!client || !client.financials) return null;

  const { omzet, winst } = client.financials;
  const directCosts = omzet * 0.35;
  const opex = omzet - directCosts - winst;
  const cash = client.financials.balanstotaal * 0.15;
  const receivables = client.financials.balanstotaal * 0.25;
  const payables = client.financials.balanstotaal * 0.20;
  const equity = client.financials.balanstotaal * (client.kpis?.solvabiliteit || 60) / 100;
  const currentAssets = cash + receivables;
  const currentLiabilities = payables + (client.financials.balanstotaal * 0.15);

  return {
    year,
    pnl: {
      revenue: omzet,
      direct_costs: directCosts,
      opex: opex,
      net_profit: winst
    },
    balance: {
      cash: cash,
      receivables: receivables,
      payables: payables,
      equity: equity,
      total_assets: client.financials.balanstotaal,
      current_liabilities: currentLiabilities,
      current_assets: currentAssets
    }
  };
};

// Previous year financials for comparison
export const getPreviousYearFinancials = (clientId: string): NormalizedData | null => {
  const current = getClientFinancials(clientId, 2024);
  if (!current) return null;

  return {
    year: 2023,
    pnl: {
      revenue: current.pnl.revenue ? current.pnl.revenue * 0.92 : null,
      direct_costs: current.pnl.direct_costs ? current.pnl.direct_costs * 0.90 : null,
      opex: current.pnl.opex ? current.pnl.opex * 0.95 : null,
      net_profit: current.pnl.net_profit ? current.pnl.net_profit * 0.88 : null
    },
    balance: {
      cash: current.balance.cash ? current.balance.cash * 0.85 : null,
      receivables: current.balance.receivables ? current.balance.receivables * 0.90 : null,
      payables: current.balance.payables ? current.balance.payables * 0.95 : null,
      equity: current.balance.equity ? current.balance.equity * 0.90 : null,
      total_assets: current.balance.total_assets ? current.balance.total_assets * 0.88 : null,
      current_liabilities: current.balance.current_liabilities ? current.balance.current_liabilities * 0.92 : null,
      current_assets: current.balance.current_assets ? current.balance.current_assets * 0.88 : null
    }
  };
};

// ============================================================================
// AI QUESTIONS
// ============================================================================

export interface AIQuestion {
  id: string;
  clientId: string;
  clientName: string;
  question: string;
  theme: string;
  urgency: 'laag' | 'gemiddeld' | 'hoog';
  timestamp: string;
  answered?: boolean;
}

export const dummyAIQuestions: AIQuestion[] = [
  {
    id: 'q1',
    clientId: '1',
    clientName: 'TechSolutions BV',
    question: 'Is het fiscaal interessant om een vennootschap op te richten met mijn huidige omzet?',
    theme: 'vennootschap',
    urgency: 'hoog',
    timestamp: '2 uur geleden',
    answered: false
  },
  {
    id: 'q2',
    clientId: '3',
    clientName: 'Consultant Partners',
    question: 'Hoe kan ik mijn auto-kosten optimaal aftrekken?',
    theme: 'auto',
    urgency: 'gemiddeld',
    timestamp: '5 uur geleden',
    answered: true
  },
  {
    id: 'q3',
    clientId: '5',
    clientName: 'Zorgpraktijk De Vries',
    question: 'Wat betekent mijn liquiditeitsratio van 1.75 precies?',
    theme: 'kosten',
    urgency: 'laag',
    timestamp: '1 dag geleden',
    answered: true
  },
  {
    id: 'q4',
    clientId: '2',
    clientName: 'Bakkerij De Smet',
    question: 'Moet ik BTW betalen over mijn leveringen aan particulieren?',
    theme: 'btw',
    urgency: 'hoog',
    timestamp: '3 uur geleden',
    answered: false
  },
  {
    id: 'q5',
    clientId: '9',
    clientName: 'IT Consultancy Group',
    question: 'Kan ik investeringen in nieuwe software aftrekken?',
    theme: 'investeringen',
    urgency: 'gemiddeld',
    timestamp: '6 uur geleden',
    answered: true
  },
  {
    id: 'q6',
    clientId: '4',
    clientName: 'Bouwbedrijf Van Hove',
    question: 'Hoe bereken ik mijn sociale bijdragen correct?',
    theme: 'kosten',
    urgency: 'hoog',
    timestamp: '4 uur geleden',
    answered: false
  },
  {
    id: 'q7',
    clientId: '13',
    clientName: 'Advocatenkantoor Verstraeten',
    question: 'Wat is het verschil tussen eenmanszaak en vennootschap voor mijn situatie?',
    theme: 'vennootschap',
    urgency: 'hoog',
    timestamp: '1 dag geleden',
    answered: false
  },
  {
    id: 'q8',
    clientId: '6',
    clientName: 'Handelsonderneming Janssens',
    question: 'Kan ik mijn marketingkosten volledig aftrekken?',
    theme: 'kosten',
    urgency: 'gemiddeld',
    timestamp: '8 uur geleden',
    answered: true
  },
  {
    id: 'q9',
    clientId: '8',
    clientName: 'Restaurant Le Bon Goût',
    question: 'Hoe werkt de BTW-aftrek voor mijn horeca-onderneming?',
    theme: 'btw',
    urgency: 'hoog',
    timestamp: '2 dagen geleden',
    answered: true
  },
  {
    id: 'q10',
    clientId: '10',
    clientName: 'Fysiotherapie Centrum',
    question: 'Is het interessant om te investeren in nieuwe behandelapparatuur?',
    theme: 'investeringen',
    urgency: 'gemiddeld',
    timestamp: '1 dag geleden',
    answered: false
  },
  {
    id: 'q11',
    clientId: '12',
    clientName: 'Webdesign Studio',
    question: 'Wat zijn de fiscale voordelen van een vennootschap voor starters?',
    theme: 'vennootschap',
    urgency: 'hoog',
    timestamp: '3 uur geleden',
    answered: false
  },
  {
    id: 'q12',
    clientId: '15',
    clientName: 'Architectenbureau',
    question: 'Hoe kan ik mijn winstmarge verbeteren?',
    theme: 'kosten',
    urgency: 'gemiddeld',
    timestamp: '5 uur geleden',
    answered: true
  }
];

// ============================================================================
// MESSAGES
// ============================================================================

export interface Message {
  id: string;
  from: 'accountant' | 'client';
  toClientId?: string;
  toClientName?: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  tags?: string[];
  attachments?: Array<{ name: string; url: string; type?: string }>;
  // New fields for notification interface
  senderName?: string;
  categoryIcon?: string; // lucide-react icon name
  phoneNumber?: string;
  actionButtons?: Array<{ label: string; onClick?: () => void; href?: string }>;
  fullContent?: string; // For detail view vs preview
}

export const dummyMessages: Message[] = [
  {
    id: 'm1',
    from: 'accountant',
    toClientId: '1',
    toClientName: 'TechSolutions BV',
    subject: 'Belangrijke fiscale deadline',
    content: 'Beste, dit is een herinnering dat de BTW-aangifte voor Q4 uiterlijk 20 januari moet worden ingediend. Laat het weten als je hulp nodig hebt.',
    timestamp: '2 dagen geleden',
    read: false,
    tags: ['Belangrijk', 'Herinnering'],
    attachments: [
      { name: 'BTW-aangifte formulier.pdf', url: '#', type: 'pdf' }
    ]
  },
  {
    id: 'm2',
    from: 'accountant',
    toClientId: '3',
    toClientName: 'Consultant Partners',
    subject: 'Jaarrekening 2024',
    content: 'De jaarrekening voor 2024 is klaar voor goedkeuring. Je kunt deze bekijken in je dashboard.',
    timestamp: '5 dagen geleden',
    read: true,
    tags: ['Belangrijk'],
    attachments: [
      { name: 'Jaarrekening_2024.pdf', url: '#', type: 'pdf' },
      { name: 'Toelichting jaarrekening.docx', url: '#', type: 'docx' }
    ]
  },
  {
    id: 'm3',
    from: 'accountant',
    subject: 'Nieuwe functie: Meldingencentrum',
    content: 'We zijn enthousiast om onze nieuwe functie te introduceren: het Meldingencentrum. Hier kun je alle belangrijke updates en berichten op één plek bekijken.',
    timestamp: '10 MEI',
    read: true,
    tags: ['Update'],
    senderName: 'Aankondigingen',
    categoryIcon: 'Bell'
  },
  {
    id: 'm4',
    from: 'accountant',
    toClientId: '5',
    toClientName: 'Zorgpraktijk De Vries',
    subject: 'Vraag over investeringen',
    content: 'Ik zie dat je interesse hebt getoond in investeringen. Laten we hierover een gesprek plannen om de beste opties te bespreken.',
    timestamp: '3 dagen geleden',
    read: false,
    tags: ['Herinnering']
  },
  {
    id: 'm5',
    from: 'accountant',
    toClientId: '9',
    toClientName: 'IT Consultancy Group',
    subject: 'Gefeliciteerd met de groei!',
    content: 'Ik zie dat je omzet dit jaar met 15% is gestegen. Uitstekend werk! Laten we kijken hoe we dit fiscaal kunnen optimaliseren.',
    timestamp: '1 week geleden',
    read: true
  },
  {
    id: 'm6',
    from: 'accountant',
    toClientId: '1',
    toClientName: 'TechSolutions BV',
    subject: 'Betalingsherinnering: Vervalt over 2 dagen',
    content: 'Je lijn verloopt over 2 dagen, betaal je rekening om de lijn actief te houden.',
    timestamp: '29 MEI',
    read: false,
    tags: ['Belangrijk', 'Herinnering'],
    senderName: 'TechSolutions BV',
    categoryIcon: 'CreditCard',
    phoneNumber: '123-456-7890',
    actionButtons: [{ label: 'Betaal mijn rekening', href: '#' }],
    attachments: [
      { name: 'Sociale_bijdragen_februari_2025.pdf', url: '#', type: 'pdf' }
    ]
  },
  {
    id: 'm7',
    from: 'accountant',
    toClientId: '1',
    toClientName: 'TechSolutions BV',
    subject: 'Bijna geen premium data meer',
    content: 'Je hebt bijna geen premium data meer. Top-up om lagere snelheden te vermijden.',
    timestamp: '4 JUN',
    read: false,
    tags: ['Belangrijk'],
    senderName: 'TechSolutions BV',
    categoryIcon: 'Clock',
    phoneNumber: '123-456-7890',
    actionButtons: [{ label: 'Top-up toevoegen', href: '#' }]
  },
  {
    id: 'm8',
    from: 'accountant',
    toClientId: '1',
    toClientName: 'TechSolutions BV',
    subject: 'Gefeliciteerd! Je service is succesvol geactiveerd',
    content: 'Je service is succesvol geactiveerd. Je kunt nu gebruik maken van alle functies.',
    timestamp: '23 MEI',
    read: true,
    tags: ['Update'],
    senderName: 'TechSolutions BV',
    categoryIcon: 'Bell'
  }
];

// ============================================================================
// FISCAL DEADLINES
// ============================================================================

export interface FiscalDeadline {
  id: string;
  title: string;
  date: string;
  type: 'belgie' | 'kantoor';
  description?: string;
}

// Helper function to get date string N days from today
const getDateDaysFromToday = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const dummyFiscalDeadlines: FiscalDeadline[] = [
  {
    id: 'd1',
    title: 'BTW-aangifte Q4 2024',
    date: '2025-01-20',
    type: 'belgie',
    description: 'Uiterste datum voor indiening BTW-aangifte vierde kwartaal 2024'
  },
  {
    id: 'd2',
    title: 'Voorafbetaling personenbelasting',
    date: '2025-02-10',
    type: 'belgie',
    description: 'Eerste voorafbetaling personenbelasting 2025'
  },
  {
    id: 'd3',
    title: 'Sociale bijdragen februari',
    date: '2025-03-15',
    type: 'belgie',
    description: 'Uiterste datum betaling sociale bijdragen voor februari'
  },
  {
    id: 'd4',
    title: 'Jaarrekening indienen',
    date: '2025-03-31',
    type: 'belgie',
    description: 'Uiterste datum indiening jaarrekening bij NBB'
  },
  {
    id: 'd5',
    title: 'BTW-aangifte Q1 2025',
    date: '2025-04-20',
    type: 'belgie',
    description: 'Uiterste datum voor indiening BTW-aangifte eerste kwartaal 2025'
  },
  {
    id: 'd6',
    title: 'Voorafbetaling personenbelasting Q2',
    date: '2025-05-10',
    type: 'belgie',
    description: 'Tweede voorafbetaling personenbelasting 2025'
  },
  {
    id: 'd7',
    title: 'Aangifte personenbelasting',
    date: '2025-06-30',
    type: 'belgie',
    description: 'Uiterste datum indiening aangifte personenbelasting 2024'
  },
  {
    id: 'd8',
    title: 'Kwartaaloverleg klanten',
    date: '2025-02-15',
    type: 'kantoor',
    description: 'Geplande kwartaaloverleg met alle klanten'
  },
  {
    id: 'd9',
    title: 'Jaarafsluiting bespreking',
    date: '2025-01-31',
    type: 'kantoor',
    description: 'Deadline voor bespreking jaarafsluiting met klanten'
  },
  {
    id: 'd10',
    title: 'Sociale bijdragen januari',
    date: '2025-02-15',
    type: 'belgie',
    description: 'Uiterste datum betaling sociale bijdragen voor januari'
  },
  {
    id: 'd11',
    title: 'BTW-aangifte maandelijks',
    date: getDateDaysFromToday(7),
    type: 'belgie',
    description: 'Uiterste datum voor indiening maandelijkse BTW-aangifte'
  },
  {
    id: 'd12',
    title: 'Sociale bijdragen maandelijks',
    date: getDateDaysFromToday(15),
    type: 'belgie',
    description: 'Uiterste datum betaling maandelijkse sociale bijdragen'
  },
  {
    id: 'd13',
    title: 'Voorafbetaling personenbelasting',
    date: getDateDaysFromToday(30),
    type: 'belgie',
    description: 'Voorafbetaling personenbelasting voor het lopende kwartaal'
  },
  {
    id: 'd14',
    title: 'Kwartaaloverleg klanten',
    date: getDateDaysFromToday(45),
    type: 'kantoor',
    description: 'Geplande kwartaaloverleg met alle klanten'
  },
  {
    id: 'd15',
    title: 'BTW-aangifte kwartaal',
    date: getDateDaysFromToday(60),
    type: 'belgie',
    description: 'Uiterste datum voor indiening kwartaal BTW-aangifte'
  },
  {
    id: 'd16',
    title: 'Sociale bijdragen kwartaal',
    date: getDateDaysFromToday(75),
    type: 'belgie',
    description: 'Uiterste datum betaling kwartaal sociale bijdragen'
  }
];

// ============================================================================
// FAQ ENTRIES
// ============================================================================

export interface FAQEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const dummyFAQEntries: FAQEntry[] = [
  // BTW
  {
    id: 'faq1',
    category: 'BTW',
    question: 'Wat is BTW en hoe werkt het?',
    answer: 'BTW (Belasting over de Toegevoegde Waarde) is een belasting die je betaalt over de verkoop van goederen en diensten. Als ondernemer moet je BTW berekenen over je verkopen en deze doorstorten aan de fiscus. Je kunt echter ook de BTW die je betaalt op je aankopen terugvorderen.'
  },
  {
    id: 'faq2',
    category: 'BTW',
    question: 'Wanneer moet ik BTW-aangifte indienen?',
    answer: 'De meeste ondernemers moeten maandelijks of driemaandelijks BTW-aangifte indienen. De uiterste datum is meestal de 20ste van de maand volgend op de aangifteperiode. Je accountant kan je helpen bepalen welke frequentie voor jou geldt.'
  },
  {
    id: 'faq3',
    category: 'BTW',
    question: 'Kan ik BTW aftrekken op alle kosten?',
    answer: 'Je kunt BTW aftrekken op kosten die je maakt voor je onderneming, zolang deze kosten zakelijk zijn en je een geldige factuur hebt. Persoonlijke kosten kunnen niet worden afgetrokken.'
  },
  // Auto en kosten
  {
    id: 'faq4',
    category: 'Auto en kosten',
    question: 'Hoe kan ik mijn auto-kosten aftrekken?',
    answer: 'Je kunt auto-kosten op twee manieren aftrekken: via forfaitaire kosten (kilometervergoeding) of via werkelijke kosten (brandstof, onderhoud, verzekering, afschrijving). Je accountant kan je helpen bepalen welke methode het meest voordelig is voor jouw situatie.'
  },
  {
    id: 'faq5',
    category: 'Auto en kosten',
    question: 'Wat zijn aftrekbare kosten voor mijn onderneming?',
    answer: 'Aftrekbare kosten zijn alle kosten die je maakt voor je onderneming, zoals huur, loonkosten, marketing, professionele kosten, enz. Persoonlijke kosten zijn niet aftrekbaar. Je accountant kan je helpen bepalen welke kosten aftrekbaar zijn.'
  },
  {
    id: 'faq6',
    category: 'Auto en kosten',
    question: 'Kan ik mijn woon-werkverkeer aftrekken?',
    answer: 'Als zelfstandige kun je je woon-werkverkeer aftrekken via forfaitaire kosten of werkelijke kosten. De forfaitaire methode is meestal eenvoudiger en geeft je een vaste vergoeding per kilometer.'
  },
  // Investeringen
  {
    id: 'faq7',
    category: 'Investeringen',
    question: 'Wat zijn fiscaal aftrekbare investeringen?',
    answer: 'Investeringen in materiële vaste activa (zoals machines, voertuigen, gebouwen) en immateriële activa (zoals software, licenties) kunnen worden afgetrokken via afschrijvingen. Er zijn ook speciale regelingen zoals de investeringsaftrek.'
  },
  {
    id: 'faq8',
    category: 'Investeringen',
    question: 'Hoe werkt de investeringsaftrek?',
    answer: 'De investeringsaftrek is een extra fiscale aftrek bovenop de normale afschrijving. Dit kan je belastbare winst verlagen. Er zijn verschillende percentages en voorwaarden, afhankelijk van het type investering.'
  },
  {
    id: 'faq9',
    category: 'Investeringen',
    question: 'Kan ik investeringen in software aftrekken?',
    answer: 'Ja, investeringen in software kunnen worden afgetrokken via afschrijvingen. De afschrijvingstermijn is meestal 3 tot 5 jaar, afhankelijk van de verwachte levensduur van de software.'
  },
  // Sociale bijdragen
  {
    id: 'faq10',
    category: 'Sociale bijdragen',
    question: 'Hoeveel sociale bijdragen moet ik betalen?',
    answer: 'Als zelfstandige betaal je sociale bijdragen op basis van je netto-inkomen. Het percentage varieert, maar bedraagt ongeveer 20-22% van je netto-inkomen. Er zijn minimum- en maximumbijdragen.'
  },
  {
    id: 'faq11',
    category: 'Sociale bijdragen',
    question: 'Wanneer moet ik sociale bijdragen betalen?',
    answer: 'Sociale bijdragen worden meestal driemaandelijks betaald. Je ontvangt een aanslagbiljet van de sociale zekerheidsinstelling met de te betalen bedragen.'
  },
  // Vennootschap vs. eenmanszaak
  {
    id: 'faq12',
    category: 'Vennootschap vs. eenmanszaak',
    question: 'Wat is het verschil tussen eenmanszaak en vennootschap?',
    answer: 'Een eenmanszaak is eenvoudiger en goedkoper om op te richten, maar je bent volledig aansprakelijk met je privévermogen. Een vennootschap biedt meer bescherming van je privévermogen, maar heeft meer administratieve verplichtingen en kosten.'
  },
  {
    id: 'faq13',
    category: 'Vennootschap vs. eenmanszaak',
    question: 'Wanneer is een vennootschap interessant?',
    answer: 'Een vennootschap is meestal interessant als je een hogere omzet hebt, risico\'s wilt beperken, of plannen hebt om te groeien. Je accountant kan je helpen bepalen wat het beste is voor jouw situatie.'
  },
  {
    id: 'faq14',
    category: 'Vennootschap vs. eenmanszaak',
    question: 'Hoeveel kost het om een vennootschap op te richten?',
    answer: 'De oprichtingskosten van een vennootschap bedragen meestal tussen €1.200 en €3.000, afhankelijk van het type vennootschap en de notariskosten. Er zijn ook jaarlijkse kosten voor de jaarrekening.'
  },
  // Aftrekbaarheid
  {
    id: 'faq15',
    category: 'Aftrekbaarheid',
    question: 'Wat zijn aftrekbare kosten?',
    answer: 'Aftrekbare kosten zijn alle kosten die je maakt voor je onderneming en die nodig zijn om je inkomsten te verwerven. Dit omvat bijvoorbeeld huur, loonkosten, marketing, professionele kosten, enz.'
  },
  {
    id: 'faq16',
    category: 'Aftrekbaarheid',
    question: 'Kan ik mijn thuiswerkruimte aftrekken?',
    answer: 'Ja, als je thuis werkt voor je onderneming, kun je een deel van je woonkosten aftrekken. Dit wordt berekend op basis van het oppervlak en het gebruik van je thuiswerkruimte.'
  },
  // Jaarrekening
  {
    id: 'faq17',
    category: 'Jaarrekening uitgelegd',
    question: 'Wat is een jaarrekening?',
    answer: 'Een jaarrekening is een overzicht van de financiële situatie van je onderneming op het einde van het boekjaar. Het bevat een balans, resultatenrekening en toelichting.'
  },
  {
    id: 'faq18',
    category: 'Jaarrekening uitgelegd',
    question: 'Wanneer moet ik mijn jaarrekening indienen?',
    answer: 'Vennootschappen moeten hun jaarrekening uiterlijk 7 maanden na het einde van het boekjaar indienen bij de Nationale Bank van België. Eenmanszaken hebben deze verplichting meestal niet.'
  },
  // Cash, winst, omzet, BTW
  {
    id: 'faq19',
    category: 'Cash, winst, omzet',
    question: 'Wat is het verschil tussen omzet en winst?',
    answer: 'Omzet is het totale bedrag dat je ontvangt van je klanten. Winst is wat overblijft na aftrek van alle kosten. Je kunt een hoge omzet hebben maar weinig winst als je kosten hoog zijn.'
  },
  {
    id: 'faq20',
    category: 'Cash, winst, omzet',
    question: 'Wat is cash en waarom is het belangrijk?',
    answer: 'Cash is het geld dat je direct beschikbaar hebt op je bankrekening. Het is belangrijk omdat je cash nodig hebt om je rekeningen te betalen, ook al heb je winst gemaakt. Winst betekent niet automatisch dat je cash hebt.'
  },
  {
    id: 'faq21',
    category: 'Cash, winst, omzet',
    question: 'Hoe kan ik mijn cashflow verbeteren?',
    answer: 'Je kunt je cashflow verbeteren door sneller te factureren, betalingstermijnen te verkorten, kosten te beheersen, en eventueel een kredietlijn aan te vragen. Je accountant kan je helpen met concrete tips voor jouw situatie.'
  }
];

// ============================================================================
// ANALYSIS THEMES
// ============================================================================

export interface AnalysisTheme {
  theme: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
}

export const dummyAnalysisThemes: AnalysisTheme[] = [
  { theme: 'vennootschap', count: 5, trend: 'up' },
  { theme: 'auto', count: 3, trend: 'stable' },
  { theme: 'kosten', count: 4, trend: 'up' },
  { theme: 'btw', count: 2, trend: 'down' },
  { theme: 'investeringen', count: 3, trend: 'up' }
];

// Top 10 most asked questions
export const top10Questions = [
  'Is het fiscaal interessant om een vennootschap op te richten?',
  'Hoe kan ik mijn auto-kosten optimaal aftrekken?',
  'Wat betekent mijn liquiditeitsratio?',
  'Moet ik BTW betalen over mijn leveringen?',
  'Kan ik investeringen aftrekken?',
  'Hoe bereken ik mijn sociale bijdragen?',
  'Wat is het verschil tussen eenmanszaak en vennootschap?',
  'Kan ik mijn marketingkosten volledig aftrekken?',
  'Hoe werkt de BTW-aftrek?',
  'Is het interessant om te investeren in nieuwe apparatuur?'
];

// ============================================================================
// SETTINGS DATA
// ============================================================================

export interface OfficeInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  btwNumber: string;
}

export const dummyOfficeInfo: OfficeInfo = {
  name: 'Accountantskantoor De Vries & Partners',
  address: 'Hoofdstraat 123, 1000 Brussel',
  phone: '+32 2 123 45 67',
  email: 'info@devriespartners.be',
  btwNumber: 'BE 0123.456.789'
};

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'medewerker';
  active: boolean;
}

export const dummyEmployees: Employee[] = [
  {
    id: 'e1',
    name: 'Arnaud De Vries',
    email: 'arnaud@devriespartners.be',
    role: 'admin',
    active: true
  },
  {
    id: 'e2',
    name: 'Sophie Janssens',
    email: 'sophie@devriespartners.be',
    role: 'medewerker',
    active: true
  },
  {
    id: 'e3',
    name: 'Thomas Verstraeten',
    email: 'thomas@devriespartners.be',
    role: 'medewerker',
    active: true
  }
];

export interface APIIntegration {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  syncCount?: number;
}

export const dummyAPIIntegrations: APIIntegration[] = [
  {
    id: 'api1',
    name: 'Exact Online',
    type: 'boekhoudsoftware',
    status: 'connected',
    lastSync: '2 uur geleden',
    syncCount: 1247
  },
  {
    id: 'api2',
    name: 'Yuki',
    type: 'boekhoudsoftware',
    status: 'connected',
    lastSync: '1 uur geleden',
    syncCount: 892
  },
  {
    id: 'api3',
    name: 'Dexxter',
    type: 'boekhoudsoftware',
    status: 'disconnected',
    lastSync: '5 dagen geleden',
    syncCount: 0
  }
];

export interface BillingInfo {
  plan: string;
  price: number;
  nextBillingDate: string;
  status: 'active' | 'cancelled';
}

export const dummyBillingInfo: BillingInfo = {
  plan: 'Professional',
  price: 299,
  nextBillingDate: '2025-02-01',
  status: 'active'
};

// ============================================================================
// CLIENT SETTINGS DATA
// ============================================================================

export interface ClientPersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const dummyClientPersonalInfo: ClientPersonalInfo = {
  name: 'Arnaud De Vries',
  email: 'arnaud@techsolutions.be',
  phone: '+32 478 12 34 56',
  address: 'Techstraat 45, 2000 Antwerpen'
};

export interface ClientActivityInfo {
  sector: string;
  description: string;
  rechtsvorm: string;
  btwNumber: string;
}

export const dummyClientActivityInfo: ClientActivityInfo = {
  sector: 'IT',
  description: 'Software ontwikkeling en IT-consultancy voor middelgrote bedrijven',
  rechtsvorm: 'BV',
  btwNumber: 'BE 0123.456.789'
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getTopClients = (sortBy: 'omzet' | 'kosten' | 'winst' = 'omzet', limit: number = 10): Client[] => {
  return [...dummyClients]
    .sort((a, b) => {
      if (!a.financials || !b.financials) return 0;
      
      let aValue: number;
      let bValue: number;
      
      if (sortBy === 'kosten') {
        // Calculate costs as omzet - winst
        aValue = a.financials.omzet - a.financials.winst;
        bValue = b.financials.omzet - b.financials.winst;
      } else {
        aValue = a.financials[sortBy];
        bValue = b.financials[sortBy];
      }
      
      return bValue - aValue;
    })
    .slice(0, limit);
};

export const getRecentAIQuestions = (limit: number = 10): AIQuestion[] => {
  return dummyAIQuestions.slice(0, limit);
};

export const getUpcomingDeadlines = (days: number = 30): FiscalDeadline[] => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);
  
  return dummyFiscalDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate >= today && deadlineDate <= futureDate;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getMessagesForClient = (clientId?: string): Message[] => {
  if (!clientId) {
    return dummyMessages.filter(m => !m.toClientId);
  }
  return dummyMessages.filter(m => m.toClientId === clientId);
};

// Helper function to enrich messages with notification metadata
export const enrichMessagesForNotifications = (messages: Message[]): Message[] => {
  return messages.map((message) => {
    const enriched: Message = { ...message };
    
    // Set sender name (only if not already set)
    if (!enriched.senderName) {
      if (enriched.toClientName) {
        enriched.senderName = enriched.toClientName;
      } else if (enriched.subject.includes('Algemene mededeling') || enriched.subject.includes('Nieuwe functie') || enriched.subject.includes('Aankondiging')) {
        enriched.senderName = 'Aankondigingen';
        if (!enriched.categoryIcon) enriched.categoryIcon = 'Bell';
      } else {
        enriched.senderName = 'Accountant';
        if (!enriched.categoryIcon) enriched.categoryIcon = 'User';
      }
    }
    
    // Set category icon based on tags or subject (only if not already set)
    if (!enriched.categoryIcon) {
      if (enriched.tags?.includes('Belangrijk') && (enriched.subject.toLowerCase().includes('betaling') || enriched.subject.toLowerCase().includes('betalingsherinnering'))) {
        enriched.categoryIcon = 'CreditCard';
      } else if (enriched.tags?.includes('Herinnering') || enriched.subject.toLowerCase().includes('herinnering')) {
        enriched.categoryIcon = 'Clock';
      } else if (enriched.subject.toLowerCase().includes('jaarrekening')) {
        enriched.categoryIcon = 'FileText';
      } else if (enriched.subject.toLowerCase().includes('data') || enriched.content.toLowerCase().includes('data')) {
        enriched.categoryIcon = 'Clock';
      } else {
        enriched.categoryIcon = 'MessageCircle';
      }
    }
    
    // Set phone number if available (for demo purposes, only if toClientName exists)
    if (enriched.toClientName && !enriched.phoneNumber) {
      enriched.phoneNumber = '123-456-7890';
    }
    
    // Set full content (use content if fullContent not set)
    if (!enriched.fullContent) {
      enriched.fullContent = enriched.content;
    }
    
    // Generate action buttons based on message type (only if not already set)
    if (!enriched.actionButtons || enriched.actionButtons.length === 0) {
      enriched.actionButtons = [];
      if (enriched.subject.toLowerCase().includes('betaling') || enriched.subject.toLowerCase().includes('betalingsherinnering') || enriched.content.toLowerCase().includes('betaal')) {
        enriched.actionButtons.push({ label: 'Betaal mijn rekening', href: '#' });
      }
      if (enriched.subject.toLowerCase().includes('top-up') || enriched.content.toLowerCase().includes('top up') || enriched.content.toLowerCase().includes('top-up')) {
        enriched.actionButtons.push({ label: 'Top-up toevoegen', href: '#' });
      }
      if (enriched.subject.toLowerCase().includes('jaarrekening')) {
        enriched.actionButtons.push({ label: 'Bekijk jaarrekening', href: '#' });
      }
    }
    
    return enriched;
  });
};

// Helper function to format date for notifications
export const formatNotificationDate = (timestamp: string): string => {
  // If timestamp is already in format like "10 MEI" or "4 JUN", return as-is
  if (/^\d{1,2}\s+[A-Z]{3}$/.test(timestamp)) {
    return timestamp;
  }
  
  // If timestamp is already formatted (like "2 dagen geleden"), try to parse it
  const dateMatch = timestamp.match(/(\d{1,2})\s*(dag|week|maand)/);
  if (dateMatch) {
    // Convert relative dates to approximate dates
    const daysAgo = parseInt(dateMatch[1]);
    const unit = dateMatch[2];
    const date = new Date();
    
    if (unit === 'dag') {
      date.setDate(date.getDate() - daysAgo);
    } else if (unit === 'week') {
      date.setDate(date.getDate() - (daysAgo * 7));
    } else if (unit === 'maand') {
      date.setMonth(date.getMonth() - daysAgo);
    }
    
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC'];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }
  
  // Try to parse as date
  const date = new Date(timestamp);
  if (!isNaN(date.getTime())) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC'];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }
  
  return timestamp;
};

export const getFiscalDeadlinesByMonth = (): Record<string, FiscalDeadline[]> => {
  const today = new Date();
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(today.getMonth() + 6);
  
  const upcomingDeadlines = dummyFiscalDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate >= today && deadlineDate <= sixMonthsFromNow;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const grouped: Record<string, FiscalDeadline[]> = {};
  
  upcomingDeadlines.forEach(deadline => {
    const date = new Date(deadline.date);
    const monthKey = date.toLocaleDateString('nl-BE', { year: 'numeric', month: 'long' });
    
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(deadline);
  });
  
  return grouped;
};

export const getFAQByCategory = (category?: string): FAQEntry[] => {
  if (!category) return dummyFAQEntries;
  return dummyFAQEntries.filter(faq => faq.category === category);
};

export const getFAQCategories = (): string[] => {
  return Array.from(new Set(dummyFAQEntries.map(faq => faq.category)));
};

// ============================================================================
// BE GAAP / MAR ACCOUNT STRUCTURES
// ============================================================================

export interface BE_GAAP_ACCOUNT {
  code: string;
  name: string;
  parentCode?: string;
  level: number; // 0=hoofdklasse, 1=subklasse, 2=detailrekening, 3=subdetail
  type: 'balance' | 'income';
  category: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense' | 'off_balance';
  amount?: number | null;
}

export interface BE_GAAP_ACCOUNT_GROUP {
  code: string;
  name: string;
  accounts: BE_GAAP_ACCOUNT[];
  total: number | null;
}

// Balans accounts volgens MAR (klassen 0-5) - tot 3-cijferig niveau volgens balans.txt
export const BE_GAAP_BALANCE_ACCOUNTS: BE_GAAP_ACCOUNT[] = [
  // Klasse 0: Zekerheden en verplichtingen buiten balans
  { code: '0', name: 'Zekerheden en verplichtingen buiten balans', level: 0, type: 'balance', category: 'off_balance' },
  { code: '00', name: 'Zekerheden door derden gesteld voor rekening van de onderneming', parentCode: '0', level: 1, type: 'balance', category: 'off_balance' },
  { code: '000', name: 'Crediteuren van de onderneming, houders van door derden gestelde zekerheden', parentCode: '00', level: 2, type: 'balance', category: 'off_balance' },
  { code: '001', name: 'Derden, stellers van zekerheden gesteld voor rekening van de onderneming', parentCode: '00', level: 2, type: 'balance', category: 'off_balance' },
  { code: '01', name: 'Persoonlijke zekerheden gesteld voor rekening van derden', parentCode: '0', level: 1, type: 'balance', category: 'off_balance' },
  { code: '010', name: 'Debiteuren wegens verplichtingen uit wissels in omloop', parentCode: '01', level: 2, type: 'balance', category: 'off_balance' },
  { code: '011', name: 'Crediteuren wegens verplichtingen uit wissels in omloop', parentCode: '01', level: 2, type: 'balance', category: 'off_balance' },
  { code: '0110', name: 'Door de ondernemingen geëndosseerde, overgedragen wissels', parentCode: '011', level: 3, type: 'balance', category: 'off_balance' },
  { code: '0111', name: 'Andere verplichtingen uit wissels in omloop', parentCode: '011', level: 3, type: 'balance', category: 'off_balance' },
  { code: '012', name: 'Debiteuren wegens andere persoonlijke zekerheden', parentCode: '01', level: 2, type: 'balance', category: 'off_balance' },
  { code: '013', name: 'Crediteuren wegens andere persoonlijke zekerheden', parentCode: '01', level: 2, type: 'balance', category: 'off_balance' },
  { code: '02', name: 'Zakelijke zekerheden gesteld op eigen activa', parentCode: '0', level: 1, type: 'balance', category: 'off_balance' },
  { code: '020', name: 'Crediteuren van de onderneming, houders van zakelijke zekerheden', parentCode: '02', level: 2, type: 'balance', category: 'off_balance' },
  { code: '021', name: 'Zakelijke zekerheden gesteld voor eigen rekening', parentCode: '02', level: 2, type: 'balance', category: 'off_balance' },
  { code: '022', name: 'Crediteuren van derden, houders van zakelijke zekerheden', parentCode: '02', level: 2, type: 'balance', category: 'off_balance' },
  { code: '023', name: 'Zakelijke zekerheden gesteld voor rekening van derden', parentCode: '02', level: 2, type: 'balance', category: 'off_balance' },
  { code: '03', name: 'Ontvangen zekerheden', parentCode: '0', level: 1, type: 'balance', category: 'off_balance' },
  { code: '030', name: 'Statutaire bewaargevingen', parentCode: '03', level: 2, type: 'balance', category: 'off_balance' },
  { code: '031', name: 'Statutaire bewaargevers', parentCode: '03', level: 2, type: 'balance', category: 'off_balance' },
  { code: '032', name: 'Ontvangen zekerheden', parentCode: '03', level: 2, type: 'balance', category: 'off_balance' },
  { code: '033', name: 'Zekerheidsstellers', parentCode: '03', level: 2, type: 'balance', category: 'off_balance' },
  { code: '04', name: 'Goederen en waarden gehouden door derden in hun naam, maar ten bate en voor risico van de onderneming', parentCode: '0', level: 1, type: 'balance', category: 'off_balance' },
  { code: '040', name: 'Derden, houders in hun naam, maar ten bate en voor risico van de onderneming van goederen en waarden', parentCode: '04', level: 2, type: 'balance', category: 'off_balance' },
  { code: '041', name: 'Goederen en waarden gehouden door derden in hun naam, maar ten bate en voor risico van de onderneming', parentCode: '04', level: 2, type: 'balance', category: 'off_balance' },
  { code: '05', name: 'Verplichtingen tot aan- en verkoop van vaste activa', parentCode: '0', level: 1, type: 'balance', category: 'off_balance' },
  { code: '050', name: 'Verplichtingen tot aankoop', parentCode: '05', level: 2, type: 'balance', category: 'off_balance' },
  { code: '051', name: 'Crediteuren wegens verplichtingen tot aankoop', parentCode: '05', level: 2, type: 'balance', category: 'off_balance' },
  { code: '052', name: 'Debiteuren wegens verplichtingen tot verkoop', parentCode: '05', level: 2, type: 'balance', category: 'off_balance' },
  { code: '053', name: 'Verplichtingen tot verkoop', parentCode: '05', level: 2, type: 'balance', category: 'off_balance' },
  { code: '06', name: 'Termijnovereenkomsten', parentCode: '0', level: 1, type: 'balance', category: 'off_balance' },
  { code: '060', name: 'Op termijn gekochte goederen - te ontvangen', parentCode: '06', level: 2, type: 'balance', category: 'off_balance' },
  { code: '061', name: 'Crediteuren wegens op termijn gekochte goederen', parentCode: '06', level: 2, type: 'balance', category: 'off_balance' },
  { code: '062', name: 'Debiteuren wegens op termijn verkochte goederen', parentCode: '06', level: 2, type: 'balance', category: 'off_balance' },
  { code: '063', name: 'Op termijn verkochte goederen - te leveren', parentCode: '06', level: 2, type: 'balance', category: 'off_balance' },
  { code: '064', name: 'Op termijn gekochte deviezen - te ontvangen', parentCode: '06', level: 2, type: 'balance', category: 'off_balance' },
  { code: '065', name: 'Crediteuren wegens op termijn gekochte deviezen', parentCode: '06', level: 2, type: 'balance', category: 'off_balance' },
  { code: '066', name: 'Debiteuren wegens op termijn verkochte deviezen', parentCode: '06', level: 2, type: 'balance', category: 'off_balance' },
  { code: '067', name: 'Op termijn verkochte deviezen - te leveren', parentCode: '06', level: 2, type: 'balance', category: 'off_balance' },
  { code: '07', name: 'Goederen en waarden van derden gehouden door de onderneming', parentCode: '0', level: 1, type: 'balance', category: 'off_balance' },
  { code: '070', name: 'Gebruiksrechten op lange termijn', parentCode: '07', level: 2, type: 'balance', category: 'off_balance' },
  { code: '0700', name: 'Terreinen en gebouwen', parentCode: '070', level: 3, type: 'balance', category: 'off_balance' },
  { code: '0701', name: 'Installaties, machines en uitrusting', parentCode: '070', level: 3, type: 'balance', category: 'off_balance' },
  { code: '0702', name: 'Meubilair en rollend materieel', parentCode: '070', level: 3, type: 'balance', category: 'off_balance' },
  { code: '071', name: 'Crediteuren wegens huurgelden en vergoedingen', parentCode: '07', level: 2, type: 'balance', category: 'off_balance' },
  { code: '072', name: 'Goederen en waarden door derden in bewaring, in consignatie of in bewerking gegeven', parentCode: '07', level: 2, type: 'balance', category: 'off_balance' },
  { code: '073', name: 'Committenten en deponenten van goederen en waarden', parentCode: '07', level: 2, type: 'balance', category: 'off_balance' },
  { code: '074', name: 'Goederen en waarden gehouden voor rekening of ten bate en voor risico van derden', parentCode: '07', level: 2, type: 'balance', category: 'off_balance' },
  { code: '075', name: 'Crediteuren wegens goederen en waarden gehouden voor rekening of ten bate en voor risico van derden', parentCode: '07', level: 2, type: 'balance', category: 'off_balance' },
  { code: '09', name: 'Diverse rechten en verplichtingen', parentCode: '0', level: 1, type: 'balance', category: 'off_balance' },

  // Klasse 1: Eigen vermogen, voorzieningen en schulden op meer dan één jaar
  { code: '1', name: 'Eigen vermogen, voorzieningen voor risico\'s en kosten en schulden op meer dan één jaar', level: 0, type: 'balance', category: 'equity' },
  { code: '10', name: 'Kapitaal', parentCode: '1', level: 1, type: 'balance', category: 'equity' },
  { code: '100', name: 'Geplaatst kapitaal', parentCode: '10', level: 2, type: 'balance', category: 'equity' },
  { code: '101', name: 'Niet opgevraagd kapitaal (–)', parentCode: '10', level: 2, type: 'balance', category: 'equity' },
  { code: '11', name: 'Inbreng buiten kapitaal', parentCode: '1', level: 1, type: 'balance', category: 'equity' },
  { code: '110', name: 'Beschikbare inbreng buiten kapitaal', parentCode: '11', level: 2, type: 'balance', category: 'equity' },
  { code: '1100', name: 'Uitgiftepremie', parentCode: '110', level: 3, type: 'balance', category: 'equity' },
  { code: '1109', name: 'Andere', parentCode: '110', level: 3, type: 'balance', category: 'equity' },
  { code: '111', name: 'Onbeschikbare inbreng buiten kapitaal', parentCode: '11', level: 2, type: 'balance', category: 'equity' },
  { code: '1110', name: 'Uitgiftepremie', parentCode: '111', level: 3, type: 'balance', category: 'equity' },
  { code: '1119', name: 'Andere', parentCode: '111', level: 3, type: 'balance', category: 'equity' },
  { code: '12', name: 'Herwaarderingsmeerwaarden', parentCode: '1', level: 1, type: 'balance', category: 'equity' },
  { code: '120', name: 'Immateriële vaste activa', parentCode: '12', level: 2, type: 'balance', category: 'equity' },
  { code: '121', name: 'Materiële vaste activa', parentCode: '12', level: 2, type: 'balance', category: 'equity' },
  { code: '122', name: 'Financiële vaste activa', parentCode: '12', level: 2, type: 'balance', category: 'equity' },
  { code: '123', name: 'Voorraden', parentCode: '12', level: 2, type: 'balance', category: 'equity' },
  { code: '124', name: 'Terugneming waardeverminderingen op geldbeleggingen', parentCode: '12', level: 2, type: 'balance', category: 'equity' },
  { code: '13', name: 'Reserves', parentCode: '1', level: 1, type: 'balance', category: 'equity' },
  { code: '130', name: 'Wettelijke reserves', parentCode: '13', level: 2, type: 'balance', category: 'equity' },
  { code: '131', name: 'Andere onbeschikbare reserves', parentCode: '13', level: 2, type: 'balance', category: 'equity' },
  { code: '1311', name: 'Statutair onbeschikbare reserves', parentCode: '131', level: 3, type: 'balance', category: 'equity' },
  { code: '1312', name: 'Reserve voor eigen aandelen', parentCode: '131', level: 3, type: 'balance', category: 'equity' },
  { code: '1313', name: 'Financiële steunverlening', parentCode: '131', level: 3, type: 'balance', category: 'equity' },
  { code: '1319', name: 'Overige', parentCode: '131', level: 3, type: 'balance', category: 'equity' },
  { code: '132', name: 'Belastingvrije reserves', parentCode: '13', level: 2, type: 'balance', category: 'equity' },
  { code: '133', name: 'Beschikbare reserves', parentCode: '13', level: 2, type: 'balance', category: 'equity' },
  { code: '14', name: 'Overgedragen winst of Overgedragen verlies (–)', parentCode: '1', level: 1, type: 'balance', category: 'equity' },
  { code: '15', name: 'Kapitaalsubsidies', parentCode: '1', level: 1, type: 'balance', category: 'equity' },
  { code: '16', name: 'Voorzieningen en uitgestelde belastingen', parentCode: '1', level: 1, type: 'balance', category: 'liability' },
  { code: '160', name: 'Voorzieningen voor pensioenen en soortgelijke verplichtingen', parentCode: '16', level: 2, type: 'balance', category: 'liability' },
  { code: '161', name: 'Voorzieningen voor belastingen', parentCode: '16', level: 2, type: 'balance', category: 'liability' },
  { code: '162', name: 'Voorzieningen voor grote herstellingswerken en grote onderhoudswerken', parentCode: '16', level: 2, type: 'balance', category: 'liability' },
  { code: '163', name: 'Voorzieningen voor milieuverplichtingen', parentCode: '16', level: 2, type: 'balance', category: 'liability' },
  { code: '164', name: 'Voorzieningen voor overige risico\'s en kosten', parentCode: '16', level: 2, type: 'balance', category: 'liability' },
  { code: '165', name: 'Voorzieningen voor overige risico\'s en kosten (vervolg)', parentCode: '16', level: 2, type: 'balance', category: 'liability' },
  { code: '168', name: 'Uitgestelde belastingen', parentCode: '16', level: 2, type: 'balance', category: 'liability' },
  { code: '1680', name: 'Op kapitaalsubsidies', parentCode: '168', level: 3, type: 'balance', category: 'liability' },
  { code: '1681', name: 'Meerwaarden op immateriële vaste activa', parentCode: '168', level: 3, type: 'balance', category: 'liability' },
  { code: '1682', name: 'Meerwaarden op materiële vaste activa', parentCode: '168', level: 3, type: 'balance', category: 'liability' },
  { code: '1687', name: 'Meerwaarden op effecten Belgische publieke sector', parentCode: '168', level: 3, type: 'balance', category: 'liability' },
  { code: '1688', name: 'Buitenlandse uitgestelde belastingen', parentCode: '168', level: 3, type: 'balance', category: 'liability' },
  { code: '17', name: 'Schulden op meer dan één jaar', parentCode: '1', level: 1, type: 'balance', category: 'liability' },
  { code: '170', name: 'Achtergestelde leningen', parentCode: '17', level: 2, type: 'balance', category: 'liability' },
  { code: '1700', name: 'Converteerbaar', parentCode: '170', level: 3, type: 'balance', category: 'liability' },
  { code: '1701', name: 'Niet-converteerbaar', parentCode: '170', level: 3, type: 'balance', category: 'liability' },
  { code: '171', name: 'Niet-achtergestelde obligatieleningen', parentCode: '17', level: 2, type: 'balance', category: 'liability' },
  { code: '1710', name: 'Converteerbaar', parentCode: '171', level: 3, type: 'balance', category: 'liability' },
  { code: '1711', name: 'Niet-converteerbaar', parentCode: '171', level: 3, type: 'balance', category: 'liability' },
  { code: '172', name: 'Leasingschulden en soortgelijke schulden', parentCode: '17', level: 2, type: 'balance', category: 'liability' },
  { code: '173', name: 'Kredietinstellingen', parentCode: '17', level: 2, type: 'balance', category: 'liability' },
  { code: '1730', name: 'Schulden op rekening', parentCode: '173', level: 3, type: 'balance', category: 'liability' },
  { code: '1731', name: 'Promessen', parentCode: '173', level: 3, type: 'balance', category: 'liability' },
  { code: '1732', name: 'Acceptkredieten', parentCode: '173', level: 3, type: 'balance', category: 'liability' },
  { code: '174', name: 'Overige leningen', parentCode: '17', level: 2, type: 'balance', category: 'liability' },
  { code: '175', name: 'Handelsschulden', parentCode: '17', level: 2, type: 'balance', category: 'liability' },
  { code: '1750', name: 'Leveranciers', parentCode: '175', level: 3, type: 'balance', category: 'liability' },
  { code: '1751', name: 'Te betalen wissel', parentCode: '175', level: 3, type: 'balance', category: 'liability' },
  { code: '176', name: 'Vooruitbetalingen op bestellingen', parentCode: '17', level: 2, type: 'balance', category: 'liability' },
  { code: '178', name: 'Borgtochten ontvangen in contanten', parentCode: '17', level: 2, type: 'balance', category: 'liability' },
  { code: '179', name: 'Overige schulden', parentCode: '17', level: 2, type: 'balance', category: 'liability' },
  { code: '19', name: 'Voorschot aan de vennoten op de verdeling van het netto-actief (–)', parentCode: '1', level: 1, type: 'balance', category: 'equity' },

  // Klasse 2: Oprichtingskosten, vaste activa en vorderingen op meer dan één jaar
  { code: '2', name: 'Oprichtingskosten, vaste activa en vorderingen op meer dan één jaar', level: 0, type: 'balance', category: 'asset' },
  { code: '20', name: 'Oprichtingskosten', parentCode: '2', level: 1, type: 'balance', category: 'asset' },
  { code: '200', name: 'Oprichtings-, kapitaalverhogings- of inbrengkosten', parentCode: '20', level: 2, type: 'balance', category: 'asset' },
  { code: '201', name: 'Kosten bij uitgifte van leningen', parentCode: '20', level: 2, type: 'balance', category: 'asset' },
  { code: '202', name: 'Overige oprichtingskosten', parentCode: '20', level: 2, type: 'balance', category: 'asset' },
  { code: '203', name: 'Overige oprichtingskosten', parentCode: '20', level: 2, type: 'balance', category: 'asset' },
  { code: '204', name: 'Herstructureringskosten', parentCode: '20', level: 2, type: 'balance', category: 'asset' },
  { code: '21', name: 'Immateriële vaste activa', parentCode: '2', level: 1, type: 'balance', category: 'asset' },
  { code: '210', name: 'Onderzoek en ontwikkeling', parentCode: '21', level: 2, type: 'balance', category: 'asset' },
  { code: '211', name: 'Concessies, octrooien, licenties, know-how, merken', parentCode: '21', level: 2, type: 'balance', category: 'asset' },
  { code: '212', name: 'Goodwill', parentCode: '21', level: 2, type: 'balance', category: 'asset' },
  { code: '213', name: 'Vooruitbetalingen', parentCode: '21', level: 2, type: 'balance', category: 'asset' },
  { code: '22', name: 'Terreinen en gebouwen', parentCode: '2', level: 1, type: 'balance', category: 'asset' },
  { code: '220', name: 'Terreinen', parentCode: '22', level: 2, type: 'balance', category: 'asset' },
  { code: '221', name: 'Gebouwen', parentCode: '22', level: 2, type: 'balance', category: 'asset' },
  { code: '222', name: 'Bebouwde terreinen', parentCode: '22', level: 2, type: 'balance', category: 'asset' },
  { code: '223', name: 'Overige zakelijke rechten op onroerende goederen', parentCode: '22', level: 2, type: 'balance', category: 'asset' },
  { code: '23', name: 'Installaties, machines en uitrusting', parentCode: '2', level: 1, type: 'balance', category: 'asset' },
  { code: '24', name: 'Meubilair en rollend materieel', parentCode: '2', level: 1, type: 'balance', category: 'asset' },
  { code: '25', name: 'Vaste activa in leasing of soortgelijk recht', parentCode: '2', level: 1, type: 'balance', category: 'asset' },
  { code: '250', name: 'Terreinen en gebouwen', parentCode: '25', level: 2, type: 'balance', category: 'asset' },
  { code: '251', name: 'Installaties, machines en uitrusting', parentCode: '25', level: 2, type: 'balance', category: 'asset' },
  { code: '252', name: 'Meubilair en rollend materieel', parentCode: '25', level: 2, type: 'balance', category: 'asset' },
  { code: '26', name: 'Overige materiële vaste activa', parentCode: '2', level: 1, type: 'balance', category: 'asset' },
  { code: '27', name: 'Vaste activa in aanbouw en vooruitbetalingen', parentCode: '2', level: 1, type: 'balance', category: 'asset' },
  { code: '28', name: 'Financiële vaste activa', parentCode: '2', level: 1, type: 'balance', category: 'asset' },
  { code: '280', name: 'Deelnemingen in verbonden ondernemingen', parentCode: '28', level: 2, type: 'balance', category: 'asset' },
  { code: '2800', name: 'Aanschaffingswaarde', parentCode: '280', level: 3, type: 'balance', category: 'asset' },
  { code: '2801', name: 'Nog te storten bedragen (–)', parentCode: '280', level: 3, type: 'balance', category: 'asset' },
  { code: '2808', name: 'Geboekte meerwaarden', parentCode: '280', level: 3, type: 'balance', category: 'asset' },
  { code: '2809', name: 'Geboekte waardeverminderingen (–)', parentCode: '280', level: 3, type: 'balance', category: 'asset' },
  { code: '281', name: 'Vorderingen op verbonden ondernemingen', parentCode: '28', level: 2, type: 'balance', category: 'asset' },
  { code: '2810', name: 'Vorderingen op rekening', parentCode: '281', level: 3, type: 'balance', category: 'asset' },
  { code: '2811', name: 'Te innen wissels', parentCode: '281', level: 3, type: 'balance', category: 'asset' },
  { code: '2812', name: 'Vastrentende effecten', parentCode: '281', level: 3, type: 'balance', category: 'asset' },
  { code: '2817', name: 'Dubieuze debiteuren', parentCode: '281', level: 3, type: 'balance', category: 'asset' },
  { code: '2819', name: 'Geboekte waardeverminderingen (–)', parentCode: '281', level: 3, type: 'balance', category: 'asset' },
  { code: '282', name: 'Deelnemingen in ondernemingen met deelnemingsverhouding', parentCode: '28', level: 2, type: 'balance', category: 'asset' },
  { code: '2820', name: 'Aanschaffingswaarde', parentCode: '282', level: 3, type: 'balance', category: 'asset' },
  { code: '2821', name: 'Nog te storten bedragen (–)', parentCode: '282', level: 3, type: 'balance', category: 'asset' },
  { code: '2828', name: 'Geboekte meerwaarden', parentCode: '282', level: 3, type: 'balance', category: 'asset' },
  { code: '2829', name: 'Geboekte waardeverminderingen (–)', parentCode: '282', level: 3, type: 'balance', category: 'asset' },
  { code: '283', name: 'Vorderingen op ondernemingen met deelnemingsverhouding', parentCode: '28', level: 2, type: 'balance', category: 'asset' },
  { code: '2830', name: 'Vorderingen op rekening', parentCode: '283', level: 3, type: 'balance', category: 'asset' },
  { code: '2831', name: 'Te innen wissels', parentCode: '283', level: 3, type: 'balance', category: 'asset' },
  { code: '2832', name: 'Vastrentende effecten', parentCode: '283', level: 3, type: 'balance', category: 'asset' },
  { code: '2837', name: 'Dubieuze debiteuren', parentCode: '283', level: 3, type: 'balance', category: 'asset' },
  { code: '2839', name: 'Geboekte waardeverminderingen (–)', parentCode: '283', level: 3, type: 'balance', category: 'asset' },
  { code: '284', name: 'Andere aandelen', parentCode: '28', level: 2, type: 'balance', category: 'asset' },
  { code: '2840', name: 'Aanschaffingswaarde', parentCode: '284', level: 3, type: 'balance', category: 'asset' },
  { code: '2841', name: 'Nog te storten bedragen (–)', parentCode: '284', level: 3, type: 'balance', category: 'asset' },
  { code: '2848', name: 'Geboekte meerwaarden', parentCode: '284', level: 3, type: 'balance', category: 'asset' },
  { code: '2849', name: 'Geboekte waardeverminderingen (–)', parentCode: '284', level: 3, type: 'balance', category: 'asset' },
  { code: '285', name: 'Overige vorderingen', parentCode: '28', level: 2, type: 'balance', category: 'asset' },
  { code: '2850', name: 'Vorderingen op rekening', parentCode: '285', level: 3, type: 'balance', category: 'asset' },
  { code: '2851', name: 'Te innen wissels', parentCode: '285', level: 3, type: 'balance', category: 'asset' },
  { code: '2852', name: 'Vastrentende effecten', parentCode: '285', level: 3, type: 'balance', category: 'asset' },
  { code: '2857', name: 'Dubieuze debiteuren', parentCode: '285', level: 3, type: 'balance', category: 'asset' },
  { code: '2859', name: 'Geboekte waardeverminderingen (–)', parentCode: '285', level: 3, type: 'balance', category: 'asset' },
  { code: '288', name: 'Borgtochten betaald in contanten', parentCode: '28', level: 2, type: 'balance', category: 'asset' },
  { code: '29', name: 'Vorderingen op meer dan één jaar', parentCode: '2', level: 1, type: 'balance', category: 'asset' },
  { code: '290', name: 'Handelsvorderingen', parentCode: '29', level: 2, type: 'balance', category: 'asset' },
  { code: '2900', name: 'Handelsdebiteuren', parentCode: '290', level: 3, type: 'balance', category: 'asset' },
  { code: '2901', name: 'Te innen wissels', parentCode: '290', level: 3, type: 'balance', category: 'asset' },
  { code: '2906', name: 'Vooruitbetalingen', parentCode: '290', level: 3, type: 'balance', category: 'asset' },
  { code: '2907', name: 'Dubieuze debiteuren', parentCode: '290', level: 3, type: 'balance', category: 'asset' },
  { code: '2909', name: 'Geboekte waardeverminderingen (–)', parentCode: '290', level: 3, type: 'balance', category: 'asset' },
  { code: '291', name: 'Overige vorderingen', parentCode: '29', level: 2, type: 'balance', category: 'asset' },
  { code: '2910', name: 'Vorderingen op rekening', parentCode: '291', level: 3, type: 'balance', category: 'asset' },
  { code: '2911', name: 'Te innen wissels', parentCode: '291', level: 3, type: 'balance', category: 'asset' },
  { code: '2917', name: 'Dubieuze debiteuren', parentCode: '291', level: 3, type: 'balance', category: 'asset' },
  { code: '2919', name: 'Geboekte waardeverminderingen (–)', parentCode: '291', level: 3, type: 'balance', category: 'asset' },

  // Klasse 3: Voorraden en bestellingen in uitvoering
  { code: '3', name: 'Voorraden en bestellingen in uitvoering', level: 0, type: 'balance', category: 'asset' },
  { code: '30', name: 'Grondstoffen', parentCode: '3', level: 1, type: 'balance', category: 'asset' },
  { code: '300', name: 'Aanschaffingswaarde', parentCode: '30', level: 2, type: 'balance', category: 'asset' },
  { code: '309', name: 'Geboekte waardeverminderingen (–)', parentCode: '30', level: 2, type: 'balance', category: 'asset' },
  { code: '31', name: 'Hulpstoffen', parentCode: '3', level: 1, type: 'balance', category: 'asset' },
  { code: '310', name: 'Aanschaffingswaarde', parentCode: '31', level: 2, type: 'balance', category: 'asset' },
  { code: '319', name: 'Geboekte waardeverminderingen (–)', parentCode: '31', level: 2, type: 'balance', category: 'asset' },
  { code: '32', name: 'Goederen in bewerking', parentCode: '3', level: 1, type: 'balance', category: 'asset' },
  { code: '320', name: 'Aanschaffingswaarde', parentCode: '32', level: 2, type: 'balance', category: 'asset' },
  { code: '329', name: 'Geboekte waardeverminderingen (–)', parentCode: '32', level: 2, type: 'balance', category: 'asset' },
  { code: '33', name: 'Gereed product', parentCode: '3', level: 1, type: 'balance', category: 'asset' },
  { code: '330', name: 'Aanschaffingswaarde', parentCode: '33', level: 2, type: 'balance', category: 'asset' },
  { code: '339', name: 'Geboekte waardeverminderingen (–)', parentCode: '33', level: 2, type: 'balance', category: 'asset' },
  { code: '34', name: 'Handelsgoederen', parentCode: '3', level: 1, type: 'balance', category: 'asset' },
  { code: '340', name: 'Aanschaffingswaarde', parentCode: '34', level: 2, type: 'balance', category: 'asset' },
  { code: '349', name: 'Geboekte waardeverminderingen (–)', parentCode: '34', level: 2, type: 'balance', category: 'asset' },
  { code: '35', name: 'Onroerende goederen bestemd voor verkoop', parentCode: '3', level: 1, type: 'balance', category: 'asset' },
  { code: '350', name: 'Aanschaffingswaarde', parentCode: '35', level: 2, type: 'balance', category: 'asset' },
  { code: '359', name: 'Geboekte waardeverminderingen (–)', parentCode: '35', level: 2, type: 'balance', category: 'asset' },
  { code: '36', name: 'Vooruitbetalingen op voorraadinkopen', parentCode: '3', level: 1, type: 'balance', category: 'asset' },
  { code: '360', name: 'Vooruitbetalingen', parentCode: '36', level: 2, type: 'balance', category: 'asset' },
  { code: '369', name: 'Geboekte waardeverminderingen (–)', parentCode: '36', level: 2, type: 'balance', category: 'asset' },
  { code: '37', name: 'Bestellingen in uitvoering', parentCode: '3', level: 1, type: 'balance', category: 'asset' },
  { code: '370', name: 'Aanschaffingswaarde', parentCode: '37', level: 2, type: 'balance', category: 'asset' },
  { code: '371', name: 'Toegerekende winst', parentCode: '37', level: 2, type: 'balance', category: 'asset' },
  { code: '379', name: 'Geboekte waardeverminderingen (–)', parentCode: '37', level: 2, type: 'balance', category: 'asset' },

  // Klasse 4: Vorderingen en schulden op ten hoogste één jaar
  { code: '4', name: 'Vorderingen en schulden op ten hoogste één jaar', level: 0, type: 'balance', category: 'asset' },
  { code: '40', name: 'Handelsvorderingen', parentCode: '4', level: 1, type: 'balance', category: 'asset' },
  { code: '400', name: 'Handelsdebiteuren', parentCode: '40', level: 2, type: 'balance', category: 'asset' },
  { code: '401', name: 'Te innen wissels', parentCode: '40', level: 2, type: 'balance', category: 'asset' },
  { code: '404', name: 'Te innen opbrengsten', parentCode: '40', level: 2, type: 'balance', category: 'asset' },
  { code: '406', name: 'Vooruitbetalingen', parentCode: '40', level: 2, type: 'balance', category: 'asset' },
  { code: '407', name: 'Dubieuze debiteuren', parentCode: '40', level: 2, type: 'balance', category: 'asset' },
  { code: '409', name: 'Geboekte waardeverminderingen (–)', parentCode: '40', level: 2, type: 'balance', category: 'asset' },
  { code: '41', name: 'Overige vorderingen', parentCode: '4', level: 1, type: 'balance', category: 'asset' },
  { code: '410', name: 'Opgevraagd niet gestort kapitaal/inbreng', parentCode: '41', level: 2, type: 'balance', category: 'asset' },
  { code: '411', name: 'Terug te vorderen btw', parentCode: '41', level: 2, type: 'balance', category: 'asset' },
  { code: '412', name: 'Terug te vorderen belastingen en voorheffingen', parentCode: '41', level: 2, type: 'balance', category: 'asset' },
  { code: '4120', name: 'Belgische winstbelastingen', parentCode: '412', level: 3, type: 'balance', category: 'asset' },
  { code: '4121', name: 'Belgische winstbelastingen', parentCode: '412', level: 3, type: 'balance', category: 'asset' },
  { code: '4122', name: 'Belgische winstbelastingen', parentCode: '412', level: 3, type: 'balance', category: 'asset' },
  { code: '4123', name: 'Belgische winstbelastingen', parentCode: '412', level: 3, type: 'balance', category: 'asset' },
  { code: '4124', name: 'Belgische winstbelastingen', parentCode: '412', level: 3, type: 'balance', category: 'asset' },
  { code: '4125', name: 'Andere Belgische belastingen', parentCode: '412', level: 3, type: 'balance', category: 'asset' },
  { code: '4126', name: 'Andere Belgische belastingen', parentCode: '412', level: 3, type: 'balance', category: 'asset' },
  { code: '4127', name: 'Andere Belgische belastingen', parentCode: '412', level: 3, type: 'balance', category: 'asset' },
  { code: '4128', name: 'Buitenlandse belastingen', parentCode: '412', level: 3, type: 'balance', category: 'asset' },
  { code: '414', name: 'Te innen opbrengsten', parentCode: '41', level: 2, type: 'balance', category: 'asset' },
  { code: '416', name: 'Diverse vorderingen', parentCode: '41', level: 2, type: 'balance', category: 'asset' },
  { code: '417', name: 'Dubieuze debiteuren', parentCode: '41', level: 2, type: 'balance', category: 'asset' },
  { code: '418', name: 'Borgtochten betaald in contanten', parentCode: '41', level: 2, type: 'balance', category: 'asset' },
  { code: '419', name: 'Geboekte waardeverminderingen (–)', parentCode: '41', level: 2, type: 'balance', category: 'asset' },
  { code: '42', name: 'Schulden op meer dan één jaar die binnen het jaar vervallen', parentCode: '4', level: 1, type: 'balance', category: 'liability' },
  { code: '43', name: 'Financiële schulden', parentCode: '4', level: 1, type: 'balance', category: 'liability' },
  { code: '430', name: 'Kredietinstellingen — leningen op rekening met vaste termijn', parentCode: '43', level: 2, type: 'balance', category: 'liability' },
  { code: '431', name: 'Promessen', parentCode: '43', level: 2, type: 'balance', category: 'liability' },
  { code: '432', name: 'Acceptkredieten', parentCode: '43', level: 2, type: 'balance', category: 'liability' },
  { code: '433', name: 'Schulden in rekening-courant', parentCode: '43', level: 2, type: 'balance', category: 'liability' },
  { code: '439', name: 'Overige leningen', parentCode: '43', level: 2, type: 'balance', category: 'liability' },
  { code: '44', name: 'Handelsschulden', parentCode: '4', level: 1, type: 'balance', category: 'liability' },
  { code: '440', name: 'Leveranciers', parentCode: '44', level: 2, type: 'balance', category: 'liability' },
  { code: '441', name: 'Te betalen wissels', parentCode: '44', level: 2, type: 'balance', category: 'liability' },
  { code: '444', name: 'Te ontvangen facturen', parentCode: '44', level: 2, type: 'balance', category: 'liability' },
  { code: '45', name: 'Belastingen, bezoldigingen en sociale lasten', parentCode: '4', level: 1, type: 'balance', category: 'liability' },
  { code: '450', name: 'Geraamde belastingschulden', parentCode: '45', level: 2, type: 'balance', category: 'liability' },
  { code: '4500', name: 'Belgische winstbelastingen', parentCode: '450', level: 3, type: 'balance', category: 'liability' },
  { code: '4501', name: 'Belgische winstbelastingen', parentCode: '450', level: 3, type: 'balance', category: 'liability' },
  { code: '4502', name: 'Belgische winstbelastingen', parentCode: '450', level: 3, type: 'balance', category: 'liability' },
  { code: '4503', name: 'Belgische winstbelastingen', parentCode: '450', level: 3, type: 'balance', category: 'liability' },
  { code: '4504', name: 'Belgische winstbelastingen', parentCode: '450', level: 3, type: 'balance', category: 'liability' },
  { code: '4505', name: 'Andere Belgische belastingen', parentCode: '450', level: 3, type: 'balance', category: 'liability' },
  { code: '4506', name: 'Andere Belgische belastingen', parentCode: '450', level: 3, type: 'balance', category: 'liability' },
  { code: '4507', name: 'Andere Belgische belastingen', parentCode: '450', level: 3, type: 'balance', category: 'liability' },
  { code: '4508', name: 'Buitenlandse belastingen', parentCode: '450', level: 3, type: 'balance', category: 'liability' },
  { code: '451', name: 'Te betalen btw', parentCode: '45', level: 2, type: 'balance', category: 'liability' },
  { code: '452', name: 'Te betalen belastingen en taksen', parentCode: '45', level: 2, type: 'balance', category: 'liability' },
  { code: '4520', name: 'Belgische winstbelastingen', parentCode: '452', level: 3, type: 'balance', category: 'liability' },
  { code: '4521', name: 'Belgische winstbelastingen', parentCode: '452', level: 3, type: 'balance', category: 'liability' },
  { code: '4522', name: 'Belgische winstbelastingen', parentCode: '452', level: 3, type: 'balance', category: 'liability' },
  { code: '4523', name: 'Belgische winstbelastingen', parentCode: '452', level: 3, type: 'balance', category: 'liability' },
  { code: '4524', name: 'Belgische winstbelastingen', parentCode: '452', level: 3, type: 'balance', category: 'liability' },
  { code: '4525', name: 'Andere Belgische belastingen', parentCode: '452', level: 3, type: 'balance', category: 'liability' },
  { code: '4526', name: 'Andere Belgische belastingen', parentCode: '452', level: 3, type: 'balance', category: 'liability' },
  { code: '4527', name: 'Andere Belgische belastingen', parentCode: '452', level: 3, type: 'balance', category: 'liability' },
  { code: '4528', name: 'Buitenlandse belastingen', parentCode: '452', level: 3, type: 'balance', category: 'liability' },
  { code: '453', name: 'Ingehouden voorheffingen', parentCode: '45', level: 2, type: 'balance', category: 'liability' },
  { code: '454', name: 'RSZ', parentCode: '45', level: 2, type: 'balance', category: 'liability' },
  { code: '455', name: 'Bezoldigingen', parentCode: '45', level: 2, type: 'balance', category: 'liability' },
  { code: '456', name: 'Vakantiegeld', parentCode: '45', level: 2, type: 'balance', category: 'liability' },
  { code: '459', name: 'Andere sociale schulden', parentCode: '45', level: 2, type: 'balance', category: 'liability' },
  { code: '46', name: 'Vooruitbetalingen op bestellingen', parentCode: '4', level: 1, type: 'balance', category: 'liability' },
  { code: '47', name: 'Schulden uit de bestemming van het resultaat', parentCode: '4', level: 1, type: 'balance', category: 'liability' },
  { code: '470', name: 'Dividenden en tantièmes vorige boekjaren', parentCode: '47', level: 2, type: 'balance', category: 'liability' },
  { code: '471', name: 'Dividenden boekjaar', parentCode: '47', level: 2, type: 'balance', category: 'liability' },
  { code: '472', name: 'Tantièmes boekjaar', parentCode: '47', level: 2, type: 'balance', category: 'liability' },
  { code: '473', name: 'Andere rechthebbenden', parentCode: '47', level: 2, type: 'balance', category: 'liability' },
  { code: '48', name: 'Diverse schulden', parentCode: '4', level: 1, type: 'balance', category: 'liability' },
  { code: '480', name: 'Vervallen obligaties en coupons', parentCode: '48', level: 2, type: 'balance', category: 'liability' },
  { code: '488', name: 'Borgtochten ontvangen in contanten', parentCode: '48', level: 2, type: 'balance', category: 'liability' },
  { code: '489', name: 'Andere diverse schulden', parentCode: '48', level: 2, type: 'balance', category: 'liability' },
  { code: '49', name: 'Overlopende rekeningen', parentCode: '4', level: 1, type: 'balance', category: 'liability' },
  { code: '490', name: 'Over te dragen kosten', parentCode: '49', level: 2, type: 'balance', category: 'liability' },
  { code: '491', name: 'Verkregen opbrengsten', parentCode: '49', level: 2, type: 'balance', category: 'liability' },
  { code: '492', name: 'Toe te rekenen kosten', parentCode: '49', level: 2, type: 'balance', category: 'liability' },
  { code: '493', name: 'Over te dragen opbrengsten', parentCode: '49', level: 2, type: 'balance', category: 'liability' },
  { code: '499', name: 'Wachtrekeningen', parentCode: '49', level: 2, type: 'balance', category: 'liability' },

  // Klasse 5: Geldbeleggingen en liquide middelen
  { code: '5', name: 'Geldbeleggingen en liquide middelen', level: 0, type: 'balance', category: 'asset' },
  { code: '50', name: 'Eigen aandelen', parentCode: '5', level: 1, type: 'balance', category: 'asset' },
  { code: '51', name: 'Aandelen en geldbeleggingen (niet-vastrentend)', parentCode: '5', level: 1, type: 'balance', category: 'asset' },
  { code: '510', name: 'Aanschaffingswaarde', parentCode: '51', level: 2, type: 'balance', category: 'asset' },
  { code: '5100', name: 'Aandelen', parentCode: '510', level: 3, type: 'balance', category: 'asset' },
  { code: '5101', name: 'Geldbeleggingen andere dan vastrentende', parentCode: '510', level: 3, type: 'balance', category: 'asset' },
  { code: '511', name: 'Niet-opgevraagde bedragen (–)', parentCode: '51', level: 2, type: 'balance', category: 'asset' },
  { code: '5110', name: 'Aandelen', parentCode: '511', level: 3, type: 'balance', category: 'asset' },
  { code: '519', name: 'Waardeverminderingen (–)', parentCode: '51', level: 2, type: 'balance', category: 'asset' },
  { code: '5190', name: 'Aandelen', parentCode: '519', level: 3, type: 'balance', category: 'asset' },
  { code: '5191', name: 'Overige beleggingen', parentCode: '519', level: 3, type: 'balance', category: 'asset' },
  { code: '52', name: 'Vastrentende effecten', parentCode: '5', level: 1, type: 'balance', category: 'asset' },
  { code: '520', name: 'Aanschaffingswaarde', parentCode: '52', level: 2, type: 'balance', category: 'asset' },
  { code: '529', name: 'Waardeverminderingen (–)', parentCode: '52', level: 2, type: 'balance', category: 'asset' },
  { code: '53', name: 'Termijndeposito\'s', parentCode: '5', level: 1, type: 'balance', category: 'asset' },
  { code: '530', name: '> 1 jaar', parentCode: '53', level: 2, type: 'balance', category: 'asset' },
  { code: '531', name: '> 1 maand — ≤ 1 jaar', parentCode: '53', level: 2, type: 'balance', category: 'asset' },
  { code: '532', name: '≤ 1 maand', parentCode: '53', level: 2, type: 'balance', category: 'asset' },
  { code: '539', name: 'Waardeverminderingen (–)', parentCode: '53', level: 2, type: 'balance', category: 'asset' },
  { code: '54', name: 'Te incasseren vervallen waarden', parentCode: '5', level: 1, type: 'balance', category: 'asset' },
  { code: '55', name: 'Kredietinstellingen', parentCode: '5', level: 1, type: 'balance', category: 'asset' },
  { code: '550', name: 'Rekening-courant', parentCode: '55', level: 2, type: 'balance', category: 'asset' },
  { code: '551', name: 'Uitgeschreven cheques (–)', parentCode: '55', level: 2, type: 'balance', category: 'asset' },
  { code: '559', name: 'Waardeverminderingen (–)', parentCode: '55', level: 2, type: 'balance', category: 'asset' },
  { code: '57', name: 'Kassen', parentCode: '5', level: 1, type: 'balance', category: 'asset' },
  { code: '570', name: 'Kassen-contanten', parentCode: '57', level: 2, type: 'balance', category: 'asset' },
  { code: '571', name: 'Kassen-contanten', parentCode: '57', level: 2, type: 'balance', category: 'asset' },
  { code: '572', name: 'Kassen-contanten', parentCode: '57', level: 2, type: 'balance', category: 'asset' },
  { code: '573', name: 'Kassen-contanten', parentCode: '57', level: 2, type: 'balance', category: 'asset' },
  { code: '574', name: 'Kassen-contanten', parentCode: '57', level: 2, type: 'balance', category: 'asset' },
  { code: '575', name: 'Kassen-contanten', parentCode: '57', level: 2, type: 'balance', category: 'asset' },
  { code: '576', name: 'Kassen-contanten', parentCode: '57', level: 2, type: 'balance', category: 'asset' },
  { code: '577', name: 'Kassen-contanten', parentCode: '57', level: 2, type: 'balance', category: 'asset' },
  { code: '578', name: 'Kassen-zegels', parentCode: '57', level: 2, type: 'balance', category: 'asset' },
  { code: '58', name: 'Interne overboekingen', parentCode: '5', level: 1, type: 'balance', category: 'asset' },
];

// Resultatenrekening accounts volgens MAR (klassen 60-79) - tot 3-cijferig niveau
export const BE_GAAP_INCOME_ACCOUNTS: BE_GAAP_ACCOUNT[] = [
  // Klasse 6: Kosten
  { code: '6', name: 'Kosten', level: 0, type: 'income', category: 'expense' },
  
  // 60 Handelsgoederen, grond- en hulpstoffen
  { code: '60', name: 'Handelsgoederen, grond- en hulpstoffen', parentCode: '6', level: 1, type: 'income', category: 'expense' },
  { code: '600', name: 'Aankopen van grondstoffen', parentCode: '60', level: 2, type: 'income', category: 'expense' },
  { code: '601', name: 'Aankopen van hulpstoffen', parentCode: '60', level: 2, type: 'income', category: 'expense' },
  { code: '602', name: 'Aankopen van diensten, werk en studies', parentCode: '60', level: 2, type: 'income', category: 'expense' },
  { code: '603', name: 'Algemene onderaannemingen', parentCode: '60', level: 2, type: 'income', category: 'expense' },
  { code: '604', name: 'Aankopen van handelsgoederen', parentCode: '60', level: 2, type: 'income', category: 'expense' },
  { code: '605', name: 'Aankopen van onroerende goederen bestemd voor verkoop', parentCode: '60', level: 2, type: 'income', category: 'expense' },
  { code: '608', name: 'Ontvangen kortingen, ristorno\'s en rabatten (–)', parentCode: '60', level: 2, type: 'income', category: 'expense' },
  { code: '609', name: 'Voorraadwijzigingen', parentCode: '60', level: 2, type: 'income', category: 'expense' },
  { code: '6090', name: 'Voorraadwijzigingen van grondstoffen', parentCode: '609', level: 3, type: 'income', category: 'expense' },
  { code: '6091', name: 'Voorraadwijzigingen van hulpstoffen', parentCode: '609', level: 3, type: 'income', category: 'expense' },
  { code: '6094', name: 'Voorraadwijzigingen van handelsgoederen', parentCode: '609', level: 3, type: 'income', category: 'expense' },
  { code: '6095', name: 'Voorraadwijzigingen van gekochte onroerende goederen bestemd voor verkoop', parentCode: '609', level: 3, type: 'income', category: 'expense' },
  
  // 61 Diensten en diverse goederen
  { code: '61', name: 'Diensten en diverse goederen', parentCode: '6', level: 1, type: 'income', category: 'expense' },
  { code: '617', name: 'Uitzendkrachten en ter beschikking gestelde personen', parentCode: '61', level: 2, type: 'income', category: 'expense' },
  { code: '618', name: 'Bezoldigingen, verzekeringen, pensioenen bestuurders/zaakvoerders/werkende vennoten (niet via arbeidsovereenkomst)', parentCode: '61', level: 2, type: 'income', category: 'expense' },
  
  // 62 Bezoldigingen, sociale lasten en pensioenen
  { code: '62', name: 'Bezoldigingen, sociale lasten en pensioenen', parentCode: '6', level: 1, type: 'income', category: 'expense' },
  { code: '620', name: 'Bezoldigingen en rechtstreekse sociale voordelen', parentCode: '62', level: 2, type: 'income', category: 'expense' },
  { code: '6200', name: 'Bezoldigingen bestuurders of zaakvoerders', parentCode: '620', level: 3, type: 'income', category: 'expense' },
  { code: '6201', name: 'Bezoldigingen directiepersoneel', parentCode: '620', level: 3, type: 'income', category: 'expense' },
  { code: '6202', name: 'Bezoldigingen bedienden', parentCode: '620', level: 3, type: 'income', category: 'expense' },
  { code: '6203', name: 'Bezoldigingen arbeiders', parentCode: '620', level: 3, type: 'income', category: 'expense' },
  { code: '6204', name: 'Bezoldigingen andere personeelsleden', parentCode: '620', level: 3, type: 'income', category: 'expense' },
  { code: '621', name: 'Werkgeversbijdragen voor sociale verzekeringen', parentCode: '62', level: 2, type: 'income', category: 'expense' },
  { code: '622', name: 'Werkgeverspremies bovenwettelijke verzekeringen', parentCode: '62', level: 2, type: 'income', category: 'expense' },
  { code: '623', name: 'Andere personeelskosten', parentCode: '62', level: 2, type: 'income', category: 'expense' },
  { code: '624', name: 'Ouderdoms- en overlevingspensioenen', parentCode: '62', level: 2, type: 'income', category: 'expense' },
  { code: '6240', name: 'Ouderdoms- en overlevingspensioenen bestuurders of zaakvoerders', parentCode: '624', level: 3, type: 'income', category: 'expense' },
  { code: '6241', name: 'Ouderdoms- en overlevingspensioenen personeel', parentCode: '624', level: 3, type: 'income', category: 'expense' },
  
  // 63 Afschrijvingen, waardeverminderingen en voorzieningen
  { code: '63', name: 'Afschrijvingen, waardeverminderingen en voorzieningen', parentCode: '6', level: 1, type: 'income', category: 'expense' },
  { code: '630', name: 'Afschrijvingen en waardeverminderingen op vaste activa — toevoeging', parentCode: '63', level: 2, type: 'income', category: 'expense' },
  { code: '6300', name: 'Afschrijvingen oprichtingskosten', parentCode: '630', level: 3, type: 'income', category: 'expense' },
  { code: '6301', name: 'Afschrijvingen immateriële vaste activa', parentCode: '630', level: 3, type: 'income', category: 'expense' },
  { code: '6302', name: 'Afschrijvingen materiële vaste activa', parentCode: '630', level: 3, type: 'income', category: 'expense' },
  { code: '6308', name: 'Waardeverminderingen op immateriële vaste activa', parentCode: '630', level: 3, type: 'income', category: 'expense' },
  { code: '6309', name: 'Waardeverminderingen op materiële vaste activa', parentCode: '630', level: 3, type: 'income', category: 'expense' },
  { code: '631', name: 'Waardeverminderingen op voorraden', parentCode: '63', level: 2, type: 'income', category: 'expense' },
  { code: '6310', name: 'Waardeverminderingen op voorraden — toevoeging', parentCode: '631', level: 3, type: 'income', category: 'expense' },
  { code: '6311', name: 'Waardeverminderingen op voorraden — terugneming (–)', parentCode: '631', level: 3, type: 'income', category: 'expense' },
  { code: '632', name: 'Waardeverminderingen op bestellingen in uitvoering', parentCode: '63', level: 2, type: 'income', category: 'expense' },
  { code: '6320', name: 'Waardeverminderingen op bestellingen in uitvoering — toevoeging', parentCode: '632', level: 3, type: 'income', category: 'expense' },
  { code: '6321', name: 'Waardeverminderingen op bestellingen in uitvoering — terugneming (–)', parentCode: '632', level: 3, type: 'income', category: 'expense' },
  { code: '633', name: 'Waardeverminderingen op handelsvorderingen > 1 jaar', parentCode: '63', level: 2, type: 'income', category: 'expense' },
  { code: '6330', name: 'Waardeverminderingen op handelsvorderingen > 1 jaar — toevoeging', parentCode: '633', level: 3, type: 'income', category: 'expense' },
  { code: '6331', name: 'Waardeverminderingen op handelsvorderingen > 1 jaar — terugneming (–)', parentCode: '633', level: 3, type: 'income', category: 'expense' },
  { code: '634', name: 'Waardeverminderingen op handelsvorderingen ≤ 1 jaar', parentCode: '63', level: 2, type: 'income', category: 'expense' },
  { code: '6340', name: 'Waardeverminderingen op handelsvorderingen ≤ 1 jaar — toevoeging', parentCode: '634', level: 3, type: 'income', category: 'expense' },
  { code: '6341', name: 'Waardeverminderingen op handelsvorderingen ≤ 1 jaar — terugneming (–)', parentCode: '634', level: 3, type: 'income', category: 'expense' },
  { code: '635', name: 'Voorzieningen voor pensioenen en soortgelijke verplichtingen', parentCode: '63', level: 2, type: 'income', category: 'expense' },
  { code: '6350', name: 'Voorzieningen voor pensioenen — toevoeging', parentCode: '635', level: 3, type: 'income', category: 'expense' },
  { code: '6351', name: 'Voorzieningen voor pensioenen — besteding en terugneming (–)', parentCode: '635', level: 3, type: 'income', category: 'expense' },
  { code: '636', name: 'Voorzieningen voor grote herstellings- en onderhoudswerken', parentCode: '63', level: 2, type: 'income', category: 'expense' },
  { code: '6360', name: 'Voorzieningen grote herstellings- en onderhoudswerken — toevoeging', parentCode: '636', level: 3, type: 'income', category: 'expense' },
  { code: '6361', name: 'Voorzieningen grote herstellings- en onderhoudswerken — besteding en terugneming (–)', parentCode: '636', level: 3, type: 'income', category: 'expense' },
  { code: '637', name: 'Voorzieningen voor milieuverplichtingen', parentCode: '63', level: 2, type: 'income', category: 'expense' },
  { code: '6370', name: 'Voorzieningen voor milieuverplichtingen — toevoeging', parentCode: '637', level: 3, type: 'income', category: 'expense' },
  { code: '6371', name: 'Voorzieningen voor milieuverplichtingen — besteding en terugneming (–)', parentCode: '637', level: 3, type: 'income', category: 'expense' },
  { code: '638', name: 'Voorzieningen voor andere risico\'s en kosten', parentCode: '63', level: 2, type: 'income', category: 'expense' },
  { code: '6380', name: 'Voorzieningen voor andere risico\'s en kosten — toevoeging', parentCode: '638', level: 3, type: 'income', category: 'expense' },
  { code: '6381', name: 'Voorzieningen voor andere risico\'s en kosten — besteding en terugneming (–)', parentCode: '638', level: 3, type: 'income', category: 'expense' },
  
  // 64 Andere bedrijfskosten
  { code: '64', name: 'Andere bedrijfskosten', parentCode: '6', level: 1, type: 'income', category: 'expense' },
  { code: '640', name: 'Bedrijfsbelastingen', parentCode: '64', level: 2, type: 'income', category: 'expense' },
  { code: '641', name: 'Minderwaarden op de courante realisatie van vaste activa', parentCode: '64', level: 2, type: 'income', category: 'expense' },
  { code: '642', name: 'Minderwaarden op de realisatie van handelsvorderingen', parentCode: '64', level: 2, type: 'income', category: 'expense' },
  { code: '643', name: 'Diverse bedrijfskosten', parentCode: '64', level: 2, type: 'income', category: 'expense' },
  { code: '644', name: 'Diverse bedrijfskosten', parentCode: '64', level: 2, type: 'income', category: 'expense' },
  { code: '645', name: 'Diverse bedrijfskosten', parentCode: '64', level: 2, type: 'income', category: 'expense' },
  { code: '646', name: 'Diverse bedrijfskosten', parentCode: '64', level: 2, type: 'income', category: 'expense' },
  { code: '647', name: 'Diverse bedrijfskosten', parentCode: '64', level: 2, type: 'income', category: 'expense' },
  { code: '648', name: 'Diverse bedrijfskosten', parentCode: '64', level: 2, type: 'income', category: 'expense' },
  { code: '649', name: 'Als herstructureringskosten geactiveerde bedrijfskosten (–)', parentCode: '64', level: 2, type: 'income', category: 'expense' },
  
  // 65 Financiële kosten
  { code: '65', name: 'Financiële kosten', parentCode: '6', level: 1, type: 'income', category: 'expense' },
  { code: '650', name: 'Kosten van schulden', parentCode: '65', level: 2, type: 'income', category: 'expense' },
  { code: '6500', name: 'Kosten van schulden — rente, commissies, kosten', parentCode: '650', level: 3, type: 'income', category: 'expense' },
  { code: '6501', name: 'Afschrijving kosten uitgifte leningen', parentCode: '650', level: 3, type: 'income', category: 'expense' },
  { code: '6502', name: 'Geactiveerde intercalaire interesten (–)', parentCode: '650', level: 3, type: 'income', category: 'expense' },
  { code: '651', name: 'Waardeverminderingen op vlottende activa', parentCode: '65', level: 2, type: 'income', category: 'expense' },
  { code: '6510', name: 'Waardeverminderingen op vlottende activa — toevoeging', parentCode: '651', level: 3, type: 'income', category: 'expense' },
  { code: '6511', name: 'Waardeverminderingen op vlottende activa — terugneming (–)', parentCode: '651', level: 3, type: 'income', category: 'expense' },
  { code: '652', name: 'Minderwaarden realisatie vlottende activa', parentCode: '65', level: 2, type: 'income', category: 'expense' },
  { code: '653', name: 'Discontokosten', parentCode: '65', level: 2, type: 'income', category: 'expense' },
  { code: '654', name: 'Wisselresultaten', parentCode: '65', level: 2, type: 'income', category: 'expense' },
  { code: '655', name: 'Resultaten uit omrekening vreemde valuta', parentCode: '65', level: 2, type: 'income', category: 'expense' },
  { code: '656', name: 'Voorzieningen met financieel karakter', parentCode: '65', level: 2, type: 'income', category: 'expense' },
  { code: '6560', name: 'Voorzieningen met financieel karakter — toevoegingen', parentCode: '656', level: 3, type: 'income', category: 'expense' },
  { code: '6561', name: 'Voorzieningen met financieel karakter — bestedingen en terugnemingen (–)', parentCode: '656', level: 3, type: 'income', category: 'expense' },
  { code: '657', name: 'Diverse financiële kosten', parentCode: '65', level: 2, type: 'income', category: 'expense' },
  { code: '658', name: 'Diverse financiële kosten', parentCode: '65', level: 2, type: 'income', category: 'expense' },
  { code: '659', name: 'Herstructureringskosten geactiveerde financiële kosten (–)', parentCode: '65', level: 2, type: 'income', category: 'expense' },
  
  // 66 Niet-recurrente bedrijfs- of financiële kosten
  { code: '66', name: 'Niet-recurrente bedrijfs- of financiële kosten', parentCode: '6', level: 1, type: 'income', category: 'expense' },
  { code: '660', name: 'Niet-recurrente afschrijvingen en waardeverminderingen', parentCode: '66', level: 2, type: 'income', category: 'expense' },
  { code: '6600', name: 'Niet-recurrente afschrijvingen oprichtingskosten', parentCode: '660', level: 3, type: 'income', category: 'expense' },
  { code: '6601', name: 'Niet-recurrente afschrijvingen immateriële vaste activa', parentCode: '660', level: 3, type: 'income', category: 'expense' },
  { code: '6602', name: 'Niet-recurrente afschrijvingen materiële vaste activa', parentCode: '660', level: 3, type: 'income', category: 'expense' },
  { code: '661', name: 'Waardeverminderingen op financiële vaste activa', parentCode: '66', level: 2, type: 'income', category: 'expense' },
  { code: '662', name: 'Voorzieningen niet-recurrente risico\'s en kosten', parentCode: '66', level: 2, type: 'income', category: 'expense' },
  { code: '6620', name: 'Voorzieningen bedrijfsrisico\'s en -kosten', parentCode: '662', level: 3, type: 'income', category: 'expense' },
  { code: '66200', name: 'Voorzieningen bedrijfsrisico\'s — toevoeging', parentCode: '6620', level: 4, type: 'income', category: 'expense' },
  { code: '66201', name: 'Voorzieningen bedrijfsrisico\'s — besteding (–)', parentCode: '6620', level: 4, type: 'income', category: 'expense' },
  { code: '6621', name: 'Voorzieningen financiële risico\'s en -kosten', parentCode: '662', level: 3, type: 'income', category: 'expense' },
  { code: '66210', name: 'Voorzieningen financiële risico\'s — toevoeging', parentCode: '6621', level: 4, type: 'income', category: 'expense' },
  { code: '66211', name: 'Voorzieningen financiële risico\'s — besteding (–)', parentCode: '6621', level: 4, type: 'income', category: 'expense' },
  { code: '663', name: 'Minderwaarden realisatie vaste activa', parentCode: '66', level: 2, type: 'income', category: 'expense' },
  { code: '6630', name: 'Minderwaarden realisatie immateriële en materiële vaste activa', parentCode: '663', level: 3, type: 'income', category: 'expense' },
  { code: '6631', name: 'Minderwaarden realisatie immateriële en materiële vaste activa', parentCode: '663', level: 3, type: 'income', category: 'expense' },
  { code: '664', name: 'Andere niet-recurrente bedrijfskosten', parentCode: '66', level: 2, type: 'income', category: 'expense' },
  { code: '665', name: 'Andere niet-recurrente bedrijfskosten', parentCode: '66', level: 2, type: 'income', category: 'expense' },
  { code: '666', name: 'Andere niet-recurrente bedrijfskosten', parentCode: '66', level: 2, type: 'income', category: 'expense' },
  { code: '667', name: 'Andere niet-recurrente bedrijfskosten', parentCode: '66', level: 2, type: 'income', category: 'expense' },
  { code: '668', name: 'Andere niet-recurrente financiële kosten', parentCode: '66', level: 2, type: 'income', category: 'expense' },
  { code: '6690', name: 'Geactiveerde niet-recurrente kosten (–)', parentCode: '66', level: 2, type: 'income', category: 'expense' },
  { code: '6691', name: 'Geactiveerde niet-recurrente kosten (–)', parentCode: '66', level: 2, type: 'income', category: 'expense' },
  
  // 67 Belastingen op het resultaat
  { code: '67', name: 'Belastingen op het resultaat', parentCode: '6', level: 1, type: 'income', category: 'expense' },
  { code: '670', name: 'Belgische belastingen — huidig boekjaar', parentCode: '67', level: 2, type: 'income', category: 'expense' },
  { code: '6700', name: 'Belgische belastingen — verschuldigde belastingen / voorheffingen', parentCode: '670', level: 3, type: 'income', category: 'expense' },
  { code: '6701', name: 'Belgische belastingen — geactiveerde overschotten (–)', parentCode: '670', level: 3, type: 'income', category: 'expense' },
  { code: '6702', name: 'Belgische belastingen — geraamde belastingen', parentCode: '670', level: 3, type: 'income', category: 'expense' },
  { code: '671', name: 'Belgische belastingen — vorige jaren', parentCode: '67', level: 2, type: 'income', category: 'expense' },
  { code: '6710', name: 'Belgische belastingen — verschuldigde supplementen', parentCode: '671', level: 3, type: 'income', category: 'expense' },
  { code: '6711', name: 'Belgische belastingen — geraamde supplementen', parentCode: '671', level: 3, type: 'income', category: 'expense' },
  { code: '6712', name: 'Belgische belastingen — fiscale voorzieningen', parentCode: '671', level: 3, type: 'income', category: 'expense' },
  { code: '672', name: 'Buitenlandse belastingen — huidig boekjaar', parentCode: '67', level: 2, type: 'income', category: 'expense' },
  { code: '673', name: 'Buitenlandse belastingen — vorige jaren', parentCode: '67', level: 2, type: 'income', category: 'expense' },
  
  // 68 Overboeking naar de uitgestelde belastingen en belastingvrije reserves
  { code: '68', name: 'Overboeking naar de uitgestelde belastingen en belastingvrije reserves', parentCode: '6', level: 1, type: 'income', category: 'expense' },
  { code: '680', name: 'Overboeking naar uitgestelde belastingen', parentCode: '68', level: 2, type: 'income', category: 'expense' },
  { code: '689', name: 'Overboeking naar belastingvrije reserves', parentCode: '68', level: 2, type: 'income', category: 'expense' },
  
  // 69 Resultatenverwerking
  { code: '69', name: 'Resultatenverwerking', parentCode: '6', level: 1, type: 'income', category: 'expense' },
  { code: '690', name: 'Overgedragen verlies vorig boekjaar', parentCode: '69', level: 2, type: 'income', category: 'expense' },
  { code: '691', name: 'Toevoeging aan de inbreng', parentCode: '69', level: 2, type: 'income', category: 'expense' },
  { code: '692', name: 'Toevoeging aan de reserves', parentCode: '69', level: 2, type: 'income', category: 'expense' },
  { code: '6920', name: 'Toevoeging aan de wettelijke reserve', parentCode: '692', level: 3, type: 'income', category: 'expense' },
  { code: '6921', name: 'Toevoeging aan de overige reserves', parentCode: '692', level: 3, type: 'income', category: 'expense' },
  { code: '693', name: 'Over te dragen winst', parentCode: '69', level: 2, type: 'income', category: 'expense' },
  { code: '694', name: 'Vergoeding van de inbreng', parentCode: '69', level: 2, type: 'income', category: 'expense' },
  { code: '695', name: 'Bestuurders of zaakvoerders', parentCode: '69', level: 2, type: 'income', category: 'expense' },
  { code: '696', name: 'Werknemers', parentCode: '69', level: 2, type: 'income', category: 'expense' },
  { code: '697', name: 'Andere rechthebbenden', parentCode: '69', level: 2, type: 'income', category: 'expense' },

  // Klasse 7: Opbrengsten
  { code: '7', name: 'Opbrengsten', level: 0, type: 'income', category: 'revenue' },
  
  // 70 Omzet
  { code: '70', name: 'Omzet', parentCode: '7', level: 1, type: 'income', category: 'revenue' },
  { code: '700', name: 'Verkopen en dienstprestaties', parentCode: '70', level: 2, type: 'income', category: 'revenue' },
  { code: '701', name: 'Verkopen en dienstprestaties', parentCode: '70', level: 2, type: 'income', category: 'revenue' },
  { code: '702', name: 'Verkopen en dienstprestaties', parentCode: '70', level: 2, type: 'income', category: 'revenue' },
  { code: '703', name: 'Verkopen en dienstprestaties', parentCode: '70', level: 2, type: 'income', category: 'revenue' },
  { code: '704', name: 'Verkopen en dienstprestaties', parentCode: '70', level: 2, type: 'income', category: 'revenue' },
  { code: '705', name: 'Verkopen en dienstprestaties', parentCode: '70', level: 2, type: 'income', category: 'revenue' },
  { code: '706', name: 'Verkopen en dienstprestaties', parentCode: '70', level: 2, type: 'income', category: 'revenue' },
  { code: '707', name: 'Verkopen en dienstprestaties', parentCode: '70', level: 2, type: 'income', category: 'revenue' },
  { code: '708', name: 'Toegekende kortingen, ristorno\'s, rabatten (–)', parentCode: '70', level: 2, type: 'income', category: 'revenue' },
  
  // 71 Wijzigingen in de voorraden en bestellingen in uitvoering
  { code: '71', name: 'Wijzigingen in de voorraden en bestellingen in uitvoering', parentCode: '7', level: 1, type: 'income', category: 'revenue' },
  { code: '712', name: 'Voorraad goederen in bewerking', parentCode: '71', level: 2, type: 'income', category: 'revenue' },
  { code: '713', name: 'Voorraad gereed product', parentCode: '71', level: 2, type: 'income', category: 'revenue' },
  { code: '715', name: 'Voorraad onroerende goederen bestemd voor verkoop', parentCode: '71', level: 2, type: 'income', category: 'revenue' },
  { code: '717', name: 'Bestellingen in uitvoering', parentCode: '71', level: 2, type: 'income', category: 'revenue' },
  { code: '7170', name: 'Bestellingen in uitvoering — aanschaffingswaarde', parentCode: '717', level: 3, type: 'income', category: 'revenue' },
  { code: '7171', name: 'Bestellingen in uitvoering — toegerekende winst', parentCode: '717', level: 3, type: 'income', category: 'revenue' },
  
  // 72 Geproduceerde vaste activa
  { code: '72', name: 'Geproduceerde vaste activa', parentCode: '7', level: 1, type: 'income', category: 'revenue' },
  
  // 74 Andere bedrijfsopbrengsten
  { code: '74', name: 'Andere bedrijfsopbrengsten', parentCode: '7', level: 1, type: 'income', category: 'revenue' },
  { code: '740', name: 'Bedrijfssubsidies en compenserende bedragen', parentCode: '74', level: 2, type: 'income', category: 'revenue' },
  { code: '741', name: 'Meerwaarden realisatie materiële vaste activa', parentCode: '74', level: 2, type: 'income', category: 'revenue' },
  { code: '742', name: 'Meerwaarden realisatie handelsvorderingen', parentCode: '74', level: 2, type: 'income', category: 'revenue' },
  { code: '743', name: 'Diverse bedrijfsopbrengsten', parentCode: '74', level: 2, type: 'income', category: 'revenue' },
  { code: '744', name: 'Diverse bedrijfsopbrengsten', parentCode: '74', level: 2, type: 'income', category: 'revenue' },
  { code: '745', name: 'Diverse bedrijfsopbrengsten', parentCode: '74', level: 2, type: 'income', category: 'revenue' },
  { code: '746', name: 'Diverse bedrijfsopbrengsten', parentCode: '74', level: 2, type: 'income', category: 'revenue' },
  { code: '747', name: 'Diverse bedrijfsopbrengsten', parentCode: '74', level: 2, type: 'income', category: 'revenue' },
  { code: '748', name: 'Diverse bedrijfsopbrengsten', parentCode: '74', level: 2, type: 'income', category: 'revenue' },
  { code: '749', name: 'Diverse bedrijfsopbrengsten', parentCode: '74', level: 2, type: 'income', category: 'revenue' },
  
  // 75 Financiële opbrengsten
  { code: '75', name: 'Financiële opbrengsten', parentCode: '7', level: 1, type: 'income', category: 'revenue' },
  { code: '750', name: 'Opbrengsten uit financiële vaste activa', parentCode: '75', level: 2, type: 'income', category: 'revenue' },
  { code: '751', name: 'Opbrengsten uit vlottende activa', parentCode: '75', level: 2, type: 'income', category: 'revenue' },
  { code: '752', name: 'Meerwaarden realisatie vlottende activa', parentCode: '75', level: 2, type: 'income', category: 'revenue' },
  { code: '753', name: 'Kapitaal- en interestsubsidies', parentCode: '75', level: 2, type: 'income', category: 'revenue' },
  { code: '754', name: 'Wisselresultaten', parentCode: '75', level: 2, type: 'income', category: 'revenue' },
  { code: '755', name: 'Resultaten uit omrekening vreemde valuta', parentCode: '75', level: 2, type: 'income', category: 'revenue' },
  { code: '756', name: 'Diverse financiële opbrengsten', parentCode: '75', level: 2, type: 'income', category: 'revenue' },
  { code: '757', name: 'Diverse financiële opbrengsten', parentCode: '75', level: 2, type: 'income', category: 'revenue' },
  { code: '758', name: 'Diverse financiële opbrengsten', parentCode: '75', level: 2, type: 'income', category: 'revenue' },
  { code: '759', name: 'Diverse financiële opbrengsten', parentCode: '75', level: 2, type: 'income', category: 'revenue' },
  
  // 76 Niet-recurrente bedrijfs- of financiële opbrengsten
  { code: '76', name: 'Niet-recurrente bedrijfs- of financiële opbrengsten', parentCode: '7', level: 1, type: 'income', category: 'revenue' },
  { code: '760', name: 'Terugneming afschrijvingen en waardeverminderingen', parentCode: '76', level: 2, type: 'income', category: 'revenue' },
  { code: '7600', name: 'Terugneming afschrijvingen immateriële vaste activa', parentCode: '760', level: 3, type: 'income', category: 'revenue' },
  { code: '7601', name: 'Terugneming afschrijvingen materiële vaste activa', parentCode: '760', level: 3, type: 'income', category: 'revenue' },
  { code: '761', name: 'Terugneming waardeverminderingen financiële vaste activa', parentCode: '76', level: 2, type: 'income', category: 'revenue' },
  { code: '762', name: 'Terugneming voorzieningen niet-recurrente risico\'s en kosten', parentCode: '76', level: 2, type: 'income', category: 'revenue' },
  { code: '7620', name: 'Terugneming voorzieningen bedrijfsrisico\'s en -kosten', parentCode: '762', level: 3, type: 'income', category: 'revenue' },
  { code: '7621', name: 'Terugneming voorzieningen financiële risico\'s en -kosten', parentCode: '762', level: 3, type: 'income', category: 'revenue' },
  { code: '763', name: 'Meerwaarden realisatie vaste activa', parentCode: '76', level: 2, type: 'income', category: 'revenue' },
  { code: '7630', name: 'Meerwaarden realisatie immateriële en materiële vaste activa', parentCode: '763', level: 3, type: 'income', category: 'revenue' },
  { code: '7631', name: 'Meerwaarden realisatie financiële vaste activa', parentCode: '763', level: 3, type: 'income', category: 'revenue' },
  { code: '764', name: 'Andere niet-recurrente bedrijfsopbrengsten', parentCode: '76', level: 2, type: 'income', category: 'revenue' },
  { code: '765', name: 'Andere niet-recurrente bedrijfsopbrengsten', parentCode: '76', level: 2, type: 'income', category: 'revenue' },
  { code: '766', name: 'Andere niet-recurrente bedrijfsopbrengsten', parentCode: '76', level: 2, type: 'income', category: 'revenue' },
  { code: '767', name: 'Andere niet-recurrente bedrijfsopbrengsten', parentCode: '76', level: 2, type: 'income', category: 'revenue' },
  { code: '768', name: 'Andere niet-recurrente bedrijfsopbrengsten', parentCode: '76', level: 2, type: 'income', category: 'revenue' },
  { code: '769', name: 'Andere niet-recurrente financiële opbrengsten', parentCode: '76', level: 2, type: 'income', category: 'revenue' },
  
  // 77 Regularisering belastingen en terugneming fiscale voorzieningen
  { code: '77', name: 'Regularisering belastingen en terugneming fiscale voorzieningen', parentCode: '7', level: 1, type: 'income', category: 'revenue' },
  { code: '771', name: 'Belgische belastingen', parentCode: '77', level: 2, type: 'income', category: 'revenue' },
  { code: '7710', name: 'Belgische belastingen — regularisering betaalde belastingen', parentCode: '771', level: 3, type: 'income', category: 'revenue' },
  { code: '7711', name: 'Belgische belastingen — regularisering geraamde belastingen', parentCode: '771', level: 3, type: 'income', category: 'revenue' },
  { code: '7712', name: 'Belgische belastingen — terugneming fiscale voorzieningen', parentCode: '771', level: 3, type: 'income', category: 'revenue' },
  { code: '773', name: 'Buitenlandse belastingen', parentCode: '77', level: 2, type: 'income', category: 'revenue' },
  
  // 78 Onttrekkingen aan belastingvrije reserves en uitgestelde belastingen
  { code: '78', name: 'Onttrekkingen aan belastingvrije reserves en uitgestelde belastingen', parentCode: '7', level: 1, type: 'income', category: 'revenue' },
  { code: '780', name: 'Onttrekkingen aan uitgestelde belastingen', parentCode: '78', level: 2, type: 'income', category: 'revenue' },
  { code: '789', name: 'Onttrekkingen aan belastingvrije reserves', parentCode: '78', level: 2, type: 'income', category: 'revenue' },
  
  // 79 Resultaatverwerking
  { code: '79', name: 'Resultaatverwerking', parentCode: '7', level: 1, type: 'income', category: 'revenue' },
  { code: '790', name: 'Overgedragen winst vorig boekjaar', parentCode: '79', level: 2, type: 'income', category: 'revenue' },
  { code: '791', name: 'Onttrekking aan de inbreng', parentCode: '79', level: 2, type: 'income', category: 'revenue' },
  { code: '792', name: 'Onttrekking aan de reserves', parentCode: '79', level: 2, type: 'income', category: 'revenue' },
  { code: '793', name: 'Over te dragen verlies', parentCode: '79', level: 2, type: 'income', category: 'revenue' },
  { code: '794', name: 'Tussenkomst van vennoten/eigenaar in het verlies', parentCode: '79', level: 2, type: 'income', category: 'revenue' },
];

// Helper function to get all nested accounts for a given parent code
const getNestedAccounts = (accounts: BE_GAAP_ACCOUNT[], parentCode: string): BE_GAAP_ACCOUNT[] => {
  const result: BE_GAAP_ACCOUNT[] = [];
  const directChildren = accounts.filter(acc => acc.parentCode === parentCode);
  
  directChildren.forEach(child => {
    result.push(child);
    // Recursively get nested accounts
    const nested = getNestedAccounts(accounts, child.code);
    result.push(...nested);
  });
  
  return result;
};

// Helper functions
export const getBE_GAAPBalanceSheet = (): BE_GAAP_ACCOUNT_GROUP[] => {
  const accounts = BE_GAAP_BALANCE_ACCOUNTS.map(acc => ({ ...acc, amount: null }));
  
  // Group by main class (1-5, klasse 0 wordt niet getoond)
  const groups: BE_GAAP_ACCOUNT_GROUP[] = [];
  const mainClasses = ['1', '2', '3', '4', '5'];
  
  mainClasses.forEach(classCode => {
    const mainAccount = accounts.find(acc => acc.code === classCode);
    if (!mainAccount) return;
    
    // Get all nested accounts recursively
    const nestedAccounts = getNestedAccounts(accounts, classCode);
    const allAccounts = [mainAccount, ...nestedAccounts].map(acc => ({ ...acc, amount: null }));
    
    groups.push({
      code: classCode,
      name: mainAccount.name,
      accounts: allAccounts,
      total: null
    });
  });
  
  return groups;
};

export const getBE_GAAPIncomeStatement = (): BE_GAAP_ACCOUNT_GROUP[] => {
  const accounts = BE_GAAP_INCOME_ACCOUNTS.map(acc => ({ ...acc, amount: null }));
  
  // Group by sub-class (60-69 voor Kosten, 70-79 voor Opbrengsten)
  // Dit zijn de accordion items die getoond worden
  const groups: BE_GAAP_ACCOUNT_GROUP[] = [];
  const subClasses = ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '74', '75', '76', '77', '78', '79'];
  
  subClasses.forEach(classCode => {
    const classAccount = accounts.find(acc => acc.code === classCode);
    if (!classAccount) return;
    
    // Get all nested accounts recursively
    const nestedAccounts = getNestedAccounts(accounts, classCode);
    const allAccounts = [classAccount, ...nestedAccounts].map(acc => ({ ...acc, amount: null }));
    
    groups.push({
      code: classCode,
      name: classAccount.name,
      accounts: allAccounts,
      total: null
    });
  });
  
  return groups;
};


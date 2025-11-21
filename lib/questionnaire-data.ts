export type QuestionType = "text" | "number" | "select" | "radio" | "textarea" | "switch" | "multiselect";

export interface QuestionOption {
  label: string;
  value: string;
}

export interface ConditionalLogic {
  field: string;
  value: string | number | boolean;
  operator?: "equals" | "greaterThan" | "lessThan" | "notEquals";
}

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  placeholder?: string;
  helpText?: string;
  options?: QuestionOption[];
  required: boolean;
  conditionalOn?: ConditionalLogic[];
  section?: string;
}

export const QUESTIONNAIRE_STEPS = [
  "Algemene bedrijfscontext",
  "Personeel & werking",
  "Verloning & privébehoefte",
  "Activiteit & margestructuur",
  "Groei & fiscaal",
  "Financiële positie & boekhouddata",
  "Optioneel — verfijning",
  "Verwachtingen van de analyse",
  "Document upload",
  "Overzicht & bevestiging"
];

export const QUESTIONS_BY_STEP: { [key: number]: Question[] } = {
  1: [
    {
      id: "bedrijfsnaam",
      label: "Naam of pseudoniem van de onderneming",
      type: "text",
      placeholder: "Bijv. Tech Solutions BV",
      helpText: "De naam van uw bedrijf zoals u het graag gebruikt in de analyse",
      required: true,
      section: "Algemene bedrijfscontext"
    },
    {
      id: "sector",
      label: "Sector / Activiteitstype",
      type: "select",
      options: [
        { label: "Diensten", value: "diensten" },
        { label: "Handel", value: "handel" },
        { label: "Bouw", value: "bouw" },
        { label: "Horeca", value: "horeca" },
        { label: "Zorg", value: "zorg" },
        { label: "IT", value: "it" },
        { label: "Vrij beroep", value: "vrij_beroep" },
        { label: "Andere", value: "andere" }
      ],
      helpText: "Selecteer de sector waarin uw bedrijf actief is",
      required: true,
      section: "Algemene bedrijfscontext"
    },
    {
      id: "btw_stelsel",
      label: "BTW-stelsel",
      type: "radio",
      options: [
        { label: "Normaal", value: "Normaal" },
        { label: "Forfaitair", value: "forfaitair" },
        { label: "Vrijgesteld", value: "vrijgesteld" },
        { label: "Ik weet het niet", value: "ik_weet_het_niet" }
      ],
      helpText: "Geef aan onder welk BTW-stelsel uw bedrijf valt",
      required: true,
      section: "Algemene bedrijfscontext"
    },
    {
      id: "rechtsvorm",
      label: "Huidige rechtsvorm",
      type: "radio",
      options: [
        { label: "Eenmanszaak", value: "eenmanszaak" },
        { label: "Vennootschap", value: "vennootschap" }
      ],
      helpText: "Selecteer uw huidige rechtsvorm",
      required: true,
      section: "Algemene bedrijfscontext"
    },
    {
      id: "boekjaar",
      label: "Boekjaar waarop de cijfers betrekking hebben",
      type: "number",
      placeholder: "Bijv. 2024",
      helpText: "Het jaar waarop de geüploade cijfers betrekking hebben",
      required: true,
      section: "Algemene bedrijfscontext"
    },
    {
      id: "boekhoudkundig_regime",
      label: "Boekhoudkundig regime",
      type: "radio",
      options: [
        { label: "Enkelvoudig", value: "enkelvoudig" },
        { label: "Dubbel", value: "dubbel" }
      ],
      helpText: "Het boekhoudkundig regime dat u hanteert",
      required: true,
      section: "Algemene bedrijfscontext"
    }
  ],
  2: [
    {
      id: "aantal_werknemers",
      label: "Aantal werknemers (VTE)",
      type: "number",
      placeholder: "Bijv. 5",
      helpText: "Aantal voltijds equivalent (exclusief uzelf) of 0 indien u geen personeel heeft",
      required: true,
      section: "Personeel & werking"
    },
    {
      id: "zaakvoerders",
      label: "Aantal zelfstandigen/zaakvoerders die zich uit de zaak verlonen",
      type: "number",
      placeholder: "0",
      helpText: "Aantal zelfstandigen die een bezoldiging ontvangen",
      required: true,
      conditionalOn: [
        { field: "aantal_werknemers", value: 0, operator: "greaterThan" }
      ],
      section: "Personeel & werking"
    },
    {
      id: "loonkosten_buiten_zaak",
      label: "Eventuele loonkosten buiten de zaak",
      type: "textarea",
      placeholder: "Bijv. management fees, familiehulp",
      helpText: "Beschrijf eventuele andere loonkosten",
      required: false,
      section: "Personeel & werking"
    },
    {
      id: "extern_personeel",
      label: "Gebruik van extern personeel",
      type: "radio",
      options: [
        { label: "Ja", value: "ja" },
        { label: "Nee", value: "nee" }
      ],
      helpText: "Wordt er gebruik gemaakt van onderaannemers of interim?",
      required: true,
      section: "Personeel & werking"
    }
  ],
  3: [
    {
      id: "netto_inkomen",
      label: "Gewenst netto-inkomen per maand (€)",
      type: "number",
      placeholder: "Bijv. 3000",
      helpText: "Het netto inkomen dat u maandelijks wenst te ontvangen",
      required: true,
      section: "Verloning & privébehoefte"
    },
    {
      id: "huidige_opnamewijze",
      label: "Huidige opnamewijze",
      type: "select",
      options: [
        { label: "Bezoldiging (indien vennootschap)", value: "bezoldiging" },
        { label: "Privé-opname (indien eenmanszaak)", value: "privé_opname" },
        { label: "Dividend (indien vennootschap)", value: "dividend" },
        { label: "Combinatie", value: "combinatie" }
      ],
      helpText: "Hoe neemt u momenteel geld op uit uw bedrijf?",
      required: true,
      section: "Verloning & privébehoefte"
    },
    {
      id: "inkomensstabiliteit",
      label: "Hoe stabiel is het inkomen nodig?",
      type: "radio",
      options: [
        { label: "Constant", value: "constant" },
        { label: "Seizoensgebonden", value: "seizoensgebonden" }
      ],
      helpText: "Heeft u behoefte aan constant inkomen of kan dit wisselen?",
      required: true,
      section: "Verloning & privébehoefte"
    },
    {
      id: "andere_inkomsten",
      label: "Andere inkomstenbronnen",
      type: "textarea",
      placeholder: "Bijv. loon uit dienstverband, huurinkomen, partnerinkomen",
      helpText: "Beschrijf eventuele andere inkomstenbronnen. Deze hoeven niet per se uit de zaak te komen.",
      required: false,
      section: "Verloning & privébehoefte"
    }
  ],
  4: [
    {
      id: "omzetpatroon",
      label: "Omzetpatroon",
      type: "radio",
      options: [
        { label: "Stabiel", value: "stabiel" },
        { label: "Groeiend", value: "groeiend" },
        { label: "Dalend", value: "dalend" },
        { label: "Seizoensgebonden", value: "seizoensgebonden" }
      ],
      helpText: "Hoe verloopt uw omzet?",
      required: true,
      section: "Activiteit & margestructuur"
    },
    {
      id: "vaste_activa",
      label: "Gebruik van vaste activa",
      type: "radio",
      options: [
        { label: "Laag", value: "laag" },
        { label: "Gemiddeld", value: "gemiddeld" },
        { label: "Hoog", value: "hoog" }
      ],
      helpText: "Welke mate van vaste activa (machines, voertuigen, panden) gebruikt u?",
      required: true,
      section: "Activiteit & margestructuur"
    },
    {
      id: "herinvestering",
      label: "Mate van herinvestering",
      type: "radio",
      options: [
        { label: "Laag", value: "laag" },
        { label: "Gemiddeld", value: "gemiddeld" },
        { label: "Hoog", value: "hoog" }
      ],
      helpText: "Hoeveel investeert u terug in uw bedrijf?",
      required: true,
      section: "Activiteit & margestructuur"
    },
    {
      id: "bedrijfsruimte",
      label: "Huur of eigendom van bedrijfsruimte",
      type: "radio",
      options: [
        { label: "Huur", value: "huur" },
        { label: "Eigendom", value: "eigendom" },
        { label: "Thuiswerkend", value: "thuiswerkend" }
      ],
      helpText: "Wat is de status van uw bedrijfsruimte?",
      required: true,
      section: "Activiteit & margestructuur"
    }
  ],
  5: [
    {
      id: "omzetgroei",
      label: "Verwachte omzetgroei volgend jaar (%)",
      type: "number",
      placeholder: "Bijv. 15",
      helpText: "Hoeveel procent omzetgroei verwacht u volgend jaar?",
      required: true,
      section: "Groei & fiscaal"
    },
    {
      id: "kosten_evolutie",
      label: "Verwachte evolutie van kosten (%)",
      type: "number",
      placeholder: "Bijv. 10",
      helpText: "Hoeveel procent kosten evolutie verwacht u?",
      required: true,
      section: "Groei & fiscaal"
    },
    {
      id: "investeringsplannen",
      label: "Investeringsplannen binnen 12 maanden",
      type: "radio",
      options: [
        { label: "Ja", value: "ja" },
        { label: "Nee", value: "nee" }
      ],
      helpText: "Zijn er concrete investeringsplannen?",
      required: true,
      section: "Groei & fiscaal"
    },
    {
      id: "investeringsbedrag",
      label: "Investeringsbedrag (€)",
      type: "number",
      placeholder: "Bijv. 50000",
      helpText: "Geef het verwachte investeringsbedrag",
      required: false,
      conditionalOn: [
        { field: "investeringsplannen", value: "ja" }
      ],
      section: "Groei & fiscaal"
    },
    {
      id: "financieringsbehoefte",
      label: "Financieringsbehoefte",
      type: "radio",
      options: [
        { label: "Kapitaal aantrekken", value: "kapitaal" },
        { label: "Lenen", value: "lenen" },
        { label: "Geen", value: "geen" }
      ],
      helpText: "Is er behoefte aan externe financiering?",
      required: true,
      section: "Groei & fiscaal"
    },
    {
      id: "ambitie_niveau",
      label: "Ambitie-niveau",
      type: "radio",
      options: [
        { label: "Stabiel bedrijf", value: "stabiel" },
        { label: "Groeigericht", value: "groeigericht" }
      ],
      helpText: "Wat is uw strategische ambitie?",
      required: true,
      section: "Groei & fiscaal"
    },
    {
      id: "vennootschap_reden",
      label: "Belangrijkste reden om vennootschap te overwegen",
      type: "select",
      options: [
        { label: "Fiscale optimalisatie", value: "fiscaal" },
        { label: "Risicobeperking", value: "risico" },
        { label: "Imago / klantenverwachting", value: "imago" },
        { label: "Investeringen / groei", value: "investering" }
      ],
      helpText: "Wat is de hoofdreden voor uw interesse in een vennootschap?",
      required: true,
      section: "Groei & fiscaal"
    },
    {
      id: "privérisico",
      label: "Privérisico's of aansprakelijkheid",
      type: "textarea",
      placeholder: "Bijv. hoge contracten, schuldrisico, personeel",
      helpText: "Beschrijf eventuele risico's die u wilt afdekken",
      required: false,
      section: "Groei & fiscaal"
    },
    {
      id: "autogebruik",
      label: "Gebruik van auto via de zaak",
      type: "radio",
      options: [
        { label: "Ja", value: "ja" },
        { label: "Nee", value: "nee" }
      ],
      helpText: "Rijdt u met een bedrijfswagen?",
      required: true,
      section: "Groei & fiscaal"
    }
  ],
  6: [
    {
      id: "cashpositie",
      label: "Huidige cashpositie (€)",
      type: "number",
      placeholder: "Bijv. 25000",
      helpText: "Bedrag op bankrekeningen",
      required: true,
      section: "Financiële positie & boekhouddata"
    },
    {
      id: "openstaande_leningen",
      label: "Eventuele openstaande leningen",
      type: "textarea",
      placeholder: "Bedrag + rente",
      helpText: "Beschrijf openstaande kredieten met bedrag en rente",
      required: false,
      section: "Financiële positie & boekhouddata"
    },
    {
      id: "belastingschuld",
      label: "Belastingschuld of voorheffingen openstaand",
      type: "radio",
      options: [
        { label: "Ja", value: "ja" },
        { label: "Nee", value: "nee" }
      ],
      helpText: "Zijn er openstaande belastingschulden?",
      required: true,
      section: "Financiële positie & boekhouddata"
    },
    {
      id: "boekhouddata_type",
      label: "Type geüpload bestand(en)",
      type: "multiselect",
      options: [
        { label: "Jaarrekening", value: "jaarrekening" },
        { label: "P&L", value: "pl" },
        { label: "Balans", value: "balans" },
        { label: "Fiscale aangifte", value: "fiscaal" }
      ],
      helpText: "Wat voor type documenten uploadt u?",
      required: true,
      section: "Financiële positie & boekhouddata"
    },
    {
      id: "cijfers_betrouwbaarheid",
      label: "Betrouwbaarheid van cijfers",
      type: "radio",
      options: [
        { label: "Definitief", value: "definitief" },
        { label: "Tussentijds", value: "tussentijds" }
      ],
      helpText: "Zijn de cijfers definitief of nog tussentijds?",
      required: true,
      section: "Financiële positie & boekhouddata"
    },
    {
      id: "cijfers_fiscaal_verwerkt",
      label: "Zijn cijfers al fiscaal verwerkt?",
      type: "radio",
      options: [
        { label: "Ja", value: "ja" },
        { label: "Nee", value: "nee" }
      ],
      helpText: "Zijn de cijfers al definitief fiscaal verwerkt?",
      required: true,
      section: "Financiële positie & boekhouddata"
    }
  ],
  7: [
    {
      id: "boekhoudsoftware",
      label: "Gebruik boekhoudsoftware",
      type: "select",
      options: [
        { label: "Exact", value: "exact" },
        { label: "Yuki", value: "yuki" },
        { label: "Dexxter", value: "dexxter" },
        { label: "Accountable", value: "accountable" },
        { label: "e-boekhouden.be", value: "e-boekhouden.be" },
        { label: "Andere", value: "andere" },
        { label: "Geen", value: "geen" }
      ],
      helpText: "Welke boekhoudsoftware gebruikt u?",
      required: false,
      section: "Optioneel — verfijning"
    },
    {
      id: "boekhoudsoftware_andere",
      label: "Welke boekhoudsoftware?",
      type: "text",
      placeholder: "Specifieer uw software",
      helpText: "Vul in welke software u gebruikt",
      required: false,
      conditionalOn: [
        { field: "boekhoudsoftware", value: "andere" }
      ],
      section: "Optioneel — verfijning"
    },
    {
      id: "seizoensinvloed",
      label: "Seizoensinvloed",
      type: "textarea",
      placeholder: "Drukke of stille periodes",
      helpText: "Beschrijf eventuele seizoensinvloeden op uw omzet",
      required: false,
      section: "Optioneel — verfijning"
    },
    {
      id: "personeelsplanning",
      label: "Plannen om personeel aan te werven of af te bouwen",
      type: "textarea",
      placeholder: "Beschrijf uw plannen",
      helpText: "Zijn er concrete personeelsplanningen?",
      required: false,
      section: "Optioneel — verfijning"
    },
    {
      id: "persoonlijke_voorkeur",
      label: "Persoonlijke voorkeur",
      type: "radio",
      options: [
        { label: "Eenvoud (eenmanszaak)", value: "eenvoud" },
        { label: "Optimalisatie (vennootschap)", value: "optimalisatie" }
      ],
      helpText: "Wat is uw persoonlijke voorkeur?",
      required: false,
      section: "Optioneel — verfijning"
    }
  ],
  8: [
    {
      id: "analyse_verwachtingen",
      label: "Waar hoop jij dat deze analyse je meer duidelijkheid geeft?",
      type: "multiselect",
      options: [
        { label: "Of ik fiscaal beter af ben met een eenmanszaak of vennootschap", value: "fiscale_optimalisatie" },
        { label: "Hoe ik mijn risico's kan beperken en mijn privévermogen kan beschermen", value: "risicobeperking" },
        { label: "Of mijn bedrijf klaar is voor groei en investeringen", value: "groei_investering" },
        { label: "Hoe ik mijn privé-opname en inkomen kan optimaliseren", value: "inkomen_optimalisatie" },
        { label: "Of ik personeel kan aannemen zonder te veel risico", value: "personeel_risico" }
      ],
      helpText: "Selecteer alle onderwerpen waarop je meer duidelijkheid hoopt te krijgen",
      required: true,
      section: "Verwachtingen van de analyse"
    },
    {
      id: "analyse_specifiek",
      label: "Is er iets specifieks dat je van de analyse verwacht?",
      type: "textarea",
      placeholder: "Beschrijf hier je specifieke vragen of verwachtingen...",
      helpText: "Vul dit in als je specifieke vragen of verwachtingen hebt die niet in de bovenstaande opties staan",
      required: false,
      section: "Verwachtingen van de analyse"
    }
  ]
};

export const getQuestionsForStep = (step: number): Question[] => {
  return QUESTIONS_BY_STEP[step] || [];
};

export const shouldShowQuestion = (question: Question, formData: any): boolean => {
  if (!question.conditionalOn) return true;
  
  return question.conditionalOn.every(condition => {
    const fieldValue = formData[condition.field];
    
    switch (condition.operator || "equals") {
      case "equals":
        return fieldValue === condition.value;
      case "notEquals":
        return fieldValue !== condition.value;
      case "greaterThan":
        return Number(fieldValue) > Number(condition.value);
      case "lessThan":
        return Number(fieldValue) < Number(condition.value);
      default:
        return true;
    }
  });
};

export const getTotalSteps = (): number => {
  return 10;
};

export const getProgressPercentage = (currentStep: number): number => {
  const totalSteps = getTotalSteps();
  return ((currentStep - 1) / (totalSteps - 1)) * 100;
};

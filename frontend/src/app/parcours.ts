export type Entree = "perdue" | "soignant" | "droits";
export type Profil = "salariee" | "etudiante" | "fonctionnaire" | "independante";
export type Demarche = "rien" | "ald" | "rqth" | "travail";

export const ENTREES: { id: Entree; icone: string; label: string }[] = [
  { id: "perdue", icone: "🧭", label: "Je viens d'être diagnostiquée et je suis perdue" },
  { id: "soignant", icone: "🗺️", label: "Je cherche un·e soignant·e formé·e près de chez moi" },
  { id: "droits", icone: "⚖️", label: "Je veux faire valoir mes droits (ALD, RQTH…)" },
];

export const PROFILS: { id: Profil; icone: string; label: string }[] = [
  { id: "salariee", icone: "💼", label: "Je suis salariée dans le secteur privé" },
  { id: "etudiante", icone: "🎓", label: "Je suis étudiante" },
  { id: "fonctionnaire", icone: "🏛️", label: "Je suis fonctionnaire" },
  { id: "independante", icone: "🔄", label: "Je suis travailleuse indépendante" },
];

export const ETAPES: { id: Demarche; icone: string; label: string }[] = [
  { id: "rien", icone: "🆕", label: "Je n'ai rien fait encore, par où commencer ?" },
  { id: "ald", icone: "📄", label: "J'ai déjà demandé l'ALD 31 (ou je veux le faire)" },
  { id: "rqth", icone: "♿", label: "Je souhaite faire une demande RQTH / MDPH" },
  { id: "travail", icone: "🏢", label: "Je veux voir la médecine du travail" },
];

const PROFIL_DESCRIPTION: Record<Profil, string> = {
  salariee: "une salariée du secteur privé nouvellement diagnostiquée",
  etudiante: "une étudiante nouvellement diagnostiquée",
  fonctionnaire: "une fonctionnaire nouvellement diagnostiquée",
  independante: "une travailleuse indépendante nouvellement diagnostiquée",
};

const PROFIL_LABEL_COURT: Record<Profil, string> = {
  salariee: "Salariée secteur privé",
  etudiante: "Étudiante",
  fonctionnaire: "Fonctionnaire",
  independante: "Travailleuse indépendante",
};

export type Ressource = { label: string; titre: string; desc: string };

export type ContenuDemarche = {
  intro: string;
  ressources: Ressource[];
  checklistTitre: string;
  checklist: string[];
  botApres?: string;
  encadre?: { titre: string; texte: string };
  voirAussiMedecineDuTravail?: boolean;
};

export function contenuDemarche(demarche: Demarche, profil: Profil): ContenuDemarche {
  switch (demarche) {
    case "rien":
      return {
        intro: `Voici le chemin recommandé par ENDOmind pour ${PROFIL_DESCRIPTION[profil]}. Chaque étape peut être faite séparément.`,
        ressources: [
          {
            label: "📋 Fiche ENDOmind",
            titre: "Fiche ALD 31 · Endométriose",
            desc: "Comment constituer votre dossier, quoi écrire, comment réagir en cas de refus. Rédigée par ENDOmind.",
          },
          {
            label: "💼 Livret ENDOmind",
            titre: "Endo&Vie pro · Endométriose et travail",
            desc: "RQTH, MDPH, médecine du travail, aménagements de poste : vos droits expliqués pas à pas.",
          },
        ],
        checklistTitre: `Check-list · ${PROFIL_LABEL_COURT[profil]}`,
        checklist: [
          "Parlez de votre diagnostic à votre médecin traitant : il initie les démarches ALD et arrêts de travail.",
          "Demandez une reconnaissance ALD 31 (affection longue durée « hors liste ») : remboursement à 100 % des soins liés à l'endométriose.",
          "Renseignez-vous sur la RQTH (reconnaissance de la qualité de travailleur handicapé) si la maladie impacte votre travail.",
          "Consultez la médecine du travail pour aménager votre poste si nécessaire.",
        ],
      };
    case "ald":
      return {
        intro:
          "L'ALD 31 est une affection de longue durée « hors liste » : elle permet la prise en charge à 100 % des soins directement liés à l'endométriose.\n\nElle est souvent refusée la première fois. ENDOmind a préparé une fiche pour vous aider à constituer un dossier solide et à contester un refus.",
        ressources: [
          {
            label: "📋 Fiche ENDOmind",
            titre: "Fiche ALD 31 · Constituer votre dossier",
            desc: "Ce que doit mentionner le protocole de soins, comment argumenter, que faire en cas de refus de la CPAM.",
          },
        ],
        checklistTitre: "Check-list · ALD 31",
        checklist: [
          "Votre médecin traitant rédige le protocole de soins (formulaire S3501).",
          "Le dossier est envoyé au médecin-conseil de votre CPAM pour accord.",
          "En cas de refus, vous pouvez contester : la fiche ENDOmind explique la procédure.",
          "L'ALD est valable 3 ans, renouvelable.",
        ],
        botApres: "Un·e professionnel·le de santé de la filière de soins peut vous aider à constituer ce dossier.",
      };
    case "rqth":
      return {
        intro:
          "La RQTH (Reconnaissance de la Qualité de Travailleur Handicapé) est délivrée par la MDPH (Maison Départementale des Personnes Handicapées).\n\nElle permet des aménagements de poste, des aides à la formation, et une protection renforcée contre le licenciement.",
        ressources: [
          {
            label: "💼 Livret ENDOmind",
            titre: "Endo&Vie pro · RQTH et MDPH",
            desc: "Constitution du dossier, pièces à fournir, délais, droits ouverts : tout ce que vous devez savoir.",
          },
        ],
        checklistTitre: "Check-list · RQTH / MDPH",
        checklist: [
          "Téléchargez le formulaire MDPH (cerfa 15692) sur le site de votre MDPH départementale.",
          "Joignez un certificat médical de moins de 3 mois rédigé par votre médecin traitant.",
          "Décrivez l'impact de la maladie sur votre vie professionnelle dans le volet « projet de vie ».",
          "La RQTH est confidentielle : votre employeur n'est pas informé sauf si vous le souhaitez.",
        ],
        voirAussiMedecineDuTravail: true,
      };
    case "travail":
      return {
        intro:
          "Le médecin du travail peut proposer des aménagements de poste (horaires, télétravail, charge physique) sans en informer votre employeur sur votre diagnostic.",
        ressources: [
          {
            label: "💼 Livret ENDOmind",
            titre: "Endo&Vie pro · Médecine du travail",
            desc: "Vos droits, ce que vous pouvez demander, comment préparer la visite. Spécifique secteur privé, fonctionnaire et indépendante.",
          },
        ],
        checklistTitre: "Check-list · Médecine du travail",
        checklist: [
          "Vous pouvez demander une visite à l'initiative du salarié à tout moment.",
          "Préparez une liste des tâches impactées par la douleur ou la fatigue.",
          "Le médecin du travail peut préconiser un aménagement sans mentionner votre diagnostic à l'employeur.",
          "En cas d'inaptitude temporaire, des solutions de reclassement peuvent être explorées.",
        ],
        encadre: {
          titre: "Besoin d'un accompagnement supplémentaire ?",
          texte:
            "ENDOmind ne peut pas vous accompagner individuellement, mais oriente vers les associations partenaires. Écrivez à info@endomind.org",
        },
      };
  }
}

export type Bloc =
  | { type: "bot"; cle: string; texte: string }
  | { type: "user"; cle: string; texte: string }
  | { type: "choix-entree"; cle: string }
  | { type: "choix-profil"; cle: string }
  | { type: "choix-etapes"; cle: string }
  | { type: "ressource"; cle: string; ressource: Ressource }
  | { type: "checklist"; cle: string; titre: string; items: string[] }
  | { type: "encadre"; cle: string; titre: string; texte: string }
  | { type: "choix-nav"; cle: string; demarche?: Demarche };

export function construireFil(
  choix: Entree | null,
  profil: Profil | null,
  demarche: Demarche | null
): Bloc[] {
  const fil: Bloc[] = [
    {
      type: "bot",
      cle: "intro",
      texte:
        "Bonjour 👋\n\nJe suis le chatbot d'ENDOmind. Je vous oriente vers les ressources fiables de l'association selon votre situation.\n\nJe ne pose pas de diagnostic et ne remplace pas un·e professionnel·le de santé.",
    },
    { type: "bot", cle: "question-accueil", texte: "Par où souhaitez-vous commencer ?" },
  ];

  if (choix === null) {
    fil.push({ type: "choix-entree", cle: "choix-entree" });
    return fil;
  }

  const entree = ENTREES.find((e) => e.id === choix)!;
  fil.push({ type: "user", cle: "user-entree", texte: entree.label });

  if (choix !== "droits") {
    fil.push({
      type: "bot",
      cle: "generique",
      texte: "Écran à venir — ce parcours sera construit dans une prochaine itération.",
    });
    fil.push({ type: "choix-nav", cle: "choix-nav-generique" });
    return fil;
  }

  fil.push({
    type: "bot",
    cle: "droits-intro",
    texte:
      "Vous êtes tout à fait légitime à demander ces aides. ENDOmind a préparé des fiches claires pour vous y aider.\n\nQuelle est votre situation actuelle ?",
  });

  if (profil === null) {
    fil.push({ type: "choix-profil", cle: "choix-profil" });
    return fil;
  }

  const p = PROFILS.find((x) => x.id === profil)!;
  fil.push({ type: "user", cle: "user-profil", texte: p.label });
  fil.push({ type: "bot", cle: "question-etapes", texte: "Qu'avez-vous déjà fait ?" });

  if (demarche === null) {
    fil.push({ type: "choix-etapes", cle: "choix-etapes" });
    return fil;
  }

  const e = ETAPES.find((x) => x.id === demarche)!;
  fil.push({ type: "user", cle: `user-etape-${demarche}`, texte: e.label });

  const contenu = contenuDemarche(demarche, profil);
  fil.push({ type: "bot", cle: `demarche-intro-${demarche}`, texte: contenu.intro });
  contenu.ressources.forEach((ressource, i) => {
    fil.push({ type: "ressource", cle: `demarche-ressource-${demarche}-${i}`, ressource });
  });
  fil.push({
    type: "checklist",
    cle: `demarche-checklist-${demarche}`,
    titre: contenu.checklistTitre,
    items: contenu.checklist,
  });
  if (contenu.botApres) {
    fil.push({ type: "bot", cle: `demarche-apres-${demarche}`, texte: contenu.botApres });
  }
  if (contenu.encadre) {
    fil.push({
      type: "encadre",
      cle: `demarche-encadre-${demarche}`,
      titre: contenu.encadre.titre,
      texte: contenu.encadre.texte,
    });
  }
  fil.push({ type: "choix-nav", cle: `choix-nav-${demarche}`, demarche });
  return fil;
}

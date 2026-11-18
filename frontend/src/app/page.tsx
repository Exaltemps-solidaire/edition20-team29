"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Entree = "perdue" | "soignant" | "droits";

const ENTREES: { id: Entree; icone: string; label: string }[] = [
  { id: "perdue", icone: "🧭", label: "Je viens d'être diagnostiquée et je suis perdue" },
  { id: "soignant", icone: "🗺️", label: "Je cherche un·e soignant·e formé·e près de chez moi" },
  { id: "droits", icone: "⚖️", label: "Je veux faire valoir mes droits (ALD, RQTH…)" },
];

export default function Home() {
  const [choix, setChoix] = useState<Entree | null>(null);

  return (
    <div className={styles.page}>
      <div className={styles.chatHeader}>
        <div className={styles.logoSlot}>EM</div>
        <div>
          <div className={styles.headerTitle}>ENDOmind</div>
          <div className={styles.headerSub}>Votre guide d&apos;information</div>
        </div>
      </div>

      <main className={styles.chatBody}>
        <p className={styles.bubbleBot}>
          Bonjour 👋
          <br />
          <br />
          Je suis le chatbot d&apos;<strong>ENDOmind</strong>. Je vous oriente vers les
          ressources fiables de l&apos;association selon votre situation.
          <br />
          <br />
          Je ne pose pas de diagnostic et ne remplace pas un·e professionnel·le de santé.
        </p>

        <p className={styles.bubbleBot}>
          <strong>Par où souhaitez-vous commencer ?</strong>
        </p>

        <div className={styles.choices}>
          {ENTREES.map((entree) => (
            <button
              key={entree.id}
              className={styles.choiceBtn}
              onClick={() => setChoix(entree.id)}
            >
              <span className={styles.choiceIcon}>{entree.icone}</span>
              {entree.label}
            </button>
          ))}
        </div>

        {choix && (
          <p className={styles.bubbleBot}>Écran à venir — ce parcours sera construit dans une prochaine itération.</p>
        )}

        <div className={styles.encadreSensible}>
          <strong>Vous êtes en situation difficile ?</strong> ENDOmind est là. Écrivez-nous à{" "}
          <span className={styles.contact}>info@endomind.org</span> ou rejoignez un groupe de
          parole.
        </div>
      </main>
    </div>
  );
}

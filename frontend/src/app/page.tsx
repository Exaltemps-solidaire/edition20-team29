"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { ENTREES, PROFILS, etapeCourante, type Entree, type Profil } from "./parcours";

export default function Home() {
  const [choix, setChoix] = useState<Entree | null>(null);
  const [profil, setProfil] = useState<Profil | null>(null);
  const etape = etapeCourante(choix, profil);

  function reinitialiser() {
    setChoix(null);
    setProfil(null);
  }

  return (
    <div className={styles.page}>
      <div className={styles.chatHeader}>
        <div className={styles.logoSlot}>EM</div>
        <div>
          <div className={styles.headerTitle}>
            {etape === "accueil" ? "ENDOmind" : "Mes droits"}
          </div>
          <div className={styles.headerSub}>
            {etape === "accueil" ? "Votre guide d'information" : "ALD, RQTH, MDPH…"}
          </div>
        </div>
        {etape !== "accueil" && (
          <button className={styles.backBtn} onClick={reinitialiser}>
            ← Retour
          </button>
        )}
      </div>

      <main className={styles.chatBody}>
        {etape === "accueil" && (
          <>
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
          </>
        )}

        {etape === "droits-situation" && (
          <>
            <p className={styles.bubbleUser}>Je veux faire valoir mes droits</p>
            <p className={styles.bubbleBot}>
              Vous êtes tout à fait légitime à demander ces aides. ENDOmind a préparé des fiches
              claires pour vous y aider.
              <br />
              <br />
              <strong>Quelle est votre situation actuelle ?</strong>
            </p>
            <div className={styles.choices}>
              {PROFILS.map((p) => (
                <button
                  key={p.id}
                  className={styles.choiceBtn}
                  onClick={() => setProfil(p.id)}
                >
                  <span className={styles.choiceIcon}>{p.icone}</span>
                  {p.label}
                </button>
              ))}
            </div>
          </>
        )}

        {etape === "droits-suite" && (
          <>
            <p className={styles.bubbleUser}>
              {PROFILS.find((p) => p.id === profil)?.label}
            </p>
            <p className={styles.bubbleBot}>
              Écran à venir — la suite du parcours droits sera construite dans une prochaine
              itération.
            </p>
          </>
        )}

        {etape === "generique" && (
          <p className={styles.bubbleBot}>
            Écran à venir — ce parcours sera construit dans une prochaine itération.
          </p>
        )}

        {etape === "accueil" && (
          <div className={styles.encadreSensible}>
            <strong>Vous êtes en situation difficile ?</strong> ENDOmind est là. Écrivez-nous à{" "}
            <span className={styles.contact}>info@endomind.org</span> ou rejoignez un groupe de
            parole.
          </div>
        )}
      </main>
    </div>
  );
}

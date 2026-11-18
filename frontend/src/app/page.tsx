"use client";

import { Fragment, useState } from "react";
import styles from "./page.module.css";
import { ENTREES, PROFILS, construireFil, type Entree, type Profil } from "./parcours";

export default function Home() {
  const [choix, setChoix] = useState<Entree | null>(null);
  const [profil, setProfil] = useState<Profil | null>(null);
  const fil = construireFil(choix, profil);

  function reinitialiser() {
    setChoix(null);
    setProfil(null);
  }

  return (
    <div className={styles.page}>
      <div className={styles.chatHeader}>
        <div className={styles.logoSlot}>EM</div>
        <div>
          <div className={styles.headerTitle}>ENDOmind</div>
          <div className={styles.headerSub}>Votre guide d&apos;information</div>
        </div>
        {choix !== null && (
          <button className={styles.backBtn} onClick={reinitialiser}>
            ← Retour
          </button>
        )}
      </div>

      <main className={styles.chatBody}>
        {fil.map((bloc) => {
          switch (bloc.type) {
            case "bot":
              return (
                <p key={bloc.cle} className={styles.bubbleBot}>
                  {bloc.texte.split("\n").map((ligne, i, arr) => (
                    <Fragment key={i}>
                      {ligne}
                      {i < arr.length - 1 && <br />}
                    </Fragment>
                  ))}
                </p>
              );
            case "user":
              return (
                <p key={bloc.cle} className={styles.bubbleUser}>
                  {bloc.texte}
                </p>
              );
            case "choix-entree":
              return (
                <div key={bloc.cle} className={styles.choices}>
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
              );
            case "choix-profil":
              return (
                <div key={bloc.cle} className={styles.choices}>
                  {PROFILS.map((p) => (
                    <button key={p.id} className={styles.choiceBtn} onClick={() => setProfil(p.id)}>
                      <span className={styles.choiceIcon}>{p.icone}</span>
                      {p.label}
                    </button>
                  ))}
                </div>
              );
          }
        })}

        {choix === null && (
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

"use client";

import { Fragment, useState } from "react";
import styles from "./page.module.css";
import { ENTREES, ETAPES, PROFILS, construireFil, type Demarche, type Entree, type Profil } from "./parcours";

function texteMultiligne(texte: string) {
  return texte.split("\n").map((ligne, i, arr) => (
    <Fragment key={i}>
      {ligne}
      {i < arr.length - 1 && <br />}
    </Fragment>
  ));
}

export default function Home() {
  const [choix, setChoix] = useState<Entree | null>(null);
  const [profil, setProfil] = useState<Profil | null>(null);
  const [demarche, setDemarche] = useState<Demarche | null>(null);
  const fil = construireFil(choix, profil, demarche);

  function reinitialiser() {
    setChoix(null);
    setProfil(null);
    setDemarche(null);
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
                  {texteMultiligne(bloc.texte)}
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
            case "choix-etapes":
              return (
                <div key={bloc.cle} className={styles.choices}>
                  {ETAPES.map((e) => (
                    <button key={e.id} className={styles.choiceBtn} onClick={() => setDemarche(e.id)}>
                      <span className={styles.choiceIcon}>{e.icone}</span>
                      {e.label}
                    </button>
                  ))}
                </div>
              );
            case "ressource":
              return (
                <div key={bloc.cle} className={styles.resourceCard}>
                  <span className={styles.resourceLabel}>{bloc.ressource.label}</span>
                  <span className={styles.resourceTitre}>{bloc.ressource.titre}</span>
                  <span className={styles.resourceDesc}>{bloc.ressource.desc}</span>
                </div>
              );
            case "checklist":
              return (
                <div key={bloc.cle} className={styles.checklistBox}>
                  <div className={styles.checklistTitre}>{bloc.titre}</div>
                  <ul className={styles.checklist}>
                    {bloc.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            case "encadre":
              return (
                <div key={bloc.cle} className={styles.encadreSensible}>
                  <strong>{bloc.titre}</strong> {texteMultiligne(bloc.texte)}
                </div>
              );
            case "choix-nav":
              return (
                <div key={bloc.cle} className={styles.choices}>
                  {bloc.demarche === "rqth" && (
                    <button className={styles.choiceBtn} onClick={() => setDemarche("travail")}>
                      <span className={styles.choiceIcon}>🏢</span>
                      Voir aussi : médecine du travail
                    </button>
                  )}
                  <button className={styles.choiceBtn} onClick={() => setDemarche(null)}>
                    <span className={styles.choiceIcon}>↩️</span>
                    Voir une autre démarche
                  </button>
                  <button className={styles.choiceBtn} onClick={reinitialiser}>
                    <span className={styles.choiceIcon}>🏠</span>
                    Revenir à l&apos;accueil
                  </button>
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

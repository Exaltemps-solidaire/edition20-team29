# Plan d'itérations — ENDOmind, chatbot arborescent

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation : `cadrage/2-idees-priorisees.md` et `5-hypotheses.md` sont « Pas encore produit », pas de clé `iterations` dans `passation.json`). Le `cadrage/6-plan-de-livraison.md` de l'équipe donne l'ordre des trois parcours, repris ci-dessous.
- **Temps restant annoncé** : 30 minutes (demandé le 2026-11-18 à 16:43) ; re-demandé au début de l'itération 1 : 20 minutes (16:49). La plateforme n'était alors pas encore totalement démarrée (`postgres.internal` pas encore `healthy`). Re-demandé à la clôture de l'itération 1 (le blocage Docker Hub a consommé du temps réel non compté dans les 20 min) : **10 à 20 minutes**. Re-demandé avant l'itération 4 (pivot ci-dessous) : toujours **10 à 20 minutes**.
- ⚠️ **Changement de priorité demandé par le développeur, à valider par les cadreurs** : au lieu d'avancer les trois parcours en parallèle, le reste du temps se concentre sur un parcours « mes droits » complet et convaincant (Situation → Étapes réalisées → Par où commencer / ALD 31 / RQTH-MDPH / Médecine du travail, avec vraies fiches et checklists ENDOmind). Les parcours « je suis perdue », « trouver un soignant », le lexique et le RAG passent après, voir « À venir ». Avec 10 à 20 minutes restantes, une seule itération de ce calibre est réaliste (codage + publication + tour de test) : elle fait tout le parcours d'un coup plutôt que de le découper, pour ne pas perdre de temps en publications intermédiaires.
- **Tour de test de l'équipe** : 5 minutes.
- **Plan validé** le 2026-11-18 par le développeur (« très bien, lance le conteneur »).
- **Hors périmètre (toutes itérations)** : intégration WhatsApp, affichage de soignants nommés, encart événement géolocalisé, connexion/comptes, suivi dans le temps (rappels, journal), mise à jour du contenu des ressources par l'association. Ces points sont explicitement écartés par `PASSATION.md` (« Hors périmètre »).

## ⚠️ Capacité réelle très serrée

- `podman ps` ne montre **aucun conteneur de la plateforme** : elle n'a jamais été démarrée sur cette machine. L'étape 1 de la recette (`/srv/team29/CLAUDE.md`) prend « quelques minutes » et doit démarrer en arrière-plan dès le début du codage.
- Le calcul de capacité de `/planifier-iterations` suppose une publication d'environ 5 minutes. Ce chiffre vaut pour une itération qui republie une plateforme déjà en route. **Ici c'est le tout premier déploiement** : démarrage de la plateforme, création de la base `team29`, premier `build`+`push` des deux images, premier `compose up`. Concrètement cela peut dépasser à soi seul les 30 minutes restantes.
- Avec 30 minutes au total et un tour de test à 5 minutes, **une seule itération complète est réaliste** ; une deuxième n'est listée ci-dessous qu'à titre indicatif et sera revue une fois la durée réelle de l'itération 1 connue.
- ✂️ Si l'itération 1 déborde près des 8 minutes de codage, l'alarme du budget s'applique normalement (poser la question au développeur), mais ici le vrai risque est dans la **publication**, pas dans le codage : prévenir le développeur dès que possible si le premier déploiement traîne.

## Itération 1 : l'écran d'accueil du chatbot est visible en ligne, avec ses trois entrées

- **Dans le périmètre** :
  - `.env.example` et `DEPLOIEMENT.md` à la racine (contrat de déployabilité, règles 2 et 8).
  - `/srv/team29/app/podman-compose.yml` (recette du serveur).
  - Écran d'accueil du front : les trois boutons fermés « je suis perdue », « trouver un·e soignant·e formé·e », « faire valoir mes droits (ALD, RQTH…) », avec le texte du thème ENDOmind. Données en dur, aucun appel au RAG.
  - Les boutons peuvent mener à un écran provisoire (« à venir ») pour les deux parcours non codés ; aucun bouton ne doit être mort (lien cassé, 404).
  - Démarrage de la plateforme (arrière-plan), création de la base `team29`, premier build/push/déploiement des deux services.
- **Hors périmètre** : le contenu réel des parcours (droits, soignant, perdue), le RAG, le lexique, l'écran « Qui êtes-vous ? » de choix de persona.
- **Critères d'acceptation** :
  - Étant donné l'application déployée, quand on visite `/`, alors les trois boutons d'entrée sont visibles et lisibles.
  - Étant donné le service `api`, quand on appelle `GET /api/health` (ou `/health` en 8081 depuis la machine), alors la réponse est `200`.
  - Étant donné `scripts/verifier-deployabilite.sh`, quand on le lance, alors aucune **borne** n'est signalée (les alarmes `.env.example` et `DEPLOIEMENT.md` disparaissent).
- **Hypothèse de l'équipe couverte** : aucune directement — cette itération pose l'écran d'entrée nécessaire aux hypothèses « 0 question ouverte » et « 100 % de complétion », mesurées à partir de l'itération 2.
- **Codage estimé** : 8 minutes.
- **Fichiers prévus** : `.env.example`, `DEPLOIEMENT.md`, `podman-compose.yml` (racine), l'écran d'accueil du front (page + éventuel composant des 3 boutons).
- **Tests unitaires prévus** : aucune logique métier nouvelle à cette étape (écran d'accueil = balisage pur) ; `npm test` doit rester vert sur les tests déjà présents (`api/src/routes.test.ts`).
- **Étapes ajoutées à la démo** : ouvrir l'accueil, vérifier que les trois boutons sont affichés.
- **Bilan** :
  - Durée de codage réelle : **1 minute** (budget 8 min non atteint, aucun dépassement).
  - ⚠️ Incident résolu en cours d'itération : le premier démarrage de la plateforme (`/srv/team29/core-platform`) a buté sur la limite anonyme de pulls Docker Hub (`toomanyrequests`) ; `registry.internal` et `postgres.internal` n'ont pas démarré dans le pipeline initial (deux premières tentatives de pull ciblées également bloquées, 3 essais chacune). Résolu en relançant un `podman pull` isolé pour les deux images (succès après une poignée de minutes, la limite s'étant levée), puis `podman compose up -d registry postgres` directement dans `core-platform` pour démarrer les deux services manquants sans repasser par tout le pipeline.
  - Suite : base `team29` créée, images `api`/`frontend` construites et poussées sur `localhost:5000`, déploiement avec `podman compose -p team29 up -d --force-recreate`.
  - Critères satisfaits : les 3 boutons d'entrée sont rendus par le front en local (`curl localhost:8080/` confirme le texte d'accueil ENDOmind et les trois libellés) ; `GET /health` et `/sante` répondent `200` sur le port 8080 (front) et directement sur l'API (8081) ; `verifier-deployabilite.sh` ne signale plus aucune alarme.
  - Déploiement (point 4 de la DoD) : fait, suivant `/srv/team29/CLAUDE.md` (plateforme, registre local, podman-compose.yml, build/push/up).
  - Signal PM Lab (point 6) : `./scripts/signaler-version.sh 1` exécuté avec succès (`moteur_avance: false`, version enregistrée).
  - Point 5 (en ligne sur `$URL_PUBLIQUE`) non vérifié par le harnais, comme prévu : à confirmer par le développeur dans son navigateur (`https://edition20-team29.exaltemps-space.com/health` et `/sante`), sans que cela ait bloqué le signal.
  - Rien reporté sur le périmètre de cette itération : les 3 critères sont satisfaits.
  - Ce que le harnais a bloqué : rien.
  - **Modifications** :
    - `frontend/src/app/page.tsx` : écran d'accueil (trois entrées fermées + encart situation sensible), remplace le gabarit `create-next-app`. Sert le critère « 3 boutons visibles ».
    - `frontend/src/app/page.module.css` : styles de l'écran de chat (remplace les styles du gabarit).
    - `.env.example` : variables lues par `api` (DB, Vault, Redis, S3). Sert le contrat de déployabilité, règle 2.
    - `DEPLOIEMENT.md` : page de déploiement à la racine. Sert le contrat de déployabilité, règle 8.
    - `podman-compose.yml` : recette de déploiement (réseau `core-network`, ports 8080/8081). Sert le contrat de déployabilité, règle 1, et la recette du serveur.
    - `api/Dockerfile`, `frontend/Dockerfile` : images de base qualifiées `docker.io/library/...` (résolution des noms courts, recette du serveur).

## Itération 2 : parcours Mes droits — écran Situation

⚠️ Reste à valider par les cadreurs (pas encore confirmée formellement, seulement dessinée à `/planifier-iterations`) ; tient dans la fenêtre de 10 à 20 minutes restantes (codage estimé 5 min, en dessous du budget).

- **Dans le périmètre** : depuis le bouton « faire valoir mes droits », un écran Situation à choix fermés (salariée, étudiante, fonctionnaire, indépendante), données en dur.
- **Hors périmètre** : les trois écrans suivants du parcours droits (Étapes réalisées, Par où commencer, ALD 31/RQTH/Médecine du travail), le RAG.
- **Critères d'acceptation** :
  - Étant donné l'écran d'accueil, quand on clique « faire valoir mes droits », alors l'écran Situation s'affiche avec les quatre profils.
  - Étant donné l'écran Situation, quand on choisit un profil, alors aucune question ouverte n'est posée (boutons uniquement).
- **Hypothèse de l'équipe couverte** : « proposer d'emblée les trois entrées fermées... sans question ouverte » (partiellement — un seul écran du parcours).
- **Codage estimé** : 5 minutes.
- **Fichiers prévus** : 1 nouvel écran front, éventuel fichier de données en dur pour les profils.
- **Tests unitaires prévus** : 1 test sur la fonction de sélection du profil si elle contient une règle (ex. normalisation de la saisie), sinon aucun.
- **Étapes ajoutées à la démo** : accueil → clic « mes droits » → écran Situation visible.
- **Bilan** :
  - Temps restant redemandé au début (16:26) : 10 à 20 minutes. Pas de dépassement du budget de codage.
  - Durée de codage réelle : **1 minute**.
  - Critères satisfaits : depuis l'accueil, le clic sur « faire valoir mes droits » affiche l'écran Situation avec les 4 profils (salariée, étudiante, fonctionnaire, indépendante), reprenant le texte du prototype (`screen-7`) ; le choix d'un profil n'ouvre aucune question ouverte (boutons uniquement), mène à un écran « à venir » explicite (pas de lien mort) ; `verifier-deployabilite.sh` ne signale toujours aucune borne.
  - Tests : la logique de routage entre écrans (`etapeCourante`) est extraite dans `frontend/src/app/parcours.ts` et couverte par 4 tests Vitest (`parcours.test.ts`) ; `npm test` passe (2 + 4 tests).
  - Déploiement : build/push/`compose up --force-recreate` des deux images, tous les health checks locaux (8080 et 8081, `/health` et `/sante`) répondent 200.
  - Signal PM Lab : `./scripts/signaler-version.sh 2` exécuté avec succès (version 2 enregistrée).
  - Point 5 (en ligne sur `$URL_PUBLIQUE`) non vérifié par le harnais, comme prévu : à confirmer par le développeur dans son navigateur.
  - Rien reporté sur le périmètre de cette itération : les 2 critères sont satisfaits.
  - Ce que le harnais a bloqué : rien.
  - **Modifications** :
    - `frontend/src/app/parcours.ts` : types `Entree`/`Profil`/`Etape`, listes `ENTREES`/`PROFILS` en dur, fonction pure `etapeCourante` (routage accueil → situation → suite). Sert les 2 critères d'acceptation.
    - `frontend/src/app/parcours.test.ts` : 4 tests Vitest sur `etapeCourante`.
    - `frontend/src/app/page.tsx` : remplace le `choix` unique par un petit automate d'écrans (accueil / situation droits / suite droits / générique) avec bouton retour ; réutilise `parcours.ts`.
    - `frontend/src/app/page.module.css` : styles `.bubbleUser` (bulle utilisateur) et `.backBtn` (retour).
    - `ITERATIONS.md` : bilan de l'itération 1 corrigé (le blocage Docker Hub avait été résolu après la rédaction initiale), temps restant redemandé, bilan de l'itération 2.

## Itération 3 : les échanges s'affichent en fil de conversation, sans remplacer l'écran

- **Source** : demande du développeur en cours de hackathon (comportement jugé trop proche d'une navigation par écrans, pas assez « chatbot »). Validée par la demande directe du développeur ; temps restant redemandé (16:XX) : plus de 20 minutes.
- **Dans le périmètre** :
  - Le clic sur une entrée ou un choix n'efface plus le contenu précédent : la bulle utilisateur et la réponse du bot suivante s'ajoutent en dessous, dans le même fil défilant.
  - Les boutons déjà utilisés à une étape passée ne sont plus actionnables une fois le choix fait (remplacés par la bulle utilisateur correspondante), mais restent visibles dans l'historique.
  - Le bouton « Retour » réinitialise tout le fil à l'accueil (comportement inchangé, adapté au nouveau modèle).
  - Adaptation de la logique pure de `parcours.ts` pour construire un historique (liste de tours) plutôt qu'une étape unique.
- **Hors périmètre** : nouveau contenu métier, nouveaux parcours, RAG, scroll automatique avancé (un simple flux qui grandit suffit).
- **Critères d'acceptation** :
  - Étant donné l'accueil, quand je clique une entrée, alors ma réponse et la question suivante du bot apparaissent sous les bulles précédentes, qui restent affichées.
  - Étant donné le parcours droits avancé jusqu'au choix d'un profil, quand je regarde le fil, alors j'y vois dans l'ordre : le message d'accueil, mon choix « mes droits », la question Situation, mon profil choisi, puis le message « à venir » — rien n'a disparu entre-temps.
  - Étant donné un fil avancé, quand je clique « Retour », alors le fil est vidé et seul l'accueil est affiché.
- **Hypothèse de l'équipe couverte** : aucune nouvelle — ajustement d'expérience utilisateur (fidélité au format chatbot), pas une fonctionnalité métier.
- **Codage estimé** : 8 minutes.
- **Fichiers prévus** : `frontend/src/app/parcours.ts`, `frontend/src/app/parcours.test.ts`, `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css`.
- **Tests unitaires prévus** : la fonction pure qui construit l'historique à partir des choix (remplace/étend `etapeCourante`) ; 2 à 3 tests sur son comportement cumulatif.
- **Étapes ajoutées à la démo** : vérifier que les bulles précédentes restent visibles après chaque choix (`e2e/demo.spec.ts` déjà assertion par assertion, sans `expect(...).not.toBeVisible()` sur les anciennes bulles — à ajuster si besoin).
- **Bilan** :
  - Durée de codage réelle : **1 minute**.
  - Critères satisfaits : `construireFil` remplace `etapeCourante` et retourne la liste cumulative de blocs (bot/utilisateur/choix) ; `page.tsx` les affiche tous à chaque rendu au lieu de n'afficher que l'étape courante — plus aucune bulle ne disparaît quand on avance dans le parcours. Le bouton « Retour » vide le fil en revenant à `choix=null, profil=null`.
  - Tests : 4 tests Vitest sur `construireFil`, dont un qui vérifie explicitement que le préfixe du fil ne change pas d'une étape à l'autre (non-régression de l'historique). `npm test` passe (2 + 4 tests).
  - Déploiement : seule l'image frontend avait changé ; rebuild/push/`compose up --force-recreate frontend` uniquement. `/health` et `/sante` (8080) répondent 200 ; contenu vérifié par `curl`.
  - Rien reporté sur le périmètre de cette itération : les 3 critères sont satisfaits.
  - Ce que le harnais a bloqué : rien.
  - **Modifications** :
    - `frontend/src/app/parcours.ts` : remplace `Etape`/`etapeCourante` par `Bloc`/`construireFil`, qui construit l'historique complet (bot, utilisateur, choix) à partir de `(choix, profil)` au lieu d'une étape unique.
    - `frontend/src/app/parcours.test.ts` : 4 tests sur `construireFil`, dont la non-régression de l'historique déjà affiché.
    - `frontend/src/app/page.tsx` : rendu par `fil.map(...)` qui empile tous les blocs au lieu de switcher sur une étape ; bouton retour conditionné sur `choix !== null`.

## Itération 4 : le parcours « mes droits » va jusqu'au bout, avec les vraies ressources ENDOmind

- **Source** : pivot demandé par le développeur — concentrer le temps restant sur un seul parcours complet et convaincant plutôt que sur plusieurs parcours partiels. Temps restant redemandé : 10 à 20 minutes ⇒ une seule itération, qui couvre tout le parcours d'un coup pour ne pas perdre de temps en publications intermédiaires.
- **Dans le périmètre** (reprend `screen-8`, `9a`, `9b`, `9c`, `9d` du prototype) :
  - Après le choix du profil (écran Situation), le bot demande « Qu'avez-vous déjà fait ? » avec 4 choix fermés : rien encore / déjà ALD 31 / RQTH-MDPH / médecine du travail.
  - Chacun des 4 choix affiche le vrai contenu ENDOmind (texte d'intro, fiches/livrets en « resource card », checklist), repris mot pour mot du prototype — plus de placeholder « écran à venir » sur ce parcours.
  - Navigation de fin : « Voir une autre démarche » (revient au choix des 4 étapes) et « Revenir à l'accueil » (réinitialise tout le fil) ; en plus, depuis RQTH/MDPH, un lien « Voir aussi : médecine du travail » (seul lien du prototype qui pointe vers un écran que ce build construit aussi, donc non mort).
  - ❗️ Simplification assumée faute de contenu spécifique dans la passation : le texte « par où commencer » (screen 9a) varie selon le profil choisi (nom + checklist titrée), mais la checklist elle-même est celle, unique, écrite pour « salariée » dans le prototype — rien dans `PASSATION.md` ne donne de variante par profil.
- **Hors périmètre** : le lien du prototype vers « Trouver un·e soignant·e formé·e » (screen-5, non construit — omis pour ne pas créer de lien mort) ; le RAG (les fiches restent en dur) ; les parcours « je suis perdue » et « trouver un soignant », le lexique, l'écran « Qui êtes-vous ? » — reportés, voir « À venir ».
- **Critères d'acceptation** :
  - Étant donné un profil choisi, quand le fil continue, alors la question « Qu'avez-vous déjà fait ? » et ses 4 choix apparaissent sous l'historique existant (rien n'est effacé).
  - Étant donné chacun des 4 choix, quand on clique dessus, alors le vrai contenu ENDOmind (resource card(s) + checklist) s'affiche, identique au texte du prototype pour cette branche.
  - Étant donné un contenu final affiché, quand on clique « Revenir à l'accueil », alors le fil est réinitialisé à l'écran d'accueil.
- **Hypothèse de l'équipe couverte** : « le simulateur de situation permet de savoir précisément s'il faut demander une ALD 31, un dossier MDPH ou voir la médecine du travail » — couverte pour la branche choisie, pas encore mesurée (pas d'instrumentation prévue ce build).
- **Codage estimé** : 10 minutes (plafond — contenu volumineux mais généré depuis une seule table de données, pas 4 écrans écrits à la main).
- **Fichiers prévus** : `frontend/src/app/parcours.ts`, `frontend/src/app/parcours.test.ts`, `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css`.
- **Tests unitaires prévus** : 2 à 3 tests sur la fonction qui construit le contenu d'une démarche à partir de `(demarche, profil)` (bonnes ressources, bon titre de checklist selon le profil).
- **Étapes ajoutées à la démo** : accueil → mes droits → profil → « je n'ai rien fait encore » → vérifier que la checklist et les fiches s'affichent.
- **Bilan** :
  - Durée de codage réelle : **1 minute**.
  - Critères satisfaits : la question « Qu'avez-vous déjà fait ? » et ses 4 choix s'ajoutent sous l'historique après le profil ; chacun des 4 choix affiche le vrai texte ENDOmind (intro, resource card(s), checklist) repris du prototype, plus `voirAussiMedecineDuTravail` pour relier RQTH → médecine du travail sans lien mort ; « Revenir à l'accueil » vide tout le fil (`reinitialiser`).
  - Tests : 4 tests sur `construireFil` (dont la non-régression de l'historique, la présence de la checklist et de la navigation finale) + 2 tests sur `contenuDemarche` (titre de checklist selon le profil, lien conditionnel RQTH → médecine du travail). `npm test` passe (2 + 6 tests).
  - Démo e2e mise à jour et vérifiée en headless (contrainte d'environnement : `--headed` échoue sur cette VM sans serveur X, sans rapport avec l'app) : accueil → droits → profil → « par où commencer » → checklist et fiches visibles → retour accueil.
  - Déploiement : seule l'image frontend avait changé ; rebuild/push/`compose up --force-recreate frontend`. `/health` et `/sante` (8080) répondent 200.
  - Rien reporté sur le périmètre de cette itération : les 3 critères sont satisfaits.
  - Ce que le harnais a bloqué : rien.
  - **Modifications** :
    - `frontend/src/app/parcours.ts` : ajoute `Demarche`, `ETAPES`, `contenuDemarche` (table de données des 4 démarches, reprise mot pour mot du prototype `9a`-`9d`) et étend `construireFil`/`Bloc` avec les blocs `choix-etapes`, `ressource`, `checklist`, `encadre`, `choix-nav`.
    - `frontend/src/app/parcours.test.ts` : 6 tests (4 sur `construireFil`, 2 sur `contenuDemarche`).
    - `frontend/src/app/page.tsx` : nouvel état `demarche`, rendu des nouveaux types de blocs, `reinitialiser` étendu.
    - `frontend/src/app/page.module.css` : styles `.resourceCard`/`.resourceLabel`/`.resourceTitre`/`.resourceDesc`/`.checklistBox`/`.checklistTitre`/`.checklist`.
    - `e2e/demo.spec.ts` : étapes supplémentaires jusqu'à la checklist et au retour accueil.
  - **Correction signalée par le développeur** (même itération, temps restant réutilisé) : sur l'écran générique « Écran à venir » (entrées « perdue »/« soignant », pas encore construites), le fil s'arrêtait net — seul le petit lien d'en-tête « ← Retour » permettait de revenir, aucune action dans le fil lui-même. Demande du développeur : quelle que soit l'étape, construite ou non, il faut toujours un moyen de revenir en arrière ou à l'accueil, dans le fil.
    - Correction : le bloc de navigation (`choix-nav`), jusque-là réservé à la fin d'une démarche « droits », est généralisé (`demarche` devient optionnel) et ajouté aussi après l'écran générique, avec « ↩️ Choisir une autre entrée » + « 🏠 Revenir à l'accueil ».
    - Test ajouté : l'écran générique se termine désormais par ce bloc `choix-nav` (`frontend/src/app/parcours.test.ts`). `npm test` : 6/6.
    - **Modifications** : `frontend/src/app/parcours.ts` (type `choix-nav` généralisé, bloc ajouté après l'écran générique), `frontend/src/app/parcours.test.ts` (test mis à jour), `frontend/src/app/page.tsx` (rendu conditionnel du bouton de retour selon la présence de `demarche`), `e2e/demo.spec.ts` (étape ajoutée : écran générique → retour accueil).
    - Déploiement : rebuild/push/`compose up --force-recreate frontend` ; `/health` (8080) et `/health` (8081) répondent 200 ; vérifié en Playwright headless que les deux cas (écran générique et fin de démarche) offrent bien la navigation.
    - Durée de codage de la correction : environ 2 minutes, dans le temps restant de l'itération 4 — pas une nouvelle itération.

## Itération 5 : le parcours « Trouver un soignant » va jusqu'aux ressources régionales

- **Source** : temps restant redemandé avant planification : **10 à 20 minutes**. Suite logique de l'ordre de priorité de l'équipe (`cadrage/6-plan-de-livraison.md`, parcours n°2, juste après « Mes droits »).
- **Dans le périmètre** (reprend `screen-5`, `screen-6` du prototype) :
  - Depuis l'entrée « Je cherche un·e soignant·e formé·e », le bot demande la région (13 choix fermés, repris du prototype).
  - Une fois la région choisie, le bot affiche les ressources ENDOmind de la filière régionale : carte des filières (centres de référence/compétences) et groupes de parole, suivies du rappel qu'ENDOmind ne recommande pas de soignant individuel.
  - Navigation de fin : « Revenir à l'accueil » et « Je veux aussi faire valoir mes droits » (bascule vers le parcours droits déjà construit, sans lien mort), reprises du prototype (screen-6).
  - ❗️ Simplification 1 : la question « avez-vous déjà consulté un·e soignant·e » (qui distingue niveau 1/2/3 dans le prototype) est omise — une seule réponse par région, pour tenir le budget. Signalé pour arbitrage si le temps le permet plus tard.
  - ❗️ Simplification 2 : le contenu des ressources est générique (seul le nom de la région change dans le texte) — la passation ne détaille que l'Île-de-France (adresses, hôpitaux, date de groupe de parole), aucune donnée par région n'existe pour les 12 autres.
  - ❗️ Écart assumé avec le prototype, conforme à la décision déjà actée par l'équipe : le prototype (screen-6) affiche deux soignant·es nommé·es avec adresse et lien de prise de rendez-vous ; **ceci n'est pas repris**, car `affichage de soignants nommés` est explicitement hors périmètre (voir l'en-tête de ce document, et `cadrage/6-plan-de-livraison.md` : « sans nommer de soignant individuel »).
- **Hors périmètre** : la différenciation niveau 1/2/3, les données réelles par région (hors Île-de-France), le RAG (ressources en dur) — voir « À venir ».
- **Critères d'acceptation** :
  - Étant donné l'entrée « soignant » choisie, quand le fil continue, alors la liste des régions apparaît sous l'historique existant (rien n'est effacé).
  - Étant donné une région choisie, quand le fil continue, alors les ressources ENDOmind (carte des filières, groupes de parole) et le rappel « pas de soignant nommé » s'affichent.
  - Étant donné le résultat affiché, quand on clique « Je veux aussi faire valoir mes droits », alors le parcours droits démarre (sans perdre l'historique) ; quand on clique « Revenir à l'accueil », le fil est réinitialisé.
- **Hypothèse de l'équipe couverte** : « la patiente obtient une filière de soins régionale sans sortir du chatbot ».
- **Codage estimé** : 10 minutes (plafond). Profite du refactor de navigation de la correction précédente (bloc `choix-nav` déjà généralisé) pour brancher le nouveau cas sans dupliquer la logique.
- **Fichiers prévus** : `frontend/src/app/parcours.ts`, `frontend/src/app/parcours.test.ts`, `frontend/src/app/page.tsx`.
- **Tests unitaires prévus** : 2 tests sur `construireFil` (s'arrête sur le choix de région tant qu'elle n'est pas choisie ; affiche les ressources + la navigation une fois la région choisie).
- **Étapes ajoutées à la démo** : accueil → « je cherche un·e soignant·e » → choisir une région → vérifier que les ressources s'affichent → retour accueil.
- **Bilan** :
  - Durée de codage réelle : **1 minute**.
  - Critères satisfaits : les 13 régions s'affichent sous l'historique après le choix « soignant » ; une fois la région choisie, la carte des filières et les groupes de parole s'affichent (titre personnalisé par région) avec le rappel « pas de soignant nommé » ; « Je veux aussi faire valoir mes droits » bascule vers le parcours droits sans perdre l'historique, « Revenir à l'accueil » réinitialise tout.
  - Refactor de navigation : le bloc `choix-nav` passe d'un champ `demarche` ad hoc à une liste générique `options` (action/icône/label), ce qui a permis de brancher le nouveau cas « soignant » sans dupliquer la logique de clic (`declencherNav` dans `page.tsx`), et sert aussi la navigation de l'écran générique et de fin de démarche de la correction précédente.
  - Tests : 2 tests nouveaux sur `construireFil` (arrêt sur le choix de région, ressources + navigation une fois la région choisie) + 2 tests existants adaptés à la nouvelle forme `options`. `npm test` : 8/8.
  - Démo e2e mise à jour (étape « soignant » insérée) et vérifiée en headless (même contrainte d'environnement que les itérations précédentes pour `--headed`).
  - Déploiement : rebuild/push/`compose up --force-recreate frontend` ; `/health` (8080) et `/health` (8081) répondent 200 ; parcours complet revérifié en Playwright headless contre le conteneur déployé (région → ressources → bascule droits → retour accueil).
  - Rien reporté sur le périmètre de cette itération : les 3 critères sont satisfaits. Les simplifications ❗️ (pas de niveau 1/2/3, contenu générique hors Île-de-France, pas de soignant nommé) sont assumées dès la planification, pas des reports.
  - Ce que le harnais a bloqué : rien.
  - **Modifications** :
    - `frontend/src/app/parcours.ts` : ajoute `REGIONS`/`Region`, `contenuSoignant`, la branche `soignant` dans `construireFil`, le bloc `choix-region` ; généralise `choix-nav` en `NavOption[]` (`NavAction`, `optionsNavDemarche`, `OPTIONS_NAV_GENERIQUE`, `OPTIONS_NAV_SOIGNANT`).
    - `frontend/src/app/parcours.test.ts` : 2 tests ajoutés, 2 adaptés à la forme `options`.
    - `frontend/src/app/page.tsx` : état `region`, fonction `declencherNav` unique pour tous les boutons de navigation, rendu de `choix-region`.
    - `e2e/demo.spec.ts` : étape « soignant » ajoutée.

## ⚠️ ✂️ Ce qui sort très probablement du temps de ce build

Liste ordonnée, à reprendre si du temps reste après l'itération 5 :

- Parcours Je suis perdue – branches Fertilité, Douleur quotidienne, Opération
- Lexique des termes techniques (accessible à chaque étape du parcours « je suis perdue »)
- Écran « Qui êtes-vous ? » (choix de persona, sans connexion)
- Intégration du RAG réel (remplacement des données en dur) sur le parcours droits en premier, puis soignant
- Situation sensible : contacts ENDOmind + alerte association
- Niveau 1/2/3 de la filière de soins (question « avez-vous déjà consulté »), données réelles par région
- Itération de stabilisation finale pour le pitch, quand le temps restant ne permet plus qu'une itération

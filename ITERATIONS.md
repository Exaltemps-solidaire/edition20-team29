# Plan d'itérations — ENDOmind, chatbot arborescent

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation : `cadrage/2-idees-priorisees.md` et `5-hypotheses.md` sont « Pas encore produit », pas de clé `iterations` dans `passation.json`). Le `cadrage/6-plan-de-livraison.md` de l'équipe donne l'ordre des trois parcours, repris ci-dessous.
- **Temps restant annoncé** : 30 minutes (demandé le 2026-11-18 à 16:43) ; re-demandé au début de l'itération 1 : 20 minutes (16:49). La plateforme n'était alors pas encore totalement démarrée (`postgres.internal` pas encore `healthy`). Re-demandé à la clôture de l'itération 1 (le blocage Docker Hub a consommé du temps réel non compté dans les 20 min) : **10 à 20 minutes**.
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

## Itération 3 (indicative, à détailler après l'itération 2) : parcours Mes droits — écran Étapes réalisées

⚠️ À valider par les cadreurs. Reprend `screen-8` du prototype : depuis l'écran Situation, après le choix d'un profil, demander « Qu'avez-vous déjà fait ? » (boutons fermés, ex. « Je n'ai rien fait encore »), sans encore brancher le RAG (ressources toujours en dur ou différées). Codage estimé 5 minutes — à confirmer selon le temps restant au prochain `/iteration`.

## ⚠️ ✂️ Ce qui sort très probablement du temps de ce build

Avec 30 minutes et un premier déploiement à faire, le programme complet ne tient pas. Liste ordonnée, à détailler au fil de l'eau si du temps reste après l'itération 1 :

- Mes droits – écran Par où commencer
- Mes droits – fiche ALD 31 / RQTH-MDPH / Médecine du travail + questions à poser au gynécologue
- Parcours Trouver un soignant – écran Région (filtre carte des filières de soins)
- Parcours Trouver un soignant – écran Résultats (filière régionale, sans nom de soignant)
- Parcours Je suis perdue – branches Fertilité, Douleur quotidienne, Opération
- Lexique des termes techniques (accessible à chaque étape du parcours « je suis perdue »)
- Écran « Qui êtes-vous ? » (choix de persona, sans connexion)
- Intégration du RAG réel (remplacement des données en dur) sur le parcours droits en premier
- Situation sensible : contacts ENDOmind + alerte association
- Itération de stabilisation finale pour le pitch, quand le temps restant ne permet plus qu'une itération

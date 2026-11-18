# Déploiement

Chatbot d'orientation pour les patientes nouvellement diagnostiquées d'endométriose. Construit pour l'association ENDOmind.

## Services

- `frontend` (exposé, port 8080→80) : export statique Next.js servi par nginx. Routes de santé : `/health`, `/sante`.
- `api` (port 8081) : service HTTP Node, routé par le proxy d'entrée sous `/api/*`. Routes de santé : `/health`, `/sante`.

## Services externes

- Postgres (`postgres.internal`), OpenBao (`openbao.internal`), Valkey (`valkey.internal`), magasin d'objets S3 (`host.containers.internal:9000`) : aucun n'est encore appelé par le code à ce stade (itération 1, écran d'accueil en dur). Rien ne casse s'ils sont indisponibles pour l'instant.
- Le RAG (recherche dans les documents ENDOmind) n'est pas encore branché : prévu dans une itération suivante.

## Fragile / inachevé

- Seul l'écran d'accueil (trois entrées) est codé. Les trois parcours (je suis perdue, trouver un soignant, mes droits) affichent un message « écran à venir ».
- Aucune route métier n'existe encore côté `api` : seules `/health` et `/sante` répondent.

## Contacts

- Équipe : Équipe 29 (hackathon eXaltemps Solidaire).
- Association : ENDOmind (info@endomind.org).

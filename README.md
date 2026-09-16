# Bucket V2 — constats terrain

Bucket est une application transactionnelle mobile de collecte de données terrain. Elle présente les constats attendus, guide une saisie structurée courte, conserve les preuves et l’évolution réelle d’un site, puis fournit une synthèse opérationnelle légère. Elle n’est ni un outil contractuel, ni un outil de réclamation, ni un tableau de bord BI.

## Vocabulaire et modèle métier

- Une **campagne** organise un objectif, une période, un périmètre, une audience interne et des familles de constats.
- Une **obligation de constat** décrit le travail attendu. Elle est satisfaite lorsque son `requiredCount` d’observations planifiées **terminées** est atteint.
- Un **constat** (ou observation) est une saisie terrain. Il est **planifié** (`PLANNED`) lorsqu’il est lié à une obligation, ou **complémentaire/spontané** (`AD_HOC`) lorsqu’il décrit un nouveau passage sans créer d’obligation.
- Un **brouillon** ne satisfait jamais une obligation. Son auteur peut le reprendre ou le supprimer; le responsable transverse dispose volontairement du même droit dans cette démonstration.
- Une **correction** modifie la même observation et trace les champs modifiés. Un **nouveau constat sur ce site** crée une observation distincte et ne recopie pas le résultat précédent.
- L’avancement est toujours `obligations satisfaites / obligations attendues`; les constats complémentaires n’en modifient jamais le dénominateur.

Les invariants (états temporels, seuil de sept jours, avancement, droits, validation, photo et historique) sont centralisés dans `src/domain/rules.ts`. Le repository `src/services/checkRepository.ts` reste la seule frontière entre l’interface, le mode mock et un futur accès HTTP.

## Profils et audiences

Le sélecteur de profil permet de démontrer :

- **Camille Martin**, agent de terrain de Rennes : espaces verts, propreté et affichage; élections en lecture seule.
- **Sophie Bernard**, spécialiste relations locataires Bretagne : affichage et élections; autres familles en lecture seule.
- **Delphine Leroy**, responsable transverse : vision et modification de toutes les familles, y compris tous les brouillons (arbitrage de démonstration documenté).
- **Élodie Robert**, collaboratrice interne : contribution à l’affichage permanent ouvert à `ALL_INTERNAL`, autres campagnes en lecture seule.

Le droit de contribuer combine l’audience de campagne, les rôles de famille et les permissions du profil. Le périmètre n’est qu’un préfiltre initial : toutes les agences restent consultables.

## Démonstration

Le jeu dynamique contient trois agences, six résidences, **40 obligations**, cinq campagnes et plus de quarante observations :

1. Tonte des espaces verts (active, 8 obligations);
2. Propreté sites signalés (active, 9 obligations);
3. Propreté précédente (terminée, 6 obligations);
4. Standard d’affichage permanent (active, 8 obligations, audience tous internes);
5. Élections des représentants des locataires (active, 9 obligations, exactement trois étapes par résidence).

Les dates sont générées relativement au jour du lancement. Le jeu couvre les cinq états temporels, `requiredCount = 2`, brouillons, photos facultatives et obligatoires, valeurs `Non concerné`, constats successifs, observations complémentaires et correction tracée.

### Parcours conseillés

1. **Planifié** : Camille → À faire → Espaces verts → finaliser sans photo → contrôler progression et traçabilité.
2. **Brouillon** : Propreté → saisie partielle → Enregistrer le brouillon → Mes brouillons → compléter et finaliser.
3. **Non concerné** : Propreté → noter deux zones et déclarer une zone non concernée → retrouver la synthèse dans l’historique; comparer avec « Propreté précédente ».
4. **Photo obligatoire** : Affichage → document absent → enregistrer sans photo, puis constater le blocage à la finalisation → ajouter une photo simulée.
5. **Audience** : Élodie peut modifier Affichage mais consulte Propreté en lecture seule.
6. **Compétences** : Camille consulte Élections; Sophie reprend le brouillon et finalise avec photo.
7. **Spontané** : depuis un affichage terminé → Ajouter un nouveau constat sur ce site → saisir la nouvelle réalité → vérifier que les deux restent dans l’historique.
8. **Correction** : ouvrir un constat terminé → Corriger la saisie → vérifier l’entrée d’historique sur la même observation.
9. **Carte** : basculer obligations/observations, appliquer un rayon puis cliquer un marqueur multiple et choisir explicitement l’élément.

## Installation et validation

```bash
cp .env.example .env
npm install
VITE_USE_MOCK_DATA=true npm run dev
npm run lint
npm run build
```

Le mode mock est actif sauf si `VITE_USE_MOCK_DATA=false`. La configuration MSAL et la voie HTTP sont conservées. Le conteneur reste disponible :

```bash
docker build -t bucket .
docker run --rm -p 8080:8080 bucket
```

## Architecture

- `src/domain/rules.ts` : règles métier testables et libellés.
- `src/types.ts` : contrats campagnes, audiences, familles, obligations, observations, réponses, patrimoine, profils et historique.
- `src/data/mockData.ts` : références et données relatives à la date courante.
- `src/services/checkRepository.ts` : repository mock/HTTP et opérations de sauvegarde/suppression.
- `src/features/forms/FamilyForm.tsx` : registre de quatre formulaires par `formType`.
- `src/features/map/OperationalMap.tsx` : carte, géolocalisation, rayons et sélection des marqueurs multiples.
- `src/App.tsx` : orchestration des vues Accueil, À faire, Brouillons, Carte, Historique et fiches.
- `src/ui/index.tsx` et `ui-theme/Aiguillon_design` : shell responsive et identité visuelle.

## Limites et hors périmètre

Les photos restent des métadonnées et aperçus locaux temporaires. Il n’existe aucun backend dans cette démonstration et le rechargement réinitialise les mutations mock. Sont volontairement absents : accès prestataire/locataire, authentification externe nouvelle, formulaire libre d’incident, demande de gestion, appel ou notification, ordre de service, suivi de résolution, administration complète, affectation nominative, priorisation automatique, contrat/pénalité, rapport opposable, export BI et stockage serveur des photos. Azure, Data API Builder et Entra ID ne sont pas modifiés.

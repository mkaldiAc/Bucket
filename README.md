# Bucket

Application responsive de vérifications terrain, conçue comme une base réutilisable pour des applications d'entreprise React, Azure AD et Data API Builder (DAB).

## Démarrage

```bash
cp .env.example .env
npm install
npm run dev
```

Le mode de démonstration (`VITE_USE_MOCK_DATA=true`) fournit 225 vérifications rattachées à 15 résidences de Rennes Métropole et de Bretagne. Pour utiliser DAB, positionner la variable à `false` et renseigner `VITE_API_BASE_URL`.

## Architecture

- `src/config.ts` : configuration centralisée par variables d'environnement.
- `src/services/checkRepository.ts` : frontière unique entre l'interface et les données ; implémentations mock et HTTP interchangeables.
- `src/data/mockData.ts` : tables de référence et jeu de démonstration déterministe.
- `src/types.ts` : contrats de données à reproduire dans les entités DAB.

La configuration Azure AD est préparée dans `.env.example`. Dans un déploiement d'entreprise, le service MSAL acquiert silencieusement le jeton d'accès et le repository l'injecte (en-tête `Authorization: Bearer …`) sans modifier les composants fonctionnels.

## Conteneur

```bash
docker build -t bucket .
docker run --rm -p 8080:8080 bucket
```

Le conteneur Nginx écoute sur le port 8080, compatible avec Azure Container Apps.
Les variables Vite sont intégrées au bundle au moment de la construction. Pour une image connectée à DAB et Azure AD, transmettez-les donc comme arguments de build (et non avec `docker run -e`) :

```bash
docker build -t bucket \
  --build-arg VITE_USE_MOCK_DATA=false \
  --build-arg VITE_API_BASE_URL=https://example.azurestaticapps.net/api \
  --build-arg VITE_AZURE_CLIENT_ID=<client-id> \
  --build-arg VITE_AZURE_TENANT_ID=<tenant-id> \
  --build-arg VITE_AZURE_REDIRECT_URI=https://bucket.example.com \
  --build-arg VITE_API_SCOPE=api://<client-id>/access_as_user .
```

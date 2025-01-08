
# Mini app front end/back end (Nextjs + MongoDB)
## Dépendences
- NextJS 15.1.4
- React 18
- React Redux 9.1.2
- MongoDB 6.5.0
- Express 4.19.2

## Architecture de l'application
Côté front end:
L'interface est développée avec React, et notamment NextJS. Le partage des données au sein de l'app est géré par Redux.

- Le dossier components regroupe l'ensemble des composants réutilisables
- Le dossier app regroupe l'ensemble des pages créées au sein de l'application. Chaque page (fichier page.js) est créée au sein d'un dossier portant son nom, accompagné d'une feuille de style CSS. Pour les pages avec paramères (identifiant utilisateur, etc), un sous-dossier portant le nom du paramètre doit être créé au sein du dossier de la page, dans lequel la page peut ensuite être créée (voir l'exemple des pages utilisateurs dans le dossier user/[id]/profile).
- Toujours dans le dossier app, le fichier layout.js sert de racine à l'application. Il permet d'injecter les données de store au sein de l'ensemble des pages.
- Enfin, dans le dossier app, le fichier template.js correspond au fichier de structure par défaut de l'application (il permet notamment d'afficher le header de l'application de façon automatique sur toutes les pages).
- Le dossier style regroue l'ensemble des feuilles de style créées pour les pages et composants de l'app. Chaque feuille de style est ensuite importée directement dans le fichier de la page ou du composant développés.
- Le fichier middleware.js est un plugin permettant simplement de récupérer les informations de l'utilisateur actuellement connecté (ou non). Il va notamment chercher dans les cookies du navigateur une session active, avant de faire un appel à la base de données. Dans le cas échant, il gère la redirection des utilisateurs non-connectés, vers la page de connexion. 

Côté back end:
- NextJs permet de faire tourner un serveur interne à l'application, créé via Express au sein du fichier server.js. Dans ce fichier est aussi présent la connexion à la base de données MongoDB.
- L'app possède une API interne qui permet les échanges avec la BDD, chaque endpoint étant créé  dans le dossier pages/api. La structure du dossier est identique à celle des pages: un endpoint est créé au sein d'un fichier et les endpoints d'API prenant un paramètre sous structurés dans des sous-dossiers éponymes, avec le nom du fichier d'enpoint correspondant à celui de son paramètre entre crochets (ex. : pages/api/users/[id] pour créer un endpoint du type /api/users/0000).


## Lancer l'application
```
npm i
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# TaskFlow

Un gestionnaire de tâches simple et élégant construit avec **React** et **Vite**.

L'application est entièrement fonctionnelle avec des tests unitaires et des tests d'intégration.
Votre mission est de mettre en place un pipeline CI/CD pour automatiser les tests et le déploiement.

## Démarrage

### Prérequis

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- npm (inclus avec Node.js)

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Ouvre l'application sur [http://localhost:5173](http://localhost:5173).

### Build de production

```bash
npm run build
```

Les fichiers prêts pour la production seront dans le dossier `dist/`.

## Lancer les tests

Ce projet contient deux types de tests :

### Tous les tests

```bash
npm test
```

### Tests unitaires uniquement

```bash
npm run test:unit
```

### Tests d'intégration uniquement

```bash
npm run test:integration
```

### Couverture de tests

```bash
npm run test:coverage
```

## Linter

```bash
npm run lint
```

## Structure du projet

```
├── index.html                          # Point d'entrée HTML
├── package.json                        # Dépendances et scripts
├── vite.config.js                      # Configuration Vite + Vitest
├── eslint.config.js                    # Configuration ESLint
└── src/
    ├── main.jsx                        # Point d'entrée React
    ├── App.jsx                         # Composant racine
    ├── index.css                       # Styles
    ├── test/
    │   └── setup.js                    # Configuration des tests (jest-dom matchers)
    ├── utils/
    │   ├── taskHelpers.js              # Fonctions utilitaires pures
    │   └── __tests__/
    │       └── taskHelpers.test.js     # Tests unitaires des utilitaires
    ├── components/
    │   ├── TaskForm.jsx                # Formulaire d'ajout de tâche
    │   ├── TaskItem.jsx                # Ligne de tâche individuelle
    │   ├── TaskList.jsx                # Conteneur de la liste de tâches
    │   ├── TaskFilters.jsx             # Boutons de filtre + compteur
    │   └── __tests__/
    │       ├── TaskForm.test.jsx       # Tests unitaires
    │       ├── TaskItem.test.jsx       # Tests unitaires
    │       └── TaskFilters.test.jsx    # Tests unitaires
    └── __tests__/
        └── App.integration.test.jsx    # Tests d'intégration
```

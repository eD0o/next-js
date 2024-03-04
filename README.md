# 1 - Introduction

Next.js vs React:

> React (Vite/CRA)

- Runs in the browser (client)
- Serves pages that are populated by JavaScript
- Can negatively impact SEO
- Depends on plugins (react-router)
- Deployment can be done on any hosting

> Next.js

- Runs in the browser (client) and on the server (server)
- Serves pages already rendered on the server (SSR)
- Can improve SEO and initial loading
- Try to be a complete solution (routes, API, etc.)
- It's a framework, so it gives you more rules
- Deployment must be done on a Node.js server
- Bugs, changes and updates

Tools:

VS Code, Node, Git, NPM e TypeScript

settings.json:

```json
{
  "files.associations": {
    "*.js": "javascriptreact",
    "*.tsx": "typescriptreact"
  },
  "prettier.trailingComma": "all",
  "prettier.singleQuote": true,
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
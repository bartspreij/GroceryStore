# React + TypeScript + Vite + ESlint(airbnb) + Prettier

This template provides a minimal setup to get React working in Vite with HMR and airbnb's eslint config extending prettier.

## Rules changed
 The following rules are changed in `.eslintrc.cjs`:

```js
rules: {
        'react/react-in-jsx-scope': 0,
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
    },
```

And the following prettier rules in `.prettierrc.mjs`
```js
/** @type {import("prettier").Config} */
const config = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: true,
  };
  
export default config;
```



# < Component Docs to Markdown />

Using (react-docgen)[], this module creates docs for your react components folder according to this format:

----
## `<MyComponent1/>`


General MyComponent1 description.

prop | type | description
--- | --- | ---
`foo` | `Number` | Description of prop "foo".
`bar` | `Custom` | Description of prop "bar" (a custom validation function).
`baz` | `Union` | *no description given*
<br/>


---

## Install
```
yarn add comoponent-docs-2md --dev
```

## Usage
In `package.json`
```json
"scripts":{
  "componentDocs": "component-docs-2md ./src/components"
}
```

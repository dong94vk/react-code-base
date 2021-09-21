## Style Guide

- __"MUST"__ means required. Developers must abide by these conventions before merging into master.
- __"SHOULD"__ means recommended. During code reviews, it is common for many small issues to be raised. While it is not critical for developers to fix all of these notes, they are encouraged to stay as close to the style guidelines as possible.

#### General

- __[SHOULD]__ Use `camelCase`. but, `request.js`'s parameters needs `snake_case`.
- __[SHOULD]__ Use `isXxxx` to flag parameters. like `isOpen`, `isShown`
- __[SHOULD]__ Use [form `<input>` element](https://developer.mozilla.org/ja/docs/Web/HTML/Element/Input)'s Global Attributes, even if it is flag parameter. like `disable`, `readonly`
- __[SHOULD]__ Use `onXxxx` to event functions. like `onClose`, `onUpdate`
- __[SHOULD]__ Use `handleXxxx` to handle child components props. like `handleClose`

#### react

- __[SHOULD]__ Put `Container` Component to `src/containers`. Put `Presentation` Component to `src/components`, `src/components/ui`.
  - Reference : [Presentational and Container Components](https://jaketrent.com/post/smart-dumb-components-react/  https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

#### scss

- __[SHOULD]__ `@media` syntax put last part of style class. It make easy to recognize what to do in style class.
- __[SHOULD]__ Write your CSS rules without vendor prefixes
- Reference: https://www.npmjs.com/package/autoprefixer
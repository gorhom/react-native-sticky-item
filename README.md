<div align="center">
<h1>Sticky Item</h1>

[![npm](https://badgen.net/npm/v/@gorhom/sticky-item)](https://www.npmjs.com/package/@gorhom/sticky-item) [![npm](https://badgen.net/npm/license/@gorhom/sticky-item)](https://www.npmjs.com/package/@gorhom/sticky-item) [![npm](https://badgen.net/npm/types/@gorhom/sticky-item)](https://www.npmjs.com/package/@gorhom/sticky-item)

<img src="./preview.gif">

An interactive sticky item inspired by Facebook Stories.

</div>

---

## Installation

```sh
yarn add @gorhom/sticky-item
# or
npm install @gorhom/sticky-item
```

> Also, you need to install [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated), [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) & [react-native-svg](https://github.com/react-native-community/react-native-svg), and follow theirs installation instructions.

## Usage

```tsx
```

## Props

| name                         | description                                                                                       | required | type                              | default |
| ---------------------------- | ------------------------------------------------------------------------------------------------- | -------- | --------------------------------- | ------- |
| `itemWidth`                  | Item's width.                                                                                     | YES      | number                            |         |
| `itemHeight`                 | Item's height.                                                                                    | YES      | number                            |         |
| `separatorSize`              | Flat list separator witdh.                                                                        | NO       | number                            | 10      |
| `borderRadius`               | Item & sticky border radius.                                                                      | NO       | number                            | 15      |
| `stickyItemWidth`            | Sticky item's width.                                                                              | YES      | number                            |         |
| `stickyItemHeight`           | Sticky item's height.                                                                             | YES      | number                            |         |
| `stickyItemBackgroundColors` | Sticky item's two background colors, one when sticky item is extended another when it's minimise. | YES      | string[]                          |         |
| `stickyItemContent`          | Sticky item's content component.                                                                  | YES      | [`ReactNode`](./src/types.ts#L30) |         |
| `onStickyItemPress`          | Callback when sticky item gets pressed.                                                           | NO       | function                          |

## To Do

- [ ] Add more examples.

<h2 id="built-with">Built With ❤️</h2>

- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
- [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler)
- [react-native-redash](https://github.com/wcandillon/react-native-redash)
- [react-native-svg](https://github.com/react-native-community/react-native-svg)
- [@react-native-community/bob](https://github.com/react-native-community/bob)

## Author

- [Mo Gorhom](https://twitter.com/gorhom)

## License

MIT

<div align="center">

Liked the library? 😇

<a href="https://www.buymeacoffee.com/gorhom" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-red.png" alt="Buy Me A Coffee" height="50" ></a>

</div>

---

<p align="center">
<a href="https://twitter.com/gorhom"><img src="./logo.png"></a>
</p>

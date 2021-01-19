# Changelog

## [v2.1.0](https://github.com/gorhom/react-native-sticky-item/compare/v2.0.0...v2.1.0)

#### Features

- feat: added reanimated 2 support ([`#19`](https://github.com/gorhom/react-native-sticky-item/pull/19)).

#### Improvements

- chore: updated dependencies ([1fbca83](https://github.com/gorhom/react-native-sticky-item/commit/1fbca835538d4f280da161ffa0f16c69eb56a3de)).
- chore: updated examples styling ([4b744ea](https://github.com/gorhom/react-native-sticky-item/commit/4b744ea96f6a1b5613203a7c208d714acb7762ca)).
- chore: added auto-changelog config ([ed464a0](https://github.com/gorhom/react-native-sticky-item/commit/ed464a0d61b880cd3dd83a3e8d11b34ad5fb87c6)).
- refactor: updated animated thread to be UI instead of native ([b6d7499](https://github.com/gorhom/react-native-sticky-item/commit/b6d74993eca2d0f02b7029aecba44edc39de296a)).

## [v2.0.0](https://github.com/gorhom/react-native-sticky-item/compare/v1.3.2...v2.0.0) - 2020-06-04

#### Improvements

- refactor: updated pointerevents handling (#15) ([ff49f5e](https://github.com/gorhom/react-native-sticky-item/commit/ff49f5ea26f44a60bbb1f3531e3b8f75f7281bad)).

#### Fixes

- fix: sticky item width calculation ([`#14`](https://github.com/gorhom/react-native-sticky-item/pull/14)).
- fix: fixed pointerevents on android (#15) ([1295c95](https://github.com/gorhom/react-native-sticky-item/commit/1295c953bfa4cdce0e8eed882ffe7f556990930e)).

## [v1.3.2](https://github.com/gorhom/react-native-sticky-item/compare/v1.3.1...v1.3.2) - 2020-06-03

#### Fixes

- fix: updated sticky item pointerevents to solve pressable area (#15) ([1e0af37](https://github.com/gorhom/react-native-sticky-item/commit/1e0af378ea41aaafa36bc87a3d716067cf7f0d79)).

## [v1.3.1](https://github.com/gorhom/react-native-sticky-item/compare/v1.3.0...v1.3.1) - 2020-06-01

#### Fixes

- Revert "fix: sticky item width calculation (#13)"

This reverts commit e5b246b54604d3c2bed0dc675cf6df483182e8cc. ([206420f](https://github.com/gorhom/react-native-sticky-item/commit/206420f295a9d1f84914ba13586e146ecb2dd03e)).

## [v1.3.0](https://github.com/gorhom/react-native-sticky-item/compare/v1.2.1...v1.3.0) - 2020-06-01

#### Features

- feat: allow custom separator, optimise current one by @Hirbod (#9) ([`#11`](https://github.com/gorhom/react-native-sticky-item/pull/11)).

#### Improvements

- chore: add sticky item active effect ([`#10`](https://github.com/gorhom/react-native-sticky-item/pull/10)).
- chore: allow decelerationRate to be overrided ([c0e2359](https://github.com/gorhom/react-native-sticky-item/commit/c0e23590dbc440e44a468ebb5fde2a5db9f616da)).

#### Fixes

- fix: sticky item width calculation ([`#13`](https://github.com/gorhom/react-native-sticky-item/pull/13)).

## [v1.2.1](https://github.com/gorhom/react-native-sticky-item/compare/v1.2.0...v1.2.1) - 2020-05-28

#### Fixes

- fix: fixed the hitslop and pointerevent for android ([7062ab9](https://github.com/gorhom/react-native-sticky-item/commit/7062ab9cc97d8352ef26e2e5a1dee04081110bbe)).

## [v1.2.0](https://github.com/gorhom/react-native-sticky-item/compare/v1.1.2...v1.2.0) - 2020-05-28

#### Features

- feat: handle initial index ([`#6`](https://github.com/gorhom/react-native-sticky-item/pull/6)).

## [v1.1.2](https://github.com/gorhom/react-native-sticky-item/compare/v1.1.1...v1.1.2) - 2020-05-25

#### Improvements

- chore: forward FlatList ref ([`#3`](https://github.com/gorhom/react-native-sticky-item/pull/3)).

## [v1.1.1](https://github.com/gorhom/react-native-sticky-item/compare/v1.1.0...v1.1.1) - 2020-05-03

#### Improvements

- chore: downgrade autochangelog ([0378b97](https://github.com/gorhom/react-native-sticky-item/commit/0378b97a3a58819dd25a15cb0e9be69af7df560f)).

## v1.1.0 - 2020-05-03

#### Features

- feat: added RTL support ([`#1`](https://github.com/gorhom/react-native-sticky-item/pull/1)).

#### Improvements

- chore: updated example icon ([50f92b5](https://github.com/gorhom/react-native-sticky-item/commit/50f92b59c6c87b93138980c6ef5561a18e7a74df)).
- chore: added basic example ([e3e7169](https://github.com/gorhom/react-native-sticky-item/commit/e3e71691dd91a51d7997b4d8a599e54671eee693)).
- chore: added onStickyItemPress callback ([8c248b5](https://github.com/gorhom/react-native-sticky-item/commit/8c248b5aba7d125d1e46e7bbc0bff78c741ab1d1)).
- refactor: updated examples ([4fbb383](https://github.com/gorhom/react-native-sticky-item/commit/4fbb38386fbee2ef36289a7a0ca958a48172345a)).
- chore: updated default props ([ff98c99](https://github.com/gorhom/react-native-sticky-item/commit/ff98c997f753ba8093db62873c8c42c54adab936)).
- refactor: updated basic rtl example ([0c499ec](https://github.com/gorhom/react-native-sticky-item/commit/0c499ec0e8024c91ac0b8f64b9ef2985e4c4d73b)).
- chore: updated examples styling ([08decb0](https://github.com/gorhom/react-native-sticky-item/commit/08decb02208b69ba10bdc1e77e8bcfbcac186276)).
- chore: added commitlint/cli ([d8df485](https://github.com/gorhom/react-native-sticky-item/commit/d8df485b9dfbb5c4783ff21c9426269fa08d26cf)).
- chore: added auto-changelog ([ddd60cf](https://github.com/gorhom/react-native-sticky-item/commit/ddd60cff1536272c03cc649a17e1f63065366bcb)).
- chore: fix tsc warning ([4b3fe29](https://github.com/gorhom/react-native-sticky-item/commit/4b3fe2911323a2f516acf3d3795ed6423b875a0a)).

#### Fixes

- fix: fixed tapgesture hitslop ([139f2d3](https://github.com/gorhom/react-native-sticky-item/commit/139f2d312fb841c54f97cd1c106f3bf1bc1c4aac)).

#### Documentations

- docs: added usage example in the readme file ([06a7946](https://github.com/gorhom/react-native-sticky-item/commit/06a7946126267d60046efc8fdcc3afc6826a8098)).
- docs: fixed some typos ([4568ff6](https://github.com/gorhom/react-native-sticky-item/commit/4568ff6dde6c1af4e6b926c7fd340d5bf2655b8d)).
- docs: update readme file ([55dec24](https://github.com/gorhom/react-native-sticky-item/commit/55dec24c5033872324d16ac1bd264a09327c1420)).
- docs: added preview gif ([54808fa](https://github.com/gorhom/react-native-sticky-item/commit/54808fabc103aa106119506206880006a3bd8a87)).

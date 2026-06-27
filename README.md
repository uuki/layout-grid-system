# Layout Grid System

[![CI](https://github.com/uuki/layout-grid-system/actions/workflows/ci.yml/badge.svg)](https://github.com/uuki/layout-grid-system/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/uuki/4b583d8176ca39b321c1034ee59eec5f/raw/lgs-coverage.json)](https://github.com/uuki/layout-grid-system/actions/workflows/ci.yml)

> A Sass-based layout system for building reusable, token-driven global layouts with CSS Grid.

Layout Grid System provides a consistent way to build page layouts and reusable components around a single layout coordinate system.

Unlike traditional CSS Grid approaches that rely on ancestor grids or extensive `subgrid` usage, Layout Grid System allows any component to recreate the same global layout grid explicitly.

---

## Why?

Large projects often encounter problems such as:

* Deeply nested components cannot align to the page grid.
* Components become tightly coupled to ancestor layouts.
* Layout values are duplicated across projects.
* Grid utilities only work inside specific containers.
* `subgrid` requires every intermediate ancestor to participate.

Layout Grid System solves these problems by introducing a reusable **layout context**.

---

## Features

* CSS Grid based
* Token-driven layout system
* Global and local grid modes
* Global Fluid mode
* Explicit layout contexts
* Utility classes and Sass Mixins
* Responsive by design
* Backward compatible placement syntax
* Supports named grid lines
* Supports named grid areas

---

## Philosophy

Layout Grid System separates layout into three independent responsibilities.

| Responsibility                      | API           |
| ----------------------------------- | ------------- |
| Create a grid container             | `container()` |
| Position an element                 | `place()`     |
| Recreate a layout coordinate system | `context()`   |

This separation keeps components independent while allowing them to share the same layout language.

---

# Example

```scss
.page {
    @include grid.container(global);
}

.hero {
    @include grid.place((
        column: (1, 10),
    ));
}

.sidebar {
    @include grid.place((
        column: (11, 16),
    ));
}
```

---

## Recreating the Global Grid

A component may recreate the global layout for its descendants.

```scss
.hero {

    @include grid.place((
        column: (1, 10),
    ));

    @include grid.context(global);

}
```

Children can now position themselves using the page grid again.

```scss
.hero__title {

    @include grid.place((
        column: (
            start: 5,
            span: 4,
        ),
    ));

}
```

---

# Coordinate System

Every placement belongs to a layout context.

```text
Viewport

Global Layout Grid

1  2  3  4  5  6  7  8
9 10 11 12 13 14 15 16
```

The documentation uses a **16-column grid** for demonstration purposes.

The actual number of columns is completely configurable through layout tokens.

---

# Layout Modes

## Local

Uses the current container width.

```scss
@include grid.container();
```

Recommended for component layouts.

---

## Global

Uses the viewport width.

```scss
@include grid.container(global);
```

Recommended for page layouts.

---

## Global Fluid

Uses the global column width while respecting the available width of the parent container.

```scss
@include grid.container(fluid);
```

Recommended for reusable components.

---

# Placement

The shorthand syntax remains supported.

```scss
@include grid.place((
    column: (1, 4),
));
```

Equivalent to

```css
grid-column: 1 / 5;
```

---

More expressive syntax is also available.

```scss
@include grid.place((
    column: (
        start: 5,
        span: 4,
    ),
));
```

```scss
@include grid.place((
    column: (
        start-line: content-start,
        end-line: content-end,
    ),
));
```

```scss
@include grid.place((
    area: hero,
));
```

---

# Layout Tokens

The entire system is configured through CSS Custom Properties.

```css
:root {

    --lgs-grid-columns: 16;

    --lgs-grid-rows: 1;

    --lgs-grid-column-gap: 2rem;

    --lgs-grid-row-gap: 3rem;

    --lgs-grid-gutter: 2rem;

}
```

Changing these values updates every generated grid.

---

# Utility Classes

Every Sass API has an equivalent utility class.

| Sass                | Utility               |
| ------------------- | --------------------- |
| `container()`       | `u-grid`              |
| `container(global)` | `u-grid-global`       |
| `container(fluid)`  | `u-grid-global-fluid` |
| `place(column)`     | `u-grid-col-*`        |
| `place(row)`        | `u-grid-row-*`        |

Choose whichever style best fits your project.

---

# Documentation

| Document            | Description                    |
| ------------------- | ------------------------------ |
| `docs/concepts.md`  | Core concepts and architecture |
| `docs/examples.md`  | Practical examples             |
| `docs/mixins.md`    | Sass API reference             |
| `docs/utilities.md` | Utility class reference        |
| `docs/tokens.md`    | Layout tokens                  |
| `docs/migration.md` | Migration guide                |

---

# Design Principles

* One source of truth for layout values.
* Components should not depend on ancestor grids.
* Layout contexts should be recreated explicitly.
* Utility classes and Mixins should provide equivalent capabilities.
* Layout APIs should remain predictable and composable.
* Backward compatibility should be preserved whenever practical.

---

# Browser Support

Layout Grid System requires modern browsers supporting:

* CSS Grid
* CSS Custom Properties

Optional features may additionally rely on:

* CSS Subgrid

---

# License

MIT

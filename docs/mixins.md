# Mixins Reference

This document describes all Sass Mixins provided by **Layout Grid System**.

All mixins are designed to be **1:1 equivalent with utility classes**, ensuring consistent behavior regardless of usage style.

---

# Table of Contents

* Overview
* container()
* context()
* place()
* Placement API

  * column
  * row
  * area
* Extended Syntax

  * start / end
  * span
  * start-line / end-line
* Responsive Usage
* Design Notes

---

# Overview

The system is composed of three core mixins:

| Mixin         | Responsibility                       |
| ------------- | ------------------------------------ |
| `container()` | Defines a grid container             |
| `context()`   | Recreates a layout coordinate system |
| `place()`     | Positions an element                 |

These three form the foundation of all layout behavior.

---

# container()

Creates a CSS Grid container.

## Signature

```scss id="c7q2lm"
@mixin container($mode: local)
```

## Parameters

| Mode     | Description                       |
| -------- | --------------------------------- |
| `local`  | Container-based grid              |
| `global` | Viewport-based global grid        |
| `fluid`  | Global grid constrained by parent |

---

## Local Grid

```scss id="k2v8aa"
.card {
  @include grid.container();
}
```

---

## Global Grid

```scss id="p9x1zz"
.page {
  @include grid.container(global);
}
```

---

## Global Fluid Grid

```scss id="m7q2aa"
.section {
  @include grid.container(fluid);
}
```

---

# context()

Recreates a layout coordinate system for descendants.

## Signature

```scss id="q1m8bb"
@mixin context($mode: local)
```

## Purpose

Allows deeply nested components to re-access the same layout grid.

---

## Example

```scss id="h8k2aa"
.hero {
  @include grid.place((
    column: (1, 10),
  ));

  @include grid.context(global);
}
```

---

## Behavior

| Mode     | Effect                       |
| -------- | ---------------------------- |
| `global` | Recreates global layout grid |
| `fluid`  | Recreates fluid grid         |
| `local`  | Recreates local grid         |

---

# place()

Positions an element inside the current grid context.

## Signature

```scss id="b7m1cc"
@mixin place($map)
```

---

## Basic Usage

```scss id="v1x9dd"
.box {
  @include grid.place((
    column: (1, 4),
  ));
}
```

---

## column API

### Range

```scss id="k9p3aa"
column: (1, 4)
```

Equivalent to:

```css id="x1q2bb"
grid-column: 1 / 5;
```

---

### Start

```scss id="m2c8dd"
column: (
  start: 5,
)
```

---

### End

```scss id="p4z1ee"
column: (
  end: 16,
)
```

---

### Span

```scss id="q8n3ff"
column: (
  span: 4,
)
```

---

### Start + Span

```scss id="t2k9gg"
column: (
  start: 5,
  span: 6,
)
```

---

# Named Grid Lines

```scss id="h6m1hh"
column: (
  start-line: content-start,
  end-line: content-end,
)
```

---

# Named Areas

```scss id="b8v2ii"
@include grid.place((
  area: hero,
));
```

---

# Row Placement

Same API applies to rows.

```scss id="c9x3jj"
@include grid.place((
  row: (1, 3),
));
```

```scss id="d1z4kk"
@include grid.place((
  row: (
    span: 2,
  ),
));
```

---

# Responsive Usage

Mixins work with media queries.

```scss id="h5d8oo"
@media (--sm) {
  .page {
    @include grid.container();
  }
}

@media (--md) {
  .page {
    @include grid.container(global);
  }
}
```

---

# Extended Syntax

## start-line / end-line

```scss id="i6e9pp"
@include grid.place((
  column: (
    start-line: content-start,
    end-line: content-end,
  ),
));
```

---

## Combined usage

```scss id="j7f0qq"
@include grid.place((
  column: (
    start: 3,
    span: 5,
  ),
));
```

---

# Design Notes

## 1. Separation of responsibilities

* `container()` → defines grid
* `context()` → redefines coordinate system
* `place()` → positions elements

---

## 2. No implicit inheritance

All layout sharing must be explicit via `context()`.

---

## 3. Token-driven system

All spacing and column definitions rely on CSS variables.

---

## 4. Utility parity

Every mixin has a corresponding utility class.

| Mixin             | Utility       |
| ----------------- | ------------- |
| container         | u-grid        |
| container(global) | u-grid-global |
| place             | u-grid-col-*  |

---

# Summary

Mixins provide a declarative API over CSS Grid while maintaining strict consistency with utility classes.

They are designed to:

* Keep layout predictable
* Avoid implicit inheritance
* Support deeply nested structures
* Enable global coordinate reuse

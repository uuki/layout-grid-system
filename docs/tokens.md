# Layout Tokens

This document describes the token system used by **Layout Grid System**.

All layout behavior is driven by CSS Custom Properties to ensure consistency, predictability, and global control over layout structure.

---

# Table of Contents

* Overview
* Core Tokens
* Column System
* Row System
* Spacing Tokens
* Breakpoints
* Global vs Local Impact
* Token Inheritance Model
* Best Practices

---

# Overview

Layout Grid System is fully token-driven.

Instead of hardcoding layout values in components, all grid behavior is derived from a shared token layer.

```text id="k2m8aa"
Tokens → Grid System → Container → Place → Layout Output
```

This ensures:

* consistent layout across components
* centralized control
* predictable responsive behavior

---

# Core Tokens

The system is based on the following core tokens:

```css id="t1a9bb"
:root {

  --lgs-grid-columns: 16;

  --lgs-grid-rows: 1;

  --lgs-grid-column-gap: 2rem;

  --lgs-grid-row-gap: 3rem;

  --lgs-grid-gutter: 2rem;

}
```

---

# Column System

## --lgs-grid-columns

Defines the number of columns in the grid.

```css id="c3b2cc"
--lgs-grid-columns: 16;
```

### Effects

* Affects `container()`
* Affects `context()`
* Affects `place()`

### Example

```text id="m8d1dd"
1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16
```

---

# Row System

## --lgs-grid-rows

Defines the number of implicit rows.

```css id="n9e2ee"
--lgs-grid-rows: 1;
```

### Usage

Primarily used for:

* vertical layout structure
* section-based layouts
* explicit row placement

---

# Spacing Tokens

## --lgs-grid-column-gap

Defines spacing between columns.

```css id="p1f3ff"
--lgs-grid-column-gap: 2rem;
```

---

## --lgs-grid-row-gap

Defines spacing between rows.

```css id="q2g4gg"
--lgs-grid-row-gap: 3rem;
```

---

## --lgs-grid-gutter

Defines outer padding of the grid system.

```css id="r3h5hh"
--lgs-grid-gutter: 2rem;
```

Used in:

* `container(global)`
* `container(fluid)`

---

# Layout Calculation Model

Global Grid is computed using:

```text id="s4i6ii"
column width =
(100svw - (gutter * 2) - (gap * (columns - 1))) / columns
```

This ensures:

* consistent column width across viewport
* predictable alignment
* independent of content hierarchy

---

# Breakpoints

Tokens are typically overridden per breakpoint.

## sm

```scss id="t5j7jj"
@media (--sm) {
  :root {
    --lgs-grid-columns: 4;
    --lgs-grid-column-gap: 1rem;
    --lgs-grid-gutter: 1rem;
  }
}
```

---

## md

```scss id="u6k8kk"
@media (--md) {
  :root {
    --lgs-grid-columns: 16;
    --lgs-grid-column-gap: 2rem;
    --lgs-grid-gutter: 2rem;
  }
}
```

---

# Global vs Local Impact

| Token               | Local Grid | Global Grid | Fluid Grid |
| ------------------- | ---------- | ----------- | ---------- |
| `--lgs-grid-columns`    | ✓          | ✓           | ✓          |
| `--lgs-grid-column-gap` | ✓          | ✓           | ✓          |
| `--lgs-grid-gutter`     | ✗          | ✓           | ✓          |

---

# Token Inheritance Model

Tokens are inherited through CSS cascade.

```text id="v7l9ll"
:root
  ↓
section overrides
  ↓
component overrides
  ↓
grid system
```

---

## Override Example

```scss id="w8m0mm"
.section {
  --lgs-grid-columns: 8;
}
```

This affects only grids inside `.section`.

---

# Advanced Tokens (Optional)

These are optional extensions for advanced layouts.

## --lgs-grid-max-width

```css id="x9n1nn"
--lgs-grid-max-width: 1440px;
```

Used for limiting global layout width.

---

## --lgs-grid-min-column-width

```css id="y0o2oo"
--lgs-grid-min-column-width: 60px;
```

Used for responsive safety constraints.

---

# Best Practices

## Prefer global tokens

Avoid:

```scss id="z1p3pp"
grid-template-columns: repeat(12, 1fr);
```

Prefer:

```scss id="a2q4qq"
@include grid.container(global);
```

---

## Do not hardcode spacing

Avoid:

```css id="b3r5rr"
gap: 32px;
```

Prefer:

```css id="c4s6ss"
gap: var(--lgs-grid-column-gap);
```

---

## Override only at boundaries

Tokens should not be randomly overridden inside components.

Good:

```scss id="d5t7tt"
.page {
  --lgs-grid-columns: 16;
}
```

Bad:

```scss id="e6u8uu"
.card {
  --lgs-grid-columns: 3;
}
```

---

# Summary

Layout tokens are the foundation of the entire system.

They ensure that:

* grids remain consistent across the application
* layouts can be changed globally without rewriting components
* responsive behavior is centralized
* global and local grids share a single source of truth

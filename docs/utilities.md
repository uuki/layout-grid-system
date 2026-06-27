# Utilities

This document describes the utility class system of **Layout Grid System**.

Utilities are a class-based interface that mirrors the Sass mixin API one-to-one, allowing layout to be expressed without Sass.

---

# Table of Contents

* Overview
* Naming Convention
* Container Utilities
* Placement Utilities
* Responsive Utilities
* Global vs Local Utilities
* Utility Composition
* Comparison with Mixins
* Best Practices

---

# Overview

Every Sass mixin has an equivalent utility class.

| Sass API                       | Utility                  |
| ------------------------------ | ------------------------ |
| `container()`                  | `u-grid`                 |
| `container(global)`            | `u-grid-global`          |
| `container(fluid)`             | `u-grid-global-fluid`    |
| `place(column: (1, 4))`        | `u-grid-col-1:4`         |
| `place(column: (start: 5))`    | `u-grid-col-start-5`     |
| `place(column: (end: 12))`     | `u-grid-col-end-12`      |
| `place(column: (span: 4))`     | `u-grid-col-span-4`      |
| `place(row: (start: 1))`       | `u-grid-row-start-1`     |
| `place(row: (span: 2))`        | `u-grid-row-span-2`      |

Utilities are designed to be:

* framework-agnostic
* HTML-only usable
* breakpoint-friendly
* consistent with mixin behavior

---

# Naming Convention

## Base Pattern

```
u-grid-[mode]
```

```
u-grid-col-[start]:[end]
u-grid-col-start-[n]
u-grid-col-end-[n]
u-grid-col-span-[n]
u-grid-row-[start]:[end]
u-grid-row-start-[n]
u-grid-row-span-[n]
```

---

## Responsive Pattern

```
sm:u-grid-col-1:4
md:u-grid-col-1:12
```

Media queries are applied via prefix notation.

---

# Container Utilities

## Local Grid

```html id="a1b2cc"
<div class="u-grid">
```

Creates a container-based grid.

---

## Global Grid

```html id="c3d4dd"
<div class="u-grid-global">
```

Uses viewport-based layout grid.

---

## Global Fluid Grid

```html id="e5f6ee"
<div class="u-grid-global-fluid">
```

Global column sizing with container constraint.

---

# Placement Utilities

## Range Syntax

```html id="g7h8ff"
<div class="u-grid-col-1:8"></div>
```

Equivalent to:

```css id="i9j0gg"
grid-column: 1 / 9;
```

---

## Span Syntax

```html id="k1l2hh"
<div class="u-grid-col-span-4"></div>
```

---

## Start-only Syntax

```html id="m3n4ii"
<div class="u-grid-col-start-5"></div>
```

Sets `grid-column-start` only. The end line is determined by the grid or content.

---

## End-only Syntax

```html id="p2q3jj"
<div class="u-grid-col-end-12"></div>
```

Equivalent to:

```css id="r4s5kk"
grid-column-end: 13;
```

The end value is inclusive — `u-grid-col-end-12` places the element so its last column is column 12.

---

## Row Utilities

```html id="o5p6jj"
<div class="md:u-grid-row-start-1"></div>
<div class="md:u-grid-row-span-2"></div>
```

---

# Responsive Utilities

## Mobile / Desktop Split

```html id="q7r8kk"
<section class="sm:u-grid-global md:u-grid-global"></section>
```

---

## Responsive Placement

```html id="s9t0ll"
<div class="sm:u-grid-col-1:4 md:u-grid-col-1:12"></div>
```

---

## Token-driven breakpoint behavior

Utilities automatically adapt to:

* `--lgs-grid-columns`
* `--lgs-grid-column-gap`
* `--lgs-grid-gutter`

---

# Global vs Local Utilities

## Local

```html id="u1v2mm"
<div class="u-grid">
```

Scoped to element width.

---

## Global

```html id="w3x4nn"
<div class="u-grid-global">
```

Viewport-based layout system.

---

## Fluid

```html id="y5z6oo"
<div class="u-grid-global-fluid">
```

Hybrid of global alignment and container safety.

---

# Utility Composition

Utilities can be combined freely.

## Example: Page Layout

```html id="a7b8pp"
<section class="u-grid-global">
  <header class="u-grid-col-1:16"></header>
</section>
```

---

## Example: Sidebar Layout

```html id="c9d0qq"
<section class="u-grid-global">
  <main class="u-grid-col-1:12"></main>
  <aside class="u-grid-col-13:16"></aside>
</section>
```

---

## Example: Nested Structure

```html id="e1f2rr"
<div class="u-grid-global">
  <div class="u-grid-col-1:10">
    <div class="u-grid-global">
      <div class="u-grid-col-3:8"></div>
    </div>
  </div>
</div>
```

---

# Comparison with Mixins

| Feature            | Utility           | Mixin             |
| ------------------ | ----------------- | ----------------- |
| Usage              | HTML only         | Sass              |
| Flexibility        | medium            | high              |
| Type safety        | none              | strong            |
| Maintainability    | medium            | high              |
| Performance impact | none (build-time) | none (build-time) |

---

# When to Use Utilities

## Recommended

* CMS-driven layouts
* static HTML environments
* simple pages
* rapid prototyping

---

## Avoid

* deeply nested layout logic
* complex conditional layouts
* design system-level abstractions

Prefer mixins in those cases.

---

# Best Practices

## Prefer global container at top level

```html id="g3h4ss"
<section class="u-grid-global">
```

---

## Avoid mixing unrelated utilities

Bad:

```html id="i5j6tt"
<div class="u-grid u-grid-global">
```

---

## Prefer token-driven consistency

Avoid:

```html id="k7l8uu"
<div style="grid-template-columns: repeat(12, 1fr)">
```

Prefer:

```html id="m9n0vv"
<div class="u-grid-global">
```

---

## Use responsive utilities sparingly

Overuse leads to fragmentation.

Prefer token overrides instead when possible.

---

# Summary

Utilities provide a lightweight, HTML-first interface to Layout Grid System.

They are designed to:

* mirror mixin behavior
* support responsive layouts
* reduce Sass dependency
* remain predictable across projects

Together with mixins and tokens, they form a unified layout language.

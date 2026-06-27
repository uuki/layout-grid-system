# Examples

Practical examples of Layout Grid System usage.

---

# Table of Contents

1. [Basic Examples](#1-basic-examples)
2. [Layout Patterns](#2-layout-patterns)
3. [Component Patterns](#3-component-patterns)
4. [Responsive Patterns](#4-responsive-patterns)
5. [Advanced Patterns](#5-advanced-patterns)

---

# 1. Basic Examples

## Local Grid

A container-based grid that uses the element's own width.

```scss
.card {
  @include grid.container();
}
```

```css
/* output */
.card {
  display: grid;
  grid-template-columns: repeat(var(--lgs-grid-columns), minmax(0, 1fr));
  grid-template-rows: repeat(var(--lgs-grid-rows), auto);
  column-gap: var(--lgs-grid-column-gap);
  row-gap: var(--lgs-grid-row-gap);
}
```

---

## Global Grid

A viewport-based grid. Column widths are derived from the viewport, gutter, and column count.

```scss
.page {
  @include grid.container(global);
}
```

---

## Global Fluid

Uses global column widths while remaining constrained by the parent element's available width.

```scss
.section {
  @include grid.container(fluid);
}
```

---

## place() — Range

Place an element across a specific column range. End value is inclusive.

```scss
.hero {
  @include grid.place((
    column: (1, 12),
  ));
}
```

```css
/* output */
.hero {
  grid-column: 1 / 13;
}
```

---

## place() — Start

Set only the starting column line.

```scss
.item {
  @include grid.place((
    column: (
      start: 5,
    ),
  ));
}
```

```css
/* output */
.item {
  grid-column-start: 5;
}
```

---

## place() — End

Set only the ending column line. End value is inclusive.

```scss
.item {
  @include grid.place((
    column: (
      end: 12,
    ),
  ));
}
```

```css
/* output */
.item {
  grid-column-end: 13;
}
```

---

## place() — Span

Span a fixed number of columns from the current position.

```scss
.item {
  @include grid.place((
    column: (
      span: 4,
    ),
  ));
}
```

```css
/* output */
.item {
  grid-column: span 4;
}
```

---

## place() — Start + Span

Start at a specific column and span a fixed number.

```scss
.item {
  @include grid.place((
    column: (
      start: 3,
      span: 6,
    ),
  ));
}
```

```css
/* output */
.item {
  grid-column: 3 / span 6;
}
```

---

## place() — Named Line

Use named grid lines for semantic placement.

```scss
.item {
  @include grid.place((
    column: (
      start-line: content-start,
      end-line: content-end,
    ),
  ));
}
```

```css
/* output */
.item {
  grid-column: content-start / content-end;
}
```

---

## place() — Area

Use named grid areas.

```scss
.hero {
  @include grid.place((
    area: hero,
  ));
}
```

```css
/* output */
.hero {
  grid-area: hero;
}
```

---

## context() — Utility版

Use utility classes to define a grid context in HTML.

```html
<div class="md:u-grid-global">
  <section class="md:u-grid-col-1:12">
    <div class="md:u-grid-global">
      <h2 class="md:u-grid-col-3:10">Title</h2>
    </div>
  </section>
</div>
```

---

## context() — Mixin版

Recreate the global grid layout inside a nested component.

```scss
.hero {
  @include grid.place((
    column: (1, 12),
  ));

  @include grid.context(global);
}

.hero__title {
  @include grid.place((
    column: (
      start: 3,
      span: 6,
    ),
  ));
}
```

---

## context() — Utility + Mixin

Combine utility classes for the container with Sass mixins for placement.

```html
<section class="md:u-grid-global">
  <div class="md:u-grid-col-1:12 hero">
    <h1 class="md:u-grid-col-3:10">Heading</h1>
  </div>
</section>
```

```scss
.hero {
  @include grid.context(global);
}
```

---

# 2. Layout Patterns

## Two Columns

Split the grid into two equal halves.

```scss
.page {
  @include grid.container(global);
}

.col-left {
  @include grid.place((column: (1, 8)));
}

.col-right {
  @include grid.place((column: (9, 16)));
}
```

---

## Sidebar

Main content with a narrower sidebar.

```scss
.page {
  @include grid.container(global);
}

.main {
  @include grid.place((column: (1, 11)));
}

.sidebar {
  @include grid.place((column: (12, 16)));
}
```

---

## Holy Grail

Header, two sidebars, main content, and footer.

```scss
.page {
  @include grid.container(global);
}

.header  { @include grid.place((column: (1, 16))); }
.nav     { @include grid.place((column: (1, 3))); }
.main    { @include grid.place((column: (4, 13))); }
.aside   { @include grid.place((column: (14, 16))); }
.footer  { @include grid.place((column: (1, 16))); }
```

---

## Hero

Full-width hero with centered text content.

```scss
.page {
  @include grid.container(global);
}

.hero {
  @include grid.place((column: (1, 16)));
  @include grid.context(global);
}

.hero__text {
  @include grid.place((
    column: (
      start: 4,
      span: 8,
    ),
  ));
}
```

---

## Split Layout

Image on the left, content on the right.

```scss
.split {
  @include grid.container(global);
}

.split__image   { @include grid.place((column: (1, 8))); }
.split__content { @include grid.place((column: (9, 16))); }
```

---

## Feature Section

Alternating image-text blocks.

```scss
.feature {
  @include grid.container(global);
}

/* odd: image left */
.feature:nth-child(odd) .feature__image   { @include grid.place((column: (1, 7))); }
.feature:nth-child(odd) .feature__content { @include grid.place((column: (8, 16))); }

/* even: image right */
.feature:nth-child(even) .feature__content { @include grid.place((column: (1, 8))); }
.feature:nth-child(even) .feature__image   { @include grid.place((column: (9, 16))); }
```

---

## Full Bleed

An element that extends edge-to-edge across the viewport.

```scss
.page {
  @include grid.container(global);
}

.full-bleed {
  @include grid.place((column: (1, 16)));
}
```

---

## Centered Content

Content centered within the grid with margins on both sides.

```scss
.page {
  @include grid.container(global);
}

.centered {
  @include grid.place((
    column: (
      start: 4,
      span: 8,
    ),
  ));
}
```

---

## Sticky Sidebar

Main scrolls while sidebar remains fixed.

```scss
.page {
  @include grid.container(global);
}

.main    { @include grid.place((column: (1, 11))); }

.sidebar {
  @include grid.place((column: (12, 16)));
  position: sticky;
  top: var(--lgs-grid-gutter);
  align-self: start;
}
```

---

## Nested Layout

A component creates its own local grid inside the page grid.

```scss
.page {
  @include grid.container(global);
}

.card-group {
  @include grid.place((column: (1, 16)));
  @include grid.container();
}

.card {
  @include grid.place((
    column: (
      span: 4,
    ),
  ));
}
```

---

# 3. Component Patterns

## Card

A card with an image area, title, and body.

```scss
.card {
  @include grid.container();
}

.card__image  { @include grid.place((column: (1, 4))); }
.card__title  { @include grid.place((column: (1, 4))); }
.card__body   { @include grid.place((column: (1, 4))); }
```

```html
<div class="card">
  <img class="card__image" src="..." alt="">
  <h2 class="card__title">Title</h2>
  <p class="card__body">Body text</p>
</div>
```

---

## News List

A list of articles with a thumbnail column and a content column.

```scss
.news-item {
  @include grid.container();
}

.news-item__thumbnail { @include grid.place((column: (1, 2))); }
.news-item__content   { @include grid.place((column: (3, 4))); }
```

---

## Article

Long-form content with pull quotes or sidebars.

```scss
.article {
  @include grid.container(global);
}

.article__body {
  @include grid.place((column: (2, 10)));
}

.article__pullquote {
  @include grid.place((column: (11, 15)));
}
```

---

## Gallery

Responsive image grid using span utilities.

```html
<div class="md:u-grid-global">
  <img class="md:u-grid-col-span-4">
  <img class="md:u-grid-col-span-4">
  <img class="md:u-grid-col-span-4">
  <img class="md:u-grid-col-span-4">
</div>
```

---

## Header

Site header with logo left and navigation right.

```scss
.header {
  @include grid.container(global);
}

.header__logo { @include grid.place((column: (1, 3))); }
.header__nav  { @include grid.place((column: (12, 16))); }
```

---

## Navigation

Navigation links spread across the grid.

```scss
.nav {
  @include grid.container(global);
}

.nav__links {
  @include grid.place((
    column: (
      start: 5,
      span: 8,
    ),
  ));
  display: flex;
  gap: var(--lgs-grid-column-gap);
}
```

---

# 4. Responsive Patterns

## sm / lg Token

Define different token values per breakpoint.

```css
@media (--sm) {
  :root {
    --lgs-grid-columns: 4;
    --lgs-grid-column-gap: 1rem;
    --lgs-grid-gutter: 1rem;
  }
}

@media (--md) {
  :root {
    --lgs-grid-columns: 16;
    --lgs-grid-column-gap: 2rem;
    --lgs-grid-gutter: 2rem;
  }
}
```

---

## Global → Local

Use global grid on desktop, switch to local container grid on mobile.

```html
<section class="sm:u-grid md:u-grid-global">
  <div class="sm:u-grid-col-span-4 md:u-grid-col-1:8">Left</div>
  <div class="sm:u-grid-col-span-4 md:u-grid-col-9:16">Right</div>
</section>
```

```scss
/* or via mixin */
.section {
  @media (--sm) { @include grid.container(); }
  @media (--md) { @include grid.container(global); }
}
```

---

## Global → Fluid

Transition from a viewport-based grid to a parent-constrained fluid grid at a breakpoint.

```scss
.component {
  @media (--sm) { @include grid.container(global); }
  @media (--md) { @include grid.container(fluid); }
}
```

---

## Utility Responsive

Apply different column placements per breakpoint using prefixed utility classes.

```html
<div class="md:u-grid-global">
  <article class="sm:u-grid-col-span-4 md:u-grid-col-1:10">
    Content
  </article>
  <aside class="sm:u-grid-col-span-4 md:u-grid-col-11:16">
    Sidebar
  </aside>
</div>
```

---

## Breakpoint Switching

Change the grid mode at each breakpoint.

```scss
.hero {
  @media (--sm) {
    @include grid.container();
    @include grid.place((column: (span: 4)));
  }

  @media (--md) {
    @include grid.container(global);
    @include grid.place((column: (1, 12)));
  }
}
```

---

## Token Override

Override tokens at the section level to create a narrower sub-grid.

```scss
.narrow-section {
  --lgs-grid-columns: 8;
  --lgs-grid-gutter: 4rem;

  @include grid.container(global);
}
```

Children inside `.narrow-section` will use the overridden 8-column grid.

---

# 5. Advanced Patterns

## Deep Nested Context

A deeply nested component recreates the page grid without depending on ancestor elements.

```scss
.page {
  @include grid.container(global);
}

/* 3 levels deep — still aligns to the page grid */
.feature {
  @include grid.place((column: (1, 12)));
  @include grid.context(global);
}

.feature__inner {
  @include grid.place((column: (1, 10)));
  @include grid.context(global);
}

.feature__inner-title {
  @include grid.place((column: (3, 8)));
}
```

Each level recreates the coordinate system so placement always refers to the same global grid.

---

## Named Grid Lines

Define named lines on the container and reference them in children.

```scss
.page {
  @include grid.container(global);
  grid-template-columns:
    [full-start] repeat(2, minmax(0, 1fr))
    [content-start] repeat(12, minmax(0, 1fr))
    [content-end] repeat(2, minmax(0, 1fr))
    [full-end];
}

.page__content {
  @include grid.place((
    column: (
      start-line: content-start,
      end-line: content-end,
    ),
  ));
}

.page__full {
  @include grid.place((
    column: (
      start-line: full-start,
      end-line: full-end,
    ),
  ));
}
```

---

## Named Areas

Use `grid-template-areas` for semantic region assignment.

```scss
.page {
  @include grid.container(global);
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
}

.page__header { @include grid.place((area: header)); }
.page__nav    { @include grid.place((area: nav)); }
.page__main   { @include grid.place((area: main)); }
.page__aside  { @include grid.place((area: aside)); }
.page__footer { @include grid.place((area: footer)); }
```

---

## start-line / end-line

Use literal CSS grid line names when numeric placement is not appropriate.

```scss
.page {
  @include grid.container(global);
  grid-template-columns:
    [edge-start] 1fr
    [gutter-start] var(--lgs-grid-gutter)
    [content-start] repeat(12, minmax(0, 1fr))
    [content-end] var(--lgs-grid-gutter)
    [gutter-end] 1fr
    [edge-end];
}

.bleed  {
  @include grid.place((
    column: (
      start-line: edge-start,
      end-line: edge-end,
    ),
  ));
}

.content {
  @include grid.place((
    column: (
      start-line: content-start,
      end-line: content-end,
    ),
  ));
}
```

---

## Utility + Mixin Hybrid

Use utility classes for the container and mixins for complex placement logic.

```html
<section class="md:u-grid-global page-section">
  <div class="hero">
    <h1 class="hero__title">Heading</h1>
  </div>
</section>
```

```scss
.hero {
  @include grid.place((column: (1, 12)));
  @include grid.context(global);
}

.hero__title {
  @include grid.place((
    column: (
      start: 2,
      span: 8,
    ),
  ));
}
```

---

## Component Library Pattern

A reusable component that works independently of the page grid.

```scss
/* In the design system */
.ds-feature {
  @include grid.container(fluid);
}

.ds-feature__image   { @include grid.place((column: (1, 8))); }
.ds-feature__content { @include grid.place((column: (9, 16))); }
```

```scss
/* In the application — the component aligns to the page grid automatically */
.page {
  @include grid.container(global);
}

.page__feature {
  @include grid.place((column: (1, 16)));
}
```

Because `.ds-feature` uses `fluid` mode, it inherits the column width from the outer global grid without overflowing its parent.

---

## Design System Pattern

Centralize layout tokens and expose a consistent grid API across a design system.

```scss
/* tokens/_grid.scss */
:root {
  --lgs-grid-columns: 16;
  --lgs-grid-column-gap: clamp(1rem, 2vw, 2rem);
  --lgs-grid-row-gap: 0;
  --lgs-grid-gutter: clamp(1rem, 4vw, 4rem);
}

@media (--sm) {
  :root {
    --lgs-grid-columns: 4;
  }
}
```

```scss
/* layout/_page.scss */
.l-page {
  @include grid.container(global);
}
```

```scss
/* components/_section.scss */
.c-section {
  @include grid.place((column: (1, 16)));
  @include grid.context(fluid);
}
```

All components now share the same coordinate system through token inheritance.

---

## Anti Pattern

Avoid these patterns when using Layout Grid System.

### Hardcoded column values

```scss
/* Bad — breaks when tokens change */
.item {
  grid-column: 1 / 9;
}

/* Good */
.item {
  @include grid.place((column: (1, 8)));
}
```

---

### Mixing unrelated grid modes

```html
<!-- Bad — u-grid and u-grid-global conflict -->
<div class="u-grid u-grid-global">
```

---

### Unnecessary context recreation

```scss
/* Bad — context is unnecessary for simple components */
.button {
  @include grid.context(global);
}

/* Good — only recreate context when descendants need the global grid */
.hero {
  @include grid.place((column: (1, 12)));
  @include grid.context(global);
}
```

---

## Best Practice

### Separate page layout from component layout

```scss
/* Page-level: use global */
.page {
  @include grid.container(global);
}

/* Component-level: use local or fluid */
.card {
  @include grid.container();
}

.card-wide {
  @include grid.container(fluid);
}
```

---

### Prefer place() over raw CSS

```scss
/* Avoid */
.item {
  grid-column: 3 / span 4;
}

/* Prefer */
.item {
  @include grid.place((
    column: (
      start: 3,
      span: 4,
    ),
  ));
}
```

---

### Override tokens at section boundaries

```scss
/* Good — scoped override at a meaningful boundary */
.narrow-section {
  --lgs-grid-columns: 8;
  @include grid.container(global);
}

/* Avoid — arbitrary override inside a component */
.card {
  --lgs-grid-columns: 3;
}
```

---

### Use context() intentionally

Recreate a layout context only when children actually need access to the global coordinate system.

```scss
/* Only add context when descendants need grid placement */
.hero {
  @include grid.place((column: (1, 16)));
  @include grid.context(global); /* children will use page grid */
}

.hero__title {
  @include grid.place((column: (3, 13)));
}
```

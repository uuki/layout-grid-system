import { describe, it, expect } from 'vitest';
import { compileScss, getDecls } from './helpers';

function container(mode?: string): Record<string, string> {
  const arg = mode ? `(${mode})` : '()';
  const root = compileScss(`
    @use 'grid' as grid;
    .t { @include grid.container${arg}; }
  `);
  return getDecls(root, '.t');
}

function context(mode?: string): Record<string, string> {
  const arg = mode ? `(${mode})` : '()';
  const root = compileScss(`
    @use 'grid' as grid;
    .t { @include grid.context${arg}; }
  `);
  return getDecls(root, '.t');
}

// ---------------------------------------------------------------------------
// container()
// ---------------------------------------------------------------------------

describe('container() — local (default)', () => {
  it('display: grid', () => {
    expect(container()['display']).toBe('grid');
  });

  it('grid-template-columns uses 1fr (not column-width token)', () => {
    expect(container()['grid-template-columns']).toContain('minmax(0, 1fr)');
  });

  it('column-gap uses token', () => {
    expect(container()['column-gap']).toBe('var(--lgs-grid-column-gap)');
  });

  it('row-gap uses token', () => {
    expect(container()['row-gap']).toBe('var(--lgs-grid-row-gap)');
  });

  it('grid-template-rows uses row token', () => {
    expect(container()['grid-template-rows']).toContain('var(--lgs-grid-rows)');
  });

  it('no margin-inline (not global)', () => {
    expect(container()['margin-inline']).toBeUndefined();
  });

  it('no inline-size (not global)', () => {
    expect(container()['inline-size']).toBeUndefined();
  });

  it('no --_grid-column-width (not global)', () => {
    expect(container()['--_grid-column-width']).toBeUndefined();
  });
});

describe('container(global)', () => {
  it('display: grid', () => {
    expect(container('global')['display']).toBe('grid');
  });

  it('padding-inline uses gutter token', () => {
    expect(container('global')['padding-inline']).toBe('var(--lgs-grid-gutter)');
  });

  it('no margin-inline (full-width, no centering needed)', () => {
    expect(container('global')['margin-inline']).toBeUndefined();
  });

  it('no inline-size (full-width via padding-inline)', () => {
    expect(container('global')['inline-size']).toBeUndefined();
  });

  it('--_grid-column-width is defined', () => {
    expect(container('global')['--_grid-column-width']).toBeDefined();
  });

  it('grid-template-columns uses --_grid-column-width', () => {
    expect(container('global')['grid-template-columns']).toContain('var(--_grid-column-width)');
  });
});

describe('container(fluid)', () => {
  it('display: grid', () => {
    expect(container('fluid')['display']).toBe('grid');
  });

  it('margin-inline: auto', () => {
    expect(container('fluid')['margin-inline']).toBe('auto');
  });

  it('inline-size uses min() to constrain by parent', () => {
    expect(container('fluid')['inline-size']).toMatch(/^min\(/);
  });

  it('inline-size includes 100% (parent constraint)', () => {
    expect(container('fluid')['inline-size']).toContain('100%');
  });

  it('--_grid-column-width is defined', () => {
    expect(container('fluid')['--_grid-column-width']).toBeDefined();
  });

  it('justify-content: center', () => {
    expect(container('fluid')['justify-content']).toBe('center');
  });
});

// ---------------------------------------------------------------------------
// context() — alias for _context(), should produce identical output
// ---------------------------------------------------------------------------

describe('context() default matches container() default', () => {
  it('context() === container()', () => {
    expect(context()).toEqual(container());
  });
});

describe('context(global) === container(global)', () => {
  it('identical output', () => {
    expect(context('global')).toEqual(container('global'));
  });
});

describe('context(fluid) === container(fluid)', () => {
  it('identical output', () => {
    expect(context('fluid')).toEqual(container('fluid'));
  });
});

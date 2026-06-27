import { describe, it, expect, beforeAll } from 'vitest';
import { type Root } from 'postcss';
import { compileScss, getDecls, normalizeDecls, utilityRoot } from './helpers';

let root: Root;
beforeAll(() => { root = utilityRoot(); });

function mixinPlace(args: string) {
  const r = compileScss(`@use 'grid' as g; .t { @include g.place((${args})); }`);
  return normalizeDecls(getDecls(r, '.t'));
}

function mixinContainer(mode?: string) {
  const arg = mode ? `(${mode})` : '()';
  const r = compileScss(`@use 'grid' as g; .t { @include g.container${arg}; }`);
  return normalizeDecls(getDecls(r, '.t'));
}

// utility セレクターの \ エスケープ: CSS の .md\:foo → JS 文字列 '.md\\:foo'
function util(selector: string) {
  return normalizeDecls(getDecls(root, selector));
}

// ---------------------------------------------------------------------------
// column range  place((column: (s, e))) ↔ md:u-grid-col-s:e
// ---------------------------------------------------------------------------

describe('symmetry — column range', () => {
  it('(1, 4) ↔ md:u-grid-col-1:4', () => {
    expect(mixinPlace('column: (1, 4)')).toEqual(util('.md\\:u-grid-col-1\\:4'));
  });

  it('(1, 16) ↔ md:u-grid-col-1:16', () => {
    expect(mixinPlace('column: (1, 16)')).toEqual(util('.md\\:u-grid-col-1\\:16'));
  });

  it('(5, 12) ↔ md:u-grid-col-5:12', () => {
    expect(mixinPlace('column: (5, 12)')).toEqual(util('.md\\:u-grid-col-5\\:12'));
  });

  // sm ブレークポイント (4 cols)
  it('(1, 4) ↔ sm:u-grid-col-1:4', () => {
    expect(mixinPlace('column: (1, 4)')).toEqual(util('.sm\\:u-grid-col-1\\:4'));
  });

  it('(2, 3) ↔ sm:u-grid-col-2:3', () => {
    expect(mixinPlace('column: (2, 3)')).toEqual(util('.sm\\:u-grid-col-2\\:3'));
  });
});

// ---------------------------------------------------------------------------
// column span  place((column: (span: n))) ↔ md:u-grid-col-span-n
// ---------------------------------------------------------------------------

describe('symmetry — column span', () => {
  it('span: 1 ↔ md:u-grid-col-span-1', () => {
    expect(mixinPlace('column: (span: 1)')).toEqual(util('.md\\:u-grid-col-span-1'));
  });

  it('span: 4 ↔ md:u-grid-col-span-4', () => {
    expect(mixinPlace('column: (span: 4)')).toEqual(util('.md\\:u-grid-col-span-4'));
  });

  it('span: 16 ↔ md:u-grid-col-span-16', () => {
    expect(mixinPlace('column: (span: 16)')).toEqual(util('.md\\:u-grid-col-span-16'));
  });

  it('span: 4 ↔ sm:u-grid-col-span-4', () => {
    expect(mixinPlace('column: (span: 4)')).toEqual(util('.sm\\:u-grid-col-span-4'));
  });
});

// ---------------------------------------------------------------------------
// column start  place((column: (start: n))) ↔ md:u-grid-col-start-n
// ---------------------------------------------------------------------------

describe('symmetry — column start', () => {
  it('start: 1 ↔ md:u-grid-col-start-1', () => {
    expect(mixinPlace('column: (start: 1)')).toEqual(util('.md\\:u-grid-col-start-1'));
  });

  it('start: 8 ↔ md:u-grid-col-start-8', () => {
    expect(mixinPlace('column: (start: 8)')).toEqual(util('.md\\:u-grid-col-start-8'));
  });

  it('start: 16 ↔ md:u-grid-col-start-16', () => {
    expect(mixinPlace('column: (start: 16)')).toEqual(util('.md\\:u-grid-col-start-16'));
  });

  it('start: 4 ↔ sm:u-grid-col-start-4', () => {
    expect(mixinPlace('column: (start: 4)')).toEqual(util('.sm\\:u-grid-col-start-4'));
  });
});

// ---------------------------------------------------------------------------
// column end  place((column: (end: n))) ↔ md:u-grid-col-end-n
// ---------------------------------------------------------------------------

describe('symmetry — column end', () => {
  it('end: 4 ↔ md:u-grid-col-end-4', () => {
    expect(mixinPlace('column: (end: 4)')).toEqual(util('.md\\:u-grid-col-end-4'));
  });

  it('end: 12 ↔ md:u-grid-col-end-12', () => {
    expect(mixinPlace('column: (end: 12)')).toEqual(util('.md\\:u-grid-col-end-12'));
  });

  it('end: 16 ↔ md:u-grid-col-end-16', () => {
    expect(mixinPlace('column: (end: 16)')).toEqual(util('.md\\:u-grid-col-end-16'));
  });

  it('end: 4 ↔ sm:u-grid-col-end-4', () => {
    expect(mixinPlace('column: (end: 4)')).toEqual(util('.sm\\:u-grid-col-end-4'));
  });
});

// ---------------------------------------------------------------------------
// container  container(mode) ↔ bp:u-grid[-global][-fluid]
// ---------------------------------------------------------------------------

describe('symmetry — container', () => {
  it('container() ↔ md:u-grid', () => {
    expect(mixinContainer()).toEqual(util('.md\\:u-grid'));
  });

  it('container() ↔ sm:u-grid', () => {
    expect(mixinContainer()).toEqual(util('.sm\\:u-grid'));
  });

  it('container(global) ↔ md:u-grid-global', () => {
    expect(mixinContainer('global')).toEqual(util('.md\\:u-grid-global'));
  });

  it('container(fluid) ↔ md:u-grid-global-fluid', () => {
    expect(mixinContainer('fluid')).toEqual(util('.md\\:u-grid-global-fluid'));
  });
});

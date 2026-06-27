import { describe, it, expect } from 'vitest';
import { compileScss, getDecls } from './helpers';

function place(args: string): Record<string, string> {
  const root = compileScss(`
    @use 'grid' as grid;
    .t { @include grid.place((${args})); }
  `);
  return getDecls(root, '.t');
}

// ---------------------------------------------------------------------------
// column
// ---------------------------------------------------------------------------

describe('place() column — range', () => {
  it('(1, 1) → grid-column: 1/2', () => {
    expect(place('column: (1, 1)')).toEqual({ 'grid-column': '1/2' });
  });

  it('(1, 4) → grid-column: 1/5', () => {
    expect(place('column: (1, 4)')).toEqual({ 'grid-column': '1/5' });
  });

  it('(5, 12) → grid-column: 5/13', () => {
    expect(place('column: (5, 12)')).toEqual({ 'grid-column': '5/13' });
  });

  it('(1, 16) → grid-column: 1/17', () => {
    expect(place('column: (1, 16)')).toEqual({ 'grid-column': '1/17' });
  });
});

describe('place() column — start', () => {
  it('start: 1 → grid-column-start: 1', () => {
    expect(place('column: (start: 1)')).toEqual({ 'grid-column-start': '1' });
  });

  it('start: 8 → grid-column-start: 8', () => {
    expect(place('column: (start: 8)')).toEqual({ 'grid-column-start': '8' });
  });
});

describe('place() column — end (inclusive)', () => {
  it('end: 4 → grid-column-end: 5', () => {
    expect(place('column: (end: 4)')).toEqual({ 'grid-column-end': '5' });
  });

  it('end: 12 → grid-column-end: 13', () => {
    expect(place('column: (end: 12)')).toEqual({ 'grid-column-end': '13' });
  });

  it('end: 16 → grid-column-end: 17', () => {
    expect(place('column: (end: 16)')).toEqual({ 'grid-column-end': '17' });
  });
});

describe('place() column — span', () => {
  it('span: 1 → grid-column: span 1', () => {
    expect(place('column: (span: 1)')).toEqual({ 'grid-column': 'span 1' });
  });

  it('span: 4 → grid-column: span 4', () => {
    expect(place('column: (span: 4)')).toEqual({ 'grid-column': 'span 4' });
  });

  it('span: 16 → grid-column: span 16', () => {
    expect(place('column: (span: 16)')).toEqual({ 'grid-column': 'span 16' });
  });
});

describe('place() column — start + span', () => {
  it('start: 3, span: 6 → grid-column: 3/span 6', () => {
    expect(place('column: (start: 3, span: 6)')).toEqual({ 'grid-column': '3/span 6' });
  });

  it('start: 1, span: 1 → grid-column: 1/span 1', () => {
    expect(place('column: (start: 1, span: 1)')).toEqual({ 'grid-column': '1/span 1' });
  });
});

describe('place() column — start + end (both inclusive)', () => {
  it('start: 2, end: 8 → grid-column: 2/9', () => {
    expect(place('column: (start: 2, end: 8)')).toEqual({ 'grid-column': '2/9' });
  });
});

describe('place() column — named lines', () => {
  it('start-line + end-line → grid-column: name/name', () => {
    expect(
      place('column: (start-line: content-start, end-line: content-end)'),
    ).toEqual({ 'grid-column': 'content-start/content-end' });
  });

  it('start-line only → grid-column-start: name', () => {
    expect(
      place('column: (start-line: sidebar-start)'),
    ).toEqual({ 'grid-column-start': 'sidebar-start' });
  });

  it('start-line overrides start', () => {
    expect(
      place('column: (start: 3, start-line: content-start)'),
    ).toEqual({ 'grid-column-start': 'content-start' });
  });
});

// ---------------------------------------------------------------------------
// row
// ---------------------------------------------------------------------------

describe('place() row — range', () => {
  it('(1, 2) → grid-row: 1/3', () => {
    expect(place('row: (1, 2)')).toEqual({ 'grid-row': '1/3' });
  });
});

describe('place() row — start', () => {
  it('start: 2 → grid-row-start: 2', () => {
    expect(place('row: (start: 2)')).toEqual({ 'grid-row-start': '2' });
  });
});

describe('place() row — end (inclusive)', () => {
  it('end: 4 → grid-row-end: 5', () => {
    expect(place('row: (end: 4)')).toEqual({ 'grid-row-end': '5' });
  });
});

describe('place() row — span', () => {
  it('span: 3 → grid-row: span 3', () => {
    expect(place('row: (span: 3)')).toEqual({ 'grid-row': 'span 3' });
  });
});

// ---------------------------------------------------------------------------
// area
// ---------------------------------------------------------------------------

describe('place() area', () => {
  it('area: hero → grid-area: hero', () => {
    expect(place('area: hero')).toEqual({ 'grid-area': 'hero' });
  });
});

// ---------------------------------------------------------------------------
// combined
// ---------------------------------------------------------------------------

describe('place() column + row combined', () => {
  it('column range + row span', () => {
    expect(place('column: (1, 8), row: (span: 2)')).toEqual({
      'grid-column': '1/9',
      'grid-row': 'span 2',
    });
  });
});

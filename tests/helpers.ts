import * as sass from 'sass';
import postcss, { type Root } from 'postcss';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

export function compileScss(input: string): Root {
  const { css } = sass.compileString(input, { loadPaths: [ROOT] });
  return postcss.parse(css);
}

// @media ブロック内も含め、コンマ区切りの複合セレクターも照合する
export function getDecls(root: Root, selector: string): Record<string, string> {
  const decls: Record<string, string> = {};
  root.walk(node => {
    if (node.type === 'rule') {
      const selectors = node.selector.split(',').map(s => s.trim());
      if (selectors.includes(selector)) {
        node.walkDecls(d => { decls[d.prop] = d.value; });
      }
    }
  });
  return decls;
}

// calc の改行インデント差など空白ゆらぎを吸収する
export function normalizeDecls(decls: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(decls).map(([k, v]) => [k, v.replace(/\s+/g, ' ').trim()]),
  );
}

// utility クラス CSS はファイル内で一度だけコンパイルしてキャッシュ
let _utilityRoot: Root | null = null;

export function utilityRoot(): Root {
  if (!_utilityRoot) {
    _utilityRoot = compileScss(`@use 'grid';`);
  }
  return _utilityRoot;
}

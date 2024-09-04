// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import pkg from '../../package.json';

/**
 *
 * @returns {import("rollup").RollupOptions}
 */
export function createRollupConfig(options, callback) {
  const name = options.name;
  // A file with the extension ".mjs" will always be treated as ESM, even when pkg.type is "commonjs" (the default)
  // https://nodejs.org/docs/latest/api/packages.html#packages_determining_module_system
  const extName = options.format === 'esm' ? 'mjs' : 'js';
  const outputName = 'dist/' + [name, options.format, extName].join('.');


  const config = {
    input: options.input,
    output: {
      file: outputName,
      format: options.format,
      name: 'JsonStyledForm',
      sourcemap: true,
      globals: { react: 'React' },
      exports: 'named',
    },
    external: Object.keys(pkg.peerDependencies),
    plugins: [
      resolve(), //  Resolve modules from node_modules
      typescript({
        tsconfig: options.tsconfig,
        clean: true,
        exclude: ['**/__tests__', '**/*.test.ts'],
      }),
      options.format !== 'esm' &&
        terser({
          output: { comments: false },
          compress: {
            drop_console: true,
          },
        }),
    ].filter(Boolean),
  };

  return callback ? callback(config) : config;
}
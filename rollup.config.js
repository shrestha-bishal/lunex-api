import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/umd/rest-client.umd.js',
      format: 'umd',
      name: 'LunexClient',
      sourcemap: true
    },
    {
      file: 'dist/umd/rest-client.umd.min.js',
      format: 'umd',
      name: 'LunexClient',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
          module: 'ESNext'
        },
        include: ['src/**/*']
      }
    })
  ]
};

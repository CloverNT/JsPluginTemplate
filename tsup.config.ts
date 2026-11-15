import { cpSync, readFileSync, rmSync } from 'node:fs';

import { defineConfig } from 'tsup';

const { name } = JSON.parse(readFileSync('clover.json', 'utf8')) as { name: string };
const outDir = `dist/${name}`;

rmSync('dist', { recursive: true, force: true });

export default defineConfig([
    {
        entry: { main: 'src/main.ts' },
        format: ['cjs'],
        platform: 'node',
        target: 'node22',
        external: ['electron'],
        outDir,
        outExtension: () => ({ js: '.cjs' }),
        onSuccess: async () => {
            cpSync('clover.json', `${outDir}/clover.json`);
        },
    },
    {
        entry: { renderer: 'src/renderer.ts' },
        format: ['iife'],
        platform: 'browser',
        target: 'es2022',
        outDir,
        outExtension: () => ({ js: '.js' }),
    },
]);

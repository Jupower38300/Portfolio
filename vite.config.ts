import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './', // Définit la racine du projet
  publicDir: 'public', // Indique à Vite où se trouve le dossier public
  plugins: [react()],
});
  
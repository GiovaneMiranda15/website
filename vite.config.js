import { defineConfig } from 'vite';

export default defineConfig({
  // Se for publicar no GitHub Pages em um subdiretório, mude o 'base' para o nome do repositório, ex: '/meu-repositorio/'
  base: '/', 
  build: {
    outDir: 'dist',
  },
});

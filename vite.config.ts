import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    cors: true // Permitir solicitudes CORS desde cualquier origen
  }
});

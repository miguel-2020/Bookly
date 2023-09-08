import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    open:"/",
    proxy:{
      '/api/v1':'http://localhost:3000',
      "/api/v1/login": "http://localhost:3000/",
      "/api/v1/logout": "http://localhost:3000/",
      "/api/v1/favorite": "http://localhost:3000/"
    }
  },
  plugins: [react()],
})

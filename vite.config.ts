import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  let componentTagger = null;
  
  // Dynamically import lovable-tagger only in development mode
  if (mode === 'development') {
    try {
      const taggerModule = await import('lovable-tagger');
      componentTagger = taggerModule.componentTagger;
    } catch (error) {
      console.warn('lovable-tagger not available, continuing without it');
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

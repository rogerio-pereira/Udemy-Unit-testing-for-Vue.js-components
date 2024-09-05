import { defineConfig } from "vitest/config"; 
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [Vue()],
    test: {
        environment: 'happy-dom', //can use jsdom, but happy-dom is faster
        globals: true,
    }
})
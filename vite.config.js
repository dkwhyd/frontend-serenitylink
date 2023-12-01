import { defineConfig ,loadEnv} from 'vite'
import react from '@vitejs/plugin-react'


export default ({ mode }) => {
    // Load app-level env vars to node-level env vars.
    // eslint-disable-next-line no-undef
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
      // To access env vars here use process.env.TEST_VAR
      plugins: [react()],

    });
}
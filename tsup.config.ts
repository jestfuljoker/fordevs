import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
	tsconfig: 'tsconfig.build.json',
	clean: true
})

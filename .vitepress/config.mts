import { defineConfig } from 'vitepress'
import zhConfig from './zhConfig'
import enConfig from './enConfig'

export default defineConfig({
  ...zhConfig,
  locales: {
    root: zhConfig.locales.root,
    en: enConfig.locales.en
  }
})
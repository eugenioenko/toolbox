// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import galaxy from 'starlight-theme-galaxy';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://go-appsec.github.io',
  base: '/toolbox',
  integrations: [sitemap(), starlight({
    title: 'Toolbox',
    description: 'Application security testing with humans and coding agents. Set up Sectool, inspect traffic, and test requests together.',
    logo: { src: './src/assets/logo.png', replacesTitle: false },
    favicon: '/favicon.png',
    social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/go-appsec/toolbox' }],
    editLink: { baseUrl: 'https://github.com/go-appsec/toolbox/edit/main/docs-web/' },
    plugins: [galaxy()],
    components: { Hero: './src/components/Hero.astro' },
    customCss: ['./src/styles/custom.css'],
    sidebar: [
      { label: 'Overview', link: '/' },
      { label: 'Getting started', items: [
        { label: 'Quickstart', slug: 'getting-started/quickstart' },
        { label: 'Installation', slug: 'getting-started/installation' },
        { label: 'Browser & HTTPS', slug: 'getting-started/browser' },
        { label: 'Connect your agent', slug: 'getting-started/agents' },
        { label: 'Troubleshooting', slug: 'getting-started/troubleshooting' },
      ] },
      { label: 'Testing guides', items: [
        { label: 'Inspect captured traffic', slug: 'guides/traffic' },
        { label: 'Replay & compare', slug: 'guides/replay' },
        { label: 'Discover the API surface', slug: 'guides/discovery' },
        { label: 'Out-of-band testing', slug: 'guides/oast' },
      ] },
      { label: 'Reference', items: [
        { label: 'Server & workflows', slug: 'reference/server' },
        { label: 'Configuration', slug: 'reference/configuration' },
        { label: 'CLI overview', slug: 'reference/cli' },
        { label: 'MCP tools', slug: 'reference/mcp' },
      ] },
      { label: 'Integrations', items: [
        { label: 'Burp Suite', slug: 'integrations/burp' },
        { label: 'Sidecars & scanning', slug: 'integrations/sidecars' },
      ] },
      { label: 'Contributing', slug: 'contributing' },
    ],
  })],
});

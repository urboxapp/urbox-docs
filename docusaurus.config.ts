import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Every deployment target (local dev, the public docs repo) can override
// these without editing this file. The values below are only fallbacks.
const siteUrl = process.env.DOCUSAURUS_URL ?? 'https://urboxapp.github.io';
const siteBaseUrl = process.env.DOCUSAURUS_BASE_URL ?? '/urbox/';
const docsRepo = process.env.DOCUSAURUS_REPO ?? 'urboxapp/urbox';
const editUrl = process.env.DOCUSAURUS_EDIT_URL;

const config: Config = {
  title: 'Documentación de Urbox',
  tagline: 'Guías de uso y configuración de tu CRM para WhatsApp',
  favicon: 'img/favicon.svg',

  // GitHub Pages. Override these two env vars to publish under a custom
  // domain or a different repository without editing this file.
  url: siteUrl,
  baseUrl: siteBaseUrl,
  organizationName: 'urboxapp',
  projectName: 'urbox',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // Docs-only site: the first document is the homepage and there
          // is no separate landing page to keep in sync.
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // The public docs repo is the one people can edit; the private
          // source repo is not linked from the published site.
          ...(editUrl ? { editUrl } : {}),
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Free, offline full-text search: no Algolia account, no external
  // service, no tracking. The index is built at compile time.
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['es'],
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarPosition: 'right',
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Urbox Docs',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentación',
        },
        {
          href: `https://github.com/${docsRepo}`,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentación',
          items: [
            { label: 'Inicio', to: '/' },
            {
              label: 'Configuración de agentes IA',
              to: '/guias/configuracion-agentes-ia',
            },
            {
              label: 'Automatización para tomar pedidos',
              to: '/automatizacion-tomar-pedido',
            },
          ],
        },
        {
          title: 'Producto',
          items: [
            { label: 'Sitio de Urbox', href: 'https://urbox.tech' },
            {
              label: 'Repositorio',
              href: `https://github.com/${docsRepo}`,
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Urbox. Documentación generada con Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

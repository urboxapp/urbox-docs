# Documentación de Urbox

Sitio de documentación de Urbox, construido con
[Docusaurus 3](https://docusaurus.io/) y publicado en GitHub Pages.

Este repositorio es **público y generado**: su contenido se sincroniza
automáticamente desde el repositorio privado de Urbox. Los cambios hechos
aquí directamente se sobrescriben en la siguiente sincronización.

---

## Arquitectura

```
┌──────────────────────────────┐        ┌──────────────────────────────┐
│ Repositorio PRIVADO          │        │ Repositorio PÚBLICO (este)    │
│ (código + docs originales)   │        │ (solo documentación)          │
│                              │        │                              │
│ docs-site/docs/**.md         │        │ docs/**.md  (Markdown)        │
│ docs-site/src, static        │ rsync  │ src/, static/                │
│ docs-site/docusaurus.config  │───────▶│ docusaurus.config.ts         │
│ .github/workflows/           │  PAT   │ package.json + lockfile      │
│   sync-docs.yml              │        │ .github/ (no se toca)        │
└──────────────────────────────┘        └──────────────┬───────────────┘
                                                       │ GitHub Actions
                                                       ▼
                                              GitHub Pages
                                        https://OWNER.github.io/REPO/
```

1. Un push a `main` en el repositorio privado que toque `docs-site/**`
   dispara **Sync docs**.
2. Ese workflow copia solo una lista blanca de archivos a este
   repositorio público, escanea el resultado en busca de credenciales y,
   si algo cambió, hace un commit.
3. El push a `main` de este repositorio dispara **Deploy docs**, que
   ejecuta `npm ci`, compila Docusaurus y publica `build/` en GitHub
   Pages.

El repositorio privado **nunca** se hace público, y este repositorio
**nunca** contiene código de la aplicación, migraciones, `.env` ni
documentos internos (auditorías, notas de progreso, etc.).

---

## Cómo agregar documentación

El contenido se edita en el repositorio privado, en `docs-site/docs/`.
No edites `docs/` aquí: la sincronización lo reemplaza.

1. Crea un archivo Markdown, por ejemplo `docs-site/docs/guias/facturacion.md`.
2. Empieza con un título y, opcionalmente, front matter:

   ```markdown
   ---
   title: Facturación
   sidebar_position: 3
   description: Cómo gestionar planes y facturas.
   ---

   # Facturación
   ```

3. Enlaza la guía desde `docs-site/docs/intro.md` si es un tema principal.
4. Abre un pull request en el repositorio privado. Al integrarse en
   `main`, el sitio se sincroniza y publica solo.

El menú lateral se genera automáticamente: cualquier `.md` nuevo aparece
sin tocar `sidebars.ts`. Usa `sidebar_position` para ordenarlo.

### Crear una categoría

Una categoría es una carpeta dentro de `docs/`. Para darle nombre,
posición y una página índice, añade `_category_.json`:

```json
{
  "label": "Guías",
  "position": 2,
  "link": {
    "type": "generated-index",
    "title": "Guías de Urbox",
    "description": "Guías paso a paso para configurar y usar Urbox."
  }
}
```

Si prefieres una página propia en vez de un índice autogenerado, cambia
`link` por:

```json
{ "type": "doc", "id": "guias/indice" }
```

y crea `guias/indice.md`.

### Agregar imágenes

1. Coloca la imagen en `docs-site/static/img/`, por ejemplo
   `docs-site/static/img/facturacion/planes.png`.
2. Referénciala con una ruta absoluta al sitio:

   ```markdown
   ![Planes disponibles](/img/facturacion/planes.png)
   ```

Docusaurus reescribe la ruta con el `baseUrl` correcto, así que no
incluyas el nombre del repositorio en el enlace.

Usa nombres en minúsculas, sin espacios ni acentos, y comprime las
imágenes antes de subirlas. Si una captura contiene datos reales de
clientes, difumínalos.

### Enlaces internos

Enlaza a otro documento con la ruta del archivo, no con la URL final:

```markdown
[Configuración de agentes IA](./guias/configuracion-agentes-ia.md)
```

Docusaurus valida los enlaces en cada compilación y avisa de los rotos.

---

## Ejecutar Docusaurus localmente

Requiere Node.js 22.12 o superior.

```bash
npm ci
npm run start
```

El sitio queda en `http://localhost:3000/urbox/` (o en la raíz si
ejecutas `DOCUSAURUS_BASE_URL=/ npm run start`). Para probar la versión
estática exactamente como se publica:

```bash
npm run build
npm run serve
```

El resultado queda en `build/`.

Para comprobar tipos y enlaces antes de publicar:

```bash
npm run typecheck
npm run build
```

---

## Configuración de GitHub

### GitHub Pages (una sola vez)

1. **Settings → Pages**.
2. En **Build and deployment → Source**, elige **GitHub Actions**.
3. Lanza el workflow **Deploy docs** desde **Actions** o haz push a
   `main`.

La URL se calcula automáticamente:

| Repositorio             | URL                                   |
| ----------------------- | ------------------------------------- |
| `OWNER/urbox-docs`      | `https://OWNER.github.io/urbox-docs/` |
| `OWNER/OWNER.github.io` | `https://OWNER.github.io/`            |

Si usas un dominio propio, define las variables `DOCS_SITE_URL` y
`DOCS_BASE_URL` en **Settings → Secrets and variables → Actions →
Variables**. El workflow las respeta.

### Secretos (en el repositorio privado)

La sincronización se configura **en el repositorio privado**, no aquí:

| Tipo     | Nombre            | Valor                                                                       |
| -------- | ----------------- | --------------------------------------------------------------------------- |
| Secreto  | `DOCS_REPO_TOKEN` | Fine-grained PAT con `Contents: Read and write` solo sobre este repositorio |
| Variable | `DOCS_REPO`       | `OWNER/REPO` de este repositorio                                            |
| Variable | `DOCS_BRANCH`     | Opcional, por defecto `main`                                                |

El token nunca se imprime en los logs ni se guarda en el repositorio.
Para crear el PAT: **GitHub → Settings → Developer settings →
Personal access tokens → Fine-grained tokens → Generate new token**,
selecciona solo el repositorio de documentación y el permiso
**Contents: Read and write**. Caduca; anótalo y renuévalo a tiempo.

---

## Solución de problemas

| Síntoma                                          | Causa probable                                                                    | Solución                                                                                                   |
| ------------------------------------------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `Sync docs` falla con "DOCS_REPO is not set"     | Falta la variable en el repo privado                                              | Créala en **Settings → Secrets and variables → Actions → Variables**                                       |
| `Sync docs` falla en el clone con `403`/`404`    | Token caducado, sin permiso, repo mal escrito o repo público sin commit inicial   | Revisa `DOCS_REPO` y regenera `DOCS_REPO_TOKEN`; crea el repo público con un README para que exista `main` |
| `Sync docs` falla en "Possible credential found" | Un archivo publicable contiene algo con forma de secreto                          | Elimínalo del Markdown; si es un falso positivo, ajusta el patrón en el workflow                           |
| `Deploy docs` falla en `npm ci`                  | El lockfile no corresponde al `package.json`                                      | Ejecuta `npm install` en `docs-site/` del repo privado y vuelve a sincronizar                              |
| El sitio carga sin estilos o con enlaces rotos   | `baseUrl` incorrecto                                                              | Revisa `DOCS_BASE_URL` o el nombre del repositorio                                                         |
| `404` en una página existente                    | La página se borró del repo privado (la sincronización borra lo que ya no existe) | Vuelve a crearla allí                                                                                      |
| La búsqueda no encuentra una página              | El índice se genera al compilar                                                   | Vuelve a lanzar **Deploy docs**                                                                            |

Los workflows se pueden relanzar manualmente desde **Actions → (workflow)
→ Run workflow**.

---

## Lo que no debes hacer en este repositorio

- No agregues código de la aplicación ni archivos de entorno.
- No añadas secretos, tokens ni credenciales.
- No edites `docs/` esperando que el cambio sobreviva: se sobrescribe.
- No cambies `docusaurus.config.ts` ni `package.json` aquí; edítalos en
  `docs-site/` del repositorio privado.
- `deploy.yml` **sí** se mantiene en este repositorio. La sincronización
  no lo toca, así que cualquier ajuste del despliegue se hace aquí.

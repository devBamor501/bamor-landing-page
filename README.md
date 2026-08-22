# B.A.M.O.R Landing Page

Landing page para B.A.M.O.R con estilo moderno, enfocado en servicios de mantenimiento y remodelación para hogares y espacios comerciales.

## ¿Qué contiene este proyecto?

Este proyecto incluye:

- Una landing page principal con hero visual.
- Header sticky con navegación y enlaces a redes sociales.
- Sección principal con texto promocional y llamada a la acción.
- Barra de búsqueda funcional por estilo visual.
- Grid de servicios con íconos y cards de navegación.
- Uso de Tailwind CSS 4 para estilos rápidos y modernos.
- Integración de Flowbite para componentes y utilidades de UI.
- Vite como entorno de desarrollo y build del proyecto.
- Font Awesome para los iconos del sitio.

## Tecnologías utilizadas

- HTML5
- Vite
- TypeScript
- Tailwind CSS 4
- Flowbite
- Font Awesome

## Requisitos previos

Necesitas tener instalado en tu sistema:

- Node.js 18 o superior
- npm o pnpm

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd bamor-landing-page
```

2. Instala las dependencias:

```bash
npm install
```

## Configuración necesaria

Este proyecto ya incluye la configuración de Vite y Tailwind en:

- `vite.config.ts`
- `src/style.css`
- `src/main.ts`

La configuración principal incluye:

- Plugin de Tailwind para Vite.
- Importación de Flowbite.
- Fuente externa de Google Fonts.
- Importación de estilos de Font Awesome.

## Scripts disponibles

En el archivo `package.json` existen estos scripts:

```bash
npm run dev
```

Inicia el servidor de desarrollo de Vite.

```bash
npm run build
```

Genera la versión de producción para desplegar.

```bash
npm run preview
```

Previsualiza la build generada localmente.

## Estructura del proyecto

```text
bamor-landing-page/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── img/
├── src/
│   ├── main.ts
│   └── style.css
└── README.md
```

## Observaciones

- El proyecto usa imágenes locales y una imagen principal del hero ubicada en `public/img/`.
- La fuente principal está cargada desde Google Fonts.
- La navegación y tarjetas del hero están pensadas para una landing page promocional moderna.
- El proyecto está preparado para seguir ampliándose con más secciones.

## Desarrollo local

Para levantar el proyecto en modo desarrollo:

```bash
npm run dev
```

Luego abre la URL que proporcione Vite en tu navegador, normalmente algo como:

```text
http://localhost:5173
```

## Producción

Para compilar la aplicación de producción:

```bash
npm run build
```

La carpeta generada será:

```text
dist/
```

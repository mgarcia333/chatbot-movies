# CineRoulette: Tu Sumiller de Cine Personal

CineRoulette es una **Progressive Web App (PWA)** diseñada para ayudarte a elegir qué película ver cuando la indecisión ataca. Utiliza Inteligencia Artificial (Google Gemini) para guiarte a través de una breve entrevista y ofrecerte la recomendación perfecta.

## Características Principales

- **Chatbot Inteligente**: Entrevista dinámica de 2-3 preguntas para entender tus gustos actuales.
- **Recomendaciones Basadas en Rationale**: No solo te decimos qué ver, sino _por qué_ te gustará.
- **Historial Persistente**: Guarda tus películas aceptadas por dispositivo (vía Netlify Blobs).
- **Experiencia Móvil Nativa**: Instalable como PWA para acceso rápido.
- **Interfaz Premium**: Diseño minimalista con efecto glassmorphism y modo claro/oscuro.

## Stack Tecnológico

- **Frontend**: [Nuxt 3](https://nuxt.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Nitro Server Routes](https://nitro.unjs.io/)
- **IA**: [Google Gemini 2.5 Flash](https://ai.google.dev/)
- **Almacenamiento**: [Netlify Blobs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/) (historial por dispositivo)
- **Despliegue/PWA**: `@vite-pwa/nuxt`

## Instalación y Configuración

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/mgarcia333/chatbot-movies.git
   cd chatbot-movies
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Variables de entorno**:
   Copia el archivo `.env.example` a `.env` y configura tus credenciales:
   - `GEMINI_API_KEY`: Tu clave de Google AI Studio.

4. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

---

## Metodología de Desarrollo

Este proyecto ha sido desarrollado siguiendo la metodología **Specification-Driven Development (SDD)**, utilizando la herramienta **Speckit**. Todo el proceso está documentado en los archivos `.md` de la carpeta `specs` y en el archivo `PROCESS.md`.

---

Producido por Moisés Garcia como proyecto final para M06 - Desarrollo Web en Entorno Cliente.

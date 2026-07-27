# CineRoulette: Tu Experto en Cine Personal

CineRoulette es una **Progressive Web App (PWA)** diseñada para ayudarte a elegir qué película ver cuando la indecisión ataca. Utiliza Inteligencia Artificial (Groq) para guiarte a través de una breve entrevista y ofrecerte la recomendación perfecta.

## Características Principales

- **Asistente experto en cine**: directo y centrado solo en ayudarte a decidir qué ver (no responde peticiones fuera de tema, como código o tareas genéricas).
- **Chatbot Inteligente**: Entrevista dinámica de 2-3 preguntas para entender tus gustos actuales.
- **Recomendaciones Basadas en Rationale**: No solo te decimos qué ver, sino _por qué_ te gustará.
- **Historial Persistente**: Guarda tus películas aceptadas en el dispositivo (vía `localStorage`).
- **Experiencia Móvil Nativa**: Instalable como PWA para acceso rápido.
- **Interfaz "Terminal Retro"**: pantalla estilo CRT en verde fósforo, tipografía monoespaciada (JetBrains Mono), scanlines, texto con glow y una barra de progreso ASCII que "carga" cada recomendación en tiempo real.
- **Póster real por película**: busca la carátula en TMDB; si no hay clave configurada o no encuentra resultado, muestra automáticamente un recuadro estilo terminal en su lugar.

## Stack Tecnológico

- **Frontend**: [Nuxt 3](https://nuxt.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Nitro Server Routes](https://nitro.unjs.io/)
- **IA**: [Groq](https://groq.com/) (Llama 3.3 70B)
- **Pósters**: [TMDB](https://www.themoviedb.org/) (opcional, con fallback local)
- **Almacenamiento**: `localStorage` del navegador (historial por dispositivo)
- **Despliegue**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **PWA**: `@vite-pwa/nuxt`

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
   - `GROQ_API_KEY`: Tu clave de [Groq Console](https://console.groq.com/keys).
   - `TMDB_API_KEY` (opcional): Tu clave de [TMDB](https://www.themoviedb.org/settings/api), para mostrar el póster real de cada película. Sin ella, la app sigue funcionando y usa un recuadro estilo terminal como alternativa.

   En producción (Cloudflare Workers), estas mismas variables deben añadirse también desde el dashboard de Cloudflare, igual que `GROQ_API_KEY`.

4. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

---

## Metodología de Desarrollo

Este proyecto ha sido desarrollado siguiendo la metodología **Specification-Driven Development (SDD)**, utilizando la herramienta **Speckit**. Todo el proceso está documentado en los archivos `.md` de la carpeta `specs` y en el archivo `PROCESS.md`.

---

Producido por Moisés Garcia como proyecto final para M06 - Desarrollo Web en Entorno Cliente.

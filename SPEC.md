# SPEC.md - CineRoulette PWA

## 1. Arquitectura Tècnica (Pas 1)

L'aplicació segueix una arquitectura moderna basada en components i microserveis (Serverless):

- **Frontend:** Nuxt.js (Vue 3) configurat com a Progressive Web App (PWA) mitjançant el mòdul `@vite-pwa/nuxt`. Gestionarà la UI interactiva del xat i la visualització de les recomanacions.
- **Backend (Serverless):** S'utilitzaran les _API Routes_ de Nuxt (`/server/api/`). En desplegar l'aplicació (ex. Vercel o Netlify), aquestes rutes es convertiran automàticament en funcions serverless independents.
- **Base de Dades:** Supabase (PostgreSQL). S'utilitza per emmagatzemar l'historial de pel·lícules que l'usuari ha acceptat veure.
- **Integració Chatbot:** S'utilitzarà l'API d'OpenAI o Gemini. Per seguretat, el frontend mai es comunica directament amb la IA. El flux és: `Frontend -> API Serverless de Nuxt -> API de l'IA`. L'API Serverless processa la resposta i la retorna al frontend.

## 2. Especificació del Sistema (Pas 2)

### 2.1. Descripció funcional de l'aplicació

CineRoulette és una PWA dissenyada per resoldre la indecisió a l'hora de triar una pel·lícula. A través d'una interfície de xat, un assistent d'IA formula preguntes ràpides de descart (ex. "Clàssic o modern?", "Acció o reflexió?"). Després d'un breu intercanvi d'informació, el sistema recomana una única pel·lícula de manera definitiva. L'usuari pot guardar-la a la seva llista o rebutjar-la argumentant el motiu per rebre una nova opció.

### 2.2. Actors del sistema

- **Usuari Autenticat:** Pot interactuar amb el xat, rebre recomanacions i guardar l'historial de pel·lícules acceptades al seu perfil.
- **CineBot (IA):** L'agent intel·ligent que avalua els gustos de l'usuari en temps real i formula la recomanació.

### 2.3. User Journey o flux d'usuari

1.  L'usuari obre la PWA (instal·lada al mòbil o des del navegador).
2.  Inicia sessió (o es crea un compte ràpidament amb Supabase Auth).
3.  A la pantalla principal, prem el botó "Començar Ruleta".
4.  El CineBot inicia el xat amb una pregunta binària.
5.  L'usuari respon 2 o 3 vegades indicant les seves preferències.
6.  El CineBot mostra una targeta amb la pel·lícula recomanada (Títol, Sinopsi breu, Motiu de la recomanació).
7.  L'usuari té dues opcions:
    - **"Veure aquesta":** S'emmagatzema a la base de dades i acaba el procés.
    - **"Una altra":** L'usuari indica per què no la vol (ex. "Ja l'he vista" o "Molt llarga") i el cicle es repeteix.

### 2.4. Estructura de dades

Es crearà a Supabase la següent estructura relacional simplificada:

**Taula `users`** (Gestionada per Supabase Auth)

- `id` (UUID, Primary Key)
- `email` (String)

**Taula `saved_movies`**

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key a users)
- `title` (String)
- `recommendation_reason` (Text)
- `created_at` (Timestamp)

### 2.5. Llista d'endpoints serverless

Tots els endpoints estaran sota el directori `/server/api/` de Nuxt:

- `POST /api/chat`: Rep l'historial de la conversa i el context de l'usuari. Es comunica amb l'API de l'IA i retorna la següent pregunta o la recomanació final en format JSON.
- `POST /api/movies`: Rep les dades d'una pel·lícula recomanada i la guarda a la taula `saved_movies` de Supabase associada a l'ID de l'usuari.
- `GET /api/movies`: Retorna l'historial de pel·lícules guardades per l'usuari autenticat.

### 2.6. Comportament del chatbot

El _System Prompt_ de la IA estarà configurat perquè l'assistent sigui concís i resolutiu.

- **Fase de preguntes:** Formularà un màxim de 3 preguntes, oferint sempre dues opcions clares o acceptant text lliure.
- **Fase de resolució:** Quan tingui prou dades, canviarà el seu format de sortida exclusivament a un objecte JSON amb l'estructura: `{ "isRecommendation": true, "movieDetails": { "title": "...", "synopsis": "...", "reason": "..." } }`. Això permetrà al frontend detectar que és una recomanació i pintar la UI corresponent (targeta de pel·lícula) en lloc d'un simple missatge de text.

# PROCESS.md - Registre de Desenvolupament (CineRoulette)

## 1. Exemples de prompts utilitzats
Durant el desenvolupament hem utilitzat prompts estructurats, especialment amb l'agent Speckit:
- "pensa que esto tiene que estar en un proyeco nuxt"
- "Concepto Principal: CineRoulette es una PWA diseñada para ayudar a los usuarios indecisos a elegir qué película ver..."
- "ayudame a hecer esto... creame un plan para hacerlo"
- "no cambies esta linia nunca mas model: 'gemini-2.5-flash'"

## 2. Iteracions amb l'agent
El procés ha estat iteratiu seguint la metodologia SDD (Specification-Driven Development):
1. **Definició**: Començant amb una idea base de sumiller de cine.
2. **Especificació**: Ús de `/speckit.specify` per generar els casos d'ús i requeriments.
3. **Implementació**: Desenvolupament de la lógica de backend (Nitro + Gemini) i frontend (Nuxt + Tailwind).
4. **Correcció**: Ajustos freqüents en el format de resposta de la IA per assegurar que el JSON és vàlid per a la UI.

## 3. Exemple de bug solucionat
**Problema**: Error 500 al enviar missatges i Error 400 de Gemini ("First content should be with role 'user'").
**Causa**: L'historial enviat a l'API de Gemini començava amb un missatge del 'model' (la salutació inicial), però Gemini exigeix que el primer missatge de l'historial sigui sempre de l'usuari.
**Solució**: Es va implementar un filtre al backend (`server/api/chat.post.ts`) que detecta si el primer missatge és del model i el descarta de l'historial enviat a l'API, garantint el compliment de les regles de Google.

## 4. Disseny Generat vs Resultat Final
*(L'alumne ha d'incloure aquí les captures de pantalla)*
- **Disseny Planificat**: Interfície neta de xat estil "premium" amb mode fosc.
- **Resultat Final**: Implementació funcional amb Tailwind CSS, targetes de pel·lícula amb efecte glassmorphism i càrrega de dades en temps real.

## 5. Reflexió final
El desenvolupament amb IA ha permès passar d'una idea conceptual a una aplicació funcional amb PWA i Base de Dades en temps rècord. Tot i que l'IA és molt ràpid per generar codi base (Boilerplate), la supervisió del "Tech Lead" (usuari) ha estat clau per resoldre conflictes de versions i assegurar que el model d'IA utilitzat era el correcte per al context del projecte.

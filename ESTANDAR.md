# Estándar de cada artículo

1. **Tema con demanda real**: pregunta concreta que un hispano en EE.UU. busca en Google. Elegir palabra clave principal + 3-5 secundarias (front matter `keywords`).
2. **Título** con la palabra clave al inicio (máx. ~65 caracteres útiles) y `description` de 140-160 caracteres que prometa un resultado.
3. **Front matter obligatorio**: `title`, `description`, `date`, `category` (Crédito, Bancos, Impuestos, Remesas, Ahorro o Vivienda), `keywords`, `resumen` (3-4 viñetas), `faq` (3-4 preguntas reales tipo "People also ask"). `herramienta` (remesas, presupuesto, credito, emergencia, deudas, quiz) cuando encaje.
4. **Cuerpo de 1.200-1.800 palabras**: respuesta directa en el primer párrafo, H2 claros (mín. 4), al menos 1 tabla o lista de pasos, 1 ejemplo con números reales, sección de errores comunes y resumen.
5. **Datos verificados** en fuentes oficiales (IRS, CFPB, FDIC, NCUA, SSA, USCIS, sitios .gov) con enlace. Nada inventado; si una cifra cambia cada año, indicarlo.
6. **Enlaces internos**: mín. 3 a otras guías + 1 a una calculadora. Actualizar 1-2 guías antiguas para que enlacen a la nueva.
7. **Interactividad**: si el tema lo permite, crear una calculadora nueva en `_includes/tools/` + `assets/js/tools.js` + `_data/herramientas.yml` + página en `herramientas/`. Objetivo: 1 herramienta nueva por semana.
8. **QA antes de publicar**: `jekyll build` sin errores, enlaces internos válidos, JSON-LD válido, sin scroll horizontal a 390 px.

## Reglas anti "contenido de poco valor" (AdSense lo rechazó el 27-oct-2026)

9. **Nada de plantillas.** Prohibido repetir la misma secuencia de H2 o frases de cierre entre artículos (p. ej. "Plan de acción paso a paso", "Tres errores que debes evitar", "Resumen y siguiente paso", "Dónde verificar la información"). Cada guía tiene una estructura pensada para su tema. Antes de publicar, comprobar con grep que ningún H2 aparece en más de 3 posts y que ninguna frase de más de 60 caracteres se repite en otro post.
10. **Valor original obligatorio**: al menos un ejemplo con personaje y números verificables (comprobar la aritmética), una tabla propia y un dato o regla concreta con su fuente oficial (ley, formulario, plazo, límite). Nada de consejos genéricos que sirvan para cualquier tema.
11. **El `resumen` no puede copiar frases del cuerpo**, y las FAQ responden preguntas distintas a las del cuerpo.
12. **Anclas de enlaces internos en español natural** con tildes (no el slug: "como salir de deudas de tarjetas de credito").
13. **Calidad antes que cantidad**: si un día no se puede cumplir todo lo anterior, publicar 1 artículo bueno en vez de 2 flojos. No publicar lotes grandes el mismo día.
14. **Fechas honestas**: `date` = publicación real; si se reescribe a fondo, añadir `last_modified_at`. Nunca cambiar fechas para aparentar antigüedad.

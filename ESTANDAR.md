# Estándar de cada artículo

1. **Tema con demanda real**: pregunta concreta que un hispano en EE.UU. busca en Google. Elegir palabra clave principal + 3-5 secundarias (front matter `keywords`).
2. **Título** con la palabra clave al inicio (máx. ~65 caracteres útiles) y `description` de 140-160 caracteres que prometa un resultado.
3. **Front matter obligatorio**: `title`, `description`, `date`, `category` (Crédito, Bancos, Impuestos, Remesas, Ahorro o Vivienda), `keywords`, `resumen` (3-4 viñetas), `faq` (3-4 preguntas reales tipo "People also ask"). `herramienta` (remesas, presupuesto, credito, emergencia, deudas, quiz) cuando encaje.
4. **Cuerpo de 1.200-1.800 palabras**: respuesta directa en el primer párrafo, H2 claros (mín. 4), al menos 1 tabla o lista de pasos, 1 ejemplo con números reales, sección de errores comunes y resumen.
5. **Datos verificados** en fuentes oficiales (IRS, CFPB, FDIC, NCUA, SSA, USCIS, sitios .gov) con enlace. Nada inventado; si una cifra cambia cada año, indicarlo.
6. **Enlaces internos**: mín. 3 a otras guías + 1 a una calculadora. Actualizar 1-2 guías antiguas para que enlacen a la nueva.
7. **Interactividad**: si el tema lo permite, crear una calculadora nueva en `_includes/tools/` + `assets/js/tools.js` + `_data/herramientas.yml` + página en `herramientas/`. Objetivo: 1 herramienta nueva por semana.
8. **QA antes de publicar**: `jekyll build` sin errores, enlaces internos válidos, JSON-LD válido, sin scroll horizontal a 390 px.

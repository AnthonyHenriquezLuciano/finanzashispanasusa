# Indexación: diagnóstico y seguimiento — 30 de octubre de 2026

## Situación informada por Google Search Console
Capturas recibidas del propietario, con fechas de último rastreo:
- `/politica-editorial/` — rastreada el **24/10/2026**, actualmente sin indexar.
- `/pagos-trimestrales-impuestos-1040-es/` — 24/10/2026, sin indexar.
- `/usuario-autorizado-tarjeta-credito-pros-contras/` — 24/10/2026, sin indexar.
- `/fico-vs-vantagescore-diferencias/` — 23/10/2026, sin indexar.
- `/feed.xml` — 20/10/2026, sin indexar.
- `http://www.finanzashispanasusa.com/` y `https://www.finanzashispanasusa.com/` — Google las clasifica como páginas con redirección; **es esperado** si su destino es `https://finanzashispanasusa.com/`.

La indicación **«Rastreada: actualmente sin indexar» no implica un error HTTP**. Las fechas de rastreo son anteriores a varias mejoras de las páginas realizadas entre el 27 y 30 de octubre. No se puede concluir que Google haya evaluado ya la versión actual.

## Cambios implementados
1. Artículo 1040-ES: regla de puerto seguro explicada con condiciones, calendario fiscal 2026 y ejemplo reproducible, citando al IRS.
2. Usuario autorizado: aclaración de responsabilidades, carácter hipotético del caso, incertidumbre sobre reporte y aprobación, fuentes CFPB.
3. FICO/VantageScore: actualización de FHFA a septiembre de 2026, distinción de modelos, reglas y ejemplos, fuentes primarias.
4. Política editorial: indicaciones de cómo reportar errores concretos, límites de revisión y registro de ajustes sin afirmar certificaciones profesionales.
5. Enlaces contextuales y enlaces destacados desde la portada hacia las tres guías; se conservan sus URL.
6. Configuración `sitemap: false` para `feed.xml` mediante Jekyll Front Matter Defaults: el feed sigue sirviendo lectores RSS, pero no debe presentarse en el sitemap como documento para indexar.
7. Prueba automatizada `scripts/verificar_indexacion.py` para detectar regresiones de URLs, sitemap y canonical en código.

## No son problemas que deban corregirse mediante una redirección inversa
- Las dos variantes **www** ya son URL alternativas; deben seguir redirigiendo a la URL **HTTPS sin www**. La exclusión de la variante origen no es un problema de contenido indexable.
- **feed.xml es un feed Atom**, no una guía HTML. Es normal que Google no lo indexe. Evita enviar el feed manualmente para indexación.
- La política editorial es una página de transparencia; que no aparezca individualmente en el índice no significa que no esté disponible para lectores o rastreadores.

## Lista de verificación en Search Console (requiere acceso del propietario)
1. Abrir **Inspección de URL** para cada una de las cuatro páginas HTML (no feed) y ejecutar **Probar URL publicada**.
2. Confirmar: `HTTP 200`, rastreo permitido, indexación permitida, canónica declarada `https://finanzashispanasusa.com/[ruta]/`, y la canónica elegida por Google.
3. Confirmar que `https://finanzashispanasusa.com/sitemap.xml` esté enviado, sin errores.
4. Si la prueba publicada indica que es indexable, **Solicitar indexación** solo para las cuatro páginas HTML. No enviar repetidamente la misma URL.
5. Para **www**, verificar que cada variante redirige al destino sin www, preferiblemente con 301 o 308; si es así, aceptar el estado de exclusión por redirección.
6. Comprobar el reporte de nuevo tras nuevos rastreos. Google puede decidir no indexar incluso páginas correctamente accesibles; no hay garantía de plazo o aprobación.

## Limitaciones de verificación
La integración de GitHub permite comprobar archivos y despliegues, pero **no ofrece la canónica elegida por Google ni la decisión de indexación de cada URL**. Las verificaciones HTTP desde este entorno no han permitido obtener respuestas completas del dominio ni cabeceras. Por eso no se afirma que los estados hayan desaparecido.

## Referencias
- https://developers.google.com/search/docs/crawling-indexing/301-redirects
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors

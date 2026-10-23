# Auditoría SEO y publicación — 23 de octubre de 2026

## Alcance
Repositorio: AnthonyHenriquezLuciano/finanzashispanasusa. Plataforma: Jekyll/GitHub Pages.
Implementación: 30 posts nuevos (5 por cada una de las seis categorías), índice de guías, enlaces internos, ampliación educativa de las principales herramientas, corrección de fechas editoriales y mejoras de breadcrumb JSON-LD.

## Hallazgos respaldados por el código
- **URL canónica prevista:** `https://finanzashispanasusa.com`, según `_config.yml` y `CNAME`. El plugin `jekyll-seo-tag` debe emitir la URL canónica correspondiente.
- **Sitemap:** configurado mediante `jekyll-sitemap` y anunciado en `robots.txt`. Comprobar la generación tras el despliegue.
- **Robots:** permite rastreo general; no contiene `Disallow` para las herramientas listadas.
- **Descubrimiento:** los artículos nuevos aparecen en las categorías y en `/guias/`, enlazado desde la portada y la navegación.
- **Cinco URLs señaladas:** todas existen en el código fuente y tienen ruta `permalink` o índice bajo `/herramientas/`.
- **Variante www:** `www.finanzashispanasusa.com` no es la URL preferida. Un estado “Página con redirección” en esa variante puede ser correcto si redirige al dominio sin www. Comprobar redirección real HTTP y DNS fuera de GitHub.

## Lo que aún no puede verificarse solo con GitHub
1. El motivo concreto que Search Console asigna a cada URL: `Rastreada: actualmente sin indexar`, `Descubierta: actualmente sin indexar`, `Página con redirección`, `Duplicada`, `404`, `noindex` u otro.
2. Respuestas HTTP reales de www/apex, certificado HTTPS, redirecciones 301/308, HTML renderizado y cabeceras `X-Robots-Tag`.
3. La ejecución final de `jekyll build` y las páginas servidas tras el despliegue.
4. Inclusión efectiva en el índice de Google. Ningún cambio de código garantiza indexación.

## Checklist de Search Console
1. Abrir la propiedad **Dominio** `finanzashispanasusa.com` y el informe **Páginas / Indexación**.
2. Abrir **Inspeccionar URL** para cada una de las seis URL proporcionadas. Guardar: motivo, última visita, URL canónica declarada, URL canónica elegida por Google, permiso de rastreo e indexación, respuesta HTTP.
3. Revisar `https://finanzashispanasusa.com/sitemap.xml` y enviarlo/volverlo a enviar si es necesario.
4. Confirmar que el sitio y el sitemap apuntan a **https sin www** y que www redirige permanentemente a la misma ruta canónica.
5. Si hay error reparado, solicitar indexación o **Validar corrección** cuando Search Console habilite la acción.
6. Revisar el informe a lo largo de varios días o semanas. “Página con redirección” para www puede ser comportamiento esperado, no una URL que deba indexarse.

## Control de calidad adicional
- Revisar editorialmente las 30 guías, especialmente condiciones tributarias, seguros y derechos sujetos a cambios.
- Ejecutar `bundle exec jekyll build` con un entorno Jekyll compatible o verificar el resultado de GitHub Pages.
- Comprobar enlaces internos, una sola etiqueta canonical por página, sitemap, metadatos y diseño responsive.

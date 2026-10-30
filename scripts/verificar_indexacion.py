#!/usr/bin/env python3
"""Auditoría estática de rutas señaladas por Search Console.

Comprueba código del repositorio, NO indexación real ni códigos HTTP públicos.
"""
from pathlib import Path
import sys

root = Path(__file__).resolve().parent.parent
config = (root / "_config.yml").read_text(encoding="utf-8")
home = (root / "index.html").read_text(encoding="utf-8")
layout = (root / "_layouts/default.html").read_text(encoding="utf-8")
robots = (root / "robots.txt").read_text(encoding="utf-8")
errors = []

def check(ok, message):
    if not ok:
        errors.append(message)

check((root / "CNAME").read_text().strip() == "finanzashispanasusa.com",
      "CNAME debe utilizar el dominio sin www")
check("url: https://finanzashispanasusa.com" in config,
      "URL base canónica incorrecta")
check("jekyll-seo-tag" in config and "{% seo %}" in layout,
      "No se encuentra SEO Tag para títulos y canonical")
check("jekyll-sitemap" in config and "Sitemap: {{ site.url }}/sitemap.xml" in robots,
      "Sitemap no configurado")
check('scope: {path: "feed.xml"}' in config and "values: {sitemap: false}" in config,
      "RSS debe excluirse del sitemap: no es página editorial de búsqueda")
check('content="noindex' not in layout.lower() and 'content="none' not in layout.lower(),
      "No debe bloquearse la indexación de las guías")
targets = {
    "politica-editorial.md": "/politica-editorial/",
    "_posts/2026-10-23-pagos-trimestrales-impuestos-1040-es.md": "/pagos-trimestrales-impuestos-1040-es/",
    "_posts/2026-10-23-usuario-autorizado-tarjeta-credito-pros-contras.md": "/usuario-autorizado-tarjeta-credito-pros-contras/",
    "_posts/2026-10-23-fico-vs-vantagescore-diferencias.md": "/fico-vs-vantagescore-diferencias/"
}
for file, url in targets.items():
    path = root / file
    check(path.is_file(), f"Falta artículo: {file}")
    if not path.is_file():
        continue
    content = path.read_text(encoding="utf-8")
    check(content.startswith("---\n") and "title:" in content[:500]
          and "description:" in content[:900],
          f"Faltan metadatos básicos: {file}")
    if file.startswith("_posts/"):
        check(url in home, f"Falta enlace destacado desde portada: {url}")
        check("last_modified_at:" in content[:700],
              f"Fecha de revisión no indicada: {file}")
    else:
        check(f"permalink: {url}" in content[:600],
              f"Permalink incorrecto: {file}")

print(f"Revisadas {len(targets)} rutas editoriales, dominio, RSS y sitemap.")
if errors:
    for problem in errors:
        print("ERROR:", problem)
    sys.exit(1)
print("OK: verificación estructural. Falta comprobar Search Console y HTTP real.")

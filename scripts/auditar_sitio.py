#!/usr/bin/env python3
"""Checks for broken local editorial references and accidental ad placement.

Run with: python3 scripts/auditar_sitio.py
This is a structural test, not an AdSense approval test or factual review.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
problems = []

def check(condition, message):
    if not condition:
        problems.append(message)

def content(path):
    file = ROOT / path
    if not file.exists():
        problems.append(f"Missing file: {path}")
        return ""
    return file.read_text(encoding="utf-8")

def target_exists(url):
    if not url.startswith("/"):
        return True
    url = url.split("#", 1)[0].split("?", 1)[0]
    if url in {"/", "/guias/", "/herramientas/"}:
        return True
    if url.startswith("/assets/"):
        return (ROOT / url.lstrip("/")).is_file()
    pieces = url.strip("/").split("/")
    if len(pieces) == 2 and pieces[0] == "herramientas":
        return (ROOT / "herramientas" / (pieces[1] + ".md")).is_file()
    if len(pieces) == 2 and pieces[0] == "categoria":
        return (ROOT / "categoria" / (pieces[1] + ".html")).is_file()
    slug = url.strip("/")
    return (
        (ROOT / (slug + ".md")).is_file()
        or (ROOT / slug / "index.html").is_file()
        or any((ROOT / "_posts").glob("????-??-??-" + slug + ".md"))
    )

config = content("_config.yml")
check("adsense_manual_slots_enabled: false" in config,
      "Explicit manual ad placement should remain disabled during review")
post_layout = content("_layouts/post.html")
tool_layout = content("_layouts/herramienta.html")
check(post_layout.count("{% include ad.html %}") <= 1, "Post has excessive inline ad slots")
check(post_layout.find("{% include ad.html %}") > post_layout.find('<div class="prose">{{ content }}</div>'),
      "Manual ad must not precede the article")
check(tool_layout.find("{% include ad.html %}") > tool_layout.find('<div class="prose">{{ content }}</div>'),
      "Manual ad must not precede the tool explanation")

pages = ["casos-practicos.md", "metodologia-calculadoras.md",
         "sobre-nosotros.md", "contacto.md", "politica-editorial.md",
         "politica-de-privacidad.md"]
pages.extend(str(p.relative_to(ROOT)) for p in (ROOT / "herramientas").glob("*.md"))
for page in pages:
    text = content(page)
    check(text.startswith("---\n"), f"{page} needs Jekyll frontmatter")
    for link in re.findall(r"\]\((/[^)#?]+)(?:\?[^)]*)?\)", text):
        check(target_exists(link), f"{page}: broken internal link {link}")
    if page.endswith(".md"):
        check("title:" in text[:700] and "description:" in text[:700],
              f"{page}: missing title or description")

check(len(list((ROOT / "_posts").glob("*.md"))) >= 10, "Unexpectedly missing articles")
check("mailto:{{ site.contact_email }}" in content("contacto.md"), "Contact needs a mailto link")
check("No afirmamos contar actualmente" in content("politica-de-privacidad.md"),
      "Privacy statement must not promise an unimplemented CMP")

if problems:
    print("\n".join("ERROR: " + p for p in problems))
    sys.exit(1)
print(f"OK: validación estructural de {len(pages)} páginas, referencias y configuración de anuncios.")

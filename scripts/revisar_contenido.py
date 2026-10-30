#!/usr/bin/env python3
"""Detección de riesgos estructurales en todas las guías del sitio.

No verifica veracidad de leyes, precios o ejemplos, ni sustituye una revisión humana.
"""
from pathlib import Path
import itertools
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
POSTS = sorted((ROOT / "_posts").glob("*.md"))
errors, warnings = [], []
slugs = set()
meta = {}

for file in POSTS:
    match = re.match(r"\d{4}-\d{2}-\d{2}-(.+)\.md$", file.name)
    if not match:
        errors.append(f"Nombre de post inválido: {file.name}")
        continue
    slug = match.group(1)
    if slug in slugs:
        errors.append(f"Slug duplicado: {slug}")
    slugs.add(slug)
    raw = file.read_text(encoding="utf8")
    parts = raw.split("\n---\n", 1)
    if len(parts) != 2 or not raw.startswith("---\n"):
        errors.append(f"Frontmatter incorrecto: {file.name}")
        continue
    front, body = parts
    for key in ("title", "description", "date", "category"):
        if not re.search(r"^" + key + r":\s*\S+", front, re.M):
            errors.append(f"{file.name}: sin {key}")
    external = re.findall(r"\]\(https?://[^)]+\)", body)
    if not external:
        warnings.append(f"{file.name}: no cita ninguna fuente externa en el cuerpo")
    for link in re.findall(r"\]\((/[^)\s?#]+)", body):
        pieces = link.strip("/").split("/")
        if link.startswith("/assets/"):
            valid = (ROOT / link.lstrip("/")).is_file()
        elif len(pieces) == 2 and pieces[0] == "herramientas":
            valid = (ROOT / "herramientas" / (pieces[1] + ".md")).is_file()
        elif len(pieces) == 2 and pieces[0] == "categoria":
            valid = (ROOT / "categoria" / (pieces[1] + ".html")).is_file()
        else:
            name = link.strip("/")
            valid = (name in slugs or (ROOT / (name + ".md")).is_file()
                     or (ROOT / name / "index.html").is_file()
                     or (ROOT / name / "index.md").is_file()
                     or name in ("", "herramientas", "guias"))
            if not valid and name not in slugs and name:
                valid = bool(list((ROOT / "_posts").glob("????-??-??-" + name + ".md")))
        if not valid:
            errors.append(f"{file.name}: enlace interno sin destino {link}")
    image = re.search(r"^\s*path:\s*(/assets/img/[^\s]+)", front, re.M)
    if image and not (ROOT / image.group(1).lstrip("/")).is_file():
        errors.append(f"{file.name}: portada inexistente {image.group(1)}")
    normalized = re.sub(r"[^a-záéíóúüñ0-9 ]+", " ", body.lower())
    tokens = re.findall(r"\b\w+\b", normalized)
    shingles = set(zip(*(tokens[i:] for i in range(6)))) if len(tokens) > 12 else set()
    meta[file.name] = (len(tokens), shingles)

for (aname, (aw, ash)), (bname, (bw, bsh)) in itertools.combinations(meta.items(), 2):
    if not ash or not bsh:
        continue
    similarity = len(ash & bsh) / max(1, len(ash | bsh))
    if similarity >= .35:
        warnings.append(f"Posible solapamiento editorial ({similarity:.0%}): {aname} / {bname}")

print(f"Guías: {len(POSTS)} | errores: {len(errors)} | alertas editoriales: {len(warnings)}")
for item in errors:
    print("ERROR:", item)
for item in warnings:
    print("REVISAR:", item)
if errors:
    sys.exit(1)

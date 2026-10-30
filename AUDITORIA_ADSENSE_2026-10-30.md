# Preparación para nueva revisión de AdSense — 30 de octubre de 2026

## Motivo comunicado por Google
El panel de AdSense muestra **«Contenido de poco valor»**. No se deben interpretar automáticamente otras supuestas infracciones: el aviso proporcionado no las especifica.

## Acciones incorporadas al código
- Se eliminaron anuncios insertados **antes** de los artículos y de la explicación de las herramientas.
- Los anuncios manuales están desactivados por configuración mientras dura la preparación. El cargador del cliente AdSense permanece para verificación del sitio.
- La portada prioriza recursos educativos originales, sin promoción directa de una plantilla comercial.
- Se publican **cuatro casos hipotéticos desarrollados con operaciones reproducibles**, metodología de ocho calculadoras y **dos CSV descargables**.
- Se aclaran limitaciones y resultados estimados en calculadoras, incluida la utilización crediticia y los costos de remesas.
- Se corrigen afirmaciones demasiado absolutas de algunos artículos y se mejora la transparencia de contacto, autoría y política editorial.
- Se corrige la política de privacidad para no afirmar que existe un consentimiento europeo implementado cuando aún no está configurado.
- Se agrega verificación estructural automática de enlaces y código de calculadoras mediante GitHub Actions.

## Pasos que el propietario debe completar ANTES de solicitar revisión
1. **AdSense > Anuncios > Por sitio:** desactivar temporalmente **Anuncios automáticos** si están activos. El script global de verificación sigue presente y puede activar anuncios automáticos desde la cuenta, aunque se apaguen los bloques manuales en el repositorio.
2. **AdSense > Privacidad y mensajes:** si se van a servir anuncios en EEE, Reino Unido o Suiza, configurar el mensaje europeo con una **plataforma de gestión del consentimiento certificada por Google**. No basta con un banner propio.
3. Comprobar que `contacto@finanzashispanasusa.com` **recibe correos realmente** y que los avisos legales describen los servicios que se utilizan.
4. Revisar manualmente las **65 guías**: confirmar exactitud de afirmaciones legales, tasas y plazos, especialmente impuestos, hipotecas y crédito. No publicar afirmaciones como revisadas profesionalmente salvo evidencia.
5. Abrir la portada, menú, herramientas, enlaces a guías, casos y hojas CSV en móvil y escritorio. Realizar pruebas manuales con valores cero, vacíos, altos y distintos métodos de pago.
6. Confirmar en el dominio público `https://finanzashispanasusa.com/` que hay código `200`, HTTPS válido, canónicas coherentes, `robots.txt`, `ads.txt` y `sitemap.xml`.
7. Una vez desplegada y comprobada la web, **solicitar una nueva revisión desde la cuenta AdSense**. No presentar la solicitud como garantía de éxito.

## Límites de esta auditoría
No tenemos acceso al panel interno de AdSense ni a sus señales de calidad, por lo que no es posible probar ni garantizar la aprobación. Este archivo registra correcciones verificables en GitHub, no una certificación ni una revisión profesional de las 65 guías.

## Fuentes oficiales
- https://support.google.com/publisherpolicies/answer/11112688?hl=es
- https://support.google.com/adsense/answer/13554116?hl=en
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=es

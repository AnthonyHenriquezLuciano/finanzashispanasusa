---
title: "Metodología de nuestras calculadoras financieras"
description: "Fórmulas, supuestos, pruebas numéricas y límites de las herramientas gratuitas de remesas, crédito, deudas, presupuesto, ahorro y préstamos."
permalink: /metodologia-calculadoras/
---
En Finanzas Hispanas USA preferimos mostrar **qué calcula realmente una herramienta** antes que ofrecer un «resultado perfecto». Esta página documenta los métodos de las calculadoras del sitio, para que puedas comprobarlos con papel, Excel o una hoja de cálculo.

**Importante:** todas las calculadoras ofrecen estimaciones educativas. No consultan tu información en agencias de crédito, no acceden a cotizaciones bancarias en tiempo real, no predicen aprobación de préstamos y no sustituyen contratos o regulaciones.

## 1. Utilización de tarjetas de crédito

**Fórmula:** suma de los saldos de tarjetas ÷ suma de sus límites × 100. Si dos tarjetas tienen saldos de $450 y $120, y límites de $1,000 y $500:

| Variable | Ejemplo |
|---|---:|
| Saldo conjunto | $570 |
| Límite conjunto | $1,500 |
| Utilización total | **38 %** |

La calculadora muestra cuánto tendrías que reducir el saldo para llegar a porcentajes de referencia, sin predecir cambios del puntaje. En el ejemplo: para llegar a 30 %, el saldo total objetivo sería $450 y el pago orientativo, **$120**. Para llegar a 10 %, sería $150 y el pago, **$420**.

**Límite del método:** no todas las deudas cuentan igual; el puntaje puede evaluar la utilización **por tarjeta** y otros factores además del agregado. La fecha de reporte es distinta de la de vencimiento. [Abrir calculadora de crédito](/herramientas/calculadora-utilizacion-credito/). Ver [CFPB sobre puntuaciones](https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/).

## 2. Remesas

La calculadora estima cuánto se entrega en moneda de destino y cuánto gastas en dólares según las entradas que introduzcas.

- **Recibe:** dólares que se cambian × tipo de cambio del proveedor.
- **Desembolso:** monto enviado + comisión adicional + impuesto que corresponda según la modalidad.
- **Rendimiento neto comparable:** moneda entregada ÷ desembolso total.

Con **$300**, tasa de **58.30** y **$3** de comisión, se reciben **17,490** unidades y se desembolsan **$303** bajo estos supuestos. El rendimiento es 17,490 ÷ 303 ≈ **57.72 unidades por dólar gastado**.

El «costo de cambio» adicional que muestra la herramienta depende de una tasa de referencia **introducida manualmente**. No incluye promociones no especificadas, retenciones en destino ni cargos ocultos. La comparación anual supone repetir exactamente la misma operación **12 veces**, lo que no representa una predicción de tasas futuras. [Abrir calculadora de remesas](/herramientas/calculadora-remesas/).

Fuentes para revisar derechos y excepciones: [CFPB, transferencias de remesas](https://www.consumerfinance.gov/ask-cfpb/what-is-a-remittance-transfer-and-what-are-my-rights-en-1161/).

## 3. Presupuesto 50/30/20

**Fórmula por categoría:** ingreso mensual **neto** × porcentaje. Si recibes $2,400 después de impuestos:

| Uso | Porcentaje | Importe |
|---|---:|---:|
| Necesidades | 50 % | $1,200 |
| Deseos | 30 % | $720 |
| Ahorro/deuda adicional | 20 % | $480 |

Cuando activas la opción de remesas familiares, la herramienta usa un modelo de referencia de 50 % necesidades, 20 % remesas, 10 % deseos y 20 % ahorro. No es una distribución prescrita para todos los hogares; si el alquiler ocupa más, debes adaptar los porcentajes y mantener el total en 100 %.

La proyección de ahorro anual multiplica la cantidad por 12: no incluye intereses ni meses en que no puedas aportar. [Abrir calculadora de presupuesto](/herramientas/calculadora-presupuesto-50-30-20/).

## 4. Fondo de emergencia

**Meta:** gastos esenciales mensuales × meses de cobertura elegidos. **Pendiente:** máximo entre 0 y meta menos ahorro disponible. **Meses estimados:** redondear hacia arriba el dinero pendiente ÷ aporte mensual.

Ejemplo: gastos $1,800, meta de 3 meses = **$5,400**. Si tienes $900 y ahorras $300 mensuales, quedan $4,500 y necesitarías **15 meses**, sin intereses ni retiros. El mes final se estima a partir de la fecha del dispositivo.

La cifra no incluye inflación, variaciones de gastos o interrupciones de aportes. [Abrir fondo de emergencia](/herramientas/calculadora-fondo-de-emergencia/).

## 5. Calculadora de deudas

Para cada deuda se simula mensualmente: **saldo nuevo = saldo anterior + interés estimado − pagos**. El interés aproximado de cada mes se calcula como saldo × APR ÷ 12.

Se comparan dos órdenes para asignar el pago adicional:
- **Avalancha:** prioriza el saldo con APR mayor.
- **Bola de nieve:** prioriza el saldo pendiente más pequeño.

El simulador asume pagos mensuales constantes y una tasa APR que no cambia. No añade cargos por atraso, compras nuevas, impuestos, intereses diarios, promociones que vencen ni penalizaciones. Si el pago no permite extinguir la deuda dentro del horizonte del simulador, se advierte que el plan no finaliza. [Abrir calculadora de deudas](/herramientas/calculadora-salir-de-deudas/).

## 6. Préstamo de automóvil

Se emplea la fórmula usual de **cuota fija para préstamo amortizable**:

**Cuota = P × r ÷ [1 − (1 + r) elevado a −n]**

donde **P** es el principal financiado, **r** es la tasa mensual APR ÷ 1,200 y **n** el número de mensualidades. Si la tasa es 0 %, la cuota es P ÷ n.

La calculadora permite incorporar impuesto sobre ventas al precio y restar el enganche. El interés total estimado es cuota × número de meses − principal. **No incluye** automáticamente cargos de registro, seguro, mantenimiento ni comisiones de originación. [Abrir calculadora de auto](/herramientas/calculadora-prestamo-de-auto/).

## 7. ¿Cuánta casa puedo pagar?

La herramienta usa una restricción educativa sobre la deuda mensual: toma el menor valor entre un porcentaje DTI elegido del ingreso bruto menos otras deudas y un límite orientativo de vivienda de 31 % del ingreso bruto. Después estima un precio que permite ese pago bajo una tasa y un porcentaje de impuestos/seguros.

No es una aprobación hipotecaria. **No incorpora automáticamente** PMI/MIP, HOA, reparaciones, otras condiciones de underwriting ni costos de cierre. Tampoco es una cotización de tasa vigente. Nunca asumas que el banco prestará el importe estimado. [Abrir calculadora de vivienda](/herramientas/calculadora-cuanta-casa-puedo-pagar/). Fuente: [CFPB, préstamos hipotecarios](https://www.consumerfinance.gov/owning-a-home/).

## 8. Test de salud financiera

El cuestionario evalúa **ocho hábitos** con puntuaciones educativas de 0, 1 o 2, luego convierte la suma a una escala de 0–100. Por ejemplo, 12 puntos de un máximo de 16 dan **75/100**. Las sugerencias provienen de las respuestas con puntuación baja.

**No es** un score bancario, una evaluación clínica, una puntuación FICO ni una predicción de solvencia. No requiere registro y no necesitas compartir números de cuenta. [Abrir test](/herramientas/test-salud-financiera/).

## Cómo detectar un resultado sospechoso

1. Revisa si usaste dólares, porcentajes anuales o moneda local correctamente.
2. Comprueba si una tarifa **se suma al pago** o **se descuenta del principal**.
3. En tarjetas, diferencia **saldo actual**, **saldo del estado de cuenta** y **saldo reportado**.
4. En préstamos, añade al presupuesto los gastos no incluidos en la cuota.
5. Verifica si tu caso tiene reglas especiales por estado, banco o producto financiero.

Para replicar cálculos con datos de ejemplo, usa los [casos prácticos](/casos-practicos/), la [plantilla CSV de comparación](/assets/recursos/comparar-opciones.csv) o nuestra [política de correcciones](/politica-editorial/).

**Actualización del documento:** 30 de octubre de 2026. Si detectas diferencias entre estas fórmulas y el comportamiento real de alguna herramienta, envía el caso por [Contacto](/contacto/).

---
id: configuracion-agentes-ia
title: Configuración de agentes IA
sidebar_position: 2
description: Guía paso a paso para configurar los agentes de IA de Urbox sin conocimientos técnicos.
---

# Guía para configurar la IA de Urbox (sin conocimientos técnicos)

Esta guía explica, paso a paso, cómo activar y configurar los **Agentes de IA** de Urbox para que respondan a tus clientes por WhatsApp.

Está pensada para personas de negocio: administradores, responsables de atención al cliente o ventas. No necesitas saber programar.

> **Idea general:** tú contratas una cuenta con un proveedor de IA (OpenAI, Anthropic u otro compatible), pegas su clave en Urbox y configuras cómo quieres que se comporte tu agente. Urbox no te cobra la IA por usuario: el consumo se paga directamente a tu proveedor.

## Contenido

1. [Qué puede hacer la IA en Urbox](#1-qué-puede-hacer-la-ia-en-urbox)
2. [Antes de empezar](#2-antes-de-empezar)
3. [Mapa de la pantalla](#3-mapa-de-la-pantalla)
4. [Configuración general, paso a paso](#4-configuración-general-paso-a-paso)
5. [Crear tu primer agente](#5-crear-tu-primer-agente)
6. [Cómo se comporta en el día a día](#6-cómo-se-comporta-en-el-día-a-día)
7. [Ejemplos completos de uso](#7-ejemplos-completos-de-uso)
8. [Cómo escribir buenas instrucciones](#8-cómo-escribir-buenas-instrucciones)
9. [Seguridad y buenas prácticas](#9-seguridad-y-buenas-prácticas)
10. [Problemas comunes](#10-problemas-comunes)
11. [Glosario rápido](#11-glosario-rápido)
12. [Checklist final antes de activar](#12-checklist-final-antes-de-activar)

---

## 1. Qué puede hacer la IA en Urbox

Un agente de IA puede:

- Responder automáticamente por WhatsApp.
- Redactar borradores para que una persona los revise y envíe.
- Buscar respuestas en tu **base de conocimiento** (preguntas frecuentes, políticas, productos…).
- Leer notas de voz de los clientes (las transcribe).
- Entender fotos que llegan sin texto (las describe para poder responder).
- Consultar contactos, conversaciones, oportunidades y seguimientos.
- Crear o mover oportunidades en el embudo.
- Consultar disponibilidad y crear citas si conectaste Google Calendar.
- Derivar a una persona cuando no sabe, cuando el cliente lo pide o cuando se alcanza un límite.

Lo que **no** hace por sí sola:

- No inventa precios, stock ni fechas si no están en tu información. Para eso debes dárselos en la base de conocimiento o en las instrucciones.
- No envía mensajes si el asistente está apagado, si el agente está inactivo o si un compañero ya tomó la conversación.
- No responde a mensajes que un **flujo** o una **automatización** ya consumió, para no duplicar respuestas.

---

## 2. Antes de empezar

Ten a mano:

- [ ] Rol de **administrador o propietario** en Urbox.
- [ ] Tu WhatsApp Business conectado en **Configuración → WhatsApp**.
- [ ] Una **clave de API** de tu proveedor de IA.
- [ ] La información de tu negocio: qué vendes, precios, horarios, políticas de envío/devolución, preguntas frecuentes.
- [ ] Decidir quién atenderá los chats cuando la IA derive a una persona.

### ¿Qué es una clave de API?

Es una contraseña larga que te da el proveedor de IA para que Urbox pueda usar tu cuenta. Se pega una vez y queda cifrada. Ejemplos: `sk-...` en OpenAI.

> **Importante:** la clave se guarda cifrada y no se vuelve a mostrar. Si la pierdes, genera una nueva en el panel de tu proveedor.

### ¿Dónde consigo una clave?

| Proveedor | Dónde crearla |
|---|---|
| OpenAI | platform.openai.com → API keys |
| Anthropic | console.anthropic.com → API keys |
| OpenRouter | openrouter.ai → Keys |
| API compatible | El panel de tu proveedor (Groq, Together, etc.) |

---

## 3. Mapa de la pantalla

Entra a **Agentes IA** en el menú lateral. Verás tres pestañas:

| Pestaña | Para qué sirve |
|---|---|
| **Agentes** | Configurar la conexión general, la base de conocimiento y tus agentes. |
| **Playground** | Probar al agente como si fueras un cliente, antes de que responda de verdad. |
| **Uso** | Ver cuánto se ha usado, cuánto cuesta y resultados comerciales. |

Dentro de **Agentes** hay dos zonas:

1. **Configuración general de IA** (bloque plegable). Aquí van la clave del proveedor, el contexto del negocio, el interruptor general y la base de conocimiento.
2. **Tus agentes**. Aquí creas y editas cada agente.

---

## 4. Configuración general, paso a paso

Abre **Agentes IA → Agentes** y despliega **Configuración general de IA**.

### Paso 1. Proveedor y clave

1. Elige tu **Proveedor**: OpenAI, Anthropic, OpenRouter o API compatible con OpenAI.
2. Elige el **Modelo** (puedes dejar el sugerido).
3. Pega tu **Clave de API**.
4. Si usas una **API compatible**, escribe la **URL base** que te dio tu proveedor.
5. Pulsa **Probar clave**. Debe aparecer “La clave funciona”.
6. Pulsa **Guardar**.

> La **clave de embeddings** es opcional. Si la añades, la búsqueda dentro de la base de conocimiento será más inteligente (por significado, no solo por palabras). Si la dejas vacía, la búsqueda funciona por palabras clave.

### Paso 2. Activar el asistente

Activa **Activar asistente de IA**. Es el interruptor general:

- **Apagado:** ningún agente responde ni redacta.
- **Encendido:** cada agente decide después si responde automáticamente, prepara un borrador o solo sugiere.

### Paso 3. Contexto del negocio

En **Contexto del negocio e instrucciones**, escribe un párrafo claro. Esta información la usan todos los agentes como base.

Ejemplo:

```text
Somos Café Andino, una tienda de café de especialidad en Bogotá.
Vendemos café en grano, molido y métodos de preparación.
Horario: lunes a sábado, 8:00 a 18:00.
Envíos en Bogotá en 24-48 horas; fuera de Bogotá en 3-5 días hábiles.
Aceptamos tarjeta, transferencia y pago contra entrega.
Nunca inventes precios ni fechas de entrega.
Si no tienes el dato, pide el correo del cliente y deriva a una persona.
```

Consejos:

- Usa frases cortas y directas.
- Di explícitamente lo que **no** debe hacer.
- No pegues aquí listas gigantes de productos: para eso está la base de conocimiento.

### Paso 4. Base de conocimiento

En la tarjeta **Base de conocimiento** puedes **Agregar documento**. Cada documento es un texto con un título.

Añade documentos separados por tema:

| Título | Contenido |
|---|---|
| Precios | Lista de productos y precios vigentes. |
| Envíos | Zonas, costos y tiempos de entrega. |
| Devoluciones | Política completa, plazos y pasos. |
| Preguntas frecuentes | Pregunta y respuesta, una debajo de otra. |
| Horarios y ubicación | Dirección, horarios, cómo llegar. |

Ejemplo de documento:

```text
Título: Política de devoluciones

Aceptamos devoluciones dentro de los 30 días posteriores a la compra.
El producto debe estar sin abrir y en su empaque original.
El cliente debe escribir a este mismo WhatsApp con su número de pedido.
Los reembolsos se procesan en 5-10 días hábiles al mismo medio de pago.
No aceptamos devoluciones de café ya abierto por motivos de higiene.
```

Cuando termines, pulsa **Guardar documento**. Si añades o cambias muchos documentos, usa **Reindexar** para actualizar la búsqueda.

### Paso 5. Derivación general

En **Derivar a**, elige quién recibe los chats cuando el bot no puede ayudar:

- **Cola sin asignar:** cualquier compañero puede tomarlo.
- **Una persona concreta:** todo se asigna a esa persona.

El límite de respuestas por conversación se configura dentro de cada agente (ver **5.4 Límites**).

---

## 5. Crear tu primer agente

En **Tus agentes**, pulsa **Nuevo agente**.

### 5.1 Datos generales

| Campo | Qué escribir | Ejemplo |
|---|---|---|
| **Nombre** | Cómo se llamará el agente. | `Asistente de ventas` |
| **Rol** | Tipo de trabajo. | `Ventas` |
| **Descripción** | Para qué sirve, en una frase. | `Responde dudas y toma pedidos de café.` |
| **Prioridad** | Si hay varios agentes, cuál gana. | `0` (el primero) |
| **Objetivo** | Qué debe lograr. | `Resolver dudas y pasar el pedido a una persona.` |
| **Personalidad** | Cómo se comporta. | `Cercano, breve, nunca insistente.` |
| **Instrucciones** | Reglas concretas. | Ver ejemplos más abajo. |
| **Tono** | Estilo de escritura. | `Amable y profesional, tuteo.` |

### 5.2 Modelo y enrutamiento

| Campo | Qué significa |
|---|---|
| **Proveedor** | El mismo que configuraste arriba, salvo que quieras otro. |
| **Modelo** | El “cerebro” que usará este agente. A mejor modelo, mejores respuestas y mayor coste. |
| **Credencial** | Déjala vacía para usar la clave general de la cuenta. |
| **Modo de respuesta** | Automático, Supervisado o Solo sugerencias. |
| **Derivar a** | Persona o cola que recibe el chat cuando la IA no puede. |
| **Activo** | Si está apagado, este agente no responde. |

### 5.3 Los tres modos de respuesta

| Modo | Qué hace | Cuándo usarlo |
|---|---|---|
| **Automático** | Responde solo, sin intervención. | Consultas simples, horarios, FAQ, seguimiento. |
| **Supervisado (aprobación)** | No envía nada: prepara la respuesta y una persona la revisa y la usa. Las acciones sensibles quedan pendientes de aprobación. | Ventas, precios, casos delicados. |
| **Solo sugerencias** | También prepara la respuesta para que una persona decida. En la práctica funciona como un borrador. | Equipos que quieren control total al principio. |

> Recomendación: empieza en **Supervisado** (o **Solo sugerencias**) durante una o dos semanas. Cuando veas que responde bien, cambia a **Automático** en los temas seguros.

### 5.4 Límites (opcional pero recomendado)

| Límite | Para qué sirve |
|---|---|
| **Límite diario de tokens** | Techo de consumo diario. `0` = sin límite. |
| **Límite mensual de tokens** | Techo de consumo mensual. |
| **Límite mensual de costo (USD)** | Frena el gasto. |
| **Máximo de respuestas por conversación** | Evita que el bot insista en un hilo. |
| **Máximo de herramientas por turno** | Evita cadenas largas de acciones. |

> Un **token** es una unidad de texto (más o menos una palabra corta). No necesitas calcularlo: usa los límites como un “presupuesto” y ajústalos con la pestaña **Uso**.

### 5.5 Herramientas

Marca solo las que el agente necesite. Menos herramientas = respuestas más rápidas y seguras.

| Grupo | Ejemplos | Qué permiten |
|---|---|---|
| Contactos | Buscar, ver, crear, actualizar, añadir nota | Consultar y completar la ficha del cliente. |
| Conversaciones | Ver, leer mensajes, asignar, pausar IA, derivar | Entender el historial y pasar el chat a una persona. |
| Embudo | Listar oportunidades, crear, mover de etapa | Registrar interés comercial real. |
| Calendario | Ver disponibilidad, crear, reprogramar, cancelar cita | Agendar si conectaste Google Calendar. |
| Seguimiento | Crear y listar seguimientos | Dejar tareas para el equipo. |
| Analítica | Resumen analítico | Consultar actividad real de la cuenta. |
| Mensajes | Enviar mensaje | Enviar un texto dentro de la conversación actual. |

Las acciones sensibles (crear oportunidad, mover etapa, asignar, derivar…) llevan la etiqueta **Aprobación**: el agente no las ejecuta por su cuenta, quedan propuestas para revisión. Si tu equipo no tiene un proceso claro para revisarlas, deja esas herramientas desactivadas.

### 5.6 Base de conocimiento del agente

Marca los documentos que este agente puede usar. Si no marcas ninguno, usará toda la base general. Para un agente de ventas, marca precios, envíos y productos; para uno de soporte, políticas y FAQ.

### 5.7 Guardar y probar

1. Pulsa **Guardar agente**.
2. Ve a la pestaña **Playground**.
3. Escribe como si fueras un cliente:

```text
Hola, ¿tienen café descafeinado?
¿Cuánto cuesta el envío a Medellín?
Quiero devolver un pedido.
```

4. Revisa si responde con tu información, si deriva cuando debe y si no inventa datos.
5. Ajusta instrucciones o conocimiento y vuelve a probar.

---

## 6. Cómo se comporta en el día a día

### Si el agente está en Automático

- Responde solo al cliente.
- Si no sabe, deriva y deja una nota con el motivo.
- Si detecta una nota de voz, la transcribe.
- Si detecta una foto sin texto, la describe.
- Si no puede transcribir o describir, deriva a una persona en lugar de responder a ciegas.

### Si está en Supervisado o Solo sugerencias

- En la conversación aparece un panel: **“La IA preparó una respuesta”**.
- Puedes pulsar **Usar respuesta** (la lleva al cuadro de texto para revisarla y enviarla) o **Descartar**.
- Cuando usas una sugerencia, queda registrada para la analítica.

### Cuándo no responde

- El asistente general está apagado.
- El agente está inactivo.
- Un compañero ya tiene asignada la conversación.
- Un flujo o automatización ya respondió.
- Se alcanzó el máximo de respuestas o el límite de presupuesto.
- La conversación fue pausada manualmente.

### Notas sobre notas de voz y fotos

- **Nota de voz:** el agente la transcribe y responde al contenido. El cliente sigue viendo su audio como siempre.
- **Foto sin texto:** el agente la describe automáticamente para poder responder. Esa descripción aparece bajo la foto en la bandeja, así que el equipo también sabe qué contenía.
- **Si no se puede transcribir o describir:** el chat se deriva a una persona. Es preferible a que la IA conteste sobre un mensaje anterior.

---

## 7. Ejemplos completos de uso

### Ejemplo A — Tienda de café (ventas)

**Objetivo:** resolver dudas y preparar pedidos, sin cerrar la venta solo.

**Modo:** Supervisado.

**Instrucciones sugeridas:**

```text
Eres el asistente de Café Andino.
Responde en español, con tono cercano y mensajes cortos.
Usa solo la información de la base de conocimiento.
Nunca inventes precios, stock ni fechas de entrega.
Si el cliente quiere comprar, confirma producto, cantidad, dirección y método de pago,
y deriva a una persona para cerrar el pedido.
Si pregunta por una devolución, explica la política y deriva.
Si el cliente está molesto, deriva de inmediato.
```

**Herramientas:** contactos (buscar/ver), conversaciones (ver/leer/derivar), embudo (crear oportunidad), seguimiento (crear).

**Documentos:** Precios, Envíos, Devoluciones, Preguntas frecuentes.

**Conversación esperada:**

```text
Cliente: Hola, ¿tienen café descafeinado?
Agente: ¡Hola! Sí, tenemos descafeinado en grano y molido. ¿Te cuento los precios?

Cliente: ¿Cuánto cuesta el envío a Medellín?
Agente: A Medellín el envío cuesta $18.000 y llega en 3-5 días hábiles.

Cliente: Quiero devolver mi último pedido.
Agente: Claro. Aceptamos devoluciones dentro de 30 días, sin abrir y en su empaque original.
Te paso con una persona del equipo para gestionarlo.
```

---

### Ejemplo B — Clínica o centro de estética (reservas)

**Objetivo:** informar servicios y agendar citas.

**Modo:** Automático para información; Supervisado si hay que confirmar pagos.

**Instrucciones sugeridas:**

```text
Eres el asistente de Clínica Bienestar.
Informa servicios, precios y horarios usando solo la base de conocimiento.
Para agendar, pide nombre completo, servicio deseado y dos opciones de fecha y hora.
Consulta la disponibilidad real antes de ofrecer horarios.
Nunca confirmes una cita sin crearla en el calendario.
Si el servicio requiere evaluación previa, explica el proceso y deriva.
No des diagnósticos ni consejos médicos.
```

**Herramientas:** calendario (disponibilidad, crear cita), contactos, conversaciones, seguimiento.

**Documentos:** Servicios y precios, Horarios, Preparación previa, Política de cancelación.

**Conversación esperada:**

```text
Cliente: ¿Tienen limpieza facial? ¿Cuánto cuesta?
Agente: Sí, la limpieza facial profunda cuesta $120.000 y dura 60 minutos.
¿Quieres que revise disponibilidad esta semana?

Cliente: Sí, el jueves o viernes por la tarde.
Agente: Tengo jueves 3:00 p. m. y viernes 4:30 p. m. ¿Cuál prefieres?

Cliente: Jueves 3.
Agente: Perfecto. ¿Me confirmas tu nombre completo para agendar?
```

---

### Ejemplo C — Inmobiliaria (seguimiento)

**Objetivo:** calificar interesados y dejar seguimiento al asesor.

**Modo:** Supervisado.

**Instrucciones sugeridas:**

```text
Eres el asistente de Inmobiliaria Norte.
Pregunta qué busca el cliente: zona, presupuesto, número de habitaciones y si es compra o arriendo.
No inventes inmuebles ni precios que no estén en la base de conocimiento.
Cuando tengas los datos, crea una oportunidad en el embudo y un seguimiento para el asesor.
No prometas visitas hasta que un asesor las confirme.
Si el cliente pide hablar con una persona, deriva de inmediato.
```

**Herramientas:** contactos, conversaciones, embudo, seguimiento.

**Documentos:** Inmuebles disponibles, Zonas, Requisitos de arriendo, Preguntas frecuentes.

**Conversación esperada:**

```text
Cliente: Busco apartamento en el norte, hasta 2 millones.
Agente: Gracias. ¿Cuántas habitaciones necesitas y es para arriendo o compra?

Cliente: Arriendo, dos habitaciones.
Agente: Perfecto. Tengo opciones desde $1.800.000 en el norte.
¿Quieres que un asesor te contacte con las fichas y agende una visita?
```

---

### Ejemplo D — Soporte de software (FAQ)

**Objetivo:** resolver dudas repetitivas y escalar incidencias.

**Modo:** Automático para preguntas frecuentes; derivar incidencias.

**Instrucciones sugeridas:**

```text
Eres el asistente de soporte de FacturaPro.
Responde solo con la base de conocimiento: cómo crear una factura, cómo exportar,
cómo recuperar la contraseña y qué planes existen.
No prometas soluciones ni tiempos de arreglo.
Si el cliente reporta un error, pide captura de pantalla, correo de la cuenta y
los pasos para reproducirlo; después deriva a soporte humano.
Nunca pidas contraseñas ni datos de tarjeta.
```

**Herramientas:** contactos, conversaciones (leer, derivar), seguimiento.

**Documentos:** Guías de uso, Planes y precios, Errores frecuentes, Política de soporte.

**Conversación esperada:**

```text
Cliente: No puedo exportar mi factura a PDF.
Agente: Revisa estos pasos: abre la factura, pulsa “Descargar” y elige PDF.
Si el botón no aparece, envíame una captura y el correo de tu cuenta.
Voy a pasar tu caso a soporte para revisarlo.
```

---

## 8. Cómo escribir buenas instrucciones

### Sí funciona

- “Responde en español, en mensajes de máximo 3 líneas.”
- “Usa solo la información de la base de conocimiento.”
- “Nunca inventes precios ni fechas.”
- “Si el cliente pide hablar con una persona, deriva.”
- “Antes de agendar, pide nombre y dos opciones de horario.”
- “Si el cliente está molesto, deriva de inmediato.”

### Evita

- “Sé inteligente y ayuda en todo.” (demasiado vago)
- “Vende mucho.” (no es una instrucción concreta)
- Pegar un catálogo de 200 productos en las instrucciones (mejor en conocimiento).
- Dar datos que cambian cada semana sin actualizar la base de conocimiento.
- Pedir contraseñas, datos de tarjeta o información sensible.

### Regla de oro

> Si un compañero nuevo pudiera responder solo con tus instrucciones y tus documentos, la IA también podrá.

---

## 9. Seguridad y buenas prácticas

- La clave de IA solo la ven administradores. No la compartas por chat ni correo.
- Usa el rol mínimo necesario para tu equipo.
- Empieza en **Supervisado** y revisa conversaciones reales antes de pasar a **Automático**.
- Activa la **aprobación** para acciones que crean o modifican datos.
- Revisa la pestaña **Uso** cada semana: ejecuciones, coste, derivaciones, acciones fallidas y resultados comerciales.
- Mantén la base de conocimiento al día. Si cambian precios u horarios, actualízalos el mismo día.
- Define un límite mensual de coste desde el primer día.

---

## 10. Problemas comunes

| Síntoma | Qué revisar |
|---|---|
| **El agente no responde** | Que “Activar asistente de IA” esté encendido; que el agente esté Activo; que la conversación no tenga un compañero asignado; que no se haya alcanzado el límite de respuestas o presupuesto. |
| **Responde con información vieja** | Actualiza el documento correspondiente y pulsa **Reindexar**. |
| **Inventa precios o fechas** | Añade el dato real a la base de conocimiento y refuerza “Nunca inventes…” en las instrucciones. |
| **Deriva demasiado** | Revisa si falta información en la base de conocimiento o si las instrucciones son demasiado restrictivas. |
| **No deriva cuando debería** | Añade reglas explícitas: “Deriva si el cliente lo pide, si está molesto o si pregunta algo que no está en el conocimiento”. |
| **No lee notas de voz** | Verifica que tengas una clave de OpenAI o una clave de embeddings compatible. Si no puede transcribir, deriva a una persona. |
| **No entiende una foto** | La describe un modelo de visión. Si tu modelo no soporta imágenes, configura uno con visión o revisa con una persona. |
| **Gasta más de lo esperado** | Baja el modelo, reduce el máximo de respuestas por conversación o pon un límite mensual de coste. |
| **Dos respuestas al mismo mensaje** | Revisa que no haya un flujo o automatización respondiendo lo mismo. La IA se retira cuando un flujo consume el mensaje. |
| **La clave no funciona** | Vuelve a generarla en el panel del proveedor y pégala de nuevo. Comprueba que no tenga espacios y que la cuenta tenga saldo. |

---

## 11. Glosario rápido

| Término | Significado sencillo |
|---|---|
| **Agente** | El asistente de IA con nombre, instrucciones y herramientas propias. |
| **Proveedor** | La empresa que pone el “cerebro” de la IA (OpenAI, Anthropic…). |
| **Modelo** | La versión concreta del cerebro. Más potente = mejor y más caro. |
| **Clave de API** | La contraseña que conecta Urbox con tu proveedor. |
| **Token** | Unidad de texto que se cobra. Sirve para poner presupuestos. |
| **Base de conocimiento** | Tus documentos con la información que la IA puede usar. |
| **Embeddings** | Búsqueda por significado dentro de la base de conocimiento. |
| **Herramienta** | Acción que la IA puede hacer: buscar un contacto, crear una oportunidad, agendar… |
| **Aprobación** | La IA propone una acción y una persona la confirma antes de ejecutarla. |
| **Derivar / handoff** | Pasar la conversación a una persona. |
| **Playground** | Zona de pruebas para hablar con el agente sin afectar a clientes reales. |
| **Flujo / automatización** | Reglas que ya responden solas. Tienen prioridad sobre la IA. |

---

## 12. Checklist final antes de activar

- [ ] Clave del proveedor probada y guardada.
- [ ] “Activar asistente de IA” encendido.
- [ ] Contexto del negocio escrito.
- [ ] Base de conocimiento con precios, horarios, envíos y políticas.
- [ ] Agente creado con objetivo, instrucciones y tono.
- [ ] Modo de respuesta elegido (recomendado: Supervisado al inicio).
- [ ] Persona o cola de derivación configurada.
- [ ] Límites de consumo definidos.
- [ ] Herramientas necesarias marcadas.
- [ ] Pruebas en Playground con preguntas reales.
- [ ] Una persona revisando la bandeja durante los primeros días.
- [ ] Pestaña **Uso** revisada semanalmente.

Con esto ya puedes empezar. Si algo no encaja, cambia una sola cosa a la vez (instrucciones, documento o modo), prueba en Playground y vuelve a medir.

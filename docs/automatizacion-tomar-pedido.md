---
id: automatizacion-tomar-pedido
title: Crear una automatización para tomar pedidos
sidebar_position: 3
description: Guía paso a paso para crear una automatización básica que recibe un pedido por WhatsApp y lo registra en tu embudo.
---

# Crear una automatización para tomar pedidos

Esta guía explica cómo crear una **automatización básica** que recibe un pedido por WhatsApp, guarda la elección del cliente como una oportunidad en tu embudo y le envía una confirmación.

Es un ejemplo práctico: puedes adaptar los textos, los productos y las etapas a tu negocio.

> **Antes de empezar:** una automatización envía mensajes reales de WhatsApp. Para practicar sin afectar a tus clientes, usa tu propio número y activa la automatización solo cuando hayas terminado las pruebas.

## 1. Qué vas a construir

La conversación quedará así:

```text
Cliente: hola, quiero hacer un pedido

Bot:    ¡Hola! 👋 ¿Qué producto deseas pedir?
        [Café en grano] [Café molido] [Método de preparación]

Cliente: (toca «Café en grano»)

Bot:    ¡Listo! Registramos tu pedido: Café en grano.
        Un asesor te confirmará el valor y la entrega en breve.
```

Por dentro, la automatización hará esto:

1. Detecta que el cliente quiere pedir.
2. Le muestra un menú de productos.
3. Espera su respuesta.
4. Crea una oportunidad (negocio) en el embudo con lo que eligió.
5. Le agrega una etiqueta al contacto para encontrarlo después.
6. Le envía una confirmación.

## 2. Antes de empezar

Ten a mano:

- [ ] Rol de **administrador, propietario o agente** con permiso para crear automatizaciones.
- [ ] Tu WhatsApp Business conectado.
- [ ] Un **embudo** con al menos una etapa, por ejemplo `Ventas → Pedidos nuevos`.
- [ ] Una **etiqueta** para marcar a los clientes que hicieron un pedido, por ejemplo `pedido`.
- [ ] Los productos o categorías que quieres ofrecer en el menú.

Puedes crear la etiqueta desde **Configuración → Campos y Etiquetas** y revisar tus embudos en **Embudos**. Si aún no tienes un embudo, crea uno antes de continuar.

## 3. Elige cómo se inicia la automatización

Una automatización necesita un **disparador**: el evento que la pone en marcha. Para tomar pedidos tienes dos opciones:

| Disparador | Cuándo usarlo | Cómo lo inicia el cliente |
|---|---|---|
| **Palabra clave** | Quieres que la automatización funcione sola, sin IA. | El cliente escribe una palabra como `pedido`, `comprar` u `ordenar`. |
| **Solicitud del agente IA** | Ya tienes un agente de IA y quieres que él decida cuándo pasar a la automatización. | El agente detecta la intención y le entrega la conversación a la automatización. |

Si es tu primera automatización, empieza con **Palabra clave**. Más abajo se explica la variante con IA.

## 4. Crear la automatización paso a paso

### Paso 1. Abre el constructor

1. Entra a **Automatizaciones** en el menú lateral.
2. Pulsa **Crear automatización**.
3. Escribe un nombre, por ejemplo `Tomar pedido`.
4. En la descripción puedes escribir `Registra pedidos de clientes`.

:::tip Opciones agrupadas
Al pulsar **Agregar paso**, las opciones aparecen agrupadas igual que en Flujos: **Mensajería**, **Lógica y datos** y **Control de flujos**. Así encuentras rápido si el paso envía un mensaje, procesa datos o controla el flujo.
:::

### Paso 2. Configura el disparador

En la tarjeta **Disparador**:

1. Elige **Palabra clave** en **Tipo de disparador**.
2. En **Palabras clave**, escribe las palabras que activarán la automatización, separadas por comas:

```text
pedido, pedidos, comprar, ordenar, quiero pedir
```

3. Deja el **Tipo de coincidencia** en **Contiene** para que funcione con frases como “hola, quiero hacer un pedido”.

:::tip
Usa palabras que tus clientes escriban de verdad. Evita palabras demasiado cortas o genéricas como `si`, `ok` o `k`, porque pueden activar la automatización sin que sea un pedido.
:::

### Paso 3. Agrega el menú de productos

1. Pulsa **Agregar paso** y elige **Enviar botones** (hasta 3 opciones) o **Enviar lista** (hasta 10 opciones).
2. Completa el **Cuerpo** con la pregunta. Por ejemplo:

```text
¡Hola! 👋 ¿Qué producto deseas pedir?
```

3. Agrega las opciones. Para botones, escribe el **Texto del botón**. Para una lista, completa el **Título de la sección** y las **Filas**.

Ejemplo con botones:

| Texto del botón | ID interno |
|---|---|
| Café en grano | `cafe_grano` |
| Café molido | `cafe_molido` |
| Método de preparación | `metodo` |

4. Activa la casilla **Esperar respuesta antes de continuar**.

Esta casilla es la clave del ejemplo: la automatización se detiene hasta que el cliente toca un botón o responde, y los pasos siguientes reciben esa respuesta. La espera dura como máximo **24 horas**.

:::warning
La opción **Esperar respuesta antes de continuar** solo aparece en los pasos **Enviar botones** y **Enviar lista**, no en **Enviar mensaje**. Para tomar un pedido necesitas una de esas dos opciones.
:::

### Paso 4. Registra el pedido en el embudo

1. Agrega un paso **Crear negocio**.
2. Elige el **Pipeline** y la **Etapa**, por ejemplo `Ventas → Pedidos nuevos`.
3. En **Título**, escribe:

```text
Pedido: {{message.text}}
```

`{{message.text}}` se reemplaza por la opción que eligió el cliente. Siguiendo el ejemplo, el negocio se llamará `Pedido: Café en grano`.

4. En **Valor**, deja `0` si el precio se confirma después. Puedes cambiarlo manualmente cuando cierres la venta.

### Paso 5. Marca al contacto (opcional, pero recomendado)

1. Agrega un paso **Agregar etiqueta**.
2. Elige la etiqueta `pedido`.

Así podrás filtrar después a todos los contactos que hicieron un pedido y hacer seguimiento o difusiones.

### Paso 6. Confirma el pedido al cliente

1. Agrega un paso **Enviar mensaje**.
2. Escribe una confirmación clara. Por ejemplo:

```text
¡Listo! Registramos tu pedido: {{message.text}}.
Un asesor te confirmará el valor y la entrega en breve.
```

### Paso 7. Revisa y activa

1. Revisa el orden de los pasos en el lienzo. Debe quedar así:

| Orden | Paso |
|---|---|
| 1 | Enviar botones o Enviar lista (con **Esperar respuesta** activado) |
| 2 | Crear negocio |
| 3 | Agregar etiqueta `pedido` |
| 4 | Enviar mensaje de confirmación |

2. Pulsa **Guardar**.
3. Activa el interruptor **Activa** en la parte superior del constructor.
4. Prueba desde tu propio WhatsApp: escribe `quiero hacer un pedido`, elige una opción y revisa que se cree el negocio, se agregue la etiqueta y llegue la confirmación.

:::tip
Si algo no funciona, abre **Automatizaciones → Ver registros**. Cada ejecución muestra los pasos y el error exacto del paso que falló.
:::

## 5. Enviar imágenes, videos o documentos en un paso

Además de texto, una automatización puede enviar un archivo (imagen, video o documento) en cualquier punto del flujo. Por ejemplo, para enviar el catálogo después de la confirmación del pedido.

1. Agrega un paso **Enviar imagen, video o archivo**.
2. Elige el **Tipo de archivo**: imagen, video o documento.
3. Sube el archivo con **Haz clic para subir** (máximo 16 MB) o pega una **URL pública**.
4. Opcionalmente escribe un **texto debajo del archivo** (por ejemplo, “Este es nuestro catálogo”).
5. Para documentos, puedes cambiar el **nombre del archivo** que verá el cliente.

Formatos admitidos:

- **Imagen:** PNG, JPG o WEBP.
- **Video:** MP4 o 3GP.
- **Documento:** PDF, Word, Excel, PowerPoint o texto plano.

:::tip
El texto debajo del archivo admite las mismas variables que los mensajes: `{{message.text}}`, `{{vars.nombre}}` o `{{contact.name}}`. Por ejemplo: `Pedido de {{contact.name}}: {{message.text}}`.
:::

:::warning
WhatsApp descarga el archivo desde la URL, no desde Urbox. Si pegas una URL manual, debe ser pública y no requerir inicio de sesión. Si subes el archivo desde el constructor, Urbox genera esa URL por ti.
:::

## 6. Capturar respuestas del cliente

El paso **Capturar respuesta** hace una pregunta y guarda lo que responde el cliente para usarlo más adelante.

1. En **Lógica y datos**, elige **Capturar respuesta**.
2. Escribe el **Mensaje de la pregunta**, por ejemplo:

```text
¿Cuál es tu nombre?
```

3. En **Guardar la respuesta como**, escribe un nombre de variable, por ejemplo `nombre_cliente`.
4. Continúa con los demás pasos. La automatización envía la pregunta y espera la respuesta (hasta 24 horas).

Después puedes usar la respuesta en cualquier paso con la variable:

```text
¡Gracias, {{ vars.nombre_cliente }}! Tu pedido quedó registrado.
```

También funciona en:

- El título de un negocio: `Pedido de {{ vars.nombre_cliente }}`.
- El texto debajo de un archivo.
- El cuerpo de un webhook.
- Cualquier mensaje posterior del flujo.

Si el cliente toca un botón o una opción de lista como respuesta, se guarda el texto visible de esa opción.

:::warning
El nombre de la variable solo puede tener letras, números y guiones bajos, y debe empezar por una letra o guion bajo. Ejemplos válidos: `nombre`, `nombre_cliente`, `pedido_1`. No uses espacios ni acentos en el nombre de la variable.
:::

## 7. Variante: que el agente de IA inicie la automatización

Si ya tienes un **agente de IA** atendiendo conversaciones, puedes hacer que converse con el cliente, recopile la información necesaria y después entregue el control a una automatización. Sirve para pedidos, citas, reuniones, cotizaciones, soporte y cualquier otro proceso.

### Requisitos

1. La automatización debe tener el disparador **Solicitud del agente IA**.
2. En **¿Cuándo debe iniciar el agente IA esta automatización?**, describe la intención del cliente. Ejemplo:

```text
El cliente quiere agendar una cita o una reunión.
```

3. En **Datos que la IA debe recopilar antes**, agrega los campos que el agente necesita. Ejemplo para una cita:

| Campo | Tipo | Obligatorio |
|---|---|---|
| Servicio | Texto | Sí |
| Fecha | Fecha | Sí |
| Hora | Hora | Sí |
| Profesional | Texto | No |

El agente pedirá esos datos conversando y solo iniciará el proceso cuando estén completos los obligatorios. Después la automatización puede usar los valores con `{{ vars.fecha }}`, `{{ vars.servicio }}`, etc.

### Cómo se comporta

- El agente conversa normalmente y responde dudas.
- Recopila los datos que definiste, sin inventar valores.
- Cuando tiene lo necesario, inicia la automatización y le pasa la información.
- La automatización toma el control y ejecuta sus pasos.
- El agente **se pausa en esa conversación** para no responder encima de la automatización.

### Aprobación humana

Puedes agregar el paso **Esperar aprobación humana** en cualquier punto del proceso. Por ejemplo, para validar una transferencia o confirmar una cita especial.

1. Agrega el paso **Esperar aprobación humana**.
2. Escribe un **Título de la aprobación**, por ejemplo `Validar adelanto de $15`.
3. Añade instrucciones para quien revisa y elige a quién se le envía.

La automatización se detiene y aparece un aviso en la conversación del inbox con los botones **Aprobar** y **Rechazar**.

- **Aprobar** continúa el proceso desde el paso siguiente.
- **Rechazar** termina el proceso y devuelve la conversación a la IA.

### Volver a la IA

Para que la IA retome la conversación al terminar, agrega el paso **Devolver a la IA**. Opcionalmente escribe una nota que la IA leerá antes de su siguiente respuesta.

Los datos recopilados quedan guardados en **Datos de la conversación**, así que la IA no vuelve a preguntar lo mismo y puede continuar con otro proceso si hace falta.

:::note
Solo las automatizaciones con el disparador **Solicitud del agente IA** aparecen en la herramienta del agente. Las automatizaciones por palabra clave siguen funcionando por su cuenta.
:::

### IA y palabra clave en la misma cuenta

Puedes tener las dos cosas:

- Una automatización por **palabra clave** responde solo cuando el mensaje contiene esa palabra.
- El **agente de IA** responde en los demás mensajes.

Cuando una automatización coincide con un mensaje, esa automatización responde y la IA no responde al mismo mensaje. Así se evitan respuestas duplicadas.

## 8. Ejemplo completo para copiar

**Nombre:** Tomar pedido

**Disparador:** Palabra clave

**Palabras clave:** `pedido, pedidos, comprar, ordenar`

**Paso 1 — Enviar botones**

- Cuerpo: `¡Hola! 👋 ¿Qué producto deseas pedir?`
- Botones:
  - `Café en grano` (`cafe_grano`)
  - `Café molido` (`cafe_molido`)
  - `Método de preparación` (`metodo`)
- **Esperar respuesta antes de continuar:** activado

**Paso 2 — Crear negocio**

- Pipeline: `Ventas`
- Etapa: `Pedidos nuevos`
- Título: `Pedido: {{message.text}}`
- Valor: `0`

**Paso 3 — Agregar etiqueta**

- Etiqueta: `pedido`

**Paso 4 — Enviar mensaje**

- Texto:

```text
¡Listo! Registramos tu pedido: {{message.text}}.
Un asesor te confirmará el valor y la entrega en breve.
```

## 9. Límites y buenas prácticas

- **El cliente ve “escribiendo…”:** cuando la automatización se inicia por un mensaje entrante, WhatsApp muestra el indicador mientras la automatización prepara sus envíos, igual que con el agente de IA. Si el flujo se detiene en una espera larga, el indicador desaparece hasta el siguiente envío.

- **Botones:** máximo 3 opciones. El texto de cada botón admite hasta 20 caracteres.
- **Listas:** hasta 10 filas en total. Si tienes más productos, agrúpalos en secciones o usa una lista con categorías.
- **Espera de respuesta:** la automatización espera como máximo 24 horas. Si el cliente no responde, la ejecución queda cerrada y no continúa.
- **Una respuesta a la vez:** `{{message.text}}` contiene la última respuesta del cliente. Para pedidos con varios datos (producto, cantidad, dirección), usa un **flujo** o un paso **Enviar webhook** que envíe la información a tu sistema.
- **Nunca prometas precios o stock que no controlas:** deja que un asesor confirme el valor final o mantén los precios actualizados en tu base de conocimiento.
- **Prueba antes de activar:** usa tu propio número y revisa los registros de ejecución.
- **Revisa las etiquetas:** si borras la etiqueta `pedido`, el paso **Agregar etiqueta** fallará. Actualiza la automatización o crea la etiqueta de nuevo.

## 10. Problemas comunes

| Problema | Causa probable | Solución |
|---|---|---|
| La automatización no se activa al escribir la palabra | La palabra no coincide o la automatización está apagada | Revisa las palabras clave y activa el interruptor **Activa**. |
| El menú no llega al cliente | El paso no tiene cuerpo o las opciones están incompletas | Completa el cuerpo y al menos una opción; revisa los límites de Meta. |
| La conversación no continúa después del menú | No activaste **Esperar respuesta antes de continuar** | Edita el paso **Enviar botones / Enviar lista** y activa la casilla. |
| No se crea el negocio | Faltan el pipeline o la etapa, o fueron eliminados | Vuelve a seleccionar un pipeline y una etapa existentes. |
| El agente de IA no inicia la automatización | La automatización no está activa, no usa el disparador **Solicitud del agente IA** o la descripción no coincide | Activa la automatización, revisa el disparador y describe mejor la intención del cliente. |
| El agente y la automatización responden dos veces | La automatización se inició manualmente y la IA no se pausó | Revisa **Reanudar IA** en el inbox y los registros de la automatización. |

## 11. Siguientes pasos

Cuando el ejemplo básico funcione, puedes ampliarlo:

- Añadir una **condición** para responder distinto si el cliente elige “Método de preparación” o “Hablar con un asesor”.
- Enviar el pedido a tu sistema con **Enviar webhook**.
- Asignar la conversación a un vendedor con **Asignar conversación**.
- Crear una automatización de **seguimiento** que escriba al cliente si no responde en 24 horas.

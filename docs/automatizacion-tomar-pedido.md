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

Puedes crear la etiqueta desde **Contactos → Etiquetas** y revisar tus embudos en **Embudos**. Si aún no tienes un embudo, crea uno antes de continuar.

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

## 5. Variante: que el agente de IA inicie la automatización

Si ya tienes un **agente de IA** atendiendo conversaciones, puedes hacer que él decida cuándo pasar al modo “tomar pedido”. Así el cliente puede preguntar precios, horarios o dudas, y en el momento en que dice que quiere pedir, el agente entrega la conversación a esta automatización.

### Requisitos

1. La automatización debe tener el disparador **Solicitud del agente IA**.
2. En el campo **¿Cuándo debe iniciar el agente IA esta automatización?**, describe la intención del cliente. Ejemplo:

```text
El cliente quiere hacer un pedido, comprar un producto o conocer cómo pedir.
```

3. El agente debe tener activada la herramienta **Iniciar automatización** en **Agentes IA → [tu agente] → Herramientas**.

### Cómo se comporta

- El agente conversa normalmente y responde dudas.
- Cuando detecta la intención descrita, inicia la automatización.
- La automatización toma el control y envía el menú de productos.
- El agente **se pausa en esa conversación** para no responder encima de la automatización.

Si necesitas que el agente vuelva a responder después, usa **Reanudar IA** en la conversación del inbox.

:::note
Solo las automatizaciones con el disparador **Solicitud del agente IA** aparecen en la herramienta del agente. Las automatizaciones por palabra clave siguen funcionando por su cuenta.
:::

### IA y palabra clave en la misma cuenta

Puedes tener las dos cosas:

- Una automatización por **palabra clave** responde solo cuando el mensaje contiene esa palabra.
- El **agente de IA** responde en los demás mensajes.

Cuando una automatización coincide con un mensaje, esa automatización responde y la IA no responde al mismo mensaje. Así se evitan respuestas duplicadas.

## 6. Ejemplo completo para copiar

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

## 7. Límites y buenas prácticas

- **Botones:** máximo 3 opciones. El texto de cada botón admite hasta 20 caracteres.
- **Listas:** hasta 10 filas en total. Si tienes más productos, agrúpalos en secciones o usa una lista con categorías.
- **Espera de respuesta:** la automatización espera como máximo 24 horas. Si el cliente no responde, la ejecución queda cerrada y no continúa.
- **Una respuesta a la vez:** `{{message.text}}` contiene la última respuesta del cliente. Para pedidos con varios datos (producto, cantidad, dirección), usa un **flujo** o un paso **Enviar webhook** que envíe la información a tu sistema.
- **Nunca prometas precios o stock que no controlas:** deja que un asesor confirme el valor final o mantén los precios actualizados en tu base de conocimiento.
- **Prueba antes de activar:** usa tu propio número y revisa los registros de ejecución.
- **Revisa las etiquetas:** si borras la etiqueta `pedido`, el paso **Agregar etiqueta** fallará. Actualiza la automatización o crea la etiqueta de nuevo.

## 8. Problemas comunes

| Problema | Causa probable | Solución |
|---|---|---|
| La automatización no se activa al escribir la palabra | La palabra no coincide o la automatización está apagada | Revisa las palabras clave y activa el interruptor **Activa**. |
| El menú no llega al cliente | El paso no tiene cuerpo o las opciones están incompletas | Completa el cuerpo y al menos una opción; revisa los límites de Meta. |
| La conversación no continúa después del menú | No activaste **Esperar respuesta antes de continuar** | Edita el paso **Enviar botones / Enviar lista** y activa la casilla. |
| No se crea el negocio | Faltan el pipeline o la etapa, o fueron eliminados | Vuelve a seleccionar un pipeline y una etapa existentes. |
| El agente de IA no inicia la automatización | Falta la herramienta **Iniciar automatización** o la descripción no coincide | Activa la herramienta en el agente y describe mejor la intención del cliente. |
| El agente y la automatización responden dos veces | La automatización se inició manualmente y la IA no se pausó | Revisa **Reanudar IA** en el inbox y los registros de la automatización. |

## 9. Siguientes pasos

Cuando el ejemplo básico funcione, puedes ampliarlo:

- Añadir una **condición** para responder distinto si el cliente elige “Método de preparación” o “Hablar con un asesor”.
- Enviar el pedido a tu sistema con **Enviar webhook**.
- Asignar la conversación a un vendedor con **Asignar conversación**.
- Crear una automatización de **seguimiento** que escriba al cliente si no responde en 24 horas.

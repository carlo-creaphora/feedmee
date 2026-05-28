# FeedMee MVP Scope

## Objetivo del MVP

Construir una primera version que pruebe el valor principal: capturar respuestas abiertas de comensales y convertirlas en un reporte operativo facil de leer para el restaurante.

El MVP tambien debe ser vendible. La meta no es solo demostrar tecnologia, sino permitir que un restaurante pague una mensualidad, active su licencia y empiece a usar FeedMee rapidamente.

## MVP vendible

El primer corte comercial debe incluir:

- Landing o pagina comercial simple para explicar la promesa.
- Activacion de restaurante con datos basicos.
- Link publico de feedback por restaurante.
- QR descargable o copiable para el restaurante.
- Encuesta mobile-first para comensales.
- Dashboard privado para administrador.
- Reporte vivo con datos simulados o reales segun el corte tecnico.
- Estado de licencia: activo, demo o suspendido.
- Preparacion para planes mensuales.

## Compra e implementacion

El flujo ideal de venta e implementacion:

1. El restaurante entiende la promesa en menos de un minuto.
2. Compra o solicita activacion mensual.
3. Recibe acceso de administrador.
4. Configura nombre, sede y datos basicos.
5. Descarga o comparte su QR/link.
6. Empieza a recibir respuestas de comensales.
7. Lee el reporte vivo y toma decisiones.

Para LATAM, el producto debe asumir que muchos restaurantes operan con WhatsApp, QR fisico, Instagram y administradores que necesitan respuestas claras, no configuraciones tecnicas.

## Experiencias iniciales

### Comensal

Una encuesta breve, mobile-first, con preguntas abiertas guiadas.

Debe evitar sentirse como una encuesta tradicional. La interfaz debe pedir el por que de la experiencia sin hacer demasiadas preguntas.

Campos iniciales sugeridos:

- Calificacion general.
- Que fue lo mejor de la experiencia.
- Que pudo ser mejor.
- Algo incomodo o molesto que no diria normalmente.
- Plato o producto consumido.
- Momento de visita.
- Intencion de volver o recomendar, con explicacion abierta.

### Administrador

Un dashboard de restaurante con lectura diaria.

Bloques iniciales sugeridos:

- Pulso general del dia.
- Volumen de respuestas.
- Senales positivas.
- Senales negativas.
- Hallazgos incomodos.
- Alertas tempranas.
- Problemas recurrentes.
- Platos mencionados.
- Lectura del servicio.
- Recomendaciones accionables.

## Modelo de datos inicial

Entidades sugeridas:

- `Restaurant`: restaurante propietario del reporte.
- `VisitFeedback`: respuesta del comensal.
- `PublicReview`: resena publica importada o registrada.
- `OperationalSignal`: senal detectada por IA.
- `InsightReport`: reporte vivo generado para el restaurante.
- `ActionRecommendation`: recomendacion operativa.

## IA inicial

La IA debe clasificar y sintetizar respuestas abiertas en:

- Sentimiento general.
- Temas mencionados.
- Problemas explicitos.
- Problemas implicitos.
- Senales debiles.
- Nivel de urgencia.
- Area afectada: comida, servicio, ambiente, precio, espera, limpieza, equipo u otros.
- Recomendacion operativa.

## Integraciones futuras

No son necesarias para el primer corte, pero el producto debe quedar preparado para:

- Google Reviews.
- Tripadvisor.
- WhatsApp o SMS para enviar encuesta.
- POS o datos operativos del restaurante.
- Multi-sede.
- Pasarelas de pago locales o regionales.
- Facturacion y administracion de licencias.

## Decisiones pendientes

- Si la primera version sera demo local, SaaS real o prototipo navegable.
- Si se requiere autenticacion desde el inicio.
- Si el reporte sera generado en tiempo real con IA real o con motor simulado para validar UX.
- Si el primer caso sera un restaurante ficticio o uno real.
- Si la venta inicial sera autoservicio, venta asistida o piloto pagado.

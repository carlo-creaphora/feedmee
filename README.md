# FeedMee

FeedMee ayuda a restaurantes a entender por que sus comensales no regresan, que les incomodo y que senales tempranas aparecen en la experiencia, cruzando feedback abierto con informacion operativa y resenas publicas.

El producto no busca reemplazar una encuesta de satisfaccion tradicional. Busca convertir comentarios honestos, incomodos o debiles en decisiones diarias para el dueno o administrador del restaurante.

## Documentos base

- `docs/product-brief.md`: tesis del producto, usuarios, problema y experiencia esperada.
- `docs/mvp-scope.md`: primer alcance funcional recomendado para construir.

## Primer prototipo

Rutas iniciales:

- `/`: entrada comercial de FeedMee.
- `/r/casa-aurora`: encuesta mobile-first para comensales.
- `/admin`: reporte vivo demo para el restaurante.
- `/admin/setup`: activacion comercial de restaurante, sede y link.

Desarrollo local:

```bash
pnpm install
pnpm dev
pnpm build
```

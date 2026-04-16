# WAX Admin Development Guide

## Objetivo

Este proyecto ya tiene una base estructural alineada con `wax-client`, pero sin logica de negocio ni conexiones reales. La idea es que los siguientes cambios respeten esa forma para que el equipo trabaje con una arquitectura consistente.

## Estructura actual

- `src/app`: estilos globales y configuracion visual transversal.
- `src/assets`: recursos estaticos del panel.
- `src/config`: constantes, tokens, navegacion y configuracion del admin.
- `src/features`: modulos por dominio. Ejemplos futuros: `catalog`, `orders`, `clients`, `content`.
- `src/layouts`: shells compartidos, wrappers de secciones y layouts base.
- `src/lib`: hooks reutilizables, adaptadores o piezas compartidas que no pertenecen a un solo dominio.
- `src/pages`: pantallas ligadas a rutas.
- `src/providers`: providers globales del arbol React.
- `src/routes`: definicion de rutas y constantes de navegacion.
- `src/services`: clientes HTTP, contratos, DTOs y acceso a datos cuando se definan APIs.
- `src/types`: tipos compartidos entre modulos.
- `src/utils`: helpers puros y utilidades sin estado.

## Regla principal

No meter logica grande directamente en `pages` ni en `layouts`.

- `pages` deben orquestar la pantalla.
- `features` deben contener el modulo real.
- `services` deben hablar con APIs.
- `lib` y `utils` deben resolver reutilizacion horizontal.

## Como agregar un modulo nuevo

Ejemplo con `catalog`:

1. Crear `src/features/catalog/`.
2. Dentro, separar por responsabilidad:
   - `api/` para llamadas del modulo.
   - `components/` para UI del modulo.
   - `hooks/` para estado y queries del modulo.
   - `types/` si el modulo necesita tipos propios.
3. Crear o conectar una `page` en `src/pages/` si la ruta lo necesita.
4. Registrar la ruta en `src/routes/router.tsx`.
5. Si la navegacion cambia, actualizar `src/config/brand.ts` o mover el menu a un archivo dedicado si crece demasiado.

## Convenciones recomendadas

- Un modulo por carpeta en `features`.
- Nombres de componentes en PascalCase.
- Hooks con prefijo `use`.
- Tipos compartidos fuera del modulo solo si realmente los usa mas de un dominio.
- Evitar mezclar fetch, UI y transformaciones en el mismo archivo.

## Estilos

La base visual ya existe en `src/app/index.css`.

- Reutiliza las clases y variables existentes antes de crear otras nuevas.
- Si una pantalla introduce muchos estilos propios, considera moverlos luego a un archivo de feature o componente.
- No conviertas `index.css` en un deposito de excepciones por pantalla.

## Providers y estado global

Ahora mismo `QueryProvider` y `ToastProvider` son placeholders para mantener la forma del proyecto.

- Si se incorpora React Query, activarlo dentro de `src/providers/QueryProvider.tsx`.
- Si se incorpora sistema de notificaciones, activarlo dentro de `src/providers/ToastProvider.tsx`.
- Evitar meter configuracion de librerias globales directamente en `main.tsx`.

## Rutas

- `src/routes/routePaths.ts` debe ser la fuente central de paths.
- `src/routes/router.tsx` debe declarar la composicion de rutas.
- Si una ruta requiere permisos o wrappers especiales, crear un componente de ruta dedicado en `src/routes/`.

## Cuando conectar endpoints

Cuando el backend del admin este definido:

1. Crear un cliente base en `src/services/`.
2. Separar servicios por dominio.
3. Tipar request y response desde `types` compartidos o desde `features/<modulo>/types`.
4. Mantener la transformacion de datos fuera del JSX.

## Checklist antes de cerrar una tarea

- La ruta nueva esta registrada.
- El modulo vive en `features` si tiene logica real.
- No hay texto hardcodeado innecesario en `layouts`.
- Los estilos nuevos reutilizan la base existente.
- La pagina compila sin depender de mocks escondidos en el layout.

## Archivos clave hoy

- `src/main.tsx`
- `src/routes/router.tsx`
- `src/routes/routePaths.ts`
- `src/layouts/AdminLayout.tsx`
- `src/config/brand.ts`
- `src/app/index.css`
- `src/providers/AppProviders.tsx`

## Nota final

La prioridad actual de este repo no es "tener pantallas bonitas ya", sino dejar un admin facil de crecer sin rehacer la estructura dentro de dos semanas.
# Product CRUD — Admin Panel Design Spec

## Overview

Implement create, edit, and delete product functionality for the WAX Admin panel, consuming the existing REST API (`/api/Product`). Products are managed via a dedicated catalog section with a paginated table, dedicated form pages, and a delete confirmation modal.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Create/Edit UI | Dedicated pages (`/catalog/new`, `/catalog/:id/edit`) | Form has many fields + image upload; needs space |
| Product list UI | Table (`.admin-table`) | Admin density > visual aesthetics; CSS already exists |
| Delete confirmation | Modal dialog | Destructive action requires deliberate pause |
| Component library | CSS custom (`.admin-*` classes) | Maintain consistency with existing design system |
| File structure | Feature folder (`src/features/catalog/`) | `@/features/*` alias ready; domain is self-contained |

## Architecture

### File Structure

```
src/features/catalog/
  api/productApi.ts              — axios functions (list, detail, create, update, delete)
  hooks/useProducts.ts           — queries (paginated list, detail)
  hooks/useProductMutations.ts   — mutations (create, update, delete)
  types/product.ts               — Product, payloads, params
  components/ProductTable.tsx    — table with thumbnails and row actions
  components/ProductForm.tsx     — shared form for create/edit (react-hook-form + zod)
  components/DeleteProductModal.tsx — confirmation modal
  components/ProductImageUpload.tsx — dropzone with preview
  pages/CatalogPage.tsx          — paginated list with search
  pages/CreateProductPage.tsx    — ProductForm in create mode
  pages/EditProductPage.tsx      — ProductForm in edit mode (preloaded)
```

### Routes

New entries in `routePaths.ts`:

```ts
catalogNew: '/catalog/new'
catalogEdit: '/catalog/:id/edit'
```

Router additions: nested under the existing `catalog` path inside `AdminLayout`.

### Navigation

Add "Catalogo" to `adminNavigation` in `config/brand.ts` pointing to `/catalog`.

## Types

```ts
type Product = {
  id: string
  name: string
  description: string
  price: number              // cents
  pictureUrl: string
  type: string
  brand: string
  quantityInStock: number
  publicId: string | null
}

type ProductListResponse = {
  items: Product[]
  pageNumber: number
  totalPages: number
  totalCount: number
}

type ProductParams = {
  pageNumber?: number
  pageSize?: number
  orderBy?: string
  searchTerm?: string
  brands?: string
  types?: string
}

type CreateProductPayload = {
  name: string
  description: string
  price: number
  type: string
  brand: string
  quantityInStock: number
  file: File
}

type UpdateProductPayload = {
  id: string
  name: string
  description: string
  price: number
  type: string
  brand: string
  quantityInStock: number
  pictureUrl: string | null
  publicId: string | null
  file?: File
}
```

## API Layer (`productApi.ts`)

Uses the shared `agent` instance from `@/lib/api/agent.ts` (axios with cookie auth).

| Function | Method | Endpoint | Notes |
|----------|--------|----------|-------|
| `getProducts(params)` | GET | `/Product` | Query params for pagination, filters, search, sort |
| `getProduct(id)` | GET | `/Product/{id}` | Single product detail |
| `createProduct(data)` | POST | `/Product` | Builds `FormData` from payload; multipart/form-data |
| `updateProduct(data)` | PUT | `/Product` | Builds `FormData` from payload; file optional |
| `deleteProduct(id)` | DELETE | `/Product/{id}` | No body |

Create and update functions construct a `FormData` object internally from the typed payload.

## Query/Mutation Keys

Extend the existing `queryKeys` and `mutationKeys` in `@/lib/queryKeys.ts`:

```ts
// queryKeys
products: {
  all: ['products']
  list: (params: ProductParams) => ['products', 'list', params]
  detail: (id: string) => ['products', 'detail', id]
}

// mutationKeys
products: {
  create: ['products', 'create']
  update: ['products', 'update']
  delete: ['products', 'delete']
}
```

## Hooks

### Queries (`useProducts.ts`)

- `useProducts(params: ProductParams)` — paginated list query, uses default staleTime (30s)
- `useProduct(id: string)` — detail query for edit form preloading, `enabled: !!id`

### Mutations (`useProductMutations.ts`)

- `useCreateProduct()` — onSuccess: invalidate `products.all`, toast success, navigate to `/catalog`
- `useUpdateProduct()` — onSuccess: invalidate `products.all` + `products.detail(id)`, toast success, navigate to `/catalog`
- `useDeleteProduct()` — onSuccess: invalidate `products.all`, toast success. Modal close handled via callback in CatalogPage.

## Components

### ProductTable

- Uses `.admin-table` / `.admin-table-card` CSS classes
- Columns: thumbnail, name, type, brand, price (formatted from cents), stock, actions
- Row actions: "Editar" button (navigates to `/catalog/:id/edit`), "Eliminar" button (opens modal)
- Top bar: search input, "Nuevo producto" button (navigates to `/catalog/new`)
- Pagination: previous/next using `pageNumber` and `totalPages`
- Loading state: spinner or skeleton in canvas area
- Empty state: "No se encontraron productos" message

### ProductForm

- react-hook-form with zod resolver
- Fields: name (text), description (textarea), price (numeric input, converts to/from cents for display), type (text), brand (text), quantityInStock (numeric), image (ProductImageUpload)
- Zod schema: all fields required, price > 0, quantityInStock >= 0, file required only in create mode
- Prop `mode: 'create' | 'edit'` controls behavior
- Edit mode: `defaultValues` populated from fetched product
- Submit label: "Crear producto" / "Guardar cambios"
- Cancel button: navigates back to `/catalog`
- Success: toast + navigate to `/catalog`. Error: toast with error message.

### ProductImageUpload

- react-dropzone for drag & drop or click to select
- Preview via `URL.createObjectURL` for new files
- Edit mode: shows current `pictureUrl` if no new file selected
- Constraint: images only, single file

### DeleteProductModal

- Overlay with centered card using `.admin-page-state` / `.admin-page-state-card` styles
- Shows product name being deleted
- "Cancelar" and "Eliminar" buttons (delete button with danger styling)
- Loading state on button during mutation
- onSuccess: toast, close modal, list invalidated automatically

## Local State (CatalogPage)

- `searchTerm: string` — debounced before passing to query params
- `pageNumber: number` — current page
- `productToDelete: Product | null` — controls delete modal visibility

No global state needed. React Query handles server state; UI state is local.

## Error Handling

- API errors surface via react-toastify (toast.error)
- Form validation errors shown inline per field via react-hook-form
- 404 on edit page (product not found): navigate back to `/catalog` with error toast
- Network errors: React Query retry (1 retry per queryClient config)

## CSS

All new components use the existing `.admin-*` class system. New classes follow the same naming convention (e.g., `.admin-product-thumb`, `.admin-form-field`, `.admin-modal-overlay`). No MUI components.

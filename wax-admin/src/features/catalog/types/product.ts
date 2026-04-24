export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantityInStock: number;
  publicId: string | null;
};

export type ProductListResponse = {
  items: Product[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
};

export type ProductParams = {
  pageNumber?: number;
  pageSize?: number;
  orderBy?: string;
  searchTerm?: string;
  brands?: string;
  types?: string;
};

export type CreateProductPayload = {
  name: string;
  description: string;
  price: number;
  type: string;
  brand: string;
  quantityInStock: number;
  file: File;
};

export type UpdateProductPayload = {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  brand: string;
  quantityInStock: number;
  pictureUrl: string | null;
  publicId: string | null;
  file?: File;
};

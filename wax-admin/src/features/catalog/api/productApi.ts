import agent from '@/lib/api/agent';
import type {
  CreateProductPayload,
  Product,
  ProductListResponse,
  ProductParams,
  UpdateProductPayload,
} from '@/features/catalog/types/product';

export const productApi = {
  getProducts: async (params: ProductParams): Promise<ProductListResponse> => {
    const response = await agent.get<ProductListResponse>('/Product', { params });
    return response.data;
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await agent.get<Product>(`/Product/${id}`);
    return response.data;
  },

  createProduct: async (data: CreateProductPayload): Promise<Product> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('type', data.type);
    formData.append('brand', data.brand);
    formData.append('quantityInStock', data.quantityInStock.toString());
    formData.append('file', data.file);
    const response = await agent.post<Product>('/Product', formData);
    return response.data;
  },

  updateProduct: async (data: UpdateProductPayload): Promise<void> => {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('type', data.type);
    formData.append('brand', data.brand);
    formData.append('quantityInStock', data.quantityInStock.toString());
    if (data.pictureUrl) formData.append('pictureUrl', data.pictureUrl);
    if (data.publicId) formData.append('publicId', data.publicId);
    if (data.file) formData.append('file', data.file);
    await agent.put('/Product', formData);
  },

  deleteProduct: async (id: string): Promise<void> => {
    await agent.delete(`/Product/${id}`);
  },
};

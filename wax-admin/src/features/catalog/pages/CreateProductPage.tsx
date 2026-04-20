import { ProductForm } from '@/features/catalog/components/ProductForm';
import { useCreateProduct } from '@/features/catalog/hooks/useProductMutations';
import type { ProductFormValues } from '@/features/catalog/components/ProductForm';

export const CreateProductPage = () => {
  const createMutation = useCreateProduct();

  const handleSubmit = (data: ProductFormValues) => {
    createMutation.mutate({
      name: data.name,
      description: data.description,
      price: Math.round(data.price * 100),
      type: data.type,
      brand: data.brand,
      quantityInStock: data.quantityInStock,
      file: data.file as File,
    });
  };

  return (
    <div className="admin-product-page">
      <div className="admin-product-page-header">
        <span className="admin-section-label">Catalogo</span>
        <h2 className="admin-product-page-title">Nuevo producto</h2>
      </div>
      <ProductForm mode="create" isPending={createMutation.isPending} onSubmit={handleSubmit} />
    </div>
  );
};

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { ProductForm } from '@/features/catalog/components/ProductForm';
import { useProduct } from '@/features/catalog/hooks/useProducts';
import { useUpdateProduct } from '@/features/catalog/hooks/useProductMutations';
import { routePaths } from '@/routes/routePaths';
import type { ProductFormValues } from '@/features/catalog/components/ProductForm';

export const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id!);
  const updateMutation = useUpdateProduct();

  useEffect(() => {
    if (isError) {
      toast.error('Producto no encontrado');
      navigate(routePaths.catalog, { replace: true });
    }
  }, [isError, navigate]);

  const handleSubmit = (data: ProductFormValues) => {
    if (!product) return;
    updateMutation.mutate({
      id: product.id,
      name: data.name,
      description: data.description,
      price: Math.round(data.price * 100),
      type: data.type,
      brand: data.brand,
      quantityInStock: data.quantityInStock,
      pictureUrl: product.pictureUrl,
      publicId: product.publicId,
      file: data.file,
    });
  };

  if (isLoading) {
    return <div className="admin-canvas" aria-label="Cargando producto" />;
  }

  if (!product) return null;

  return (
    <div className="admin-product-page">
      <div className="admin-product-page-header">
        <span className="admin-section-label">Catalogo</span>
        <h2 className="admin-product-page-title">Editar producto</h2>
      </div>
      <ProductForm
        mode="edit"
        defaultProduct={product}
        isPending={updateMutation.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { ProductTable } from '@/features/catalog/components/ProductTable';
import { DeleteProductModal } from '@/features/catalog/components/DeleteProductModal';
import { useProducts } from '@/features/catalog/hooks/useProducts';
import { useDeleteProduct } from '@/features/catalog/hooks/useProductMutations';
import { routePaths } from '@/routes/routePaths';
import type { Product } from '@/features/catalog/types/product';

export const CatalogPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageNumber(1);
    }, 400);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchTerm]);

  const { data, isLoading } = useProducts({
    pageNumber,
    pageSize: 10,
    searchTerm: debouncedSearch || undefined,
  });

  const deleteMutation = useDeleteProduct();

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    deleteMutation.mutate(productToDelete.id, {
      onSuccess: () => setProductToDelete(null),
    });
  };

  return (
    <div className="admin-catalog">
      <div className="admin-catalog-header">
        <div className="admin-catalog-search">
          <input
            className="admin-form-input"
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="admin-button"
          onClick={() => navigate(routePaths.catalogNew)}
        >
          Nuevo producto
        </button>
      </div>

      {isLoading ? (
        <div className="admin-canvas" aria-label="Cargando productos" />
      ) : data ? (
        <>
          <ProductTable products={data.items} onDelete={setProductToDelete} />

          {data.totalPages > 1 && (
            <div className="admin-pagination">
              <button
                type="button"
                className="admin-button admin-button-sm admin-button-ghost"
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber((p) => p - 1)}
              >
                Anterior
              </button>
              <span className="admin-pagination-info">
                Pagina {data.pageNumber} de {data.totalPages}
              </span>
              <button
                type="button"
                className="admin-button admin-button-sm admin-button-ghost"
                disabled={pageNumber >= data.totalPages}
                onClick={() => setPageNumber((p) => p + 1)}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      ) : null}

      {productToDelete && (
        <DeleteProductModal
          product={productToDelete}
          isPending={deleteMutation.isPending}
          onConfirm={handleConfirmDelete}
          onCancel={() => setProductToDelete(null)}
        />
      )}
    </div>
  );
};

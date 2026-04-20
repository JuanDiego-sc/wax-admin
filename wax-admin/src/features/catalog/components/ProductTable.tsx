import { useNavigate } from 'react-router';
import type { Product } from '@/features/catalog/types/product';

type ProductTableProps = {
  products: Product[];
  onDelete: (product: Product) => void;
};

const formatPrice = (cents: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
};

export const ProductTable = ({ products, onDelete }: ProductTableProps) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return (
      <div className="admin-empty-state">
        <p>No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className="admin-table-card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.pictureUrl}
                  alt={product.name}
                  className="admin-product-thumb"
                />
              </td>
              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>{product.brand}</td>
              <td>{formatPrice(product.price)}</td>
              <td>{product.quantityInStock}</td>
              <td>
                <div className="admin-table-actions">
                  <button
                    type="button"
                    className="admin-button admin-button-sm"
                    onClick={() => navigate(`/catalog/${product.id}/edit`)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="admin-button admin-button-sm admin-button-danger"
                    onClick={() => onDelete(product)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

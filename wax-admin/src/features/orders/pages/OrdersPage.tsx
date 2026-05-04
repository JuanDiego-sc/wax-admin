import { useState } from 'react';
import { OrderTable } from '@/features/orders/components/OrderTable';
import { OrderFilters } from '@/features/orders/components/OrderFilters';
import { useOrders } from '@/features/orders/hooks/useOrders';

export const OrdersPage = () => {
  const [filter, setFilter] = useState('Pending');

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useOrders({
    pageSize: 10,
    filter,
  });

  const allOrders = data?.pages.flatMap((page) => page.items ?? []) ?? [];

  return (
    <div className="admin-catalog">
      <div className="admin-catalog-header">
        <OrderFilters filter={filter} onFilterChange={setFilter} />
      </div>

      {isLoading ? (
        <div className="admin-canvas" aria-label="Cargando pedidos" />
      ) : (
        <>
          <OrderTable orders={allOrders} />

          {hasNextPage && (
            <div className="admin-pagination">
              <button
                type="button"
                className="admin-button admin-button-ghost"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? 'Cargando...' : 'Cargar mas'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

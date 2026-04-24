import { useCallback } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { ProductImageUpload } from '@/features/catalog/components/ProductImageUpload';
import { routePaths } from '@/routes/routePaths';
import type { Product } from '@/features/catalog/types/product';

const baseSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.string().min(1, 'La descripcion es obligatoria'),
  price: z.coerce.number().positive('El precio debe ser mayor a 0'),
  type: z.string().min(1, 'El tipo es obligatorio'),
  brand: z.string().min(1, 'La marca es obligatoria'),
  quantityInStock: z.coerce.number().int().min(0, 'El stock no puede ser negativo'),
  file: z.instanceof(File).optional(),
});

export type ProductFormValues = z.infer<typeof baseSchema>;

type ProductFormProps = {
  mode: 'create' | 'edit';
  defaultProduct?: Product;
  isPending: boolean;
  onSubmit: (data: ProductFormValues) => void;
};

export const ProductForm = ({ mode, defaultProduct, isPending, onSubmit }: ProductFormProps) => {
  const navigate = useNavigate();

  const schema =
    mode === 'create'
      ? baseSchema.superRefine((data, ctx) => {
          if (!data.file) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'La imagen es obligatoria',
              path: ['file'],
            });
          }
        })
      : baseSchema;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(schema) as Resolver<ProductFormValues>,
    defaultValues: defaultProduct
      ? {
          name: defaultProduct.name,
          description: defaultProduct.description,
          price: defaultProduct.price / 100,
          type: defaultProduct.type,
          brand: defaultProduct.brand,
          quantityInStock: defaultProduct.quantityInStock,
        }
      : undefined,
  });

  const handleImageChange = useCallback(
    (file: File | undefined) => {
      setValue('file', file, { shouldValidate: true });
    },
    [setValue],
  );

  return (
    <form className="admin-product-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="admin-product-form-grid">
        <div className="admin-product-form-fields">
          <label className="admin-form-field">
            <span className="admin-form-label">Nombre</span>
            <input className="admin-form-input" type="text" {...register('name')} />
            {errors.name && <span className="admin-form-error">{errors.name.message}</span>}
          </label>

          <label className="admin-form-field">
            <span className="admin-form-label">Descripcion</span>
            <textarea
              className="admin-form-input admin-form-textarea"
              rows={4}
              {...register('description')}
            />
            {errors.description && (
              <span className="admin-form-error">{errors.description.message}</span>
            )}
          </label>

          <div className="admin-form-row">
            <label className="admin-form-field">
              <span className="admin-form-label">Precio (USD)</span>
              <input
                className="admin-form-input"
                type="number"
                step="0.01"
                min="0"
                {...register('price')}
              />
              {errors.price && <span className="admin-form-error">{errors.price.message}</span>}
            </label>

            <label className="admin-form-field">
              <span className="admin-form-label">Stock</span>
              <input
                className="admin-form-input"
                type="number"
                min="0"
                {...register('quantityInStock')}
              />
              {errors.quantityInStock && (
                <span className="admin-form-error">{errors.quantityInStock.message}</span>
              )}
            </label>
          </div>

          <div className="admin-form-row">
            <label className="admin-form-field">
              <span className="admin-form-label">Tipo</span>
              <input className="admin-form-input" type="text" {...register('type')} />
              {errors.type && <span className="admin-form-error">{errors.type.message}</span>}
            </label>

            <label className="admin-form-field">
              <span className="admin-form-label">Marca</span>
              <input className="admin-form-input" type="text" {...register('brand')} />
              {errors.brand && <span className="admin-form-error">{errors.brand.message}</span>}
            </label>
          </div>
        </div>

        <div className="admin-product-form-aside">
          <ProductImageUpload
            onChange={handleImageChange}
            existingUrl={defaultProduct?.pictureUrl}
          />
          {errors.file && <span className="admin-form-error">{errors.file.message}</span>}
        </div>
      </div>

      <div className="admin-product-form-actions">
        <button
          type="button"
          className="admin-button admin-button-ghost"
          onClick={() => navigate(routePaths.catalog)}
        >
          Cancelar
        </button>
        <button type="submit" className="admin-button" disabled={isPending}>
          {isPending
            ? mode === 'create'
              ? 'Creando...'
              : 'Guardando...'
            : mode === 'create'
              ? 'Crear producto'
              : 'Guardar cambios'}
        </button>
      </div>
    </form>
  );
};

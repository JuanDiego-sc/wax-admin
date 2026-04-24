import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type ProductImageUploadProps = {
  onChange: (file: File | undefined) => void;
  existingUrl?: string;
};

export const ProductImageUpload = ({ onChange, existingUrl }: ProductImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setPreview(URL.createObjectURL(file));
        onChange(file);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const displayUrl = preview ?? existingUrl;

  return (
    <div className="admin-form-field">
      <span className="admin-form-label">Imagen</span>
      <div
        {...getRootProps()}
        className={`admin-dropzone ${isDragActive ? 'is-active' : ''}`}
      >
        <input {...getInputProps()} />
        {displayUrl ? (
          <img src={displayUrl} alt="Preview" className="admin-dropzone-preview" />
        ) : (
          <p className="admin-dropzone-text">
            {isDragActive
              ? 'Suelta la imagen aqui'
              : 'Arrastra una imagen o haz clic para seleccionar'}
          </p>
        )}
      </div>
    </div>
  );
};

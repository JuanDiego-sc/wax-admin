import type { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

export const ToastProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};
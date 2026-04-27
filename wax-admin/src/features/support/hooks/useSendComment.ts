import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { mutationKeys } from '@/lib/queryKeys';

type SendCommentVars = {
  ticketId: string;
  body: string;
  sendFn: (body: string) => Promise<void>;
};

export const useSendComment = () => {
  return useMutation({
    mutationKey: mutationKeys.support.sendComment,
    mutationFn: async ({ body, sendFn }: SendCommentVars) => {
      await sendFn(body);
    },
    onError: () => {
      toast.error('Error al enviar el comentario');
    },
  });
};

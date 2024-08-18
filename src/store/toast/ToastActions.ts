export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';

interface ShowToastAction {
  type: typeof SHOW_TOAST;
  payload: {
      variant: string; message: string 
};
}

interface HideToastAction {
  type: typeof HIDE_TOAST;
}

export type ToastActionTypes = ShowToastAction | HideToastAction;
export type ToastVariants = 'success' | 'warning' | 'alert' | 'error'

export const showToast = (message: string, variant: ToastVariants): ShowToastAction => ({
  type: SHOW_TOAST,
  payload: { message ,variant },
});

export const hideToast = (): HideToastAction => ({
  type: HIDE_TOAST,
});
import { SHOW_TOAST, HIDE_TOAST, ToastActionTypes, ToastVariants } from './ToastActions';

interface ToastState {
  visible: boolean;
  message: string;
  variant: ToastVariants | null
}

const initialState: ToastState = {
  visible: false,
  message: '',
  variant: 'success' as ToastVariants, // default variant is success for simplicity, you can add more types if needed.
};

const toastReducer = (state = initialState, action: ToastActionTypes): ToastState => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        visible: true,
        message: action.payload.message,
        variant: action.payload.variant as ToastVariants || state.variant, // if variant is not provided in action, use the default variant.
      };
    case HIDE_TOAST:
      return {
        ...state,
        visible: false,
        message: '',
        variant: state.variant, // reset the variant to default after hiding the toast.
      };
    default:
      return state;
  }
};

export default toastReducer;
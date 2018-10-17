export function clearToast() {
  return {
    type: 'CLEAR_TOAST',
    payload: { toast: '' },
  };
}

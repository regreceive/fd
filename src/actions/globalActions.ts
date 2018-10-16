export function clearToast() {
  return {
    type: 'CLEAR_TOAST',
    payload: { toast: '' },
  };
}

export function changeBar(id: string) {
  return {
    type: 'CHANGE_BAR',
    payload: id,
  };
}

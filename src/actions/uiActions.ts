export function changeBar(id: string) {
  return {
    type: 'CHANGE_BAR',
    payload: id,
  };
}

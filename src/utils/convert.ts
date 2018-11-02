import { TranslateFunction } from 'react-localize-redux';

export default (translate: TranslateFunction) => (val: string) =>
  translate('param.' + val) as string;

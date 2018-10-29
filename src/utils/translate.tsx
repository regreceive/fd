import React from 'react';
import { Translate } from 'react-localize-redux';
import { renderToString } from 'react-dom/server';

export default function(id: string) {
  return renderToString(<Translate id={id} />);
}

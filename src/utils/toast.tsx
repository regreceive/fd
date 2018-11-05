import React from 'react';
import { Toast } from 'antd-mobile';
import { Translate } from 'react-localize-redux';
import { renderToString } from 'react-dom/server';

export default async function toast(id: string[] | string, variable = {}) {
  if (typeof id === 'string') {
    id = [id];
  }

  const translated = id.map(value => {
    const type = value.substring(0, value.indexOf('.'));
    const content = renderToString(
      <Translate id={'toast.' + value} data={variable} />,
    );
    return { type, content };
  });

  for (const row of translated) {
    await show(row.type, row.content);
  }
}

export function show(type: string, content: string): Promise<any> {
  return new Promise(resolve => {
    switch (type) {
      case 'info':
        Toast.info(content, undefined, resolve);
        break;
      case 'success':
        Toast.success(content, undefined, resolve, false);
        break;
      case 'fail':
        Toast.fail(content, undefined, resolve, false);
        break;
      case 'offline':
        Toast.offline(content, undefined, resolve);
        break;
      case 'loading':
        Toast.loading(content, undefined, resolve);
        break;
      default:
        Toast.info(content, undefined, resolve, false);
    }
  });
}

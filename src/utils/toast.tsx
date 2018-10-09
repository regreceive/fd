import React from 'react';
import { Toast } from 'antd-mobile';
import { Translate } from 'react-localize-redux';
import { renderToString } from 'react-dom/server';

export default function(id: string) {
  const type = id.substring(0, id.indexOf('.'));
  const content = renderToString(<Translate id={'toast.' + id} />);

  switch (type) {
    case 'info':
      Toast.info(content);
      break;
    case 'success':
      Toast.success(content);
      break;
    case 'fail':
      Toast.fail(content);
      break;
    case 'offline':
      Toast.offline(content);
      break;
    case 'loading':
      Toast.loading(content);
      break;
    default:
      Toast.info(content, 2, undefined, false);
  }
}

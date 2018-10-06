// 初始化语言包，设置默认语言
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Dispatch } from 'redux';
import {
  LocalizeContextProps,
  SingleLanguageTranslation,
  withLocalize,
} from 'react-localize-redux';
import { LocaleProvider } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import autobind from 'autobind-decorator';

import en from 'lang/en.json';
import { IStoreState } from '../../types';
import LayoutView from './LayoutView';

interface IStateProps {
  lang: string;
  type: 0 | 1;
}

interface IDispatchProps {
  replace: (path: string) => void;
}

const basePath = process.env.REACT_APP_BASE_PATH;
const splashEnable = process.env.REACT_APP_SPLASH === 'on';

const mapStateToProps = (state: IStoreState) => ({
  lang: state.user.config.lang,
  type: state.user.type,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  replace: (path: string) => dispatch(replace(path)),
});

@(withLocalize as any)
@(connect<IStateProps, IDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class Layout extends React.Component {
  constructor(props: {}) {
    super(props);

    this.injected.initialize({
      languages: [
        { name: 'English', code: 'en' },
        { name: 'Chinese', code: 'cn' },
      ],
      translation: en,
      options: { renderToStaticMarkup, defaultLanguage: this.injected.lang },
    });

    this.initLanguage(this.injected.lang);

    // 统一入口是启动页
    if (splashEnable) {
      this.injected.replace(basePath + '/splash');
    }
  }

  get injected() {
    return this.props as LocalizeContextProps & IStateProps & IDispatchProps;
  }

  public shouldComponentUpdate() {
    return false;
  }

  @autobind
  public initLanguage(lang: string) {
    getLanguage(lang).then((data: SingleLanguageTranslation) => {
      this.injected.addTranslationForLanguage(data, lang);
      this.injected.setActiveLanguage(lang);
    });
  }

  public render() {
    return (
      <LocaleProvider locale={enUS}>
        <LayoutView type={this.injected.type} />
      </LocaleProvider>
    );
  }
}

export function getLanguage(code: string): Promise<SingleLanguageTranslation> {
  return import('lang/' + code + '.json');
}

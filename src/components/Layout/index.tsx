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
import { IUser } from '../../reducers/userReducer';
import { IGlobal } from '../../reducers/globalReducer';
import { clearToast } from '../../actions/globalActions';
import {
  getGameStatus,
  gameStatusReset,
  getGameIndex,
} from '../../actions/userActions';

interface IState {
  splash: boolean;
}

interface IStateProps {
  isLogin: boolean;
  lang: string;
  side: IUser['side'];
  role: IUser['role'];
  gameStatus: IUser['gameStatus'];
  gameIndex: IUser['gameIndex'];
  toast: IGlobal['toast'];
}

interface IDispatchProps {
  replace: typeof replace;
  clearToast: typeof clearToast;
  getGameStatus: typeof getGameStatus;
  getGameIndex: typeof getGameIndex;
  gameStatusReset: typeof gameStatusReset;
}

const basePath = process.env.REACT_APP_BASE_PATH;
const splashEnable = process.env.REACT_APP_SPLASH === 'on';

const mapStateToProps = (state: IStoreState) => ({
  isLogin: state.global.token.length > 0,
  lang: state.user.config.lang,
  side: state.user.side,
  role: state.user.role,
  gameStatus: state.user.gameStatus,
  gameIndex: state.user.gameIndex,
  toast: state.global.toast,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  replace: (path: string) => dispatch(replace(path)),
  clearToast: () => dispatch(clearToast()),
  getGameStatus: () => dispatch(getGameStatus()),
  getGameIndex: () => dispatch(getGameIndex()),
  gameStatusReset: () => dispatch(gameStatusReset()),
});

@(withLocalize as any)
@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class Layout extends React.Component<{}, IState> {
  public state = {
    splash: true,
  };

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

  public shouldComponentUpdate(nextProps: IStateProps) {
    return (
      nextProps.side !== this.injected.side ||
      nextProps.role !== this.injected.role ||
      nextProps.isLogin !== this.injected.isLogin ||
      nextProps.toast !== this.injected.toast ||
      nextProps.lang !== this.injected.lang ||
      nextProps.gameStatus !== this.injected.gameStatus ||
      nextProps.gameIndex !== this.injected.gameIndex
    );
  }

  public componentDidMount() {
    setTimeout(() => this.setState({ splash: false }), 2000);
  }

  @autobind
  public initLanguage(lang: string) {
    getLanguage(lang).then((data: SingleLanguageTranslation) => {
      this.injected.addTranslationForLanguage(data, lang);
      this.injected.setActiveLanguage(lang);
    });
  }

  public render() {
    const langData = this.injected.lang === 'en' ? enUS : {};
    return (
      <LocaleProvider locale={langData}>
        <LayoutView
          isLogin={this.injected.isLogin}
          side={this.injected.side}
          role={this.injected.role}
          toast={this.injected.toast}
          lang={this.injected.lang}
          gameStatus={this.injected.gameStatus}
          clearToast={this.injected.clearToast}
          getGameStatus={this.injected.getGameStatus}
          gameStatusReset={this.injected.gameStatusReset}
          gameIndex={this.injected.gameIndex}
          getGameIndex={this.injected.getGameIndex}
        />
      </LocaleProvider>
    );
  }
}

export function getLanguage(code: string): Promise<SingleLanguageTranslation> {
  return import('lang/' + code + '.json');
}

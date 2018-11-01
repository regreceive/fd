import { IAction } from '../types';
import {
  IAvailableRolesComplete,
  ILoginComplete,
  ILogoutResponse,
  IProducerSummaryResponse,
  IQuotePriceResponse,
  IRoleComplete,
  IWalletBalanceResponse,
  ICurrentResponse,
  IGainsDetailResponse,
  IPriceConstituteResponse,
  IElectricEXChartResponse,
  IExchangeFormResponse,
  ICheckResponse,
  IPostOfferComplete,
  IDashBoardResponse,
} from '../actions/userActions';

export interface IUser {
  username: string;
  side: string;
  role: string;
  roles: Array<{ role: string; available: boolean; side: 'SELL' | 'BUY' }>;
  currentState: {
    power: number;
    cost: number;
  };
  earns: {
    eletric: number;
    price: number;
  };
  offer: {
    price: number;
    timestamp: number;
  };
  wallet: {
    balance: number;
  };
  quotePrice: Array<{
    amount: number;
    earning: number;
    status: 0 | 1 | 2;
    time: number;
  }>;

  gainsDetail: {
    total: {
      uid: number;
      eletric: number;
      userTotal: number;
      otherTotal: number;
    };
    list: Array<{
      uid: number;
      index: number;
      eletric: number;
      userTotal: number;
      otherTotal: number;
    }>;
  };
  gainsCard: Array<{
    count: number;
    earning: number;
    netEarning: number;
    time: number;
  }>;
  priceConstitute: {
    total: {
      price: number;
    };
    data: Array<{
      item: string;
      count: number;
    }>;
  };
  config: {
    lang: string;
  };
  currentCoast: {
    total: {
      pre: number;
      after: number;
      eletric: number;
    };
    list: [
      {
        actual: number;
        price: number;
        index: string;
      }
    ];
  };
  getChartData: Array<{
    uid: string;
    electric: number;
    price: number;
    creatime: string;
    index: number;
  }>;
  exChart: Array<{
    uid: number;
    index: string;
    eletric: number;
    price: number;
  }>;
  exchangeForm: Array<{
    amount: number;
    earning: number;
    time: number;
  }>;
  checkDetail: {
    total: {
      uid: number;
      eletric: number;
      price: number;
    };
    list: Array<{
      uid: number;
      index: number;
      eletric: number;
      price: number;
    }>;
  };
  dashBoard: {
    percent: string;
    total: string;
  };
}

const lang = process.env.REACT_APP_DEFAULT_LANGUAGE || 'en';

const initState: IUser = {
  username: '',
  side: '',
  role: '',
  roles: [],
  currentState: {
    power: 0,
    cost: 0,
  },
  earns: {
    eletric: 0,
    price: 0,
  },
  offer: {
    price: 0,
    timestamp: 0,
  },
  wallet: {
    balance: 0,
  },
  quotePrice: [],
  priceConstitute: {
    total: {
      price: 0,
    },
    data: [],
  },
  gainsDetail: {
    total: {
      uid: 0,
      eletric: 0,
      userTotal: 0,
      otherTotal: 0,
    },
    list: [],
  },
  gainsCard: [],
  config: {
    lang,
  },
  currentCoast: {
    total: {
      pre: 0,
      after: 0,
      eletric: 0,
    },
    list: [
      {
        actual: 0,
        price: 0,
        index: '0',
      },
    ],
  },
  getChartData: [],
  exChart: [],
  exchangeForm: [],
  checkDetail: {
    total: {
      uid: 0,
      eletric: 0,
      price: 0,
    },
    list: [],
  },
  dashBoard: {
    percent: '',
    total: '',
  },
};

const user = (state = initState, action: IAction): IUser => {
  // 服务器返回异常情况下，不含有data字段，所以返回原有state
  if (action.payload && !action.payload.data) {
    return state;
  }

  switch (action.type) {
    case 'LOGIN_COMPLETE': {
      const { data } = action.payload as ILoginComplete;
      const { username, role, side } = data;
      return { ...state, username, role, side };
    }
    case 'LOGOUT_COMPLETE': {
      const { data } = action.payload as ILogoutResponse;
      return { ...state, ...data };
    }
    case 'AVAILABLE_ROLES_COMPLETE': {
      const { data } = action.payload as IAvailableRolesComplete;
      return { ...state, roles: data };
    }
    case 'UPDATE_ROLE_COMPLETE': {
      const { data } = action.payload as IRoleComplete;
      return { ...state, ...data };
    }
    case 'PRODUCER_SUMMARY_COMPLETE': {
      const { data } = action.payload as IProducerSummaryResponse;
      if (data.earns && data.offer) {
        return { ...state, ...data };
      }
      return state;
    }
    case 'QUOTE_PRICE_COMPLETE': {
      const { data } = action.payload as IQuotePriceResponse;
      return { ...state, quotePrice: data };
    }
    case 'WALLET_BALANCE_COMPLETE': {
      const { data } = action.payload as IWalletBalanceResponse;
      const wallet = { balance: data };
      return { ...state, wallet };
    }
    case 'CURRENT_COAST_COMPLETE': {
      const { data } = action.payload as ICurrentResponse;
      return { ...state, currentCoast: data };
    }
    case 'GAINS_DETAIL_COMPLETE': {
      const { data } = action.payload as IGainsDetailResponse;
      return { ...state, gainsDetail: data };
    }
    case 'PRICE_CONSTITUTE_COMPLETE': {
      const { data } = action.payload as IPriceConstituteResponse;
      return { ...state, priceConstitute: data };
    }
    case 'EXCHANGE_FORM_COMPLETE': {
      const { data } = action.payload as IExchangeFormResponse;
      return { ...state, exchangeForm: data };
    }
    case 'CHECK_COMPLETE': {
      const { data } = action.payload as ICheckResponse;
      return { ...state, checkDetail: data };
    }
    case 'ELECTRIC_EX_CHART_COMPETE': {
      const { data } = action.payload as IElectricEXChartResponse;
      return { ...state, exChart: data };
    }
    case 'POST_OFFER_COMPLETE': {
      const { data } = action.payload as IPostOfferComplete;
      return { ...state, offer: data };
    }
    case 'DASHBOARD_COMPLETE': {
      const { data } = action.payload as IDashBoardResponse;
      return { ...state, dashBoard: data };
    }
    default:
      return state;
  }
};

export default user;

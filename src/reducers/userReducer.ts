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
  IAjustResponse,
} from '../actions/userActions';

export interface IUser {
  username: string;
  side: '' | 'BUY' | 'SELL';
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
  adjust: {
    total: {
      pre: number;
      after: number;
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
    count: number;
    price: number;
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
  adjust: {
    total: {
      pre: 0,
      after: 0,
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
};

const user = (state = initState, action: IAction): IUser => {
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
      return { ...state, ...data };
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
    case 'ADJUST_COMPLETE': {
      const { data } = action.payload as IAjustResponse;
      return { ...state, adjust: data };
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
    default:
      return state;
  }
};

export default user;

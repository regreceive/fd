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
  IElectricEXChartResponse,
  IExchangeFormResponse,
  ICheckResponse,
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
    vol: number;
    price: number;
    amount: number;
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
    count: number;
    earning: number;
    netEarning: number;
  };
  gainsCard: Array<{
    count: number;
    earning: number;
    netEarning: number;
    time: number;
  }>;
  priceConstitute: {
    pv: number;
    cchp: number;
    storage: number;
    wind: number;
    grid: number;
  };
  config: {
    lang: string;
  };
  currentCoast: {
    currentpower: number;
    before: number;
    after: number;
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
  check: {
    count: number;
    price: number;
    time: number;
  };
  checkDetail: Array<{
    count: number;
    price: number;
    time: number;
  }>;
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
    vol: 0,
    price: 0,
    amount: 0,
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
    pv: 0.1,
    cchp: 0.1,
    storage: 0.1,
    wind: 0.1,
    grid: 0.6,
  },
  gainsDetail: {
    count: 0,
    earning: 0,
    netEarning: 0,
  },
  gainsCard: [],
  config: {
    lang,
  },
  currentCoast: {
    currentpower: 0,
    before: 0,
    after: 0,
  },
  getChartData: [],
  exChart: [],
  exchangeForm: [],
  check: {
    count: 0,
    price: 0,
    time: 0,
  },
  checkDetail: [],
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
      return { ...state, ...data };
    }
    case 'GAINS_DETAIL_COMPLETE': {
      const { data } = action.payload as IGainsDetailResponse;
      return { ...state, ...data };
    }
    case 'EXCHANGE_FORM_COMPLETE': {
      const { data } = action.payload as IExchangeFormResponse;
      return { ...state, exchangeForm: data };
    }

    case 'CHECK_COMPLETE': {
      const { data } = action.payload as ICheckResponse;

      return { ...state, ...data };
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

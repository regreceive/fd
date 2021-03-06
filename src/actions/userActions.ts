import { IUser } from '../reducers/userReducer';
import { IGlobal } from '../reducers/globalReducer';
export interface IResponseSchema {
  status: string;
  token?: string;
  toast: IGlobal['toast'];
  data: {};
}

export function changeLanguage(lang: string) {
  return {
    type: 'CHANGE_LANGUAGE',
    payload: { data: lang },
  };
}

export interface ILogin {
  username: string;
  password: string;
}

export function login(data: ILogin) {
  return {
    type: 'LOGIN',
    payload: data,
  };
}

export interface ILoginComplete extends IResponseSchema {
  data: {
    username: IUser['username'];
    side: IUser['side'];
    role: IUser['role'];
    token: string;
  };
}

export function loginComplete(data: ILoginComplete) {
  return {
    type: 'LOGIN_COMPLETE',
    payload: data,
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export interface ILogoutResponse extends IResponseSchema {
  data: {
    side: IUser['side'];
    role: IUser['role'];
  };
}

export function logoutComplete(data: ILogoutResponse) {
  return {
    type: 'LOGOUT_COMPLETE',
    payload: data,
  };
}

export function getAvailableRoles() {
  return {
    type: 'GET_AVAILABLE_ROLES',
  };
}

export interface IAvailableRolesComplete extends IResponseSchema {
  data: IUser['roles'];
}

export function getAvailableRolesComplete(data: IAvailableRolesComplete) {
  return {
    type: 'AVAILABLE_ROLES_COMPLETE',
    payload: data,
  };
}

export interface IRole {
  role: string;
}

export function updateRole(role: IRole) {
  return {
    type: 'UPDATE_ROLE',
    payload: role,
  };
}

export interface IRoleComplete extends IResponseSchema {
  data: {
    role: IUser['role'];
    side: IUser['side'];
  };
}

export function updateRoleComplete(data: IRoleComplete) {
  return {
    type: 'UPDATE_ROLE_COMPLETE',
    payload: data,
  };
}

export function getProducerSummary() {
  return {
    type: 'GET_PRODUCER_SUMMARY',
  };
}

export interface IProducerSummaryResponse extends IResponseSchema {
  data: {
    currentState: IUser['currentState'];
    earns: IUser['earns'];
    offer: IUser['offer'];
  };
}

export function producerSummaryComplete(data: IProducerSummaryResponse) {
  return {
    type: 'PRODUCER_SUMMARY_COMPLETE',
    payload: data,
  };
}

export function postOffer(power: number, price: number) {
  return {
    type: 'POST_OFFER',
    payload: { power, price },
  };
}

export interface IPostOfferComplete extends IResponseSchema {
  data: IUser['offer'];
}

export function postOfferComplete(data: IPostOfferComplete) {
  return {
    type: 'POST_OFFER_COMPLETE',
    payload: data,
  };
}

export function postTime(
  fromIndex: number,
  toIndex: number,
  adjustElectric: number,
) {
  return {
    type: 'POST_TIME',
    payload: { fromIndex, toIndex, adjustElectric },
  };
}

export function postTimeComplete(data: ICurrentResponse) {
  return {
    type: 'POST_TIME_COMPLETE',
    payload: data,
  };
}

export function getQuotePrice() {
  return {
    type: 'GET_QUOTE_PRICE',
  };
}

export interface IQuotePriceResponse extends IResponseSchema {
  data: IUser['quotePrice'];
}

export function quotePriceComplete(data: IQuotePriceResponse) {
  return {
    type: 'QUOTE_PRICE_COMPLETE',
    payload: data,
  };
}

export function getWalletBalance() {
  return {
    type: 'GET_WALLET_BALANCE',
  };
}

export interface IWalletBalanceResponse extends IResponseSchema {
  data: IUser['wallet']['balance'];
}

export function walletBalanceComplete(data: IWalletBalanceResponse) {
  return {
    type: 'WALLET_BALANCE_COMPLETE',
    payload: data,
  };
}
export function getCurrentCoast() {
  return {
    type: 'GET_CURRENT_COAST',
  };
}

export interface ICurrentResponse extends IResponseSchema {
  data: IUser['currentCoast'];
}

export function currentCoastComplete(data: ICurrentResponse) {
  return {
    type: 'CURRENT_COAST_COMPLETE',
    payload: data,
  };
}

export function getPriceConstitute() {
  return {
    type: 'GET_PRICE_CONSTITUTE',
  };
}

export interface IPriceConstituteResponse extends IResponseSchema {
  data: IUser['priceConstitute'];
}

export function priceConstituteComplete(data: IPriceConstituteResponse) {
  return {
    type: 'PRICE_CONSTITUTE_COMPLETE',
    payload: data,
  };
}

export function getGainsDetail() {
  return {
    type: 'GET_GAINS_DETAIL',
  };
}

export interface IGainsDetailResponse extends IResponseSchema {
  data: IUser['gainsDetail'];
}

export function gainsDetailComplete(data: IGainsDetailResponse) {
  return {
    type: 'GAINS_DETAIL_COMPLETE',
    payload: data,
  };
}

export function getElectricEXChart() {
  return {
    type: 'GET_ELECTRIC_EX_CHART',
  };
}

export interface IElectricEXChartResponse extends IResponseSchema {
  data: IUser['exChart'];
}

export function electricChartComplete(data: IElectricEXChartResponse) {
  return {
    type: 'ELECTRIC_EX_CHART_COMPETE',
    payload: data,
  };
}

export function getExchangeForm() {
  return {
    type: 'GET_EXCAHNGE_FORM',
  };
}

export interface IExchangeFormResponse extends IResponseSchema {
  data: IUser['exchangeForm'];
}

export function exchangeFormComplete(data: IExchangeFormResponse) {
  return {
    type: 'EXCHANGE_FORM_COMPLETE',
    payload: data,
  };
}

export function getCheck() {
  return {
    type: 'GET_CHECK',
  };
}

export interface ICheckResponse extends IResponseSchema {
  data: IUser['checkDetail'];
}

export function checkComplete(data: ICheckResponse) {
  return {
    type: 'CHECK_COMPLETE',
    payload: data,
  };
}

export function getDashBoardData() {
  return {
    type: 'GET_DASHBOARD_DATA',
  };
}

export interface IDashBoardResponse extends IResponseSchema {
  data: IUser['dashBoard'];
}

export function dashBoardComplete(data: IDashBoardResponse) {
  return {
    type: 'DASHBOARD_COMPLETE',
    payload: data,
  };
}

export interface IGameStatus extends IResponseSchema {
  data: number;
}

export function getGameStatus() {
  return {
    type: 'GET_GAME_STATUS',
  };
}

export function gameStatusComplete(data: IGameStatus) {
  return {
    type: 'GAME_STATUS_COMPLETE',
    payload: data,
  };
}

export function gameStatusReset() {
  return {
    type: 'GAME_STATUS_RESET',
  };
}

export interface IGameIndex extends IResponseSchema {
  data: number;
}

export function getGameIndex() {
  return {
    type: 'GET_GAME_INDEX',
  };
}

export function gameIndexComplete(data: IGameIndex) {
  return {
    type: 'GAME_INDEX_COMPLETE',
    payload: data,
  };
}

export interface IGameTime extends IResponseSchema {
  data: number;
}

export function getGameTime() {
  return {
    type: 'GET_GAME_TIME',
  };
}

export function gameTimeComplete(data: IGameIndex) {
  return {
    type: 'GAME_TIME_COMPLETE',
    payload: data,
  };
}

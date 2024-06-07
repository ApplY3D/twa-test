import { dogIcon, notIcon, tonIcon, usdtIcon } from '../assets';

export type Token = {
  name: string;
  symbol: string;
  icon: string;
  balance: number;
  price: number;
};

const TON = {
  name: 'Ton Coin',
  symbol: 'TON',
  icon: tonIcon,
  balance: 164,
  price: 6
};

const USDT = {
  name: 'Tether USD',
  symbol: 'USDT',
  icon: usdtIcon,
  balance: 2996,
  price: 1
};

const NOT = {
  name: 'NOT Coin',
  symbol: 'NOT',
  icon: notIcon,
  balance: 12,
  price: 0.02
};
const REDO = {
  name: 'Resistance Dog',
  symbol: 'REDO',
  icon: dogIcon,
  balance: 5,
  price: 0.8
};

export const tokens: Token[] = [TON, USDT, NOT, REDO];

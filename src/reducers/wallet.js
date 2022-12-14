// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { SAVE_CURRENCIES, SAVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};
export default function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return { ...state,
      currencies: action.payload,
    };
  case SAVE_EXPENSES:
    return { ...state,
      expenses: [...state.expenses, action.payload], // faz spread do estado inicial do expenses (stae.expenses), novo estado
    };
  default:
    return state;
  }
}

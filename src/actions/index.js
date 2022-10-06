// Coloque aqui suas actions
//* aqui que irei salvar os inputs e moedas trazidas pela API.
//* uma action para salvar os inputs e outra para mostrar role?

export const SAVE_INPUTS = 'SAVE_INPUTS';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export function saveInputs(input) {
  return {
    type: SAVE_INPUTS,
    payload: input,
  };
}

export function saveCurrencies(currencies) {
  return {
    type: SAVE_CURRENCIES,
    payload: currencies,
  };
}

export function saveExpenses(input, currencies) {
  return {
    type: SAVE_EXPENSES,
    payload: {
      ...input,
      exchangeRates: currencies,
    },
  };
}

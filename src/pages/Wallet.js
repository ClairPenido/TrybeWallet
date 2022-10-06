import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCurrencies } from '../actions';
import Form from './Form';
import Table from './Table';
import '../styles/style.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: 'BRL',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(saveCurrencies(Object.keys(currencies)
        .filter((coins) => coins !== 'USDT'))));
  }
  // pegar value do input e o currency
  // achar o ask do currency e * o value

  calcDespesaTotal = () => {
    const { expenses } = this.props;
    const despesaIndividual = expenses.map((elem) => {
      const { currency } = elem;
      const resultado = elem.value * elem.exchangeRates[currency].ask; // está acessando no rates o mesmo nome da currency
      return resultado;
    });
    const despesaTotal = despesaIndividual.reduce((soma, despesa) => soma + despesa, 0);
    return despesaTotal.toFixed(2);
  }

  render() {
    const { email } = this.props;
    const { currencies } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <header>
          <h3 data-testid="email-field">{email}</h3>
          <h3 data-testid="total-field">
            { this.calcDespesaTotal() }
          </h3>
          <h3 data-testid="header-currency-field">
            {' '}
            {currencies}
            {' '}
          </h3>
          <Form />
        </header>
        <Table />

      </div>
    );
  }
}
const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});
export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

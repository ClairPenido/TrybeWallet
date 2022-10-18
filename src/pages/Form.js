import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpenses } from '../actions';
import '../styles/form_style.css';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    this.estadoInicial = { ...this.state };
  }

  handleChange = ({ target }) => { // pegar o value dos inputs de forma dinamica
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { addExpenses, expenses } = this.props;
    const { id } = this.state;
    this.setState({
      id: expenses.length === 0 ? 0 : id + 1,
    });
    await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => addExpenses(this.state, currencies));
    this.setState({ ...this.estadoInicial, id });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form
      className='form_container' onSubmit={ this.handleSubmit }>
        <div className='div_form'>
        <label htmlFor="value-input" >
          Valor: 
          {' '}
          <input
            className='valueI'
            data-testid="value-input"
            id="value-input"
            name="value"
            type="number"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          {' '}
          <select
            name="currency"
            id="moeda"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((coins) => (
              <option key={ coins } value={ coins }>{ coins }</option>))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          {' '}
          <select
            data-testid="method-input"
            name="method"
            id="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          {' '}
          <select
            data-testid="tag-input"
            name="tag"
            id="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input" >
          Descrição:
          {' '}
          <input
          className='descricao'
            data-testid="description-input"
            id="description-input"
            type="textArea"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          onClick={ this.addDespesa }
        >
          Adicionar despesa
        </button>
        </div>
      </form>
    );
  }
}
const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({ // para ler estados
  addExpenses: (input, exchangeRates) => dispatch(saveExpenses(input, exchangeRates)),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpenses: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);

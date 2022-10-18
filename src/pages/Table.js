import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/table_style.css';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody cellPadding={'10px'} cellspacing={'0px'}>
          {expenses.map((elem) => (
            <tr key={ elem.id }>
              <td>{elem.description}</td>
              <td>{elem.tag}</td>
              <td>{elem.method}</td>
              <td>{parseFloat(elem.value).toFixed(2)}</td>
              <td>{elem.exchangeRates[elem.currency].name}</td>
              <td>{parseFloat(elem.exchangeRates[elem.currency].ask).toFixed(2)}</td>
              <td>
                {parseFloat(elem.value * elem
                  .exchangeRates[elem.currency].ask).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Table);

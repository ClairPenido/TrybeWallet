import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { saveInputs } from '../actions';
import '../styles/style.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      statusSendButton: true,
      redirect: false,
    };
  }

  onChangeInput = ({ target }) => { // pegar o value dos inputs de forma dinamica
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // Botao começa desativado e precisa ativar somente quando
  // estiver com email no formato valido e senha de no min 6 caracteres
  checkInputs = () => {
    const { email, senha } = this.state;
    const numCaractMin = 6;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const valido = reg.test(email);
    return senha.length >= numCaractMin && valido; // returna true ou false
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { addInputs } = this.props;
    addInputs(this.state);
    this.setState({ redirect: true });
  }

  render() {
    const { email,
      senha,
      redirect,
    } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        {redirect && <Redirect to="/carteira" />}
        <div>
        <label htmlFor="email">
          Email:
          {' '}
          <input
            id="email"
            type="email"
            name="email"
            value={ email }
            onChange={ this.onChangeInput }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="senha">
          Senha:
          {' '}
          <input
            id="senha"
            type="password"
            name="senha"
            value={ senha }
            onChange={ this.onChangeInput }
            data-testid="password-input"
          />
        </label>
        <button
          type="submit"
          disabled={ !this.checkInputs() }
        >
          Entrar
        </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ // para ler estados
  addInputs: (input) => dispatch(saveInputs(input)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  addInputs: PropTypes.func.isRequired,
};

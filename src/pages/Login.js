import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { saveInputs } from '../actions';
import '../styles/login_style.css';
import carteira from '../styles/images/carteira2.png';


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
      <div id='div-mor'>
      <form className='div_login' onSubmit={ this.handleSubmit }>
        <p>Bem-vindo ao TrybeWallet!</p>
        <img className='login_image' src= {carteira} alt='imagem_carteira'/>
        {redirect && <Redirect to="/carteira" />}
        <label className='login_input' htmlFor="email">
          <input
            id="email"
            type="email"
            name="email"
            placeholder='email'
            value={ email }
            onChange={ this.onChangeInput }
            data-testid="email-input"
          />
        </label>
        <label className='login_input' htmlFor="senha">
          <input
            id="senha"
            type="password"
            name="senha"
            placeholder='senha'
            value={ senha }
            onChange={ this.onChangeInput }
            data-testid="password-input"
          />
        </label>
        <button className='botao_login'
          type="submit"
          disabled={ !this.checkInputs() }
        >
          Entrar
        </button>
      </form>
      </div>
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

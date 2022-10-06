// Esse reducer será responsável por tratar as informações da pessoa usuária
//* aqui seta o estado inicial para essas infos
import { SAVE_INPUTS } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_INPUTS:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}

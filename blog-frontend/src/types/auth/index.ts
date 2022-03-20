export {};

export interface IForm {
  form: 'register' | 'login';
  key: 'username' | 'password' | 'passwordConfirm';
  value: string;
}

export interface IState {
  register: {
    username: string;
    password: string;
    passwordConfirm: string;
  };
  login: {
    username: string;
    password: string;
  };
}

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from './../../modules/auth';
import { RootState } from '../../modules';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const { form, auth, authError, user } = useSelector(
    ({ auth, user }: RootState) => ({
      form: auth.login,
      auth: auth.auth,
      authError: auth.authError,
      user: user.user,
    }),
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name !== 'username' && name !== 'password') return;

    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('Error');
      console.log(authError);

      setError('Failed to login');
      return;
    }

    if (auth) {
      console.log('LOGIN SUCCESS');
      console.log(auth);

      dispatch(check());
    }
  }, [dispatch, auth, authError]);

  useEffect(() => {
    if (user) {
      console.log('CHECK API SUCCESS');
      console.log(user);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from './../../modules/auth';
import { RootState } from '../../modules';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const { form, auth, authError, user } = useSelector(
    ({ auth, user }: RootState) => ({
      form: auth.register,
      auth: auth.auth,
      authError: auth.authError,
      user: user.user,
    }),
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (
      name !== 'username' &&
      name !== 'password' &&
      name !== 'passwordConfirm'
    )
      return;

    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password, passwordConfirm } = form;

    if ([username, password, passwordConfirm].includes('')) {
      setError('do not allow blank');

      return;
    }
    if (password !== passwordConfirm) {
      setError('password is not equal');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
      return;
    }

    dispatch(register({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('this account is aleary in');

        return;
      }

      setError('Failed to register');
      return;
    }

    if (auth) {
      console.log('REGISETER SUCCESS');
      console.log(auth);

      dispatch(check());
    }
  }, [auth, authError, dispatch]);

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
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterForm;

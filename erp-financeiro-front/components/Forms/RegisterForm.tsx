/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (event: {
    preventDefault: () => void;
    target: {
      elements: {
        username: any;
        name: any;
        email: any;
        password: any;
        confirmPassword: any;
      };
    };
  }) => {
    event.preventDefault();
    setErrorMessage('');
    const { username, name, email, password, confirmPassword } =
      event.target.elements;

    if (password.value !== confirmPassword.value) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/users`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value,
            full_name: name.value,
          }),
        }
      );

      if (!response.ok) {
        setErrorMessage(
          'Erro ao cadastrar. Verifique os dados e tente novamente.'
        );
        return;
      }

      router.push('/auth/login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setErrorMessage('Ocorreu um erro durante o cadastro.');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl mb-2 text-[#2b2d42] text-center">
        Crie sua Conta
      </h2>{' '}
      <p className="text-sm mb-8 text-[#8d99ae] text-center">
        Cadastre-se para começar a usar o FinanceFlow{' '}
      </p>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Nome Completo */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-[#2b2d42]">
            Nome Completo{' '}
          </label>{' '}
          <div className="relative">
            <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-[#8d99ae]" />{' '}
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Digite seu nome completo"
              required
              className="w-full pl-10 pr-4 py-3 border border-[#e2e8f0] rounded-lg text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-[#1f6650] focus:shadow-[0_0_0_2px_rgba(67,97,238,0.2)]"
            />{' '}
          </div>{' '}
        </div>
             {/* Username */}
             <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium text-[#2b2d42]">
            Usuário{' '}
          </label>{' '}
          <div className="relative">
            <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-[#8d99ae]" />{' '}
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Digite seu nome de usuário"
              required
              className="w-full pl-10 pr-4 py-3 border border-[#e2e8f0] rounded-lg text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-[#1f6650] focus:shadow-[0_0_0_2px_rgba(67,97,238,0.2)]"
            />{' '}
          </div>{' '}
        </div>
        {/* E-mail */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-[#2b2d42]">
            E-mail
          </label>
          <div className="relative">
            <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-[#8d99ae]" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              required
              className="w-full pl-10 pr-4 py-3 border border-[#e2e8f0] rounded-lg text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-[#1f6650] focus:shadow-[0_0_0_2px_rgba(67,97,238,0.2)]"
            />
          </div>
        </div>
        {/* Senha */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[#2b2d42]"
          >
            Senha
          </label>
          <div className="relative">
            <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-[#8d99ae]" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Crie uma senha"
              required
              className="w-full pl-10 pr-12 py-3 border border-[#e2e8f0] rounded-lg text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-[#1f6650] focus:shadow-[0_0_0_2px_rgba(67,97,238,0.2)]"
            />
            <button
              type="button"
              onClick={togglePassword}
              aria-label="Mostrar senha"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8d99ae] focus:outline-none"
            >
              <i className={showPassword ? 'far fa-eye-slash' : 'far fa-eye'} />
            </button>
          </div>
        </div>
        {/* Confirmar Senha */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-[#2b2d42]"
          >
            Confirmar Senha
          </label>
          <div className="relative">
            <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-[#8d99ae]" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              required
              className="w-full pl-10 pr-12 py-3 border border-[#e2e8f0] rounded-lg text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-[#1f6650] focus:shadow-[0_0_0_2px_rgba(67,97,238,0.2)]"
            />
            <button
              type="button"
              onClick={toggleConfirmPassword}
              aria-label="Mostrar senha"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8d99ae] focus:outline-none"
            >
              <i
                className={
                  showConfirmPassword ? 'far fa-eye-slash' : 'far fa-eye'
                }
              />
            </button>
          </div>
        </div>
        {/* Exibição de erros */}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button
          type="submit"
          className="w-full bg-[#1f6650] text-white py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#166a3e]"
        >
          Cadastrar
        </button>
      </form>
      <p className="text-center mt-6 text-sm text-[#8d99ae]">
        Já tem uma conta?{' '}
        <a href="/auth/login" className="text-[#1f6650] font-medium hover:underline">
          Faça login
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;

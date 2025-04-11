"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();
  
  const togglePassword = () => setShowPassword(prev => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    const { username, password } = event.target.elements;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: username.value, 
          password: password.value 
        }),
      });
      if (!response.ok) {
        setErrorMessage('Credenciais inválidas. Tente novamente.');
        return;
      }
      const data = await response.json();
      const token = data.access_token;

      localStorage.setItem('jwt', token);
      
      router.push('/platform/payables');
      
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Ocorreu um erro ao efetuar login.');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl mb-2 text-[#2b2d42] text-center">Bem-vindo de volta</h2>
      <p className="text-sm mb-8 text-[#8d99ae] text-center">Faça login para acessar sua conta</p>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-medium text-[#2b2d42]">
            Usuário ou E-mail
          </label>
          <div className="relative">
            <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-[#8d99ae]" />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Digite seu usuário ou e-mail"
              required
              className="w-full pl-10 pr-4 py-3 border border-[#e2e8f0] rounded-lg text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-[#1f6650] focus:shadow-[0_0_0_2px_rgba(67,97,238,0.2)]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-[#2b2d42]">Senha</label>
          <div className="relative">
            <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-[#8d99ae]" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Digite sua senha"
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

        {/* Opção para exibir mensagens de erro */}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="remember" className="accent-[#1f6650]" />
            <span>Lembrar-me</span>
          </label>
          {/* todo */}
          {/* <a href="/auth/forgot-password" className="text-[#1f6650] font-medium hover:underline">Esqueceu a senha?</a> */}
        </div>

        <button
          type="submit"
          className="w-full bg-[#1f6650] text-white py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#1f6650]"
        >
          Entrar
        </button>

        <div className="flex items-center gap-4 text-sm text-[#8d99ae]">
          <div className="flex-1 h-px bg-[#e2e8f0]" />
          <span>ou</span>
          <div className="flex-1 h-px bg-[#e2e8f0]" />
        </div>
      </form>

      <p className="text-center mt-6 text-sm text-[#8d99ae]">
        Não tem uma conta?{' '}
        <a href="/auth/register" className="text-[#1f6650] font-medium hover:underline">
          Cadastre-se
        </a>
      </p>
    </div>
  );
};

export default LoginForm;

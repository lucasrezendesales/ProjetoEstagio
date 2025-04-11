'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ChangePasswordForm = ({ userId }) => {
  const [stage, setStage] = useState('validate');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleValidationSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/users/validate-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentPassword }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Senha atual inválida');
      }

      setStage('change');
    } catch (error) {
      console.error('Erro na validação:', error);
      setErrorMessage(error.message || 'Falha na validação da senha atual.');
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('As novas senhas não conferem.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/users/${userId}/change-password`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Falha ao alterar a senha');
      }

      router.push('/auth/login');
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      setErrorMessage(error.message || 'Erro ao atualizar a senha.');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-md">
      {stage === 'validate' && (
        <form className="flex flex-col gap-6" onSubmit={handleValidationSubmit}>
          <h2 className="text-3xl mb-2 text-[#2b2d42] text-center">
            Verificar Senha Atual
          </h2>
          <p className="text-sm mb-8 text-[#8d99ae] text-center">
            Digite sua senha atual para validar sua identidade.
          </p>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium text-[#2b2d42]"
            >
              Senha Atual
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              placeholder="Digite sua senha atual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full pl-4 py-3 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:border-[#1f6650]"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#1f6650] text-white py-3 rounded-lg text-base font-semibold cursor-pointer transition duration-300 hover:bg-[#166a3e]"
          >
            Validar Senha
          </button>
        </form>
      )}

      {stage === 'change' && (
        <form
          className="flex flex-col gap-6"
          onSubmit={handleChangePasswordSubmit}
        >
          <h2 className="text-3xl mb-2 text-[#2b2d42] text-center">
            Alterar Senha
          </h2>
          <p className="text-sm mb-8 text-[#8d99ae] text-center">
            Agora insira sua nova senha.
          </p>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-[#2b2d42]"
            >
              Nova Senha
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Digite a nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full pl-4 py-3 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:border-[#1f6650]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmNewPassword"
              className="text-sm font-medium text-[#2b2d42]"
            >
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder="Confirme a nova senha"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              className="w-full pl-4 py-3 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:border-[#1f6650]"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#1f6650] text-white py-3 rounded-lg text-base font-semibold cursor-pointer transition duration-300 hover:bg-[#166a3e]"
          >
            Alterar Senha
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangePasswordForm;

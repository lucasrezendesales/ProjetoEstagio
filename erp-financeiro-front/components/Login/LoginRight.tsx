import LoginForm from '../Forms/LoginForm';

const LoginRight = () => {
  return (
    <div className="flex-1 items-center flex flex-col justify-center p-8 bg-white">
      <div className="max-w-md w-full mx-auto">
        <LoginForm />
      </div>
      <footer className="pt-8 text-center text-xs text-[#8d99ae]">
        <p>© 2025 Isadora Belmont. Todos os direitos reservados.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="text-[#8d99ae] hover:text-[#1f6650]">
            Termos de uso
          </a>
          <a href="#" className="text-[#8d99ae] hover:text-[#1f6650]">
            Política de privacidade
          </a>
          <a href="#" className="text-[#8d99ae] hover:text-[#1f6650]">
            Ajuda
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LoginRight;

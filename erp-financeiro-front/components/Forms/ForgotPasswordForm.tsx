"use client";

const ForgotPasswordForm = () => {
  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl mb-2 text-[#2b2d42] text-center">Recuperar Senha</h2>
      <p className="text-sm mb-8 text-[#8d99ae] text-center">
        Digite seu e-mail e enviaremos instruções para recuperar sua senha
      </p>
      <form className="flex flex-col gap-6">
        {/* Campo de E-mail */}
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
              placeholder="Digite seu e-mail cadastrado"
              required
              className="w-full pl-10 pr-4 py-3 border border-[#e2e8f0] rounded-lg text-sm transition-all duration-300 ease-in-out focus:outline-none focus:border-[#1f6650] focus:shadow-[0_0_0_2px_rgba(67,97,238,0.2)]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1f6650] text-white py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#166a3e]"
        >
          Enviar Instruções
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-[#8d99ae]">
        Lembrou sua senha?{" "}
        <a href="/auth/login" className="text-[#1f6650] font-medium hover:underline">
          Faça login
        </a>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;

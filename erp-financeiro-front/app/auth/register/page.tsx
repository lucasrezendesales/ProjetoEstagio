import LoginLeft from '@/components/Login/LoginLeft';
import RegisterForm from '@/components/Forms/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      <LoginLeft />
      <div className="flex-1 flex flex-col justify-center p-8 bg-white">
        <div className="max-w-md w-full mx-auto">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

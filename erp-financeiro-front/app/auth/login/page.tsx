import LoginLeft from '@/components/Login/LoginLeft';
import LoginRight from '@/components/Login/LoginRight';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <LoginLeft />
      <LoginRight />
    </div>
  );
}

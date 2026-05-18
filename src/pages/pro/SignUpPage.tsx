import { useNavigate } from 'react-router-dom';
import Card from '@components/ui/Card';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';

function SignUpPage(): React.JSX.Element {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    navigate('/pro/login');
  };

  return (
    <div className="bg-bg-primary flex min-h-screen items-center justify-center px-4">
      <Card variant="glass" className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-accent-lime text-2xl font-bold">NAMECK STUDIO</h1>
          <p className="text-text-secondary mt-2 text-sm">Create your PRO account</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="First Name" required />
            <Input label="Last Name" required />
          </div>
          <Input label="Email" type="email" required />
          <Input label="Password" type="password" required />
          <Button type="submit" size="lg" className="mt-2">
            Create Account
          </Button>
        </form>
        <p className="text-text-muted mt-6 text-center text-sm">
          Already have an account?{' '}
          <button
            type="button"
            className="text-accent-lime hover:underline"
            onClick={() => navigate('/pro/login')}
          >
            Sign In
          </button>
        </p>
      </Card>
    </div>
  );
}

export default SignUpPage;

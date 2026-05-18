import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Card from '@components/ui/Card';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';

function LoginPage(): React.JSX.Element {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const ok = login(email, password);
      if (ok) {
        navigate('/pro/dashboard');
      } else {
        setError('Invalid credentials');
      }
    },
    [email, password, login, navigate],
  );

  return (
    <div className="bg-bg-primary flex min-h-screen items-center justify-center px-4">
      <Card variant="glass" className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-accent-lime text-2xl font-bold">NAMECK STUDIO</h1>
          <p className="text-text-secondary mt-2 text-sm">Sign in to your PRO account</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error ? <p className="text-status-error text-sm">{error}</p> : null}
          <Button type="submit" size="lg" className="mt-2">
            Sign In
          </Button>
        </form>
        <p className="text-text-muted mt-6 text-center text-sm">
          No account?{' '}
          <button
            type="button"
            className="text-accent-lime hover:underline"
            onClick={() => navigate('/pro/signup')}
          >
            Get Started
          </button>
        </p>
      </Card>
    </div>
  );
}

export default LoginPage;

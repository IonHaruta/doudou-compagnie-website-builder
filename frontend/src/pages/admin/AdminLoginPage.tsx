import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      // Use replace to avoid adding to history and ensure proper routing on GitHub Pages
      navigate('/admin', { replace: true });
    } else {
      setError(result.message || 'Login failed');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-admin-page-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="bg-card shadow-card rounded-xl border-0">
          <CardHeader className="text-center space-y-1.5 pb-2">
            <CardTitle className="text-2xl font-display font-semibold text-foreground">
              Admin Panel
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Autentificare pentru administrarea magazinului
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@doudou.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-admin-input-bg border-border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Parolă</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-admin-input-bg border-border rounded-lg"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full rounded-lg bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? 'Se autentifică...' : 'Autentificare'}
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Demo: admin@doudou.com / admin123
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

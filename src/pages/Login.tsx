
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de login - aquí conectarías con tu API
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a Digital Hub Banking",
      });
      // Aquí redirigirías al dashboard
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-banamex-light-gray to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-banamex-red mb-2">Digital Hub</h1>
          <p className="text-banamex-dark-gray">Banca Digital Segura</p>
        </div>
        
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="space-y-1 bg-gradient-to-r from-banamex-blue to-blue-800 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center text-white">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center text-blue-100">
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-banamex-dark-gray">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-300 focus:border-banamex-red focus:ring-banamex-red"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-banamex-dark-gray">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-300 focus:border-banamex-red focus:ring-banamex-red"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-banamex-red hover:bg-red-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Ingresando..." : "Iniciar Sesión"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6 text-sm text-banamex-dark-gray">
          <p>© 2024 Digital Hub Banking. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

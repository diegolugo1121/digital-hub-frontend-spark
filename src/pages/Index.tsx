
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, DollarSign, Clock, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary">Digital Hub Banking</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <a href="/login">Iniciar Sesión</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Banca Digital
            <span className="block text-primary">Moderna y Segura</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Gestiona tus finanzas de manera inteligente con nuestra plataforma bancaria digital. 
            Transferencias seguras, consultas en tiempo real y control total de tu dinero.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/login">Acceder a mi Cuenta</a>
            </Button>
            <Button variant="outline" size="lg">
              Conocer Más
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas para manejar tu dinero
          </h2>
          <p className="text-lg text-gray-600">
            Herramientas profesionales para el manejo moderno de tus finanzas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Transferencias Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Envía dinero de forma instantánea con validación automática de saldo
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-green-100 p-3 rounded-full w-fit">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Historial Completo</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Consulta todas tus transacciones enviadas y recibidas en tiempo real
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-purple-100 p-3 rounded-full w-fit">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Seguridad Total</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Protección avanzada con autenticación segura y encriptación de datos
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-orange-100 p-3 rounded-full w-fit">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Soporte 24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Asistencia personalizada disponible todos los días del año
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Únete a miles de usuarios que confían en Digital Hub Banking
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="/login">Iniciar Sesión</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Digital Hub Banking</h3>
            <p className="text-gray-400 mb-4">
              Banca digital moderna y segura para el siglo XXI
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Digital Hub Banking. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

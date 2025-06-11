
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, DollarSign, Clock, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-banamex-light-gray via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-banamex-red">Digital Hub Banking</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild className="border-banamex-blue text-banamex-blue hover:bg-banamex-blue hover:text-white">
                <a href="/login">Iniciar Sesión</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-banamex-dark-gray mb-6">
            Banca Digital
            <span className="block text-banamex-red">Moderna y Segura</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Gestiona tus finanzas de manera inteligente con nuestra plataforma bancaria digital. 
            Transferencias seguras, consultas en tiempo real y control total de tu dinero.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-banamex-red hover:bg-red-700">
              <a href="/login">Acceder a mi Cuenta</a>
            </Button>
            <Button variant="outline" size="lg" className="border-banamex-blue text-banamex-blue hover:bg-banamex-blue hover:text-white">
              Conocer Más
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-banamex-blue mb-4">
            Todo lo que necesitas para manejar tu dinero
          </h2>
          <p className="text-lg text-gray-600">
            Herramientas profesionales para el manejo moderno de tus finanzas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow border-gray-200">
            <CardHeader>
              <div className="mx-auto bg-red-50 p-3 rounded-full w-fit">
                <DollarSign className="h-6 w-6 text-banamex-red" />
              </div>
              <CardTitle className="text-lg text-banamex-blue">Transferencias Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Envía dinero de forma instantánea con validación automática de saldo
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-gray-200">
            <CardHeader>
              <div className="mx-auto bg-blue-50 p-3 rounded-full w-fit">
                <Clock className="h-6 w-6 text-banamex-blue" />
              </div>
              <CardTitle className="text-lg text-banamex-blue">Historial Completo</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Consulta todas tus transacciones enviadas y recibidas en tiempo real
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-gray-200">
            <CardHeader>
              <div className="mx-auto bg-gray-50 p-3 rounded-full w-fit">
                <Shield className="h-6 w-6 text-banamex-dark-gray" />
              </div>
              <CardTitle className="text-lg text-banamex-blue">Seguridad Total</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Protección avanzada con autenticación segura y encriptación de datos
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow border-gray-200">
            <CardHeader>
              <div className="mx-auto bg-red-50 p-3 rounded-full w-fit">
                <Users className="h-6 w-6 text-banamex-red" />
              </div>
              <CardTitle className="text-lg text-banamex-blue">Soporte 24/7</CardTitle>
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
      <section className="bg-banamex-blue text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Únete a miles de usuarios que confían en Digital Hub Banking
          </p>
          <Button size="lg" variant="secondary" asChild className="bg-banamex-red hover:bg-red-700 text-white border-0">
            <a href="/login">Iniciar Sesión</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-banamex-dark-gray text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-banamex-red">Digital Hub Banking</h3>
            <p className="text-gray-300 mb-4">
              Banca digital moderna y segura para el siglo XXI
            </p>
            <p className="text-sm text-gray-400">
              © 2024 Digital Hub Banking. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

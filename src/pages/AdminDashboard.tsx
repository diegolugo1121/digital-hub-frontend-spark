
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { adminApi } from "@/services/adminApi";
import CreateAccountForm from "@/components/CreateAccountForm";
import AccountMovements from "@/components/AccountMovements";
import { LogOut, Users, Activity } from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("accounts");
  const [accountsCount, setAccountsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticación
    if (!adminApi.isAuthenticated()) {
      navigate("/admin/login");
      return;
    }
    
    loadStats();
  }, [navigate]);

  const loadStats = async () => {
    try {
      const accounts = await adminApi.getAllAccounts();
      setAccountsCount(accounts.length);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleLogout = () => {
    adminApi.logout();
    navigate("/admin/login");
  };

  const handleAccountCreated = () => {
    loadStats();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-red-600">Panel Administrativo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Administrador</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cuentas</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{accountsCount}</div>
              <p className="text-xs text-muted-foreground">
                Cuentas registradas en el sistema
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Funciones</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Crear cuentas y ver movimientos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estado</CardTitle>
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Activo</div>
              <p className="text-xs text-muted-foreground">
                Sistema funcionando correctamente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg border">
          <Button
            variant={activeTab === "accounts" ? "default" : "ghost"}
            onClick={() => setActiveTab("accounts")}
            className="flex-1"
          >
            Crear Cuenta
          </Button>
          <Button
            variant={activeTab === "movements" ? "default" : "ghost"}
            onClick={() => setActiveTab("movements")}
            className="flex-1"
          >
            Ver Movimientos
          </Button>
        </div>

        {/* Content */}
        {activeTab === "accounts" && (
          <CreateAccountForm onAccountCreated={handleAccountCreated} />
        )}

        {activeTab === "movements" && (
          <AccountMovements />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

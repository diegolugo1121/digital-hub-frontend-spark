
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TransactionHistory } from "@/components/TransactionHistory";
import { TransferForm } from "@/components/TransferForm";
import { ArrowUpRight, ArrowDownLeft, DollarSign } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Datos simulados - estos vendrían de tu API
  const accountData = {
    balance: 2850.75,
    accountNumber: "****1234",
    name: "Juan Pérez"
  };

  const recentTransactions = [
    {
      id: 1,
      type: "sent",
      amount: -150.00,
      recipient: "María García",
      date: "2024-06-10",
      time: "14:30"
    },
    {
      id: 2,
      type: "received",
      amount: 500.00,
      sender: "Carlos López",
      date: "2024-06-09",
      time: "09:15"
    },
    {
      id: 3,
      type: "sent",
      amount: -75.50,
      recipient: "Ana Martínez",
      date: "2024-06-08",
      time: "16:45"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-primary">Digital Hub Banking</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Bienvenido, {accountData.name}</span>
              <Button variant="outline" size="sm">Cerrar Sesión</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg border">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            onClick={() => setActiveTab("overview")}
            className="flex-1"
          >
            Resumen
          </Button>
          <Button
            variant={activeTab === "transfer" ? "default" : "ghost"}
            onClick={() => setActiveTab("transfer")}
            className="flex-1"
          >
            Transferir
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "ghost"}
            onClick={() => setActiveTab("history")}
            className="flex-1"
          >
            Historial
          </Button>
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Balance Card */}
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardHeader>
                <CardDescription className="text-blue-100">
                  Cuenta {accountData.accountNumber}
                </CardDescription>
                <CardTitle className="text-3xl font-bold">
                  ${accountData.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100">Saldo disponible</p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("transfer")}>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transferir Dinero</CardTitle>
                  <ArrowUpRight className="h-4 w-4 ml-auto text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Envía dinero a otras cuentas de forma segura
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab("history")}>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ver Historial</CardTitle>
                  <DollarSign className="h-4 w-4 ml-auto text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Consulta todas tus transacciones
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Transacciones Recientes</CardTitle>
                <CardDescription>
                  Últimos movimientos en tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === "sent" 
                            ? "bg-red-100 text-red-600" 
                            : "bg-green-100 text-green-600"
                        }`}>
                          {transaction.type === "sent" ? 
                            <ArrowUpRight className="h-4 w-4" /> : 
                            <ArrowDownLeft className="h-4 w-4" />
                          }
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.type === "sent" ? transaction.recipient : transaction.sender}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.date} • {transaction.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.amount > 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <Badge variant={transaction.type === "sent" ? "destructive" : "default"} className="text-xs">
                          {transaction.type === "sent" ? "Enviado" : "Recibido"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "transfer" && <TransferForm currentBalance={accountData.balance} />}
        {activeTab === "history" && <TransactionHistory />}
      </div>
    </div>
  );
};

export default Dashboard;

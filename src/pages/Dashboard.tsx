
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
    <div className="min-h-screen bg-banamex-light-gray">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-banamex-red">Digital Hub Banking</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-banamex-dark-gray">Bienvenido, {accountData.name}</span>
              <Button variant="outline" size="sm" className="border-banamex-blue text-banamex-blue hover:bg-banamex-blue hover:text-white">Cerrar Sesión</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            onClick={() => setActiveTab("overview")}
            className={`flex-1 ${activeTab === "overview" ? "bg-banamex-red hover:bg-red-700" : "text-banamex-blue hover:bg-blue-50"}`}
          >
            Resumen
          </Button>
          <Button
            variant={activeTab === "transfer" ? "default" : "ghost"}
            onClick={() => setActiveTab("transfer")}
            className={`flex-1 ${activeTab === "transfer" ? "bg-banamex-red hover:bg-red-700" : "text-banamex-blue hover:bg-blue-50"}`}
          >
            Transferir
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "ghost"}
            onClick={() => setActiveTab("history")}
            className={`flex-1 ${activeTab === "history" ? "bg-banamex-red hover:bg-red-700" : "text-banamex-blue hover:bg-blue-50"}`}
          >
            Historial
          </Button>
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Balance Card */}
            <Card className="bg-gradient-to-r from-banamex-blue to-blue-800 text-white shadow-lg">
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
              <Card className="cursor-pointer hover:shadow-md transition-shadow border-gray-200 hover:border-banamex-red" onClick={() => setActiveTab("transfer")}>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-banamex-blue">Transferir Dinero</CardTitle>
                  <ArrowUpRight className="h-4 w-4 ml-auto text-banamex-red" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600">
                    Envía dinero a otras cuentas de forma segura
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow border-gray-200 hover:border-banamex-red" onClick={() => setActiveTab("history")}>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-banamex-blue">Ver Historial</CardTitle>
                  <DollarSign className="h-4 w-4 ml-auto text-banamex-red" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600">
                    Consulta todas tus transacciones
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-banamex-blue">Transacciones Recientes</CardTitle>
                <CardDescription>
                  Últimos movimientos en tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === "sent" 
                            ? "bg-red-50 text-banamex-red" 
                            : "bg-blue-50 text-banamex-blue"
                        }`}>
                          {transaction.type === "sent" ? 
                            <ArrowUpRight className="h-4 w-4" /> : 
                            <ArrowDownLeft className="h-4 w-4" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-banamex-dark-gray">
                            {transaction.type === "sent" ? transaction.recipient : transaction.sender}
                          </p>
                          <p className="text-sm text-gray-500">
                            {transaction.date} • {transaction.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.amount > 0 ? "text-banamex-blue" : "text-banamex-red"
                        }`}>
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <Badge variant={transaction.type === "sent" ? "destructive" : "default"} className={
                          transaction.type === "sent" 
                            ? "bg-red-100 text-banamex-red border-red-200" 
                            : "bg-blue-100 text-banamex-blue border-blue-200"
                        }>
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

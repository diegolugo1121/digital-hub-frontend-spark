
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, ArrowDownLeft, Search, Filter } from "lucide-react";

export const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Datos simulados - estos vendrían de tu API
  const allTransactions = [
    {
      id: 1,
      type: "sent",
      amount: -150.00,
      account: "****5678",
      name: "María García",
      date: "2024-06-10",
      time: "14:30",
      description: "Pago de servicios"
    },
    {
      id: 2,
      type: "received",
      amount: 500.00,
      account: "****9012",
      name: "Carlos López",
      date: "2024-06-09",
      time: "09:15",
      description: "Transferencia de nómina"
    },
    {
      id: 3,
      type: "sent",
      amount: -75.50,
      account: "****3456",
      name: "Ana Martínez",
      date: "2024-06-08",
      time: "16:45",
      description: "Compra online"
    },
    {
      id: 4,
      type: "received",
      amount: 200.00,
      account: "****7890",
      name: "Roberto Silva",
      date: "2024-06-07",
      time: "11:20",
      description: "Reembolso"
    },
    {
      id: 5,
      type: "sent",
      amount: -300.00,
      account: "****2345",
      name: "Luisa Fernández",
      date: "2024-06-06",
      time: "08:30",
      description: "Alquiler"
    },
    {
      id: 6,
      type: "received",
      amount: 1200.00,
      account: "****6789",
      name: "Empresa ABC",
      date: "2024-06-05",
      time: "10:00",
      description: "Pago de factura"
    }
  ];

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.account.includes(searchTerm);
    
    const matchesFilter = filterType === "all" || 
                         (filterType === "sent" && transaction.type === "sent") ||
                         (filterType === "received" && transaction.type === "received");

    return matchesSearch && matchesFilter;
  });

  const totalSent = allTransactions
    .filter(t => t.type === "sent")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalReceived = allTransactions
    .filter(t => t.type === "received")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enviado</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ${totalSent.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {allTransactions.filter(t => t.type === "sent").length} transacciones
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recibido</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${totalReceived.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {allTransactions.filter(t => t.type === "received").length} transacciones
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance Neto</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              (totalReceived - totalSent) >= 0 ? "text-green-600" : "text-red-600"
            }`}>
              ${(totalReceived - totalSent).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Últimos 30 días
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Transacciones</CardTitle>
          <CardDescription>
            Consulta y filtra todas tus transacciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, cuenta o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                onClick={() => setFilterType("all")}
                size="sm"
              >
                Todas
              </Button>
              <Button
                variant={filterType === "received" ? "default" : "outline"}
                onClick={() => setFilterType("received")}
                size="sm"
              >
                Recibidas
              </Button>
              <Button
                variant={filterType === "sent" ? "default" : "outline"}
                onClick={() => setFilterType("sent")}
                size="sm"
              >
                Enviadas
              </Button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Cuenta/Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`p-1 rounded-full mr-2 ${
                          transaction.type === "sent" 
                            ? "bg-red-100 text-red-600" 
                            : "bg-green-100 text-green-600"
                        }`}>
                          {transaction.type === "sent" ? 
                            <ArrowUpRight className="h-3 w-3" /> : 
                            <ArrowDownLeft className="h-3 w-3" />
                          }
                        </div>
                        <Badge variant={transaction.type === "sent" ? "destructive" : "default"} className="text-xs">
                          {transaction.type === "sent" ? "Enviado" : "Recibido"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-sm text-muted-foreground">{transaction.account}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{transaction.description}</p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{transaction.date}</p>
                        <p className="text-xs text-muted-foreground">{transaction.time}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <p className={`font-semibold ${
                        transaction.amount > 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No se encontraron transacciones con los filtros aplicados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

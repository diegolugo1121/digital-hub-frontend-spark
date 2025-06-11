
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, ArrowDownLeft, Search, Filter, RefreshCw } from "lucide-react";
import { getTransactions, Transaction } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface TransactionHistoryProps {
  currentAccountId: number;
}

export const TransactionHistory = ({ currentAccountId }: TransactionHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await getTransactions(currentAccountId);
      setTransactions(data);
    } catch (error) {
      toast({
        title: "Error al cargar transacciones",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [currentAccountId]);

  // Procesar transacciones para determinar tipo
  const processedTransactions = transactions.map(transaction => ({
    ...transaction,
    type: transaction.fromAccountId === currentAccountId ? "sent" : "received",
    amount: transaction.fromAccountId === currentAccountId ? -transaction.amount : transaction.amount,
    otherAccountId: transaction.fromAccountId === currentAccountId ? transaction.toAccountId : transaction.fromAccountId,
    formattedDate: new Date(transaction.timestamp).toLocaleDateString('es-ES'),
    formattedTime: new Date(transaction.timestamp).toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }));

  const filteredTransactions = processedTransactions.filter(transaction => {
    const matchesSearch = transaction.otherAccountId.toString().includes(searchTerm) ||
                         transaction.id.toString().includes(searchTerm);
    
    const matchesFilter = filterType === "all" || 
                         (filterType === "sent" && transaction.type === "sent") ||
                         (filterType === "received" && transaction.type === "received");

    return matchesSearch && matchesFilter;
  });

  const totalSent = processedTransactions
    .filter(t => t.type === "sent")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalReceived = processedTransactions
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
              {processedTransactions.filter(t => t.type === "sent").length} transacciones
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
              {processedTransactions.filter(t => t.type === "received").length} transacciones
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
              Total de transacciones
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Historial de Transacciones</CardTitle>
              <CardDescription>
                Transacciones de la cuenta {currentAccountId}
              </CardDescription>
            </div>
            <Button 
              onClick={loadTransactions}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID de transacción o cuenta..."
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
                  <TableHead>ID</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Cuenta</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      #{transaction.id}
                    </TableCell>
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
                      <p className="font-medium">Cuenta {transaction.otherAccountId}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.type === "sent" ? "Destino" : "Origen"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{transaction.formattedDate}</p>
                        <p className="text-xs text-muted-foreground">{transaction.formattedTime}</p>
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

          {isLoading && (
            <div className="text-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p className="text-muted-foreground">Cargando transacciones...</p>
            </div>
          )}

          {!isLoading && filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No se encontraron transacciones con los filtros aplicados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

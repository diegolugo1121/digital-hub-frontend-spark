
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { adminApi, Account } from "@/services/adminApi";

interface Transaction {
  id: number;
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  timestamp: string;
}

const AccountMovements = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [movements, setMovements] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const accountsData = await adminApi.getAllAccounts();
      setAccounts(accountsData);
    } catch (error) {
      toast({
        title: "Error al cargar cuentas",
        description: "No se pudieron obtener las cuentas",
        variant: "destructive",
      });
    }
  };

  const loadMovements = async (accountId: string) => {
    if (!accountId) return;
    
    setIsLoading(true);
    try {
      const response = await adminApi.getAccountMovements(parseInt(accountId));
      setMovements(response.transactions || []);
    } catch (error) {
      toast({
        title: "Error al cargar movimientos",
        description: "No se pudieron obtener los movimientos",
        variant: "destructive",
      });
      setMovements([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountChange = (accountId: string) => {
    setSelectedAccountId(accountId);
    loadMovements(accountId);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('es-ES');
  };

  const getTransactionType = (transaction: Transaction, accountId: number) => {
    if (transaction.fromAccountId === accountId) {
      return { type: 'sent', label: 'Enviado', variant: 'destructive' as const };
    } else {
      return { type: 'received', label: 'Recibido', variant: 'default' as const };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Movimientos de Cuenta</CardTitle>
        <CardDescription>
          Consulta todos los movimientos de una cuenta específica
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Seleccionar Cuenta</label>
          <Select value={selectedAccountId} onValueChange={handleAccountChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una cuenta" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id.toString()}>
                  {account.accountNumber} - {account.ownerName} (${account.balance.toFixed(2)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedAccountId && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Transacciones</h3>
              <span className="text-sm text-gray-500">Total: {movements.length} movimientos</span>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <p>Cargando movimientos...</p>
              </div>
            ) : movements.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No hay movimientos para esta cuenta</p>
              </div>
            ) : (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Cuenta Origen</TableHead>
                      <TableHead>Cuenta Destino</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movements.map((transaction) => {
                      const { label, variant } = getTransactionType(transaction, parseInt(selectedAccountId));
                      return (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.id}</TableCell>
                          <TableCell>
                            <Badge variant={variant}>{label}</Badge>
                          </TableCell>
                          <TableCell>{transaction.fromAccountId}</TableCell>
                          <TableCell>{transaction.toAccountId}</TableCell>
                          <TableCell className="font-medium">
                            ${transaction.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>{formatDate(transaction.timestamp)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountMovements;

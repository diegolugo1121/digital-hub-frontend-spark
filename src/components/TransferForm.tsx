
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Send } from "lucide-react";
import { transferMoney } from "@/services/api";

interface TransferFormProps {
  currentBalance: number;
  currentAccountId: number;
}

export const TransferForm = ({ currentBalance, currentAccountId }: TransferFormProps) => {
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const minBalance = -500;
  const transferAmount = parseFloat(amount) || 0;
  const newBalance = currentBalance - transferAmount;
  const isValidTransfer = newBalance >= minBalance && transferAmount > 0 && toAccountId.length > 0;

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidTransfer) {
      toast({
        title: "Error en la transferencia",
        description: "Verifica que el monto y la cuenta destino sean válidos",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const transferData = {
        fromAccountId: currentAccountId,
        toAccountId: parseInt(toAccountId),
        amount: transferAmount
      };

      const result = await transferMoney(transferData);

      toast({
        title: "¡Transferencia exitosa!",
        description: result,
      });
      
      // Limpiar formulario
      setToAccountId("");
      setAmount("");
      setDescription("");
    } catch (error) {
      toast({
        title: "Error en la transferencia",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-gray-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-banamex-blue to-blue-800 text-white rounded-t-lg">
          <CardTitle className="flex items-center text-white">
            <Send className="h-5 w-5 mr-2" />
            Nueva Transferencia
          </CardTitle>
          <CardDescription className="text-blue-100">
            Envía dinero a otras cuentas de forma segura
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleTransfer} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fromAccount" className="text-banamex-dark-gray">Cuenta Origen</Label>
              <Input
                id="fromAccount"
                value={currentAccountId}
                disabled
                className="bg-gray-100 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="toAccount" className="text-banamex-dark-gray">Cuenta Destino</Label>
              <Input
                id="toAccount"
                type="number"
                placeholder="ID de la cuenta destino"
                value={toAccountId}
                onChange={(e) => setToAccountId(e.target.value)}
                required
                className="border-gray-300 focus:border-banamex-red focus:ring-banamex-red"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-banamex-dark-gray">Monto</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="border-gray-300 focus:border-banamex-red focus:ring-banamex-red"
              />
              {transferAmount > 0 && (
                <div className="text-sm space-y-1">
                  <p className="text-gray-600">
                    Saldo actual: ${currentBalance.toFixed(2)}
                  </p>
                  <p className={`${newBalance >= 0 ? "text-banamex-blue" : "text-orange-600"}`}>
                    Saldo después de transferencia: ${newBalance.toFixed(2)}
                  </p>
                  {newBalance < minBalance && (
                    <div className="flex items-center text-banamex-red text-sm">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Esta transferencia excede tu límite permitido (${minBalance})
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-banamex-dark-gray">Descripción (Opcional)</Label>
              <Input
                id="description"
                placeholder="Concepto de la transferencia"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-gray-300 focus:border-banamex-red focus:ring-banamex-red"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-medium text-banamex-blue mb-2">Resumen de la Transferencia</h4>
              <div className="space-y-1 text-sm text-banamex-dark-gray">
                <p>Cuenta origen: {currentAccountId}</p>
                <p>Cuenta destino: {toAccountId || "No especificada"}</p>
                <p>Monto: ${transferAmount.toFixed(2)}</p>
                <p>Descripción: {description || "Sin descripción"}</p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-banamex-red hover:bg-red-700 text-white"
              disabled={!isValidTransfer || isLoading}
            >
              {isLoading ? "Procesando..." : `Transferir $${transferAmount.toFixed(2)}`}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6 border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div className="text-sm text-orange-800">
              <p className="font-medium mb-1">Información importante:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Puedes mantener un saldo negativo hasta $500</li>
                <li>Las transferencias se procesan con el backend real</li>
                <li>Verifica la cuenta destino antes de confirmar</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

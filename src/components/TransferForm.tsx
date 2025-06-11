
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Send } from "lucide-react";

interface TransferFormProps {
  currentBalance: number;
}

export const TransferForm = ({ currentBalance }: TransferFormProps) => {
  const [recipientAccount, setRecipientAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const minBalance = -500;
  const transferAmount = parseFloat(amount) || 0;
  const newBalance = currentBalance - transferAmount;
  const isValidTransfer = newBalance >= minBalance && transferAmount > 0 && recipientAccount.length > 0;

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
    
    // Simulación de transferencia - aquí conectarías con tu API
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Transferencia exitosa",
        description: `Se enviaron $${transferAmount.toFixed(2)} a la cuenta ${recipientAccount}`,
      });
      
      // Limpiar formulario
      setRecipientAccount("");
      setAmount("");
      setDescription("");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Send className="h-5 w-5 mr-2" />
            Nueva Transferencia
          </CardTitle>
          <CardDescription>
            Envía dinero a otras cuentas de forma segura
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTransfer} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipient">Cuenta Destino</Label>
              <Input
                id="recipient"
                placeholder="Número de cuenta del destinatario"
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Monto</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              {transferAmount > 0 && (
                <div className="text-sm space-y-1">
                  <p className="text-muted-foreground">
                    Saldo actual: ${currentBalance.toFixed(2)}
                  </p>
                  <p className={`${newBalance >= 0 ? "text-green-600" : "text-orange-600"}`}>
                    Saldo después de transferencia: ${newBalance.toFixed(2)}
                  </p>
                  {newBalance < minBalance && (
                    <div className="flex items-center text-red-600 text-sm">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Esta transferencia excede tu límite permitido (${minBalance})
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción (Opcional)</Label>
              <Input
                id="description"
                placeholder="Concepto de la transferencia"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Resumen de la Transferencia</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p>Destinatario: {recipientAccount || "No especificado"}</p>
                <p>Monto: ${transferAmount.toFixed(2)}</p>
                <p>Descripción: {description || "Sin descripción"}</p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
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
                <li>Las transferencias se procesan de forma inmediata</li>
                <li>Verifica la cuenta destino antes de confirmar</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

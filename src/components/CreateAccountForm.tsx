
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { adminApi, CreateAccountRequest } from "@/services/adminApi";

interface CreateAccountFormProps {
  onAccountCreated: () => void;
}

const CreateAccountForm = ({ onAccountCreated }: CreateAccountFormProps) => {
  const [formData, setFormData] = useState<CreateAccountRequest>({
    accountNumber: "",
    balance: 0,
    ownerName: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await adminApi.createAccount(formData);
      toast({
        title: "Cuenta creada exitosamente",
        description: `Cuenta ${formData.accountNumber} creada para ${formData.ownerName}`,
      });
      setFormData({ accountNumber: "", balance: 0, ownerName: "" });
      onAccountCreated();
    } catch (error) {
      toast({
        title: "Error al crear cuenta",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Nueva Cuenta</CardTitle>
        <CardDescription>
          Agregar una nueva cuenta al sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Número de Cuenta</Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder="123456789"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerName">Nombre del Titular</Label>
              <Input
                id="ownerName"
                type="text"
                placeholder="Juan Pérez"
                value={formData.ownerName}
                onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="balance">Saldo Inicial</Label>
            <Input
              id="balance"
              type="number"
              min="0"
              step="0.01"
              placeholder="1000.00"
              value={formData.balance}
              onChange={(e) => setFormData({...formData, balance: parseFloat(e.target.value) || 0})}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700"
            disabled={isLoading}
          >
            {isLoading ? "Creando..." : "Crear Cuenta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateAccountForm;

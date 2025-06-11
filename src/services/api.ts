
const API_BASE_URL = 'http://localhost:9080/demo';

export interface TransferRequest {
  fromAccountId: number;
  toAccountId: number;
  amount: number;
}

export interface Transaction {
  id: number;
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  timestamp: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
}

// Función para realizar transferencias
export const transferMoney = async (transferData: TransferRequest): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transferData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error en la transferencia');
    }

    return await response.text();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error de conexión con el servidor');
  }
};

// Función para obtener transacciones
export const getTransactions = async (accountId: number): Promise<Transaction[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${accountId}`);

    if (!response.ok) {
      throw new Error('Error al obtener las transacciones');
    }

    const data: TransactionsResponse = await response.json();
    return data.transactions;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error de conexión con el servidor');
  }
};

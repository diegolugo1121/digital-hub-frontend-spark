
const BASE_URL = 'http://localhost:9080/demo';

export interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  ownerName: string;
}

export interface CreateAccountRequest {
  accountNumber: string;
  balance: number;
  ownerName: string;
}

export const adminApi = {
  // Login de admin (simulado por ahora)
  login: async (username: string, password: string): Promise<boolean> => {
    // Simulación de login - en tu backend real implementarías /admin/login
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminToken', 'admin-token-123');
      return true;
    }
    throw new Error('Credenciales incorrectas');
  },

  // Crear nueva cuenta
  createAccount: async (accountData: CreateAccountRequest): Promise<Account> => {
    const response = await fetch(`${BASE_URL}/admin/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al crear la cuenta');
    }

    return response.json();
  },

  // Obtener todas las cuentas
  getAllAccounts: async (): Promise<Account[]> => {
    const response = await fetch(`${BASE_URL}/admin/accounts`);
    
    if (!response.ok) {
      throw new Error('Error al obtener las cuentas');
    }

    return response.json();
  },

  // Obtener movimientos de una cuenta específica
  getAccountMovements: async (accountId: number) => {
    const response = await fetch(`${BASE_URL}/transactions/${accountId}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener los movimientos');
    }

    return response.json();
  },

  // Logout
  logout: () => {
    localStorage.removeItem('adminToken');
  },

  // Verificar si está autenticado
  isAuthenticated: (): boolean => {
    return localStorage.getItem('adminToken') !== null;
  }
};

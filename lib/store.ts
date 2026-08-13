import { create } from 'zustand';

interface AuthStore {
  user: any | null;
  setUser: (user: any | null) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

interface FinancialStore {
  saldoAtual: number;
  receitasMes: number;
  despesasMes: number;
  setSaldoAtual: (valor: number) => void;
  setReceitasMes: (valor: number) => void;
  setDespesasMes: (valor: number) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));

export const useFinancialStore = create<FinancialStore>((set) => ({
  saldoAtual: 0,
  receitasMes: 0,
  despesasMes: 0,
  setSaldoAtual: (valor) => set({ saldoAtual: valor }),
  setReceitasMes: (valor) => set({ receitasMes: valor }),
  setDespesasMes: (valor) => set({ despesasMes: valor }),
}));

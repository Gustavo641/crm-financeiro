import { create } from 'zustand';

// Tipos
export interface Receita {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  banco: string;
  cliente?: string;
  status: 'recebido' | 'pendente' | 'atrasado';
  tipo: 'receita' | 'comissao';
}

export interface Comissao {
  id: string;
  empreendimento: string;
  cliente: string;
  valorVenda: number;
  comissaoPrevista: number;
  dataPrevista: string;
  dataRecebida?: string;
  banco: string;
  status: 'recebida' | 'aguardando' | 'atrasada';
}

export interface Despesa {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  banco: string;
  formaPagamento: string;
  status: 'pago' | 'pendente' | 'atrasado';
  parcela?: number;
  totalParcelas?: number;
}

export interface Meta {
  id: string;
  nome: string;
  valorDesejado: number;
  valorAtual: number;
  dataAlvo: string;
}

export interface CartaoCredito {
  id: string;
  nome: string;
  banco: string;
  limite: number;
  saldoUsado: number;
  dataFechamento: number;
  dataVencimento: number;
}

export interface Conta {
  id: string;
  descricao: string;
  valor: number;
  vencimento: string;
  categoria: string;
  banco: string;
  formaPagamento: string;
  tipo: 'pagar' | 'receber';
  status: 'pago' | 'pendente' | 'atrasado';
}

export interface Banco {
  id: string;
  nome: string;
  saldo: number;
}

export interface Login {
  id: string;
  site: string;
  usuario: string;
  senha: string;
  observacoes?: string;
  categoria: string;
}

// Interfaces de State
interface AuthState {
  user: { email: string; nome: string } | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => void;
  signup: (email: string, nome: string, senha: string) => void;
  logout: () => void;
  initAuth: () => void;
}

interface FinancialState {
  receitas: Receita[];
  comissoes: Comissao[];
  despesas: Despesa[];
  metas: Meta[];
  cartoesCredito: CartaoCredito[];
  contas: Conta[];
  bancos: Banco[];
  logins: Login[];

  // Receitas
  addReceita: (receita: Omit<Receita, 'id'>) => void;
  updateReceita: (id: string, receita: Partial<Receita>) => void;
  deleteReceita: (id: string) => void;

  // Comissões
  addComissao: (comissao: Omit<Comissao, 'id'>) => void;
  updateComissao: (id: string, comissao: Partial<Comissao>) => void;
  deleteComissao: (id: string) => void;

  // Despesas
  addDespesa: (despesa: Omit<Despesa, 'id'>) => void;
  updateDespesa: (id: string, despesa: Partial<Despesa>) => void;
  deleteDespesa: (id: string) => void;

  // Metas
  addMeta: (meta: Omit<Meta, 'id'>) => void;
  updateMeta: (id: string, meta: Partial<Meta>) => void;
  deleteMeta: (id: string) => void;

  // Cartões
  addCartao: (cartao: Omit<CartaoCredito, 'id'>) => void;
  updateCartao: (id: string, cartao: Partial<CartaoCredito>) => void;
  deleteCartao: (id: string) => void;

  // Contas
  addConta: (conta: Omit<Conta, 'id'>) => void;
  updateConta: (id: string, conta: Partial<Conta>) => void;
  deleteConta: (id: string) => void;

  // Bancos
  updateBanco: (id: string, saldo: number) => void;

  // Logins
  addLogin: (login: Omit<Login, 'id'>) => void;
  updateLogin: (id: string, login: Partial<Login>) => void;
  deleteLogin: (id: string) => void;

  // Inicializar dados
  initializeData: () => void;
}

// Dados iniciais mockados
const MOCK_RECEITAS: Receita[] = [
  {
    id: '1',
    descricao: 'Salário',
    valor: 5000,
    data: '2025-08-01',
    categoria: 'Salário',
    banco: 'Itaú',
    status: 'recebido',
    tipo: 'receita',
  },
  {
    id: '2',
    descricao: 'Comissão - Apto 302 Condomínio Central',
    valor: 8500,
    data: '2025-08-10',
    categoria: 'Comissão',
    banco: 'Nubank',
    cliente: 'João Silva',
    status: 'recebido',
    tipo: 'comissao',
  },
  {
    id: '3',
    descricao: 'Freelance - Consultoria',
    valor: 2000,
    data: '2025-08-15',
    categoria: 'Freelance',
    banco: 'Itaú',
    status: 'pendente',
    tipo: 'receita',
  },
];

const MOCK_COMISSOES: Comissao[] = [
  {
    id: '1',
    empreendimento: 'Condomínio Central',
    cliente: 'Maria Santos',
    valorVenda: 450000,
    comissaoPrevista: 13500,
    dataPrevista: '2025-09-15',
    dataRecebida: '2025-08-20',
    banco: 'Nubank',
    status: 'recebida',
  },
  {
    id: '2',
    empreendimento: 'Residencial Park',
    cliente: 'Pedro Costa',
    valorVenda: 380000,
    comissaoPrevista: 11400,
    dataPrevista: '2025-09-30',
    banco: 'Itaú',
    status: 'aguardando',
  },
];

const MOCK_DESPESAS: Despesa[] = [
  {
    id: '1',
    descricao: 'Aluguel',
    valor: 1500,
    data: '2025-08-01',
    categoria: 'Casa',
    banco: 'Itaú',
    formaPagamento: 'Débito',
    status: 'pago',
  },
  {
    id: '2',
    descricao: 'Supermercado',
    valor: 450,
    data: '2025-08-12',
    categoria: 'Alimentação',
    banco: 'Nubank',
    formaPagamento: 'Débito',
    status: 'pago',
  },
];

const MOCK_BANCOS: Banco[] = [
  { id: '1', nome: 'Itaú', saldo: 8500 },
  { id: '2', nome: 'Nubank', saldo: 12000 },
  { id: '3', nome: 'Banco do Brasil', saldo: 3200 },
];

// Store de Autenticação
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  initAuth: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crm-user');
      if (stored) {
        set({ user: JSON.parse(stored), isAuthenticated: true });
      }
    }
  },

  login: (email: string, senha: string) => {
    if (email && senha.length >= 6) {
      const user = { email, nome: email.split('@')[0] };
      localStorage.setItem('crm-user', JSON.stringify(user));
      set({ user, isAuthenticated: true });
    }
  },

  signup: (email: string, nome: string, senha: string) => {
    if (email && nome && senha.length >= 6) {
      const user = { email, nome };
      localStorage.setItem('crm-user', JSON.stringify(user));
      set({ user, isAuthenticated: true });
    }
  },

  logout: () => {
    localStorage.removeItem('crm-user');
    set({ user: null, isAuthenticated: false });
  },
}));

// Store Financeiro
export const useFinancialStore = create<FinancialState>((set) => ({
  receitas: MOCK_RECEITAS,
  comissoes: MOCK_COMISSOES,
  despesas: MOCK_DESPESAS,
  metas: [
    { id: '1', nome: 'Comprar carro', valorDesejado: 50000, valorAtual: 15000, dataAlvo: '2026-12-31' },
    { id: '2', nome: 'Comprar imóvel', valorDesejado: 150000, valorAtual: 45000, dataAlvo: '2027-12-31' },
  ],
  cartoesCredito: [
    {
      id: '1',
      nome: 'Itaú Black',
      banco: 'Itaú',
      limite: 10000,
      saldoUsado: 3500,
      dataFechamento: 10,
      dataVencimento: 20,
    },
  ],
  contas: [],
  bancos: MOCK_BANCOS,
  logins: [],

  addReceita: (receita) =>
    set((state) => ({
      receitas: [...state.receitas, { ...receita, id: Date.now().toString() }],
    })),

  updateReceita: (id, receita) =>
    set((state) => ({
      receitas: state.receitas.map((r) => (r.id === id ? { ...r, ...receita } : r)),
    })),

  deleteReceita: (id) =>
    set((state) => ({
      receitas: state.receitas.filter((r) => r.id !== id),
    })),

  addComissao: (comissao) =>
    set((state) => ({
      comissoes: [...state.comissoes, { ...comissao, id: Date.now().toString() }],
    })),

  updateComissao: (id, comissao) =>
    set((state) => ({
      comissoes: state.comissoes.map((c) => (c.id === id ? { ...c, ...comissao } : c)),
    })),

  deleteComissao: (id) =>
    set((state) => ({
      comissoes: state.comissoes.filter((c) => c.id !== id),
    })),

  addDespesa: (despesa) =>
    set((state) => ({
      despesas: [...state.despesas, { ...despesa, id: Date.now().toString() }],
    })),

  updateDespesa: (id, despesa) =>
    set((state) => ({
      despesas: state.despesas.map((d) => (d.id === id ? { ...d, ...despesa } : d)),
    })),

  deleteDespesa: (id) =>
    set((state) => ({
      despesas: state.despesas.filter((d) => d.id !== id),
    })),

  addMeta: (meta) =>
    set((state) => ({
      metas: [...state.metas, { ...meta, id: Date.now().toString() }],
    })),

  updateMeta: (id, meta) =>
    set((state) => ({
      metas: state.metas.map((m) => (m.id === id ? { ...m, ...meta } : m)),
    })),

  deleteMeta: (id) =>
    set((state) => ({
      metas: state.metas.filter((m) => m.id !== id),
    })),

  addCartao: (cartao) =>
    set((state) => ({
      cartoesCredito: [...state.cartoesCredito, { ...cartao, id: Date.now().toString() }],
    })),

  updateCartao: (id, cartao) =>
    set((state) => ({
      cartoesCredito: state.cartoesCredito.map((c) => (c.id === id ? { ...c, ...cartao } : c)),
    })),

  deleteCartao: (id) =>
    set((state) => ({
      cartoesCredito: state.cartoesCredito.filter((c) => c.id !== id),
    })),

  addConta: (conta) =>
    set((state) => ({
      contas: [...state.contas, { ...conta, id: Date.now().toString() }],
    })),

  updateConta: (id, conta) =>
    set((state) => ({
      contas: state.contas.map((c) => (c.id === id ? { ...c, ...conta } : c)),
    })),

  deleteConta: (id) =>
    set((state) => ({
      contas: state.contas.filter((c) => c.id !== id),
    })),

  updateBanco: (id, saldo) =>
    set((state) => ({
      bancos: state.bancos.map((b) => (b.id === id ? { ...b, saldo } : b)),
    })),

  addLogin: (login) =>
    set((state) => ({
      logins: [...state.logins, { ...login, id: Date.now().toString() }],
    })),

  updateLogin: (id, login) =>
    set((state) => ({
      logins: state.logins.map((l) => (l.id === id ? { ...l, ...login } : l)),
    })),

  deleteLogin: (id) =>
    set((state) => ({
      logins: state.logins.filter((l) => l.id !== id),
    })),

  initializeData: () => {
    // Carrega dados do localStorage se existirem
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('crm-financial');
      if (stored) {
        const data = JSON.parse(stored);
        set(data);
      }
    }
  },
}));

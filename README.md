# 💰 CRM Financeiro - Seu Dinheiro Sob Controle

Uma aplicação web moderna para gestão financeira pessoal, inspirada em sistemas SaaS premium. Ajude você e seus clientes a controlar receitas, despesas, metas e tomar decisões financeiras inteligentes.

## 🎯 Funcionalidades

- **Dashboard Inteligente** - Visualização completa de saldos, receitas e despesas
- **Gestão de Receitas** - Registre ganhos de várias fontes (salário, freelance, bônus, etc)
- **Gestão de Despesas** - Controle gastos por categoria com facilidade
- **Contas a Pagar/Receber** - Nunca mais perca um vencimento importante
- **Metas Financeiras** - Estabeleça objetivos e acompanhe o progresso
- **Cartões de Crédito** - Controle limites e parcelas
- **Bancos e Contas** - Visualize saldos de todas as suas contas
- **Logins e Senhas** - Gerencie acessos com segurança
- **Relatórios Avançados** - Análise comparativa mensal/anual
- **Autenticação Segura** - Supabase Auth com criptografia

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS 3 + Lucide Icons
- **Backend**: Supabase (Database + Auth)
- **Charts**: Recharts
- **State**: Zustand
- **Deployment**: Vercel

## 📦 Requisitos

- Node.js 18+ 
- npm ou yarn
- Conta Supabase (free tier disponível)

## 🚀 Instalação

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/crm-financeiro.git
cd crm-financeiro
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
```bash
cp .env.local.example .env.local
```

Edite `.env.local` com suas credenciais do Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

### 4. Executar em desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📱 Funcionalidades Principais

### Dashboard
- Saldo atual com visualização em tempo real
- Cards de receitas, despesas e economia
- Alertas para contas vencidas
- Gráficos de receitas vs despesas
- Visualização de gastos por categoria

### Receitas
- Registrar novos ganhos
- Categorizar (Salário, Freelance, Bônus, Investimentos)
- Atribuir a bancos específicos
- Status (Recebido, Pendente, Atrasado)
- Relatórios por categoria e cliente

### Despesas
- Registrar gastos com descrição
- Categorizar (Casa, Alimentação, Transporte, etc)
- Formas de pagamento (Dinheiro, Débito, Crédito, Pix)
- Rastreamento de status
- Exportar para Excel/PDF

### Metas
- Definir objetivos financeiros
- Acompanhar progresso com barras visuais
- Calcular quanto falta automaticamente
- Prever data de conclusão

### Relatórios
- Análise de receitas x despesas
- Comparativo mensal/anual
- Identificar melhor e pior mês
- Gráficos interativos
- Exportar em PDF

## 🔐 Segurança

- Autenticação com Supabase Auth
- Senhas criptografadas
- Suporte a autenticação em 2 fatores (próximas versões)
- Dados protegidos em repouso

## 📊 Schema do Banco de Dados

### Tabelas Principais
- `users` - Usuários autenticados
- `receitas` - Registro de ganhos
- `despesas` - Registro de gastos
- `contas` - Gerenciamento de bancos/contas
- `metas` - Objetivos financeiros
- `cartoes` - Cartões de crédito
- `logins` - Senhas salvas (criptografadas)

## 🌐 Deploy no Vercel

### 1. Conectar repositório GitHub
```
1. Faça push do código para GitHub
2. Acesse vercel.com e conecte seu repositório
3. Configure as variáveis de ambiente
```

### 2. Deploy automático
- Toda vez que você fazer push para `main`, o Vercel deploy automaticamente
- URLs de preview para cada PR

## 📚 Como Usar

### Para Iniciantes
1. Cadastre-se com seu email
2. Complete o perfil
3. Adicione seus bancos
4. Comece registrando suas receitas do mês
5. Registre suas despesas dia a dia
6. Visualize o dashboard para ver o resumo

### Dicas
- Use categorias consistentes para melhores relatórios
- Defina metas realistas e acompanhe progresso
- Revise seus gastos semanalmente
- Configure alertas para contas vencidas

## 🐛 Troubleshooting

**Erro de conexão com Supabase:**
- Verifique as chaves em `.env.local`
- Confirm que o projeto Supabase está ativo

**Página em branco:**
- Verifique console do navegador (F12)
- Execute `npm run build` para testar build

**Autenticação não funciona:**
- Verifique se o email de confirmação foi enviado
- Confirme o endereço de email no Supabase

## 📞 Suporte

- GitHub Issues: [Abra uma issue](https://github.com/seu-usuario/crm-financeiro/issues)
- Email: support@crm-financeiro.com
- WhatsApp: [seu número]

## 📄 Licença

MIT License - veja LICENSE.md

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🎉 Status

- [x] Dashboard funcional
- [x] Receitas e Despesas
- [x] Contas a Pagar/Receber
- [x] Metas Financeiras
- [x] Relatórios básicos
- [ ] Mobile app (React Native)
- [ ] Integrações com bancos
- [ ] AI para recomendações
- [ ] Modo escuro completo

---

Desenvolvido com ❤️ por [Seu Nome]

**Sua vida financeira organizada. De verdade.** 🚀
# Deploy trigger

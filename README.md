# NEXORA STORE

Loja virtual demonstrativa em React + Vite, preparada para publicação na Vercel.

## O que funciona nesta versão
- Layout responsivo para celular e computador.
- Catálogo de demonstração, busca e filtros por categoria.
- Detalhes de produto.
- Carrinho com quantidades e persistência local no navegador.
- Fluxo demonstrativo de checkout.

## O que ainda NÃO está conectado
- Banco de dados, painel administrativo e estoque real.
- Cadastro/login de clientes.
- Pagamentos reais (Pix/cartão), antifraude ou emissão de pedidos.
- Cálculo de frete, etiquetas e rastreamento.
- Formulário de newsletter conectado a um serviço de e-mail.

Os produtos, preços e imagens ilustrativas (emojis) são exemplos. Atualize-os antes de vender.

## Rodar localmente
Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

## Publicar gratuitamente na Vercel
1. Crie uma conta em https://vercel.com/ (ou entre na sua conta).
2. Crie um repositório no GitHub e envie o conteúdo desta pasta para ele.
3. Na Vercel, escolha **Add New → Project** e importe o repositório.
4. A Vercel normalmente detecta Vite automaticamente. Confira:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Clique em **Deploy**. A Vercel fará a publicação e mostrará um endereço `*.vercel.app`.

Não é necessário informar cartão para começar no plano gratuito. A publicação exige que você autorize o acesso da Vercel ao repositório do GitHub.

## Atualizar a loja
Edite os produtos no array `products` em `src/main.jsx`. Depois envie as alterações ao GitHub; a Vercel pode publicar uma nova versão automaticamente.

## Próxima etapa recomendada
Antes de aceitar pedidos reais, integrar backend seguro (por exemplo Supabase), autenticação, gestão de estoque e um provedor de pagamentos (por exemplo Mercado Pago), sempre usando credenciais privadas apenas no servidor.

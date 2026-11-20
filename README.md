# Hero Bay (versão de referência)
Projeto PI - Senac | Tema: Informática

E-commerce em Angular com API simulada em json-server, seguindo o padrão das aulas
(model, services, HttpClient, rotas, formulário de cadastro reaproveitado para alteração).

## Como rodar (dois terminais)

1. API (porta 3000):
   cd api
   npm install
   npm start

2. Site (porta 4200):
   cd frontend
   npm install
   npm start

Obs.: o json-server está fixado na versão 0.17.x (ids numéricos). Não troque por
outra versão, senão os ids passam a ser texto e o código precisa mudar.

## Usuários de teste (estão no api/db.json)
- Administrador: admin@email.com / 123  (entra direto no painel de produtos)
- Cliente:       ana@email.com   / 123

## Onde está cada exigência da entrega final

| Exigência | Onde |
|---|---|
| Tela inicial consultando produtos da API | pages/home + services/produto.service.ts |
| Cadastro de clientes salvando na API | pages/cliente-form (rota /registrar) + services/cliente.service.ts |
| Login consultando a API | pages/login + services/cliente.service.ts |
| CRUD de produtos pelo admin gravando na API | pages/admin/admin-produtos (lista) + pages/produto-form (cadastro/edição) |
| CRUD de clientes pelo admin | pages/admin/admin-clientes + pages/cliente-form (rota /admin-clientes-editar/:id) |
| Finalização de venda salvando na API | pages/carrinho + services/pedido.service.ts (coleção "pedidos") |
| Carrinho (adicionar, remover, total) | services/carrinho.service.ts |

## Estrutura
src/app/
  model/      interfaces (produto, cliente, pedido, item-carrinho)
  services/   acesso à API (produto, cliente, pedido) + carrinho
  pages/      home, login, carrinho, sobre, contato, cliente-form, produto-form, admin/*
  components/ menu, footer

## Padrões reaproveitados do projeto Space Code (PW1)
- Laços `for (let i = 0; i < lista.length; i++)` com índice e `splice`
- Sessão no navegador com `usuarioLogado` e `tipoUsuario` (localStorage)
- Validações do cadastro (nome, e-mail com `indexOf`/`lastIndexOf`, senha mínima de 4)
- Mensagens `alert`/`confirm` e bloqueio de área restrita ("Acesso restrito ao administrador.")
- Cálculo de totais com acumulador dentro de um `for`

## Publicação no GitHub Pages
1. Suba esta pasta inteira para um repositório no GitHub (branch `main`).
2. Em Settings > Pages > Source, escolha **GitHub Actions**. O arquivo `.github/workflows/deploy.yml` compila e publica sozinho.
3. O Pages só hospeda arquivos estáticos: o `json-server` (pasta `api`) precisa ser publicado em outro serviço, com HTTPS.
4. Depois de publicar a API, troque o endereço em `frontend/src/app/api.ts` (única linha que muda).

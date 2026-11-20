import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ClienteFormComponent } from './pages/cliente-form/cliente-form.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { AdminProdutosComponent } from './pages/admin/admin-produtos/admin-produtos.component';
import { AdminClientesComponent } from './pages/admin/admin-clientes/admin-clientes.component';
import { ProdutoFormComponent } from './pages/produto-form/produto-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Hero Bay' },
  { path: 'login', component: LoginComponent, title: 'Entrar | Hero Bay' },
  { path: 'registrar', component: ClienteFormComponent, title: 'Criar conta | Hero Bay' },
  { path: 'carrinho', component: CarrinhoComponent, title: 'Carrinho | Hero Bay' },
  { path: 'contato', component: ContatoComponent, title: 'Contato | Hero Bay' },
  { path: 'sobre', component: SobreComponent, title: 'Sobre | Hero Bay' },
  { path: 'admin-produtos-listar', component: AdminProdutosComponent, title: 'Produtos | Hero Bay' },
  { path: 'produto-cadastro', component: ProdutoFormComponent, title: 'Novo produto | Hero Bay' },
  { path: 'admin-produtos-editar/:id', component: ProdutoFormComponent, title: 'Editar produto | Hero Bay' },
  { path: 'admin-clientes-listar', component: AdminClientesComponent, title: 'Clientes | Hero Bay' },
  { path: 'admin-clientes-editar/:id', component: ClienteFormComponent, title: 'Editar cliente | Hero Bay' }
];

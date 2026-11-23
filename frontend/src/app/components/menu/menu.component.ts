import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  carrinho = inject(CarrinhoService);

  itensMenu = [
    { label: 'Início', link: '/' },
    { label: 'Sobre', link: '/sobre' },
    { label: 'Contato', link: '/contato' }
  ];

  // Menu que só o administrador enxerga
  itensAdmin = [
    { label: 'Produtos', link: '/admin-produtos-listar' },
    { label: 'Clientes', link: '/admin-clientes-listar' }
  ];

  nomeUsuario(): string {
    return this.clienteService.nomeLogado();
  }

  ehAdmin(): boolean {
    return this.clienteService.ehAdmin();
  }

  sair() {
    this.clienteService.sair();
    this.router.navigate(['/']);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  itensMenu = [
    { label: 'Início', link: '/' },
    { label: 'Sobre', link: '/sobre' },
    { label: 'Contato', link: '/contato' }
  ];

  constructor(private router: Router, private carrinhoService: CarrinhoService) {}

  usuarioLogado() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      return usuario;
    }
    return '';
  }

  itensNoCarrinho() {
    return this.carrinhoService.carrinho.contarItens();
  }

  sair() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioId');
    this.carrinhoService.carregar();
    this.router.navigate(['/']);
  }
}

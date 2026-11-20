import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../../../model/produto';
import { ProdutoService } from '../../../services/produto.service';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-admin-produtos',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './admin-produtos.component.html',
  styleUrl: './admin-produtos.component.css'
})
export class AdminProdutosComponent implements OnInit {
  private service = inject(ProdutoService);
  private clienteService = inject(ClienteService);

  listaProdutos: Produto[] = [];

  ngOnInit(): void {
    // Só o administrador pode ver esta tela
    if (!this.clienteService.exigirAdmin()) {
      return;
    }
    this.carregar();
  }

  // Busca os produtos na API e guarda na lista da tela
  carregar() {
    this.service.listar().subscribe({
      next: (produtos) => {
        this.listaProdutos = produtos;
      }
    });
  }

  excluir(produto: Produto) {
    if (produto.id !== undefined && confirm('Deseja excluir este item?')) {
      this.service.excluir(produto.id).subscribe({
        next: () => {
          this.carregar();
        }
      });
    }
  }
}

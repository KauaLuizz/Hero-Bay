import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../../../model/produto';
import { ProdutoService } from '../../../services/produto.service';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-admin-produtos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './admin-produtos.component.html',
  styleUrl: './admin-produtos.component.css'
})
export class AdminProdutosComponent implements OnInit {
  private service = inject(ProdutoService);
  private clienteService = inject(ClienteService);

  listaProdutos: Produto[] = [];

  ngOnInit(): void {
  
    if (!this.clienteService.exigirAdmin()) {
      return;
    }
    this.carregar();
  }


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

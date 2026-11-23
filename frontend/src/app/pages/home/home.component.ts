import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Produto } from '../../models/produto';
import { Carrinho } from '../../models/carrinho';
import { ProdutoService } from '../../services/produto.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private service = inject(ProdutoService);
  private carrinhoService = inject(CarrinhoService);
  private router = inject(Router);

  heroBayOne: Produto = new Produto(100, 'Hero Bay One', 8999, 'pc', 'Vem com placa de vídeo GeForce RTX, 32 GB de memória, SSD de 2 TB e watercooler de 360 mm.', 'images/produtos/hero-bay-one.jpg', 20);

  categorias = ['todos', 'placas de vídeo', 'teclados', 'mouses', 'áudio', 'refrigeração'];
  categoriaSelecionada: string = 'todos';

  produtos: Produto[] = [];

  carrinho: Carrinho = this.carrinhoService.carrinho;

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      }
    });
  }

  escolherCategoria(categoria: string) {
    this.categoriaSelecionada = categoria;
  }

  adicionar(produto: Produto) {
    if (!localStorage.getItem('usuarioId')) {
      this.router.navigate(['/login']);
      return;
    }

    this.carrinho.adicionar(produto);
    this.carrinhoService.salvar();
  }

  quantidadeNoCarrinho(produto: Produto) {
    for (let item of this.carrinho.itens) {
      if (item.produto.id === produto.id) {
        return item.quantidade;
      }
    }
    return 0;
  }
}

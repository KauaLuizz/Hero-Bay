import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../../services/produto.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private service = inject(ProdutoService);
  carrinho = inject(CarrinhoService);

  produtos: Produto[] = [];
  heroBayOne: Produto | undefined;

  categorias = ['todos', 'placas de vídeo', 'teclados', 'mouses', 'áudio', 'refrigeração'];
  categoriaSelecionada: string = 'todos';

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (produtos) => {
        this.produtos = produtos;

        // O PC montado (categoria 'pc') vira o destaque da página
        for (let i = 0; i < produtos.length; i++) {
          if (produtos[i].categoria === 'pc' && !this.heroBayOne) {
            this.heroBayOne = produtos[i];
          }
        }
      }
    });
  }

  escolherCategoria(categoria: string) {
    this.categoriaSelecionada = categoria;
  }
}

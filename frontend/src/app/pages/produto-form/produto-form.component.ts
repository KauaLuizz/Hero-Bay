import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.css'
})
export class ProdutoFormComponent implements OnInit {
  produto: Produto = {} as Produto;
  private service = inject(ProdutoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  produtoId: string | null = this.route.snapshot.paramMap.get('id');

  ngOnInit() {
    if (this.produtoId) {
      this.service.buscarPorId(this.produtoId).subscribe({
        next: (produto) => this.produto = produto,
        error: () => alert('Produto não encontrado.')
      });
    }
  }

  salvar() {
    if (!this.produto.nome || !this.produto.categoria || !this.produto.descricao || !this.produto.imagem) {
      alert('Preencha todos os campos.');
      return;
    }

    if (!this.produto.preco || this.produto.preco <= 0) {
      alert('Informe um preço maior que zero.');
      return;
    }

    if (this.produto.estoque === undefined || this.produto.estoque === null || this.produto.estoque < 0) {
      alert('Informe um estoque de zero ou mais.');
      return;
    }

    if (this.produtoId) {
      this.service.editar(this.produto).subscribe({
        next: (produto) => {
          this.produto = produto;
          this.router.navigate(['/admin']);
        },
        error: () => alert('Erro ao alterar o produto.')
      });
    } else {
      this.service.incluir(this.produto).subscribe({
        next: (produto) => {
          this.produto = produto;
          alert(`Produto ${this.produto.nome} cadastrado com sucesso!`);
          this.router.navigate(['/admin']);
        }
      });
    }
  }
}

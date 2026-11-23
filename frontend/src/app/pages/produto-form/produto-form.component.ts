import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../../services/produto.service';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, RouterLink],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.css'
})
export class ProdutoFormComponent implements OnInit {
  private service = inject(ProdutoService);
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  categorias = ['placas de vídeo', 'teclados', 'mouses', 'áudio', 'refrigeração', 'pc'];

  // Fotos que já existem na pasta public/images/produtos
  imagens = [
    'cooler.jpg', 'gpu.jpg', 'headphone.jpg', 'headphone-bege.jpg', 'headphone-estudio.jpg',
    'hero-bay-one.jpg', 'mouse.jpg', 'teclado.jpg', 'watercooler.jpg', 'watercooler-360.jpg'
  ];

  // Objeto que guarda os dados do formulário
  produto: Produto = {
    nome: '',
    preco: 0,
    categoria: 'teclados',
    descricao: '',
    imagem: 'images/produtos/teclado.jpg',
    estoque: 0
  };
  mensagemErro: string = '';

  // Se a rota tiver um id, estamos alterando um produto que já existe
  produtoId: string | null = this.route.snapshot.paramMap.get('id');

  ngOnInit() {
    // Só o administrador pode mexer nos produtos
    if (!this.clienteService.exigirAdmin()) {
      return;
    }

    if (this.produtoId) {
      this.service.buscarPorId(Number(this.produtoId)).subscribe({
        next: (produto) => this.produto = produto
      });
    }
  }

  salvar() {
    this.produto.nome = this.produto.nome.trim();
    this.produto.preco = Number(this.produto.preco);
    this.produto.estoque = Number(this.produto.estoque);

    if (this.produto.nome === '') {
      this.mensagemErro = 'Informe o nome do produto.';
      return;
    }

    if (this.produto.preco <= 0) {
      this.mensagemErro = 'Informe um preço maior que zero.';
      return;
    }

    if (this.produto.estoque < 0) {
      this.mensagemErro = 'O estoque não pode ser negativo.';
      return;
    }

    if (this.produtoId) {
      this.service.editar(this.produto).subscribe({
        next: () => {
          this.router.navigate(['/admin-produtos-listar']);
        }
      });
    } else {
      this.service.incluir(this.produto).subscribe({
        next: (produto) => {
          alert(`Produto ${produto.nome} cadastrado com sucesso!`);
          this.router.navigate(['/admin-produtos-listar']);
        }
      });
    }
  }
}

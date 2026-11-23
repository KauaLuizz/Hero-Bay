import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto';
import { Usuario } from '../../models/usuario';
import { ProdutoService } from '../../services/produto.service';
import { UsuarioService } from '../../services/usuario.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  private produtoService = inject(ProdutoService);
  private usuarioService = inject(UsuarioService);
  private carrinhoService = inject(CarrinhoService);

  secaoAtiva: string = 'produtos';
  atividades: string[] = [];
  produtos: Produto[] = [];
  usuarios: Usuario[] = [];

  ngOnInit(): void {
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      }
    });

    this.usuarioService.listar().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios.filter(usuario => usuario.perfil === 'cliente');
      }
    });
  }

  mostrarSecao(secao: string) {
    this.secaoAtiva = secao;
  }

  registrarAtividade(texto: string) {
    this.atividades.push(`${new Date().toLocaleString('pt-BR')} - ${texto}`);
  }

  excluirProduto(produto: Produto) {
    if (confirm('Deseja realmente excluir o produto?')) {
      this.produtoService.excluir(produto.id).subscribe({
        next: () => {
          this.produtos = this.produtos.filter(atual => atual.id !== produto.id);
          this.registrarAtividade(`Produto excluído: ${produto.nome}`);
        }
      });
    }
  }

  excluirCliente(usuario: Usuario) {
    const id = usuario.id;
    if (id !== undefined && confirm('Deseja realmente excluir o cliente?')) {
      this.usuarioService.excluir(id).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(atual => atual.id !== id);
          this.registrarAtividade(`Cliente excluído: ${usuario.nome}`);
          this.carrinhoService.excluir(id).subscribe();
        }
      });
    }
  }
}

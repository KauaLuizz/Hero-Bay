import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Carrinho } from '../../models/carrinho';
import { UsuarioService } from '../../services/usuario.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit {
  usuario: Usuario = new Usuario('', '', '');
  private service = inject(UsuarioService);
  private carrinhoService = inject(CarrinhoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  clienteId: string | null = this.route.snapshot.paramMap.get('id');

  ngOnInit() {
    if (this.clienteId) {
      this.service.buscarPorId(this.clienteId).subscribe({
        next: (usuario) => this.usuario = usuario,
        error: () => alert('Cliente não encontrado.')
      });
    }
  }

  salvar() {
    if (this.usuario.nome.trim() === '' || this.usuario.email.trim() === '' || this.usuario.senha.trim() === '') {
      alert('Preencha nome, e-mail e senha.');
      return;
    }

    if (this.usuario.nome.toLowerCase() === 'admin') {
      alert('Esse nome não pode ser usado.');
      return;
    }

    if (this.clienteId) {
      this.service.editar(this.usuario).subscribe({
        next: (usuario) => {
          this.usuario = usuario;
          this.router.navigate(['/admin']);
        },
        error: () => alert('Erro ao alterar o cliente.')
      });
    } else {
      this.usuario.email = this.usuario.email.toLowerCase();

      this.service.listar().subscribe({
        next: (usuarios) => {
          for (let usuario of usuarios) {
            if (usuario.email === this.usuario.email) {
              alert('Este e-mail já está cadastrado.');
              return;
            }
          }

          this.incluirCliente();
        }
      });
    }
  }

  incluirCliente() {
    this.service.incluir(this.usuario).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.criarCarrinho();
      }
    });
  }

  criarCarrinho() {
    const carrinho = new Carrinho();
    carrinho.id = this.usuario.id;

    this.carrinhoService.incluir(carrinho).subscribe({
      next: () => {
        alert(`Cliente ${this.usuario.nome} cadastrado com sucesso!`);
        this.router.navigate(['/admin']);
      },
      error: () => alert('Erro ao cadastrar o cliente.')
    });
  }
}

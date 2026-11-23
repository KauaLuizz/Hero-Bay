import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Carrinho } from '../../models/carrinho';
import { UsuarioService } from '../../services/usuario.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  private router = inject(Router);
  private service = inject(UsuarioService);
  private carrinhoService = inject(CarrinhoService);

  nome: string = '';
  login: string = '';
  senha: string = '';
  botaoDesabilitado: boolean = true;
  mensagemErro: string = '';

  validarFormulario() {
    if (this.nome.trim() !== '' && this.login.trim() !== '' && this.senha.trim() !== '') {
      this.botaoDesabilitado = false;
    } else {
      this.botaoDesabilitado = true;
    }
  }

  fazerCadastro() {
    this.mensagemErro = '';
    const nome = this.nome.trim();
    const email = this.login.toLowerCase();

    if (nome.toLowerCase() === 'admin') {
      this.mensagemErro = 'Esse nome não pode ser usado.';
      return;
    }

    this.service.listar().subscribe({
      next: (usuarios) => {
        for (let usuario of usuarios) {
          if (usuario.email === email) {
            this.mensagemErro = 'Este e-mail já está cadastrado.';
            return;
          }
        }

        const novo = new Usuario(nome, email, this.senha);

        this.service.incluir(novo).subscribe({
          next: (usuarioCriado) => {
            const carrinho = new Carrinho();
            carrinho.id = usuarioCriado.id;

            this.carrinhoService.incluir(carrinho).subscribe({
              next: () => {
                localStorage.setItem('usuario', usuarioCriado.nome);
                localStorage.setItem('usuarioId', `${usuarioCriado.id}`);
                this.carrinhoService.carregar();
                this.router.navigate(['/']);
              },
              error: () => {
                this.mensagemErro = 'Não foi possível concluir o cadastro. Tente novamente.';
              }
            });
          },
          error: () => {
            this.mensagemErro = 'Não foi possível concluir o cadastro. Tente novamente.';
          }
        });
      },
      error: () => {
        this.mensagemErro = 'Não foi possível conectar à API. Verifique se ela está rodando.';
      }
    });
  }
}
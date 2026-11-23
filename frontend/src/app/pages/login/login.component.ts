import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);
  private service = inject(UsuarioService);
  private carrinhoService = inject(CarrinhoService);

  login: string = '';
  senha: string = '';
  botaoDesabilitado: boolean = true;
  mensagemErro: string = '';

  validarFormulario() {
    if (this.login.trim() !== '' && this.senha.trim() !== '') {
      this.botaoDesabilitado = false;
    } else {
      this.botaoDesabilitado = true;
    }
  }

  fazerLogin() {
    this.mensagemErro = '';

    this.service.listar().subscribe({
      next: (usuarios) => {
        for (let usuario of usuarios) {
          if (usuario.email === this.login.toLowerCase() && usuario.senha === this.senha) {
            localStorage.setItem('usuarioId', `${usuario.id}`);
            this.carrinhoService.carregar();

            if (usuario.perfil === 'admin') {
              localStorage.setItem('usuario', 'admin');
              this.router.navigate(['/admin']);
            } else {
              localStorage.setItem('usuario', usuario.nome);
              this.router.navigate(['/']);
            }
            return;
          }
        }

        this.mensagemErro = 'E-mail ou senha incorretos.';
      },
      error: () => {
        this.mensagemErro = 'Não foi possível conectar à API. Verifique se ela está rodando.';
      }
    });
  }
}
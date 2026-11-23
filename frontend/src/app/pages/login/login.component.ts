import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);
  private service = inject(UsuarioService);

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
        const usuario = usuarios.find(
          u => u.email === this.login && u.senha === this.senha
        );

        if (!usuario) {
          this.mensagemErro = 'E-mail ou senha incorretos.';
          return;
        }

        if (usuario.perfil === 'admin') {
          localStorage.setItem('usuario', 'admin');
          this.router.navigate(['/admin']);
        } else {
          localStorage.setItem('usuario', usuario.nome);
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.mensagemErro = 'Não foi possível conectar à API. Verifique se ela está rodando.';
      }
    });
  }
}
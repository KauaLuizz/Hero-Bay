import {ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);
  private service = inject(ClienteService);

  login: string = '';
  senha: string = '';
  botaoDesabilitado: boolean = true;
  mensagemErro: string = '';

  // Valido se os campos foram preenchidos para habilitar o botão de login
  validarFormulario() {
    if (this.login.trim() !== '' && this.senha.trim() !== '') {
      this.botaoDesabilitado = false;
    } else {
      this.botaoDesabilitado = true;
    }
  }

  // Busco os clientes na API e procuro um com o mesmo e-mail e senha
  fazerLogin() {
    this.service.listar().subscribe({
      next: (clientes) => {
        for (let i = 0; i < clientes.length; i++) {
          if (clientes[i].email === this.login && clientes[i].senha === this.senha) {
            this.service.entrar(clientes[i]);

            // Administrador vai para o painel, cliente volta para a loja
            if (clientes[i].perfil === 'admin') {
              this.router.navigate(['/admin-produtos-listar']);
            } else {
              this.router.navigate(['/']);
            }
            return;
          }
        }
        this.mensagemErro = 'E-mail ou senha incorretos!';
      }
    });
  }
}

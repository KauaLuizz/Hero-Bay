import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  private router = inject(Router);
  private service = inject(UsuarioService);

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

    if (nome.toLowerCase() === 'admin') {
      this.mensagemErro = 'Esse nome não pode ser usado.';
      return;
    }

    this.service.listar().subscribe({
      next: (usuarios) => {
        const emailExiste = usuarios.some(u => u.email === this.login);

        if (emailExiste) {
          this.mensagemErro = 'Este e-mail já está cadastrado.';
          return;
        }

        const novo = new Usuario(nome, this.login, this.senha);

        this.service.incluir(novo).subscribe({
          next: (usuarioCriado) => {
            localStorage.setItem('usuario', usuarioCriado.nome);
            this.router.navigate(['/']);
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
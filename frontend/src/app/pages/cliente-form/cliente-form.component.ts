import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cliente } from '../../model/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, RouterLink],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit {
  private service = inject(ClienteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

 
  cliente: Cliente = { nome: '', email: '', senha: '', perfil: 'cliente' };
  confirmarSenha: string = '';
  mensagemErro: string = '';

  listaClientes: Cliente[] = [];

  clienteId: string | null = this.route.snapshot.paramMap.get('id');

  ngOnInit() {
    if (this.clienteId) {
      if (!this.service.exigirAdmin()) {
        return;
      }

      this.service.buscarPorId(Number(this.clienteId)).subscribe({
        next: (cliente) => {
          this.cliente = cliente;
          this.confirmarSenha = cliente.senha;
        }
      });
    }

    this.service.listar().subscribe({
      next: (clientes) => {
        this.listaClientes = clientes;
      }
    });
  }

  salvar() {
    if (this.cliente.nome === '') {
      this.mensagemErro = 'Digite o seu nome!';
      return;
    }

    let arroba = this.cliente.email.indexOf('@');
    let ponto = this.cliente.email.lastIndexOf('.');
    if (arroba < 1 || ponto < arroba + 2 || ponto + 2 >= this.cliente.email.length) {
      this.mensagemErro = 'Digite um e-mail válido!';
      return;
    }

    if (this.cliente.senha.length < 4) {
      this.mensagemErro = 'A senha precisa ter pelo menos 4 caracteres!';
      return;
    }

    if (this.cliente.senha !== this.confirmarSenha) {
      this.mensagemErro = 'As senhas não são iguais!';
      return;
    }

    if (this.clienteId) {
      this.service.editar(this.cliente).subscribe({
        next: () => {
          this.router.navigate(['/admin-clientes-listar']);
        }
      });
    } else {
      this.incluir();
    }
  }

  incluir() {
   
    for (let i = 0; i < this.listaClientes.length; i++) {
      if (this.listaClientes[i].email === this.cliente.email) {
        this.mensagemErro = 'Este e-mail já está cadastrado!';
        return;
      }
    }

    this.service.incluir(this.cliente).subscribe({
      next: (novo) => {
        alert(`Cliente ${novo.nome} cadastrado com sucesso!`);
        if (this.service.ehAdmin()) {
          this.router.navigate(['/admin-clientes-listar']);
        } else {
          this.service.entrar(novo);
          this.router.navigate(['/']);
        }
      }
    });
  }
}

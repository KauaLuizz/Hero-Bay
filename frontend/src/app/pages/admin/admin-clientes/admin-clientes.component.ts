import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cliente } from '../../../model/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-admin-clientes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink],
  templateUrl: './admin-clientes.component.html',
  styleUrl: './admin-clientes.component.css'
})
export class AdminClientesComponent implements OnInit {
  private service = inject(ClienteService);

  listaClientes: Cliente[] = [];

  ngOnInit(): void {
   
    if (!this.service.exigirAdmin()) {
      return;
    }
    this.carregar();
  }

  
  carregar() {
    this.service.listar().subscribe({
      next: (clientes) => {
        this.listaClientes = clientes;
      }
    });
  }

  excluir(cliente: Cliente) {
    if (cliente.perfil === 'admin') {
      alert('O administrador não pode ser excluído.');
      return;
    }

    if (cliente.id !== undefined && confirm('Deseja excluir este item?')) {
      this.service.excluir(cliente.id).subscribe({
        next: () => {
          this.carregar();
        }
      });
    }
  }
}

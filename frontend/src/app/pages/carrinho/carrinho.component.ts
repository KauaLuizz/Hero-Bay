import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ItemCarrinho } from '../../model/item-carrinho';
import { Pedido } from '../../model/pedido';
import { CarrinhoService } from '../../services/carrinho.service';
import { ClienteService } from '../../services/cliente.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
  private router = inject(Router);
  private clienteService = inject(ClienteService);
  private pedidoService = inject(PedidoService);
  carrinho = inject(CarrinhoService);

  pedidoFinalizado: boolean = false;
  numeroPedido: number | undefined;
  itensPedido: ItemCarrinho[] = [];
  totalPedido: number = 0;

  finalizarCompra() {
    if (this.clienteService.nomeLogado() === '') {
      alert('Faça login para finalizar a compra.');
      this.router.navigate(['/login']);
      return;
    }

    const pedido: Pedido = {
      clienteId: this.clienteService.idLogado(),
      clienteNome: this.clienteService.nomeLogado(),
      data: new Date().toLocaleString('pt-BR'),
      itens: this.carrinho.itens,
      total: this.carrinho.calcularTotal()
    };

    this.pedidoService.incluir(pedido).subscribe({
      next: (salvo) => {
        this.numeroPedido = salvo.id;
        this.itensPedido = salvo.itens;
        this.totalPedido = salvo.total;
        this.carrinho.limpar();
        this.pedidoFinalizado = true;
      }
    });
  }
}

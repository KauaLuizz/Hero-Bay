import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Carrinho } from '../../models/carrinho';
import { ItemCarrinho } from '../../models/item-carrinho';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
  private carrinhoService = inject(CarrinhoService);

  carrinho: Carrinho = this.carrinhoService.carrinho;
  pedidoFinalizado: boolean = false;
  itensPedido: ItemCarrinho[] = [];
  totalPedido: number = 0;

  aumentar(item: ItemCarrinho) {
    this.carrinho.aumentar(item);
    this.carrinhoService.salvar();
  }

  diminuir(item: ItemCarrinho) {
    this.carrinho.diminuir(item);
    this.carrinhoService.salvar();
  }

  remover(item: ItemCarrinho) {
    this.carrinho.remover(item);
    this.carrinhoService.salvar();
  }

  finalizarCompra() {
    this.itensPedido = this.carrinho.itens;
    this.totalPedido = this.carrinho.calcularTotal();
    this.carrinho.limpar();
    this.carrinhoService.salvar();
    this.pedidoFinalizado = true;
  }
}

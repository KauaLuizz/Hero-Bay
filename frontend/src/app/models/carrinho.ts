import { ItemCarrinho } from './item-carrinho';
import { Produto } from './produto';

export class Carrinho {
  id?: number;
  itens: ItemCarrinho[] = [];

  adicionar(produto: Produto) {
    for (let item of this.itens) {
      if (item.produto.id === produto.id) {
        item.quantidade++;
        return;
      }
    }
    this.itens.push(new ItemCarrinho(produto, 1));
  }

  aumentar(item: ItemCarrinho) {
    item.quantidade++;
  }

  diminuir(item: ItemCarrinho) {
    item.quantidade--;
    if (item.quantidade === 0) {
      this.remover(item);
    }
  }

  remover(item: ItemCarrinho) {
    this.itens = this.itens.filter(atual => atual.produto.id !== item.produto.id);
  }

  limpar() {
    this.itens = [];
  }

  calcularSubtotal() {
    let subtotal = 0;
    for (let item of this.itens) {
      subtotal += item.produto.preco * item.quantidade;
    }
    return subtotal;
  }

  calcularFrete() {
    const subtotal = this.calcularSubtotal();
    if (subtotal === 0 || subtotal >= 299) {
      return 0;
    }
    return 29.9;
  }

  calcularTotal() {
    return this.calcularSubtotal() + this.calcularFrete();
  }

  contarItens() {
    let quantidade = 0;
    for (let item of this.itens) {
      quantidade += item.quantidade;
    }
    return quantidade;
  }
}

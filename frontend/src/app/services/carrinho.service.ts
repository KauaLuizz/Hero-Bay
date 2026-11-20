import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../model/item-carrinho';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  itens: ItemCarrinho[] = [];

  constructor() {
    const salvos = localStorage.getItem('carrinho');
    if (salvos) {
      this.itens = JSON.parse(salvos);
    }
  }

  salvar() {
    localStorage.setItem('carrinho', JSON.stringify(this.itens));
  }

  adicionar(produto: Produto) {
    // Se o produto já está no carrinho, só aumenta a quantidade
    for (let i = 0; i < this.itens.length; i++) {
      if (this.itens[i].produto.id === produto.id) {
        this.itens[i].quantidade++;
        this.salvar();
        return;
      }
    }
    this.itens.push({ produto: produto, quantidade: 1 });
    this.salvar();
  }

  aumentar(item: ItemCarrinho) {
    item.quantidade++;
    this.salvar();
  }

  diminuir(item: ItemCarrinho) {
    item.quantidade--;
    if (item.quantidade === 0) {
      this.remover(item);
    } else {
      this.salvar();
    }
  }

  remover(item: ItemCarrinho) {
    for (let i = 0; i < this.itens.length; i++) {
      if (this.itens[i].produto.id === item.produto.id) {
        this.itens.splice(i, 1);
      }
    }
    this.salvar();
  }

  limpar() {
    this.itens = [];
    this.salvar();
  }

  calcularSubtotal(): number {
    let subtotal = 0;
    for (let i = 0; i < this.itens.length; i++) {
      subtotal = subtotal + this.itens[i].produto.preco * this.itens[i].quantidade;
    }
    return subtotal;
  }

  // Frete grátis a partir de R$ 299
  calcularFrete(): number {
    const subtotal = this.calcularSubtotal();
    if (subtotal === 0 || subtotal >= 299) {
      return 0;
    }
    return 29.9;
  }

  calcularTotal(): number {
    return this.calcularSubtotal() + this.calcularFrete();
  }

  contarItens(): number {
    let quantidade = 0;
    for (let i = 0; i < this.itens.length; i++) {
      quantidade = quantidade + this.itens[i].quantidade;
    }
    return quantidade;
  }
}

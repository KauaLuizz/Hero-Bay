import { ItemCarrinho } from './item-carrinho';

export interface Pedido {
  id?: number;
  clienteId: number;
  clienteNome: string;
  data: string;
  itens: ItemCarrinho[];
  total: number;
}

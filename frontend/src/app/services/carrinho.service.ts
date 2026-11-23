import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrinho } from '../models/carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private readonly API = 'http://localhost:3000/carrinhos';

  carrinho: Carrinho = new Carrinho();

  constructor(private http: HttpClient) {
    this.carregar();
  }

  buscarPorId(id: string): Observable<Carrinho> {
    return this.http.get<Carrinho>(`${this.API}/${id}`);
  }

  incluir(carrinho: Carrinho): Observable<Carrinho> {
    return this.http.post<Carrinho>(this.API, carrinho);
  }

  editar(carrinho: Carrinho): Observable<Carrinho> {
    return this.http.put<Carrinho>(`${this.API}/${carrinho.id}`, carrinho);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  carregar() {
    this.carrinho.id = undefined;
    this.carrinho.itens = [];

    const usuarioId = localStorage.getItem('usuarioId');
    if (usuarioId) {
      this.buscarPorId(usuarioId).subscribe({
        next: (carrinho) => {
          if (this.ehDoUsuarioLogado(carrinho)) {
            this.carrinho.id = carrinho.id;
            this.carrinho.itens = carrinho.itens;
          }
        }
      });
    }
  }

  salvar() {
    if (this.ehDoUsuarioLogado(this.carrinho)) {
      this.editar(this.carrinho).subscribe();
    } else {
      alert('Não foi possível salvar o carrinho. Tente de novo.');
      this.carregar();
    }
  }

  ehDoUsuarioLogado(carrinho: Carrinho) {
    return `${carrinho.id}` === localStorage.getItem('usuarioId');
  }
}

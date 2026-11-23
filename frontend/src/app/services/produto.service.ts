import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly API = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }

  incluir(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  buscarPorId(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.API}/${id}`);
  }

  editar(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.API}/${produto.id}`, produto);
  }
}

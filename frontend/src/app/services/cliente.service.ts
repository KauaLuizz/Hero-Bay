import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly API = API_URL + '/clientes';

  constructor(private http: HttpClient, private router: Router) { }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }

  buscarPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API}/${id}`);
  }

  incluir(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente);
  }

  editar(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.API}/${cliente.id}`, cliente);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }


  entrar(cliente: Cliente) {
    localStorage.setItem('usuarioLogado', cliente.nome);
    localStorage.setItem('tipoUsuario', cliente.perfil);
    localStorage.setItem('usuarioId', String(cliente.id));
  }

  sair() {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('usuarioId');
  }

  nomeLogado(): string {
    const nome = localStorage.getItem('usuarioLogado');
    if (nome === null) {
      return '';
    }
    return nome;
  }

  idLogado(): number {
    return Number(localStorage.getItem('usuarioId'));
  }

  ehAdmin(): boolean {
    return localStorage.getItem('tipoUsuario') === 'admin';
  }

  // Usado nas telas do administrador: se não for admin, avisa e manda para o login
  exigirAdmin(): boolean {
    if (this.ehAdmin()) {
      return true;
    }
    alert('Acesso restrito ao administrador.');
    this.router.navigate(['/login']);
    return false;
  }
}

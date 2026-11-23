import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly API = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }

  incluir(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, usuario);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  buscarPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API}/${id}`);
  }

  editar(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API}/${usuario.id}`, usuario);
  }
}

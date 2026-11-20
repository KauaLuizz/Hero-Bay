export interface Cliente {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  perfil: string; // 'admin' ou 'cliente'
}

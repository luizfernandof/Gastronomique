import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../aula/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl: String = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  ativarUsuario(usuario: Usuario) {
    const url = `${this.baseUrl}/ativar/usuario/${usuario.id}`;
    return this.http.put<void>(url, usuario);
  }

  desativarUsuario(usuario: Usuario) {
    const url = `${this.baseUrl}/desativar/usuario/${usuario.id}`;
    return this.http.put<void>(url, usuario);
  }

  tornarUsuarioAdmin(usuario: Usuario) {
    const url = `${this.baseUrl}/tornar/administrador/${usuario.id}`;
    return this.http.put<void>(url, usuario);
  }

  retirarPermissaoUsuarioAdmin(usuario: Usuario) {
    const url = `${this.baseUrl}/retirar/administrador/${usuario.id}`;
    return this.http.put<void>(url, usuario);
  }

  aprovarAula(idAula: String): Observable<void> {
    const url = `${this.baseUrl}/aula/aprovar/${idAula}`;
    return this.http.put<void>(url, idAula);
  }

  devolverAula(idAula: String): Observable<void> {
    const url = `${this.baseUrl}/aula/devolver/${idAula}`;
    return this.http.put<void>(url, idAula);
  }

  resetarSenha(userId: String): Observable<void> {
    const url = `${this.baseUrl}/resetar/senha/${userId}`;
    return this.http.put<void>(url, userId);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}

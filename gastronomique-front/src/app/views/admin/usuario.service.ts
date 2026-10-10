import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../aula/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: String = `${environment.apiUrl}/admin/listar/usuarios`;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  buscarTodosUsuarios() {
    const url = `${this.baseUrl}`;
    return this.http.get<Usuario[]>(url);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}

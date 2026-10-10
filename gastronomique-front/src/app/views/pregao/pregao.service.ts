import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Aula } from '../aula/aula.model';
import { Pregao } from './pregao.model';

@Injectable({
  providedIn: 'root'
})
export class PregaoService {

  baseUrl: String = `${environment.apiUrl}/pregoes`;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  buscarTodosPregoes(): Observable<Pregao[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Pregao[]>(url);
  }

  // buscarAulasPorUsuario(idUsuario: String): Observable<Aula[]> {
  //   const url = `${this.baseUrl}/usuario/${idUsuario}`;
  //   return this.http.get<Aula[]>(url);
  // }

  buscarPregaoPorId(id: String): Observable<Pregao> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Pregao>(url);
  }

  inserirPregao(pregao: Pregao): Observable<Pregao> {
    const url = `${this.baseUrl}`;
    return this.http.post<Pregao>(url, pregao);
  }

  editarPregao(pregao: Pregao): Observable<void> {
    const url = `${this.baseUrl}/${pregao.id}`;
    return this.http.put<void>(url, pregao);
  }

  excluirPregao(id: String): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000
    })
  }

}

import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Aula } from './aula.model';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  baseUrl: String = `${environment.apiUrl}/aulas`;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  buscarTodasAulas(): Observable<Aula[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Aula[]>(url);
  }

  buscarTodasAulasEmRevisao(): Observable<Aula[]> {
    const url = `${this.baseUrl}/revisao`;
    return this.http.get<Aula[]>(url);
  }

  buscarAulasPorUsuario(idUsuario: String): Observable<Aula[]> {
    const url = `${this.baseUrl}/usuario/${idUsuario}`;
    return this.http.get<Aula[]>(url);
  }

  buscarAulasPorPeriodo(dataInicial: String, dataFinal: String): Observable<Aula[]> {
    const url = `${this.baseUrl}/${dataInicial}/${dataFinal}`;
    return this.http.get<Aula[]>(url);
  }

  buscarAulaPorId(id: String): Observable<Aula> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Aula>(url);
  }

  inserirAula(aula: Aula): Observable<Aula> {
    const url = `${this.baseUrl}`;
    return this.http.post<Aula>(url, aula);
  }

  editarAula(aula: Aula): Observable<void> {
    const url = `${this.baseUrl}/${aula.id}`;
    return this.http.put<void>(url, aula);
  }

  enviarAula(idAula: String): Observable<void> {
    const url = `${this.baseUrl}/enviar/${idAula}`;
    return this.http.put<void>(url, idAula);
  }

  excluirAula(id: String): Observable<void> {
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

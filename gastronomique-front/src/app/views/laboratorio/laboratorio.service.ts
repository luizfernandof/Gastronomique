import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Laboratorio } from './laboratorio.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  baseUrl: String = `${environment.apiUrl}/laboratorios`;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  buscarTodosLaboratorios(): Observable<Laboratorio[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Laboratorio[]>(url);
  }

  buscarLaboratorioPorId(id: String): Observable<Laboratorio> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Laboratorio>(url);
  }

  inserirLaboratorio(laboratorio: Laboratorio): Observable<Laboratorio> {
    const url = `${this.baseUrl}`;
    return this.http.post<Laboratorio>(url, laboratorio);
  }

  editarLaboratorio(laboratorio: Laboratorio): Observable<void> {
    const url = `${this.baseUrl}/${laboratorio.id}`;
    return this.http.put<void>(url, laboratorio);
  }

  excluirLaboratorio(id: String): Observable<void> {
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

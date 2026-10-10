import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Insumo } from './insumo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pageable } from './pageable.interface';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {

  baseUrl: String = `${environment.apiUrl}/insumos`;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  buscarTodosInsumos(): Observable<Insumo[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Insumo[]>(url);
  }

  buscarTodosInsumosPageable(page: number, size: number): Observable<Pageable> {
    const url = `${this.baseUrl}/pageable?page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }

  buscarInsumosPorPregao(idPregao: String): Observable<Insumo[]> {
    const url = `${this.baseUrl}/pregao/${idPregao}`;
    return this.http.get<Insumo[]>(url);
  }

  buscarInsumosPorTipo(tipo: String): Observable<Insumo[]> {
    const url = `${this.baseUrl}/tipo/${tipo}`;
    return this.http.get<Insumo[]>(url);
  }

  buscarInsumoPorId(id: String): Observable<Insumo> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Insumo>(url);
  }

  inserirInsumo(insumo: Insumo): Observable<Insumo> {
    const url = `${this.baseUrl}`;
    return this.http.post<Insumo>(url, insumo);
  }

  editarInsumo(insumo: Insumo): Observable<void> {
    const url = `${this.baseUrl}/${insumo.id}`;
    return this.http.put<void>(url, insumo);
  }

  excluirInsumo(id: String): Observable<void> {
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

import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Curso } from './curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  baseUrl: String = `${environment.apiUrl}/cursos`;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  buscarTodosCursos(): Observable<Curso[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Curso[]>(url);
  }

  buscarCursoPorId(id: String): Observable<Curso> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Curso>(url);
  }

  inserirCurso(curso: Curso): Observable<Curso> {
    const url = `${this.baseUrl}`;
    return this.http.post<Curso>(url, curso);
  }

  editarCurso(curso: Curso): Observable<void> {
    const url = `${this.baseUrl}/${curso.id}`;
    return this.http.put<void>(url, curso);
  }

  excluirCurso(id: String): Observable<void> {
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

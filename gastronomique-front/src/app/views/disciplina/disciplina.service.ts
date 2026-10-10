import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Disciplina } from './disciplina.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  baseUrl: String = `${environment.apiUrl}/disciplinas`;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  buscarTodasDisciplinas() {
    const url = `${this.baseUrl}`;
    return this.http.get<Disciplina[]>(url);
  }

  buscarTodosCursosPorCursoId(id: string): Observable<Disciplina[]> {
    const url = `${this.baseUrl}/curso/${id}`;
    return this.http.get<Disciplina[]>(url);
  }

  buscarDisciplinaPorId(id: String): Observable<Disciplina> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Disciplina>(url);
  }

  inserirDisciplina(disciplina: Disciplina, cursoId: string): Observable<Disciplina> {
    const url = `${this.baseUrl}/curso/${cursoId}`;
    return this.http.post<Disciplina>(url, disciplina);
  }

  editarDisciplina(disciplina: Disciplina): Observable<void> {
    const url = `${this.baseUrl}/${disciplina.id}`;
    return this.http.put<void>(url, disciplina);
  }

  excluirDisciplina(id: String): Observable<void> {
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

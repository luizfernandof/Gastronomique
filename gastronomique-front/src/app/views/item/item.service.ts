import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Item } from './item.model';
import { ItemDto } from './itemDto';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUrl: String = `${environment.apiUrl}/aula/itens`;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  buscarItemAulaPorId(itemAulaId: String) {
    const url = `${this.baseUrl}/buscar/${itemAulaId}`;
    return this.http.get<Item>(url);
  }

  buscarItemAulaDtoPorId(itemAulaId: String) {
    const url = `${this.baseUrl}/buscar/${itemAulaId}`;
    return this.http.get<ItemDto>(url);
  }

  buscarItensAula(idAula: String): Observable<Item[]> {
    const url = `${this.baseUrl}/${idAula}`;
    return this.http.get<Item[]>(url);
  }

  inserirItemAula(itemAula: Item): Observable<Item> {
     const url = `${this.baseUrl}`;
     return this.http.post<Item>(url, itemAula);
  }

  editarItemAula(itemAula: ItemDto): Observable<ItemDto> {
    const url = `${this.baseUrl}/${itemAula.id}`;
    return this.http.put<ItemDto>(url, itemAula);
 }

  excluirItemAula(idItemAula: String): Observable<void> {
     const url = `${this.baseUrl}/${idItemAula}`;
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

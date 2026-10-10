import { environment } from "../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ItemListaDeCompra } from './itemListaDeCompra.model';

@Injectable({
  providedIn: 'root'
})
export class ItemListaDeCompraService {

  baseUrl: String = `${environment.apiUrl}/lista/compra/item`;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  buscarItensDeCompraDaListaId(listaDeCompraId: Number): Observable<ItemListaDeCompra[]> {
    const url = `${this.baseUrl}/${listaDeCompraId}`;
    return this.http.get<ItemListaDeCompra[]>(url);
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}

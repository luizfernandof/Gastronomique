import { environment } from "../../../../environments/environment";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListaDeCompra } from './listaDeCompra.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaDeCompraService {
  baseUrl: String = `${environment.apiUrl}/lista/compra`;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  buscarTodasListasDeCompra(): Observable<ListaDeCompra[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<ListaDeCompra[]>(url);
  }

  gerarListaDeCompra(idDasAulas: Number[]): Observable<ListaDeCompra> {
    const url = `${this.baseUrl}`;
    return this.http.post<ListaDeCompra>(url, idDasAulas);
  }

  gerarPdfListaDeCompra(idListaDeCompra: Number, listaDeCompra: ListaDeCompra) {
    const url = `${this.baseUrl}/pdf/${idListaDeCompra}`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const urlCreator = window.URL || window.webkitURL;
        const pdfUrl = urlCreator.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `${listaDeCompra.dataCriacao}.pdf`;
        link.target = '_blank';
        link.click();
        urlCreator.revokeObjectURL(pdfUrl);
      })
    ).subscribe();
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000
    })
  }

}

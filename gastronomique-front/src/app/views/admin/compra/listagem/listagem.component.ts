import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/security/_services/storage.service';
import { ListaDeCompraService } from '../lista-de-compra.service';
import { ListaDeCompra } from '../listaDeCompra.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  listasDeCompra!: ListaDeCompra[];

  displayedColumns: string[] = [ 'id', 'dataCriacao', 'acoes'];

  idUsuario!: String;

  constructor(
    private listaDeCompraService: ListaDeCompraService,
    private usuarioService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idUsuario! = this.usuarioService.getUser().id;
    this.buscarTodasListasDeCompra();
  }

  buscarTodasListasDeCompra() {
    this.listaDeCompraService.buscarTodasListasDeCompra().subscribe((resposta) => this.listasDeCompra = resposta);
  }

  novaListaDeCompras() {
    this.router.navigate([`admin/gerar/lista/compra`]);
  }

  gerarPdfListaDeCompra(idListaDeCompra: Number, listaDeCompra: ListaDeCompra) {
    this.listaDeCompraService.gerarPdfListaDeCompra(idListaDeCompra, listaDeCompra);
  }

  navegarParaItensDaListaDeCompra(idListaDeCompra: Number) {
    this.router.navigate([`admin/listagem/lista/compras/${idListaDeCompra}`]);
  }

  formatarData(data: any): any {
    const partes = data.split('-');
    const dataInvertida = partes.reverse().join('/');
    return dataInvertida;
  }
}

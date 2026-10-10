import { Component, OnInit } from '@angular/core';
import { ItemListaDeCompra } from '../itemListaDeCompra.model';
import { ItemListaDeCompraService } from '../item-lista-de-compra-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-itens-list',
  templateUrl: './itens-list.component.html',
  styleUrls: ['./itens-list.component.css']
})
export class ItensListComponent implements OnInit {

  idListaDeCompra!: any;
  itensDaListaDeCompra: ItemListaDeCompra[] = [];
  displayedColumns: string[] = ['insumo', 'unidade', 'quantidade', 'valor'];

  constructor(
    private service: ItemListaDeCompraService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idListaDeCompra = this.route.snapshot.paramMap.get('id');
    this.buscarItensDeCompraDaListaId();
  }

  buscarItensDeCompraDaListaId() {
    this.service.buscarItensDeCompraDaListaId(this.idListaDeCompra).subscribe((resposta) => {
      this.itensDaListaDeCompra = resposta;
    });
  }

  navegarParaListagemDeCompras() {
    this.router.navigate([`admin/listagem/lista/compras`]);
  }

}

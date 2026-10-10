import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { AulaService } from '../../aula/aula.service';
import { Aula } from '../../aula/aula.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  itens: Item[] = [];
  aula!: Aula;
  displayedColumns: string[] = ['insumo', 'unidade', 'quantidade', 'valorUnitario', 'valorTotal', 'observacao', 'acoes'];
  idAula!: string;
  isAdmin: boolean = false;

  constructor(
    private service: ItemService,
    private aulaService: AulaService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location) { }

  ngOnInit(): void {
    this.idAula = this.route.snapshot.paramMap.get('id')!;
    this.buscarItensAula(this.route.snapshot.paramMap.get('id')!);
    this.buscarDadosDaAula(this.route.snapshot.paramMap.get('id')!);

    if(this.location.path().includes("/admin/listagem/requisicoes/itens/")) {
      this.isAdmin = true;
    }
  }

  buscarItensAula(idAula: String) {
    this.service.buscarItensAula(idAula).subscribe((json) => {
      this.itens = json;
    })
  }

  buscarDadosDaAula(idAula: String) {
    this.aulaService.buscarAulaPorId(idAula).subscribe(resposta => {
      this.aula = resposta;
    });
  }

  excluirItemAulaDialog(idItemAula: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza que deseja excluir este item de aula?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Cancelar'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.excluirItemAula(idItemAula).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

  formatarData(data: any): any {
    const partes = data.split('-');
    const dataInvertida = partes.reverse().join('/');
    return dataInvertida;
  }

  navegarParaInsercaoDeItens(): void {
    this.router.navigate([`aula/itens/inserir/${this.idAula}`]);
  }

  navegarParaEdicaoItem(itemAulaId: String): void {
    this.router.navigate([`aula/itens/editar/${itemAulaId}`]);
  }

  navegarParaListagemDeAulas(): void {
    console.log(this.location.path());
    if(this.isAdmin) {
      this.router.navigate([`admin/listagem/requisicoes`]);
    } else {
      this.router.navigate([`aula/listagem`]);
    }
  }

}

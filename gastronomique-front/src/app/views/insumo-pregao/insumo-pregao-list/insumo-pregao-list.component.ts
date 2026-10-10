import { Component, OnInit } from '@angular/core';
import { InsumoPregao } from '../insumo-pregao.model';
import { InsumoPregaoService } from '../insumo-pregao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { PregaoService } from '../../pregao/pregao.service';
import { Pregao } from '../../pregao/pregao.model';

@Component({
  selector: 'app-insumo-pregao-list',
  templateUrl: './insumo-pregao-list.component.html',
  styleUrls: ['./insumo-pregao-list.component.css']
})
export class InsumoPregaoListComponent implements OnInit {
  insumosPregao: InsumoPregao[] = [];
  pregao!: Pregao;
  displayedColumns: string[] = ['insumo', 'unidadeDeMedida', 'preco', 'quantidade', 'acoes'];
  idPregao!: string;

  constructor(
    private service: InsumoPregaoService,
    private pregaoService: PregaoService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.idPregao = this.route.snapshot.paramMap.get('id')!;
    this.buscarInsumosDoPregao(this.route.snapshot.paramMap.get('id')!);
    this.buscarPregao();
  }

  buscarPregao() {
    this.pregaoService.buscarPregaoPorId(this.idPregao).subscribe(resposta => this.pregao = resposta);
  }

  buscarInsumosDoPregao(idPregao: String) {
    this.service.buscarInsumosDoPregao(idPregao).subscribe((json) => {
      this.insumosPregao = json;
    });
  }

  excluirInsumoPregaoDialog(idInsumoPregao: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza que deseja excluir este insumo do pregão?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Cancelar'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.excluirInsumoDoPregao(idInsumoPregao).subscribe((resposta) => {
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

  navegarParaInsercaoDeInsumos(): void {
    this.router.navigate([`pregao/insumos/inserir/${this.idPregao}`]);
  }

  navegarParaListagemDePregoes(): void {
    this.router.navigate([`pregao/listagem`]);
  }
}

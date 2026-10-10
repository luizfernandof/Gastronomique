import { Component, OnInit } from '@angular/core';
import { Aula } from '../aula.model';
import { AulaService } from '../aula.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/security/_services/storage.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-aula-list',
  templateUrl: './aula-list.component.html',
  styleUrls: ['./aula-list.component.css']
})
export class AulaListComponent implements OnInit {

  aulas: Aula[] = [];
  aulasPorUsuario: Aula[] = [];
  displayedColumns: string[] = [ 'descricao', 'nomeUsuario', 'nomePregao', 'nomeDisciplina', 'nomeLaboratorio', 'dataUtilizacao', 'valor', 'status', 'acoes'];

  idUsuario!: String;

  constructor(
    private service: AulaService,
    private router: Router,
    private usuarioService: StorageService,
    private location: Location,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.idUsuario! = this.usuarioService.getUser().id;
    this.buscarAulasPorUsuario(this.idUsuario);
    this.buscarTodasAulas();
  }

  buscarTodasAulas() {
    this.service.buscarTodasAulas().subscribe(resposta => {
      this.aulas = resposta;
    })
  }

  buscarAulasPorUsuario(idUsuario: String) {
    this.service.buscarAulasPorUsuario(idUsuario).subscribe(resposta => {
      this.aulasPorUsuario = resposta;
    });
  }

  excluirAula(id: string) {
    this.router.navigate([`aula/excluir/${id}`]);
  }

  editarAula(id: string) {
    this.router.navigate([`aula/editar/${id}`]);
  }

  novaAula() {
    this.router.navigate(['aula/inserir']);
  }

  listarItensAula(idAula: String) {
    this.router.navigate([`aula/itens/${idAula}`]);
  }

  enviarAula(idAula: String) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza que deseja realizar o envio dessa aula para revisão do administrador?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Cancelar'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.enviarAula(idAula).subscribe(() => {
          this.location.historyGo();
        })
      }
    });
  }

  formatarData(data: any): any {
    const partes = data.split('-');
    const dataInvertida = partes.reverse().join('/');
    return dataInvertida;
  }

}

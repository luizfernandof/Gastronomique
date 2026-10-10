import { Component, OnInit } from '@angular/core';
import { Aula } from '../../aula/aula.model';
import { AulaService } from '../../aula/aula.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/security/_services/storage.service';
import { AdminService } from '../admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-requisicoes-list',
  templateUrl: './requisicoes-list.component.html',
  styleUrls: ['./requisicoes-list.component.css']
})
export class RequisicoesListComponent implements OnInit {

  aulas: Aula[] = [];
  aulasPorUsuario: Aula[] = [];
  displayedColumns: string[] = [ 'descricao', 'nomeUsuario', 'nomePregao', 'nomeDisciplina', 'nomeLaboratorio', 'dataUtilizacao', 'valor', 'status', 'acoes'];

  idUsuario!: String;

  constructor(
    private service: AulaService,
    private router: Router,
    private adminService: AdminService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.buscarTodasAulasEmRevisao();
  }

  buscarTodasAulasEmRevisao() {
    this.service.buscarTodasAulasEmRevisao().subscribe(resposta => {
      this.aulas = resposta;
    })
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
    this.router.navigate([`admin/listagem/requisicoes/itens/${idAula}`]);
    //this.router.navigate([`aula/itens/${idAula}`]);
  }

  aprovarAula(idAula: String) {
    this.adminService.aprovarAula(idAula).subscribe(() => this.location.historyGo());
  }

  devolverAula(idAula: String) {
    this.adminService.devolverAula(idAula).subscribe(() => this.location.historyGo());
  }

  formatarData(data: any): any {
    const partes = data.split('-');
    const dataInvertida = partes.reverse().join('/');
    return dataInvertida;
  }

}

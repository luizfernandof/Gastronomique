import { Component, OnInit } from '@angular/core';
import { Laboratorio } from '../laboratorio.model';
import { LaboratorioService } from '../laboratorio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laboratorio-list',
  templateUrl: './laboratorio-list.component.html',
  styleUrls: ['./laboratorio-list.component.css']
})
export class LaboratorioListComponent implements OnInit {

  laboratorios: Laboratorio[] = [];
  displayedColumns: string[] = ['id', 'nome', 'acoes'];

  constructor(private service: LaboratorioService, private router: Router) { }

  ngOnInit(): void {
    this.buscarTodosLaboratorios();
  }

  buscarTodosLaboratorios() {
    this.service.buscarTodosLaboratorios().subscribe(resposta => {
      this.laboratorios = resposta;
      console.log(resposta);
    })
  }

  excluirLaboratorio(id: string) {
    this.router.navigate([`laboratorio/excluir/${id}`]);
  }

  editarLaboratorio(id: string) {
    this.router.navigate([`laboratorio/editar/${id}`]);
  }

  novoLaboratorio() {
    this.router.navigate(['laboratorio/inserir']);
  }

}

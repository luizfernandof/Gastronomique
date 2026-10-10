import { Router } from '@angular/router';
import { InsumoService } from '../insumo.service';
import { Insumo } from './../insumo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insumo-list',
  templateUrl: './insumo-list.component.html',
  styleUrls: ['./insumo-list.component.css']
})
export class InsumoListComponent implements OnInit {

  insumos: Insumo[] = [];
  displayedColumns: string[] = ['id', 'denominacao', 'unidadeDeMedida', 'descricao', 'tipoInsumo', 'acoes'];

  constructor(private service: InsumoService, private router: Router) { }

  ngOnInit(): void {
    this.buscarTodosInsumos();
  }

  buscarTodosInsumos() {
    this.service.buscarTodosInsumos().subscribe(resposta => {
      this.insumos = resposta;
      console.log(resposta);
    })
  }

  excluirInsumo(id: string) {
    this.router.navigate([`insumo/excluir/${id}`]);
  }

  editarInsumo(id: string) {
    this.router.navigate([`insumo/editar/${id}`]);
  }

  novoInsumo() {
    this.router.navigate(['insumo/inserir']);
  }

}

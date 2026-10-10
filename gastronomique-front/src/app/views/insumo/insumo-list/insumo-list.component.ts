import { Insumo } from './../insumo.model';
import { Router } from '@angular/router';
import { InsumoService } from '../insumo.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-insumo-list',
  templateUrl: './insumo-list.component.html',
  styleUrls: ['./insumo-list.component.css']
})

export class InsumoListComponent implements OnInit {

  insumos: Insumo[] = [];
  termoDePesquisa: String = "";
  pageIndex = 0;
  pageSize = 5;
  totalItems = 0;

  displayedColumns: string[] = ['id', 'denominacao', 'unidadeDeMedida', 'descricao', 'tipoInsumo', 'acoes'];
  dataSource = new MatTableDataSource<Insumo>(this.insumos);

  constructor(
    private router: Router,
    private service: InsumoService
  ) {}

  ngOnInit(): void {
    this.buscarTodosInsumosPageable();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.buscarTodosInsumosPageable();
  }

  buscarTodosInsumosPageable() {
    this.service.buscarTodosInsumosPageable(this.pageIndex, this.pageSize).subscribe((resposta => {
      this.insumos = resposta.content;
      this.totalItems = resposta.totalElements;
      this.dataSource.data = this.insumos;
    }));
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

  aplicarFiltro(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Pregao } from '../pregao.model';
import { PregaoService } from '../pregao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregao-list',
  templateUrl: './pregao-list.component.html',
  styleUrls: ['./pregao-list.component.css']
})
export class PregaoListComponent implements OnInit {

  pregoes: Pregao[] = [];
  displayedColumns: string[] = ['id', 'nome', 'dataInicio', 'dataFinal', 'acoes'];

  constructor(private service: PregaoService, private router: Router) { }

  ngOnInit(): void {
    this.buscarTodosPregoes();
  }

  buscarTodosPregoes() {
    this.service.buscarTodosPregoes().subscribe(resposta => {
      this.pregoes = resposta;
    })
  }

  excluirPregao(id: string) {
    this.router.navigate([`pregao/excluir/${id}`]);
  }

  editarPregao(id: string) {
    this.router.navigate([`pregao/editar/${id}`]);
  }

  novoPregao() {
    this.router.navigate(['pregao/inserir']);
  }

  listarInsumosDoPregao(idPregao: String) {
    this.router.navigate([`pregao/insumos/${idPregao}`]);
  }
}

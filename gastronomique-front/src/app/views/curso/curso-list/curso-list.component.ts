import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso.model';
import { CursoService } from '../curso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {

  cursos: Curso[] = [];
  displayedColumns: string[] = ['id', 'nome', 'acoes'];

  constructor(private service: CursoService, private router: Router) { }

  ngOnInit(): void {
    this.buscarTodosCursos();
  }

  buscarTodosCursos() {
    this.service.buscarTodosCursos().subscribe(resposta => {
      this.cursos = resposta;
      console.log(resposta);
    })
  }

  excluirCurso(id: string) {
    this.router.navigate([`curso/excluir/${id}`]);
  }

  editarCurso(id: string) {
    this.router.navigate([`curso/editar/${id}`]);
  }

  novoCurso() {
    this.router.navigate(['curso/inserir']);
  }

  listarDisciplinasPorCursoId(id: string) {
    this.router.navigate([`disciplina/curso/${id}`]);
  }
}
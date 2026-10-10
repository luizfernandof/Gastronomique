import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../disciplina.model';
import { DisciplinaService } from '../disciplina.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../curso/curso.service';
import { Curso } from '../../curso/curso.model';

@Component({
  selector: 'app-disciplina-list',
  templateUrl: './disciplina-list.component.html',
  styleUrls: ['./disciplina-list.component.css']
})
export class DisciplinaListComponent implements OnInit {

  disciplinas: Disciplina[] = [];
  displayedColumns: string[] = ['id', 'nome', 'acoes'];

  curso: Curso = {
    id: '',
    nome: ''
  }

  constructor(
      private service: DisciplinaService,
      private router: Router,
      private route: ActivatedRoute,
      private cursoService: CursoService
    ) { }

  ngOnInit(): void {
    this.buscarTodosCursosPorCursoId(this.route.snapshot.paramMap.get('id')!);
    this.buscarCursoPorId();
  }

  buscarTodosCursosPorCursoId(id: string) {
    this.service.buscarTodosCursosPorCursoId(id).subscribe(resposta => {
      this.disciplinas = resposta;
      console.log(resposta);
    })
  }

  buscarCursoPorId(){
    this.cursoService.buscarCursoPorId(this.route.snapshot.paramMap.get('id')!).subscribe(resposta => {
      this.curso.id = resposta.id;
      this.curso.nome = resposta.nome;
    });
  }

  excluirDisciplina(id: string) {
    this.router.navigate([`disciplina/excluir/${id}`]);
  }

  editarDisciplina(id: string) {
    this.router.navigate([`disciplina/editar/${id}`]);
  }

  novaDisciplina() {
    this.router.navigate([`disciplina/inserir/${this.curso.id}`]);
  }

  navegarParaListagemDeCursos() {
    this.router.navigate([`curso/listagem`]);
  }

}

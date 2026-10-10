import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../disciplina.model';
import { DisciplinaService } from '../disciplina.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-disciplina-delete',
  templateUrl: './disciplina-delete.component.html',
  styleUrls: ['./disciplina-delete.component.css']
})
export class DisciplinaDeleteComponent implements OnInit {

  disciplina: Disciplina = {
    id: '',
    nome: ''
  }

  idCurso!: any;

  constructor(
    private service: DisciplinaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.disciplina.id = this.route.snapshot.paramMap.get('id')!;
    this.buscarDisciplinaPorId();
  }

  buscarDisciplinaPorId(): void {
    this.service.buscarDisciplinaPorId(this.disciplina.id!).subscribe((resposta => {
      this.disciplina.id = resposta.id;
      this.disciplina.nome = resposta.nome;
      this.idCurso = resposta.curso?.id;
    }));
  }

  excluirDisciplina(): void {
    this.service.excluirDisciplina(this.disciplina.id!).subscribe((resposta) => {
      this.router.navigate([`disciplina/curso/${this.idCurso}`]);
    });
  }

  cancelar(): void {
    this.router.navigate( [ `disciplina/curso/${this.idCurso}`]);
  }
}

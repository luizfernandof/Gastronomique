import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../disciplina.model';
import { FormControl, Validators } from '@angular/forms';
import { DisciplinaService } from '../disciplina.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../../curso/curso.model';

@Component({
  selector: 'app-disciplina-edit',
  templateUrl: './disciplina-edit.component.html',
  styleUrls: ['./disciplina-edit.component.css']
})
export class DisciplinaEditComponent implements OnInit {

  disciplina: Disciplina = {
    id: '',
    nome: '', 
    curso: new Curso()
  }

  nome = new FormControl('', [Validators.required]);

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
      this.disciplina.curso = resposta.curso;
    }));
  }

  editarDisciplina(): void {
    this.service.editarDisciplina(this.disciplina).subscribe((resposta) => {
      this.router.navigate([`disciplina/curso/${this.disciplina.curso?.id}`]);
    });
  }

  cancelar(): void {
    this.router.navigate([`disciplina/curso/${this.disciplina.curso?.id}`]);
  }
}

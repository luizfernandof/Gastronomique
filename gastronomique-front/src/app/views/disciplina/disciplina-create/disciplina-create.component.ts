import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../disciplina.model';
import { FormControl, Validators } from '@angular/forms';
import { DisciplinaService } from '../disciplina.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-disciplina-create',
  templateUrl: './disciplina-create.component.html',
  styleUrls: ['./disciplina-create.component.css']
})
export class DisciplinaCreateComponent implements OnInit {

  disciplina: Disciplina = {
    nome: ''
  }

  idCurso?: string;

  nome = new FormControl('', [Validators.required]);

  constructor(
    private service: DisciplinaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idCurso = this.route.snapshot.paramMap.get('id')!;
  }

  inserirDisciplina(): void {
    this.service.inserirDisciplina(this.disciplina, this.idCurso!).subscribe(
      () => {
        this.router.navigate([`disciplina/curso/${this.idCurso}`]);
        this.service.mensagem("Disciplina cadastrada com sucesso!");
      }, err => {
        console.log(`ERROS: ${err.error.errors}`);
        this.service.mensagem("Problema ao inserir disciplina, confira os campos do formulário!");
      }
    );
  }

  cancelar(): void { this.router.navigate([`disciplina/curso/${this.idCurso}`]); }
}

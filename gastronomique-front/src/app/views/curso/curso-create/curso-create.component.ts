import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso.model';
import { FormControl, Validators } from '@angular/forms';
import { CursoService } from '../curso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso-create',
  templateUrl: './curso-create.component.html',
  styleUrls: ['./curso-create.component.css']
})
export class CursoCreateComponent implements OnInit {

  curso: Curso = {
    nome: ''
  }

  nome = new FormControl('', [Validators.required]);

  constructor(
    private service: CursoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  inserirCurso(): void {
    this.service.inserirCurso(this.curso).subscribe(
      () => {
        this.router.navigate(['curso/listagem']);
        this.service.mensagem("Curso cadastrado com sucesso!");
      }, err => {
        this.service.mensagem("Problema ao inserir curso, confira os campos do formulário!");
      }
    );
  }

  cancelar(): void { this.router.navigate(['curso/listagem']); }

}

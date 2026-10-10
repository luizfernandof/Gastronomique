import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso.model';
import { FormControl, Validators } from '@angular/forms';
import { CursoService } from '../curso.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-curso-edit',
  templateUrl: './curso-edit.component.html',
  styleUrls: ['./curso-edit.component.css']
})
export class CursoEditComponent implements OnInit {

  curso: Curso = {
    nome: ''
  }

  nome = new FormControl('', [Validators.required]);

  constructor(
    private service: CursoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.curso.id = this.route.snapshot.paramMap.get('id')!;
    this.buscarCursoPorId();
  }

  buscarCursoPorId(): void {
    this.service.buscarCursoPorId(this.curso.id!).subscribe((resposta => {
      this.curso.id = resposta.id;
      this.curso.nome = resposta.nome;
    }));
  }

  editarCurso(): void {
    this.service.editarCurso(this.curso).subscribe((resposta) => {
      this.router.navigate(['curso/listagem']);
    });
  }

  cancelar(): void {
    this.router.navigate(['curso/listagem']);
  }

}

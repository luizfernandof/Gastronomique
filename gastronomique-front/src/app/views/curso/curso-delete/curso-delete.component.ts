import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso.model';
import { CursoService } from '../curso.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-curso-delete',
  templateUrl: './curso-delete.component.html',
  styleUrls: ['./curso-delete.component.css']
})

export class CursoDeleteComponent implements OnInit {

  curso: Curso = {
    id: '',
    nome: ''
  }

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

  excluirCurso(): void {
    this.service.excluirCurso(this.curso.id!).subscribe((resposta) => {
      this.router.navigate(['curso/listagem']);
    });
  }

  cancelar(): void {
    this.router.navigate(['curso/listagem']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Aula } from '../aula.model';
import { Usuario } from '../usuario.model';
import { Disciplina } from '../../disciplina/disciplina.model';
import { Laboratorio } from '../../laboratorio/laboratorio.model';
import { AulaService } from '../aula.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pregao } from '../../pregao/pregao.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-aula-delete',
  templateUrl: './aula-delete.component.html',
  styleUrls: ['./aula-delete.component.css']
})
export class AulaDeleteComponent implements OnInit {

  aula: Aula = {
    descricao: '',
    pregao: new Pregao(),
    usuario: new Usuario(),
    disciplina: new Disciplina(),
    laboratorio: new Laboratorio(),
    dataUtilizacao: '',
    valor: 0,
    status: ''
  }

  constructor(
    private service: AulaService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.aula.id = this.route.snapshot.paramMap.get('id')!;
    this.buscarAulaPorId();
  }

  buscarAulaPorId(): void {
    this.service.buscarAulaPorId(this.aula.id!).subscribe((resposta => {
      this.aula.id = resposta.id;
      this.aula.descricao = resposta.descricao;
      this.aula.pregao = resposta.pregao;
      this.aula.usuario = resposta.usuario;
      this.aula.disciplina = resposta.disciplina;
      this.aula.laboratorio = resposta.laboratorio;
      this.aula.dataUtilizacao = resposta.dataUtilizacao;
      this.aula.valor = resposta.valor;
    }));
  }

  excluirAula(): void {
    this.service.excluirAula(this.aula.id!).subscribe((resposta) => {
      // this.router.navigate(['aula/listagem']);
      this.location.back();
    });
  }

  cancelar(): void {
    // this.router.navigate(['aula/listagem']);
    this.location.back();
  }

}

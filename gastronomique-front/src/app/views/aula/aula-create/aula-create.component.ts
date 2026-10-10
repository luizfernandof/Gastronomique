import { Component, OnInit } from '@angular/core';
import { Aula } from '../aula.model';
import { Usuario } from '../usuario.model';
import { Disciplina } from '../../disciplina/disciplina.model';
import { Laboratorio } from '../../laboratorio/laboratorio.model';
import { FormControl, Validators } from '@angular/forms';
import { AulaService } from '../aula.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/security/_services/storage.service';
import { DisciplinaService } from '../../disciplina/disciplina.service';
import { LaboratorioService } from '../../laboratorio/laboratorio.service';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { PregaoService } from '../../pregao/pregao.service';
import { Pregao } from '../../pregao/pregao.model';

@Component({
  selector: 'app-aula-create',
  templateUrl: './aula-create.component.html',
  styleUrls: ['./aula-create.component.css']
})
export class AulaCreateComponent implements OnInit {

  aula: Aula = {
    descricao: '',
    pregao: new Pregao(),
    usuario: new Usuario(),
    disciplina: new Disciplina(),
    laboratorio: new Laboratorio(),
    dataUtilizacao: '',
    valor: 0,
    status: 'EDICAO'
  };

  pregoes: Pregao[] = [];

  disciplinas: Disciplina[] = [];

  laboratorios: Laboratorio[] = [];

  pregao = new FormControl(0, [Validators.required]);
  disciplina = new FormControl(0, [Validators.required]);
  laboratorio = new FormControl(0, [Validators.required]);
  dataUtilizacao = new FormControl('', [Validators.required]);

  constructor(
    private service: AulaService,
    private router: Router,
    private usuarioService: StorageService,
    private disciplinaService: DisciplinaService,
    private laboratorioService: LaboratorioService,
    private pregaoService: PregaoService
  ) { }

  ngOnInit(): void {
    this.setUsuarioId();
    this.buscarTodosPregoes();
    this.buscarTodasDisciplinas();
    this.buscarTodosLaboratorios();
  }

  inserirAula(): void {
    this.service.inserirAula(this.aula).subscribe(
      () => {
        this.router.navigate(['aula/listagem']);
        this.service.mensagem("Aula criada com sucesso! Clique em 'itens' para adicionar insumos...");
      }, err => {
        this.service.mensagem("Problema ao criar aula, confira os campos do formulário!");
      }
    );
  }

  setUsuarioId(): void {
    this.aula.usuario.id = this.usuarioService.getUser().id;
  }

  buscarTodosLaboratorios() {
    this.laboratorioService.buscarTodosLaboratorios().subscribe(resposta => {
      this.laboratorios = resposta;
    });
  }

  buscarTodasDisciplinas() {
    this.disciplinaService.buscarTodasDisciplinas().subscribe(resposta => {
      this.disciplinas = resposta;
    });
  }

  buscarTodosPregoes() {
    this.pregaoService.buscarTodosPregoes().subscribe(resposta => {
      this.pregoes = resposta;
    });
  }

  cancelar(): void { this.router.navigate(['aula/listagem']); }
}

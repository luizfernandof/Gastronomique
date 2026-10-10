import { Component, OnInit } from '@angular/core';
import { Pregao } from '../pregao.model';
import { FormControl, Validators } from '@angular/forms';
import { PregaoService } from '../pregao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregao-create',
  templateUrl: './pregao-create.component.html',
  styleUrls: ['./pregao-create.component.css']
})
export class PregaoCreateComponent implements OnInit {

  pregao: Pregao = {
    id: '',
    nome: '',
    dataInicio: '',
    dataFinal: ''
  }

  nome = new FormControl('', [Validators.required]);
  dataInicio = new FormControl('', [Validators.required]);
  dataFinal = new FormControl('', [Validators.required]);

  constructor(
    private service: PregaoService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  inserirPregao(): void {
    this.service.inserirPregao(this.pregao).subscribe(
      () => {
        this.router.navigate(['pregao/listagem']);
        this.service.mensagem("Pregão cadastrado com sucesso!");
      }, err => {
        this.service.mensagem("Problema ao inserir pregão, confira os campos do formulário!");
      }
    );
  }

  cancelar(): void { this.router.navigate(['pregao/listagem']); }

}

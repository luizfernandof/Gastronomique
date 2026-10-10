import { Component, OnInit } from '@angular/core';
import { Pregao } from '../pregao.model';
import { FormControl, Validators } from '@angular/forms';
import { PregaoService } from '../pregao.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pregao-edit',
  templateUrl: './pregao-edit.component.html',
  styleUrls: ['./pregao-edit.component.css']
})
export class PregaoEditComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pregao.id = this.route.snapshot.paramMap.get('id')!;
    this.buscarPregaoPorId();
  }

  buscarPregaoPorId(): void {
    this.service.buscarPregaoPorId(this.pregao.id!).subscribe((resposta => {
      this.pregao.id = resposta.id;
      this.pregao.nome = resposta.nome;
      this.pregao.dataInicio = resposta.dataInicio;
      this.pregao.dataFinal = resposta.dataFinal;
    }));
  }

  editarPregao(): void {
    this.service.editarPregao(this.pregao).subscribe((resposta) => {
      this.router.navigate(['pregao/listagem']);
    });
  }

  cancelar(): void {
    this.router.navigate(['pregao/listagem']);
  }

}

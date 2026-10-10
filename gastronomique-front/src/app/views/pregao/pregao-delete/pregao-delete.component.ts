import { Component, OnInit } from '@angular/core';
import { Pregao } from '../pregao.model';
import { PregaoService } from '../pregao.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pregao-delete',
  templateUrl: './pregao-delete.component.html',
  styleUrls: ['./pregao-delete.component.css']
})
export class PregaoDeleteComponent implements OnInit {

  pregao: Pregao = {
    id: '',
    nome: '',
    dataInicio: '',
    dataFinal: ''
  }

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

  excluirPregao(): void {
    this.service.excluirPregao(this.pregao.id!).subscribe((resposta) => {
      this.router.navigate(['pregao/listagem']);
    });
  }

  cancelar(): void {
    this.router.navigate(['pregao/listagem']);
  }

}

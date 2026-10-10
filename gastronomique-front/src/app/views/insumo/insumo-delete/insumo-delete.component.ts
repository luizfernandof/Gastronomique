import { Component, OnInit } from '@angular/core';
import { InsumoService } from '../insumo.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Insumo } from '../insumo.model';

@Component({
  selector: 'app-insumo-delete',
  templateUrl: './insumo-delete.component.html',
  styleUrls: ['./insumo-delete.component.css']
})
export class InsumoDeleteComponent implements OnInit {

  insumo: Insumo = {
    id: '',
    denominacao: '',
    unidadeDeMedida: '',
    descricao: '',
    tipoInsumo: ''
  }

  constructor(
    private service: InsumoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.insumo.id = this.route.snapshot.paramMap.get('id')!;
    this.buscarInsumoPorId();
  }

  buscarInsumoPorId(): void {
    this.service.buscarInsumoPorId(this.insumo.id!).subscribe((resposta => {
      this.insumo.id = resposta.id;
      this.insumo.denominacao = resposta.denominacao;
      this.insumo.unidadeDeMedida = resposta.unidadeDeMedida;
      this.insumo.descricao = resposta.descricao;
      this.insumo.tipoInsumo = resposta.tipoInsumo;
    }));
  }

  excluirInsumo(): void {
    this.service.excluirInsumo(this.insumo.id!).subscribe((resposta) => {
      this.router.navigate(['insumo/listagem']);
    });
  }

  cancelar(): void {
    this.router.navigate(['insumo/listagem']);
  }

}

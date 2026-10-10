import { Component, OnInit } from '@angular/core';
import { Insumo } from '../insumo.model';
import { Router, ActivatedRoute } from '@angular/router';
import { InsumoService } from '../insumo.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-insumo-edit',
  templateUrl: './insumo-edit.component.html',
  styleUrls: ['./insumo-edit.component.css']
})
export class InsumoEditComponent implements OnInit {

  insumo: Insumo = {
    denominacao: '',
    unidadeDeMedida: null,
    descricao: '',
    tipoInsumo: null
  }

  denominacao = new FormControl('', [Validators.required]);
  unidadeDeMedida = new FormControl('', [Validators.required]);
  descricao = new FormControl('', []);
  tipoInsumo = new FormControl('', [Validators.required]);

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

  editarInsumo(): void {
    this.service.editarInsumo(this.insumo).subscribe((resposta) => {
      this.router.navigate(['insumo/listagem']);
    });
  }

  cancelar(): void {
    this.router.navigate(['insumo/listagem']);
  }

}

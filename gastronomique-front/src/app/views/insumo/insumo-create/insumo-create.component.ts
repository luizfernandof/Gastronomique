import { Component, OnInit } from '@angular/core';
import { Insumo } from '../insumo.model';
import { InsumoService } from '../insumo.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-insumo-create',
  templateUrl: './insumo-create.component.html',
  styleUrls: ['./insumo-create.component.css']
})
export class InsumoCreateComponent implements OnInit {

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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  inserirInsumo(): void {
    this.service.inserirInsumo(this.insumo).subscribe(
      () => {
        this.router.navigate(['insumo/listagem']);
        this.service.mensagem("Insumo cadastrado com sucesso!");
      }, err => {
        this.service.mensagem("Problema ao inserir insumo, confira os campos do formulário!");
      }
    );
  }

  cancelar(): void { this.router.navigate(['insumo/listagem']); }
}

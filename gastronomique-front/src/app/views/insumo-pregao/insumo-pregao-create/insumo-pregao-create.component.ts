import { Component, OnInit } from '@angular/core';
import { Insumo } from '../../insumo/insumo.model';
import { InsumoPregao } from '../insumo-pregao.model';
import { Pregao } from '../../pregao/pregao.model';
import { FormControl, Validators } from '@angular/forms';
import { InsumoPregaoService } from '../insumo-pregao.service';
import { InsumoService } from '../../insumo/insumo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-insumo-pregao-create',
  templateUrl: './insumo-pregao-create.component.html',
  styleUrls: ['./insumo-pregao-create.component.css']
})
export class InsumoPregaoCreateComponent implements OnInit {

  insumos!: Insumo[];

  insumoPregao: InsumoPregao = {
    id: '',
    pregao: new Pregao(),
    insumo: new Insumo(),
    preco: 0,
    quantidade: 0,
  };

  insumo = new FormControl(0, [Validators.required]);
  preco = new FormControl(0, [Validators.required]);
  quantidade = new FormControl(0, [Validators.required]);

  constructor(
    private service: InsumoPregaoService,
    private insumoService: InsumoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  idPregao = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.insumoPregao.pregao.id = this.idPregao!;
    this.buscarTodosInsumosDoPregao("PREGAO");
  }

  inserirInsumoPregao(): void {
    this.service.inserirInsumoNoPregao(this.insumoPregao).subscribe(
      () => {
        this.router.navigate([`pregao/insumos/${this.idPregao}`]);
        this.service.mensagem("Insumo inserido no pregão com sucesso!");
      }, err => {
        this.service.mensagem("Problema ao inserir insumo no pregão, verifique os campos do formulário!");
      }
    );
  }

  buscarTodosInsumosDoPregao(pregao: String) {
    this.insumoService.buscarInsumosPorTipo(pregao).subscribe((resposta) => {
      this.insumos = resposta;
    })
  }

  cancelar(): void { this.router.navigate([`pregao/insumos/${this.idPregao}`]); }
}

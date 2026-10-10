import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { Aula } from '../../aula/aula.model';
import { Insumo } from '../../insumo/insumo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';
import { InsumoService } from '../../insumo/insumo.service';
import { FormControl, Validators } from '@angular/forms';
import { InsumoPregao } from '../../insumo-pregao/insumo-pregao.model';
import { InsumoPregaoService } from '../../insumo-pregao/insumo-pregao.service';
import { AulaService } from '../../aula/aula.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {

  insumoPregao!: InsumoPregao;

  insumos!: Insumo[];

  itemAula: Item = {
    id: '',
    aula: new Aula(),
    insumo: new Insumo(),
    quantidade: 0,
    observacao: '',
    valorUnitario: 0,
    valorTotal: 0
  };

  aula = new Aula();

  insumoAula = new FormControl(0, [Validators.required]);
  quantidade = new FormControl(0, [Validators.required]);

  constructor(
    private service: ItemService,
    private insumoService: InsumoService,
    private insumoPregaoService: InsumoPregaoService,
    private router: Router,
    private route: ActivatedRoute,
    private aulaService: AulaService
  ) { }

  idAula = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.itemAula.aula.id = this.idAula!;
    this.buscarAula();
  }

  inserirItemAula(): void {
    this.service.inserirItemAula(this.itemAula).subscribe(
      () => {
        this.router.navigate([`aula/itens/${this.idAula}`]);
        this.service.mensagem("Item inserido na aula com sucesso!");
      }, err => {
        this.service.mensagem("Problema ao inserir item na aula, verifique os campos do formulário!");
      }
    );
  }

  buscarAula() {
    this.aulaService.buscarAulaPorId(this.idAula!).subscribe(resposta => {
      this.aula = resposta;
      this.buscarInsumosPorPregao();
    });
  }

  buscarInsumosPorPregao() {
    this.insumoService.buscarInsumosPorPregao(this.aula.pregao.id).subscribe((resposta) => {
      this.insumos = resposta;
      this.buscarInsumosTipoProducao();
    });
  }

  buscarInsumosTipoProducao() {
    this.insumoService.buscarInsumosPorTipo("PRODUCAO").subscribe(resposta => {
      const insumosProducao = resposta;
      this.insumos = this.insumos.concat(insumosProducao);
    });
  }

  setValorItem(idInsumo: String) {
    this.insumoPregaoService.listarUltimoPreco(idInsumo).subscribe(resposta => {
      this.insumoPregao = resposta;
      this.itemAula.valorUnitario = resposta.preco;
      //this.itemAula.valorTotal = Number(this.itemAula.valorUnitario) * Number(this.itemAula.quantidade);
    });
  }

  cancelar(): void { this.router.navigate([`aula/itens/${this.idAula}`]); }
}

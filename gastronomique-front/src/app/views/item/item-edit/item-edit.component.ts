import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { InsumoService } from '../../insumo/insumo.service';
import { InsumoPregaoService } from '../../insumo-pregao/insumo-pregao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AulaService } from '../../aula/aula.service';
import { Item } from '../item.model';
import { Aula } from '../../aula/aula.model';
import { Insumo } from '../../insumo/insumo.model';
import { FormControl, Validators } from '@angular/forms';
import { InsumoPregao } from '../../insumo-pregao/insumo-pregao.model';
import { ItemDto } from '../itemDto';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  aula!: Aula;

  insumoPregao!: InsumoPregao;

  insumos!: Insumo[];

  itemAula: ItemDto = {
    id: '',
    idAula: '',
    idInsumo: '',
    observacao: '',
    quantidade: 0,
    valorUnitario: 0
  }

  insumo = new FormControl('', [Validators.required]);
  quantidade = new FormControl('', [Validators.required]);
  valorUnitario = new FormControl('', [Validators.required]);

  constructor(
    private service: ItemService,
    private insumoService: InsumoService,
    private insumoPregaoService: InsumoPregaoService,
    private aulaService: AulaService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const itemAulaId = this.route.snapshot.paramMap.get('id')!;
    this.buscarItemAulaPorId(itemAulaId);
  }

  buscarItemAulaPorId(itemAulaId: String): void {
    this.service.buscarItemAulaDtoPorId(itemAulaId).subscribe(( (resposta) => {
      this.itemAula = resposta;
      this.buscarAulaPorId(resposta.idAula);
    }));
  }

  buscarAulaPorId(idAula: String) {
    this.aulaService.buscarAulaPorId(idAula).subscribe(resposta => {
      this.aula = resposta;
      this.buscarInsumosPorPregao(this.aula.pregao.id);
    });
  }

  buscarInsumosTipoProducao() {
    this.insumoService.buscarInsumosPorTipo("PRODUCAO").subscribe(resposta => {
      const insumosProducao = resposta;
      this.insumos = this.insumos.concat(insumosProducao);
    });
  }

  buscarInsumosPorPregao(idPregao: String) {
    this.insumoService.buscarInsumosPorPregao(idPregao).subscribe((resposta) => {
      this.insumos = resposta;
      this.buscarInsumosTipoProducao();
    });
  }

  setValorItem(idInsumo: String) {
    this.insumoPregaoService.listarUltimoPreco(idInsumo).subscribe(resposta => {
      this.insumoPregao = resposta;
      this.itemAula.valorUnitario = resposta.preco;
    });
  }

  editarItemAula(): void {
    this.service.editarItemAula(this.itemAula).subscribe(() => {
      this.router.navigate([`aula/itens/${this.itemAula.idAula}`]);
    });
  }

  cancelar(): void {
    this.router.navigate([`aula/itens/${this.itemAula.idAula}`]);
  }
}

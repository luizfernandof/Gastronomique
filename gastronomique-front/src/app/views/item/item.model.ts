import { Aula } from "../aula/aula.model"
import { Insumo } from "../insumo/insumo.model";

export class Item {
    id!: String;
    aula!: Aula;
    insumo!: Insumo;
    quantidade!: Number;
    observacao!: String;
    valorUnitario!: Number;
    valorTotal!: Number;
}
import { Insumo } from "../insumo/insumo.model";
import { Pregao } from "../pregao/pregao.model";

export class InsumoPregao {
    id!: String;
    pregao!: Pregao;
    insumo!: Insumo;
    preco!: Number;
    quantidade!: Number
}
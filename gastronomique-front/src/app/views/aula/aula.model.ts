import { Disciplina } from "../disciplina/disciplina.model";
import { Laboratorio } from "../laboratorio/laboratorio.model";
import { Pregao } from "../pregao/pregao.model";
import { Usuario } from "./usuario.model";

export class Aula {
    id?: String;
    descricao!: String;
    pregao!: Pregao;
    usuario!: Usuario;
    disciplina!: Disciplina;
    laboratorio!: Laboratorio;
    dataUtilizacao!: String;
    valor!: Number;
    status!: String;
  }

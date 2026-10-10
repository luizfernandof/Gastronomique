import { Insumo } from "./insumo.model";

export interface Pageable {
  content: Insumo[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort?: any;
  numberOfElements: number;
  first: boolean;
}

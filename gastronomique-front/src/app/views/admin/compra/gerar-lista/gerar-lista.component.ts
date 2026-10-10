import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Aula } from 'src/app/views/aula/aula.model';
import { AulaService } from 'src/app/views/aula/aula.service';
import { ListaDeCompraService } from '../lista-de-compra.service';

@Component({
  selector: 'app-gerar-lista',
  templateUrl: './gerar-lista.component.html',
  styleUrls: ['./gerar-lista.component.css']
})
export class GerarListaComponent implements OnInit {

  aulasPorPeriodo: Aula[] = [];
  displayedColumns: string[] = [ 'check','descricao', 'nomeUsuario', 'nomePregao', 'nomeDisciplina', 'nomeLaboratorio', 'dataUtilizacao', 'valor', 'status'];

  idUsuario!: String;

  idAulasListaDeCompra: Number[] = [];

  constructor(
    private service: AulaService,
    private listaDeCompraService: ListaDeCompraService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  buscarAulasPorPeriodo() {
    const dataInicial = document.getElementById("dataInicial") as HTMLInputElement;
    const dataFinal = document.getElementById("dataFinal") as HTMLInputElement;
    if (!dataInicial.value || !dataFinal.value || dataInicial.value > dataFinal.value) {
      this.service.mensagem('Informe um período válido para buscar as aulas.');
      return;
    }
    this.idAulasListaDeCompra = [];
    this.service.buscarAulasPorPeriodo(dataInicial.value, dataFinal.value).subscribe(resposta => {
      this.aulasPorPeriodo = resposta;
    })
  }

  excluirAula(id: string) {
    this.router.navigate([`aula/excluir/${id}`]);
  }

  editarAula(id: string) {
    this.router.navigate([`aula/editar/${id}`]);
  }

  novaAula() {
    this.router.navigate(['aula/inserir']);
  }

  listarItensAula(idAula: String) {
    this.router.navigate([`aula/itens/${idAula}`]);
  }

  formatarData(data: any): any {
    const partes = data.split('-');
    const dataInvertida = partes.reverse().join('/');
    return dataInvertida;
  }

  adicionarAulaParaListaDeCompra(aulaId: number, checked: boolean): void {
    if (checked) {
      // Se o checkbox estiver marcado, adiciona o ID da aula ao array
      if (!this.idAulasListaDeCompra.includes(aulaId)) {
        this.idAulasListaDeCompra.push(aulaId);
      }
    } else {
      // Se o checkbox estiver desmarcado, remove o ID da aula do array
      const index = this.idAulasListaDeCompra.indexOf(aulaId);
      if (index >= 0) {
        this.idAulasListaDeCompra.splice(index, 1);
      }
    }
  }

  gerarListaDeCompra() {
    if (!this.idAulasListaDeCompra.length) {
      this.listaDeCompraService.mensagem('Selecione pelo menos uma aula aprovada.');
      return;
    }
    this.listaDeCompraService.gerarListaDeCompra(this.idAulasListaDeCompra).subscribe(() => {
      this.listaDeCompraService.mensagem("Lista De Compra Criada Com Sucesso!");
      this.router.navigate(["admin/listagem/lista/compras"]);
    }, () => this.listaDeCompraService.mensagem('Não foi possível gerar a lista de compras. Atualize as aulas e tente novamente.'));
  }

}

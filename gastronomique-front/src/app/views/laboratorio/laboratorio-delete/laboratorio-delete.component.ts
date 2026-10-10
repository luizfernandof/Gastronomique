import { Component, OnInit } from '@angular/core';
import { Laboratorio } from '../laboratorio.model';
import { LaboratorioService } from '../laboratorio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-laboratorio-delete',
  templateUrl: './laboratorio-delete.component.html',
  styleUrls: ['./laboratorio-delete.component.css']
})
export class LaboratorioDeleteComponent implements OnInit {
  laboratorio: Laboratorio = {
    id: '',
    nome: ''
  }

  constructor(
    private service: LaboratorioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.laboratorio.id = this.route.snapshot.paramMap.get('id')!;
    this.buscarLaboratorioPorId();
  }

  buscarLaboratorioPorId(): void {
    this.service.buscarLaboratorioPorId(this.laboratorio.id!).subscribe((resposta => {
      this.laboratorio.id = resposta.id;
      this.laboratorio.nome = resposta.nome;
    }));
  }

  excluirLaboratorio(): void {
    this.service.excluirLaboratorio(this.laboratorio.id!).subscribe((resposta) => {
      this.router.navigate(['laboratorio/listagem']);
    });
  }

  cancelar(): void {
    this.router.navigate(['laboratorio/listagem']);
  }
}

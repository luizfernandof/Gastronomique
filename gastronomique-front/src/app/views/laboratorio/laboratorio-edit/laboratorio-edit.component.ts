import { Component, OnInit } from '@angular/core';
import { Laboratorio } from '../laboratorio.model';
import { FormControl, Validators } from '@angular/forms';
import { LaboratorioService } from '../laboratorio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-laboratorio-edit',
  templateUrl: './laboratorio-edit.component.html',
  styleUrls: ['./laboratorio-edit.component.css']
})
export class LaboratorioEditComponent implements OnInit {

  laboratorio: Laboratorio = {
    nome: '',
  }

  nome = new FormControl('', [Validators.required]);

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

  editarLaboratorio(): void {
    this.service.editarLaboratorio(this.laboratorio).subscribe((resposta) => {
      this.router.navigate(['laboratorio/listagem']);
    });
  }

  cancelar(): void {
    this.router.navigate(['laboratorio/listagem']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Laboratorio } from '../laboratorio.model';
import { FormControl, Validators } from '@angular/forms';
import { LaboratorioService } from '../laboratorio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laboratorio-create',
  templateUrl: './laboratorio-create.component.html',
  styleUrls: ['./laboratorio-create.component.css']
})
export class LaboratorioCreateComponent implements OnInit {

  laboratorio: Laboratorio = {
    nome: ''
  }

  nome = new FormControl('', [Validators.required]);

  constructor(
    private service: LaboratorioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  inserirLaboratorio(): void {
    this.service.inserirLaboratorio(this.laboratorio).subscribe(
      () => {
        this.router.navigate(['laboratorio/listagem']);
        this.service.mensagem("Laboratório cadastrado com sucesso!");
      }, err => {
        this.service.mensagem("Problema ao inserir laboratório, confira os campos do formulário!");
      }
    );
  }

  cancelar(): void { this.router.navigate(['laboratorio/listagem']); }
}

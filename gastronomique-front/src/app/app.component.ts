import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './security/_services/storage.service';
import { AuthService } from './security/_services/auth.service';
import { EventBusService } from './security/_shared/event-bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showProfessorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showProfessorBoard = this.roles.includes('ROLE_PROFESSOR');
      this.username = user.username;
    }
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  navegarCadastroInsumo():void {
    this.router.navigate(['insumo/inserir']);
  }

  navegarListagemInsumos():void {
    this.router.navigate(['insumo/listagem']);
  }

  navegarCadastroLaboratorio():void {
    this.router.navigate(['laboratorio/inserir']);
  }

  navegarListagemLaboratorios():void {
    this.router.navigate(['laboratorio/listagem']);
  }

  navegarCadastroCurso():void {
    this.router.navigate(['curso/inserir']);
  }

  navegarListagemCursos():void {
    this.router.navigate(['curso/listagem']);
  }

  navegarCadastroAula():void {
    this.router.navigate(['aula/inserir']);
  }

  navegarListagemAulas():void {
    this.router.navigate(['aula/listagem']);
  }

  navegarCadastroPregao():void {
    this.router.navigate(['pregao/inserir']);
  }

  navegarListagemPregoes():void {
    this.router.navigate(['pregao/listagem']);
  }

  navegarListagemUsuarios():void {
    this.router.navigate(['admin/listagem/usuarios']);
  }

  navegarListagemRequisicoes():void {
    this.router.navigate(['admin/listagem/requisicoes']);
  }

  navegarParaListagemDeListaDeCompras(): void {
    this.router.navigate(['admin/listagem/lista/compras']);
  }
}

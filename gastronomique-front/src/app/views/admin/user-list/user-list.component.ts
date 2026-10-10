import { Usuario } from './../../aula/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['id', 'username', 'fullName', 'ativo', 'roles', 'acoes'];

  constructor(
    private service: UsuarioService,
    private router: Router,
    private adminService: AdminService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.buscarTodosUsuarios();
  }

  buscarTodosUsuarios() {
    this.service.buscarTodosUsuarios().subscribe(resposta => {
      this.usuarios = resposta;
      console.log(resposta);
    })
  }

  ativarUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza que deseja ativar este usuário?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Cancelar'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adminService.ativarUsuario(usuario).subscribe((resposta) => {
          window.location.reload();
        });
      }
    });
  }

  desativarUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza que deseja desativar este usuário?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Cancelar'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adminService.desativarUsuario(usuario).subscribe((resposta) => {
          window.location.reload();
        });
      }
    });
  }

  tornarUsuarioAdmin(usuario: Usuario) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza que deseja tornar este usuário administrador?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Cancelar'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adminService.tornarUsuarioAdmin(usuario).subscribe((resposta) => {
          window.location.reload();
        });
      }
    });
  }

  retirarPermissaoUsuarioAdmin(usuario: Usuario) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza que deseja retirar a permissão de administrador?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Cancelar'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adminService.retirarPermissaoUsuarioAdmin(usuario).subscribe((resposta) => {
          window.location.reload();
        });
      }
    });
  }

  resetarSenha(usuario : Usuario) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Tem certeza que deseja resetar a senha deste usuário? (${usuario.fullName})`,
        buttonText: {
          ok: 'Sim',
          cancel: 'Cancelar'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.adminService.resetarSenha(usuario.id!).subscribe(() => {
          this.dialog.open(InfoDialogComponent, {
            data: {
              message: `Senha resetada para: gastronomique123`,
              buttonText : {
                ok: 'OK'
              }
            }
          });
        });
      }
    });
  }

  isActive(active: boolean): String {
    if(active) {
      return "Ativo"
    } else {
      return "Desativado"
    }
  }

  temPerfilAdmin(roles: Usuario['roles']): boolean {
    return !!roles?.some(role => role.name === 'ROLE_ADMIN');
  }

  isAdmin(roles: Usuario['roles']): String {
    return this.temPerfilAdmin(roles) ? 'Administrador' : 'Professor';
  }

}

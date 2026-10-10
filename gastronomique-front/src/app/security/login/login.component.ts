import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/views/aula/usuario.model';
import { ConfirmDialogComponent } from 'src/app/views/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from 'src/app/views/info-dialog/info-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error?.message || (err.status === 0
          ? 'Não foi possível conectar ao servidor.'
          : 'Não foi possível entrar. Verifique seu e-mail e senha.');
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  resetarSenhaInfo() {
    this.dialog.open(InfoDialogComponent, {
      data: {
        message: `Solicite diretamente ao usuário administrador para resetar sua senha!`,
        buttonText: {
          ok: 'OK'
        }
      }
    });
  }
}

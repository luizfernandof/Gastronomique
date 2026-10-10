import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './security/_helpers/http.interceptor';
import { BoardAdminComponent } from './security/board-admin/board-admin.component';
import { HomeComponent } from './security/home/home.component';
import { LoginComponent } from './security/login/login.component';
import { ProfileComponent } from './security/profile/profile.component';
import { RegisterComponent } from './security/register/register.component';
import { InsumoCreateComponent } from './views/insumo/insumo-create/insumo-create.component';
import { InsumoEditComponent } from './views/insumo/insumo-edit/insumo-edit.component';
import { InsumoListComponent } from './views/insumo/insumo-list/insumo-list.component';
import { InsumoDeleteComponent } from './views/insumo/insumo-delete/insumo-delete.component';
import { LaboratorioCreateComponent } from './views/laboratorio/laboratorio-create/laboratorio-create.component';
import { LaboratorioDeleteComponent } from './views/laboratorio/laboratorio-delete/laboratorio-delete.component';
import { LaboratorioEditComponent } from './views/laboratorio/laboratorio-edit/laboratorio-edit.component';
import { LaboratorioListComponent } from './views/laboratorio/laboratorio-list/laboratorio-list.component';
import { CursoCreateComponent } from './views/curso/curso-create/curso-create.component';
import { CursoDeleteComponent } from './views/curso/curso-delete/curso-delete.component';
import { CursoEditComponent } from './views/curso/curso-edit/curso-edit.component';
import { CursoListComponent } from './views/curso/curso-list/curso-list.component';
import { DisciplinaCreateComponent } from './views/disciplina/disciplina-create/disciplina-create.component';
import { DisciplinaDeleteComponent } from './views/disciplina/disciplina-delete/disciplina-delete.component';
import { DisciplinaEditComponent } from './views/disciplina/disciplina-edit/disciplina-edit.component';
import { DisciplinaListComponent } from './views/disciplina/disciplina-list/disciplina-list.component';
import { AulaCreateComponent } from './views/aula/aula-create/aula-create.component';
import { AulaDeleteComponent } from './views/aula/aula-delete/aula-delete.component';
import { AulaEditComponent } from './views/aula/aula-edit/aula-edit.component';
import { AulaListComponent } from './views/aula/aula-list/aula-list.component';
import { ItemCreateComponent } from './views/item/item-create/item-create.component';
import { ItemListComponent } from './views/item/item-list/item-list.component';
import { PregaoCreateComponent } from './views/pregao/pregao-create/pregao-create.component';
import { PregaoListComponent } from './views/pregao/pregao-list/pregao-list.component';
import { PregaoEditComponent } from './views/pregao/pregao-edit/pregao-edit.component';
import { PregaoDeleteComponent } from './views/pregao/pregao-delete/pregao-delete.component';
import { InsumoPregaoCreateComponent } from './views/insumo-pregao/insumo-pregao-create/insumo-pregao-create.component';
import { InsumoPregaoListComponent } from './views/insumo-pregao/insumo-pregao-list/insumo-pregao-list.component';
import { UserListComponent } from './views/admin/user-list/user-list.component';
import { RequisicoesListComponent } from './views/admin/requisicoes-list/requisicoes-list.component';
import { ItemEditComponent } from './views/item/item-edit/item-edit.component';
import { GerarListaComponent } from './views/admin/compra/gerar-lista/gerar-lista.component';
import { ListagemComponent } from './views/admin/compra/listagem/listagem.component';
import { ItensListComponent } from './views/admin/compra/itens-list/itens-list.component';
import { InfoDialogComponent } from './views/info-dialog/info-dialog.component';
import { ConfirmDialogComponent } from './views/confirm-dialog/confirm-dialog.component';

registerLocaleData(localePt, "pt");

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    InsumoCreateComponent,
    InsumoEditComponent,
    InsumoListComponent,
    InsumoDeleteComponent,
    LaboratorioCreateComponent,
    LaboratorioDeleteComponent,
    LaboratorioEditComponent,
    LaboratorioListComponent,
    CursoCreateComponent,
    CursoDeleteComponent,
    CursoEditComponent,
    CursoListComponent,
    DisciplinaCreateComponent,
    DisciplinaDeleteComponent,
    DisciplinaEditComponent,
    DisciplinaListComponent,
    AulaCreateComponent,
    AulaDeleteComponent,
    AulaEditComponent,
    AulaListComponent,
    ItemCreateComponent,
    ItemListComponent,
    PregaoCreateComponent,
    PregaoListComponent,
    PregaoEditComponent,
    PregaoDeleteComponent,
    InsumoPregaoCreateComponent,
    InsumoPregaoListComponent,
    UserListComponent,
    RequisicoesListComponent,
    ItemEditComponent,
    GerarListaComponent,
    ListagemComponent,
    ItensListComponent,
    InfoDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

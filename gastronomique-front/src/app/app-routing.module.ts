import { ItemCreateComponent } from './views/item/item-create/item-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './security/home/home.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { ProfileComponent } from './security/profile/profile.component';
import { BoardAdminComponent } from './security/board-admin/board-admin.component';
import { BoardProfessorComponent } from './security/board-professor/board-professor.component';
import { InsumoCreateComponent } from './views/insumo/insumo-create/insumo-create.component';
import { InsumoListComponent } from './views/insumo/insumo-list/insumo-list.component';
import { InsumoDeleteComponent } from './views/insumo/insumo-delete/insumo-delete.component';
import { InsumoEditComponent } from './views/insumo/insumo-edit/insumo-edit.component';
import { LaboratorioCreateComponent } from './views/laboratorio/laboratorio-create/laboratorio-create.component';
import { LaboratorioListComponent } from './views/laboratorio/laboratorio-list/laboratorio-list.component';
import { LaboratorioDeleteComponent } from './views/laboratorio/laboratorio-delete/laboratorio-delete.component';
import { LaboratorioEditComponent } from './views/laboratorio/laboratorio-edit/laboratorio-edit.component';
import { CursoCreateComponent } from './views/curso/curso-create/curso-create.component';
import { CursoListComponent } from './views/curso/curso-list/curso-list.component';
import { CursoDeleteComponent } from './views/curso/curso-delete/curso-delete.component';
import { CursoEditComponent } from './views/curso/curso-edit/curso-edit.component';
import { DisciplinaListComponent } from './views/disciplina/disciplina-list/disciplina-list.component';
import { DisciplinaDeleteComponent } from './views/disciplina/disciplina-delete/disciplina-delete.component';
import { DisciplinaCreateComponent } from './views/disciplina/disciplina-create/disciplina-create.component';
import { DisciplinaEditComponent } from './views/disciplina/disciplina-edit/disciplina-edit.component';
import { AulaCreateComponent } from './views/aula/aula-create/aula-create.component';
import { AulaListComponent } from './views/aula/aula-list/aula-list.component';
import { AulaDeleteComponent } from './views/aula/aula-delete/aula-delete.component';
import { AulaEditComponent } from './views/aula/aula-edit/aula-edit.component';
import { ItemListComponent } from './views/item/item-list/item-list.component';
import { PregaoCreateComponent } from './views/pregao/pregao-create/pregao-create.component';
import { PregaoListComponent } from './views/pregao/pregao-list/pregao-list.component';
import { PregaoDeleteComponent } from './views/pregao/pregao-delete/pregao-delete.component';
import { PregaoEditComponent } from './views/pregao/pregao-edit/pregao-edit.component';
import { InsumoPregaoCreateComponent } from './views/insumo-pregao/insumo-pregao-create/insumo-pregao-create.component';
import { InsumoPregaoListComponent } from './views/insumo-pregao/insumo-pregao-list/insumo-pregao-list.component';
import { UserListComponent } from './views/admin/user-list/user-list.component';
import { RequisicoesListComponent } from './views/admin/requisicoes-list/requisicoes-list.component';
import { ItemEditComponent } from './views/item/item-edit/item-edit.component';
import { GerarListaComponent } from './views/admin/compra/gerar-lista/gerar-lista.component';
import { ListagemComponent } from './views/admin/compra/listagem/listagem.component';
import { ItensListComponent } from './views/admin/compra/itens-list/itens-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'admin',
    component: BoardAdminComponent
  },
  {
    path: 'insumo/inserir',
    component: InsumoCreateComponent
  },
  {
    path: 'insumo/listagem',
    component: InsumoListComponent
  },
  {
    path: 'insumo/excluir/:id',
    component: InsumoDeleteComponent
  },
  {
    path: 'insumo/editar/:id',
    component: InsumoEditComponent
  },
  {
    path: 'laboratorio/inserir',
    component: LaboratorioCreateComponent
  },
  {
    path: 'laboratorio/listagem',
    component: LaboratorioListComponent
  },
  {
    path: 'laboratorio/excluir/:id',
    component: LaboratorioDeleteComponent
  },
  {
    path: 'laboratorio/editar/:id',
    component: LaboratorioEditComponent
  },
  {
    path: 'curso/inserir',
    component: CursoCreateComponent
  },
  {
    path: 'curso/listagem',
    component: CursoListComponent
  },
  {
    path: 'curso/excluir/:id',
    component: CursoDeleteComponent
  },
  {
    path: 'curso/editar/:id',
    component: CursoEditComponent
  },
  {
    path: 'disciplina/curso/:id',
    component: DisciplinaListComponent
  },
  {
    path: 'disciplina/inserir/:id',
    component: DisciplinaCreateComponent
  },
  {
    path: 'disciplina/excluir/:id',
    component: DisciplinaDeleteComponent
  },
  {
    path: 'disciplina/editar/:id',
    component: DisciplinaEditComponent
  },
  {
    path: 'aula/inserir',
    component: AulaCreateComponent
  },
  {
    path: 'aula/listagem',
    component: AulaListComponent
  },
  {
    path: 'aula/excluir/:id',
    component: AulaDeleteComponent
  },
  {
    path: 'aula/editar/:id',
    component: AulaEditComponent
  },
  {
    path: 'aula/itens/:id',
    component: ItemListComponent
  },
  {
    path: 'aula/itens/inserir/:id',
    component: ItemCreateComponent
  },
  {
    path: 'aula/itens/editar/:id',
    component: ItemEditComponent
  },
  {
    path: 'pregao/inserir',
    component: PregaoCreateComponent
  },
  {
    path: 'pregao/listagem',
    component: PregaoListComponent
  },
  {
    path: 'pregao/excluir/:id',
    component: PregaoDeleteComponent
  },
  {
    path: 'pregao/editar/:id',
    component: PregaoEditComponent
  },
  {
    path: 'pregao/insumos/inserir/:id',
    component: InsumoPregaoCreateComponent
  },
  {
    path: 'pregao/insumos/:id',
    component: InsumoPregaoListComponent
  },
  {
    path: 'admin/listagem/usuarios',
    component: UserListComponent
  },
  {
    path: 'admin/listagem/requisicoes',
    component: RequisicoesListComponent
  },
  {
    path: 'admin/listagem/requisicoes/itens/:id',
    component: ItemListComponent
  },
  {
    path: 'admin/listagem/lista/compras',
    component: ListagemComponent
  },
  {
    path: 'admin/gerar/lista/compra',
    component: GerarListaComponent
  },
  {
    path: 'admin/listagem/lista/compras/:id',
    component: ItensListComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

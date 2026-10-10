import { NgModule } from '@angular/core';
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
    MatSnackBarModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

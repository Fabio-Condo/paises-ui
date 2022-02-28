import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesPesquisaComponent } from './paises-pesquisa/paises-pesquisa.component';

import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LancamentosRoutingModule } from './paises-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { PaisesCadastroComponent } from './paises-cadastro/paises-cadastro.component';



@NgModule({

  imports: [
    CommonModule,
    FormsModule,

    ButtonModule,
    InputTextModule,
    TableModule,
    TabViewModule,
    TooltipModule,
    HttpClientModule,

    SharedModule,
    RouterModule,
    LancamentosRoutingModule

  ],
  exports: [
    PaisesPesquisaComponent,
    PaisesCadastroComponent
  ],
  declarations: [
    PaisesPesquisaComponent,
    PaisesCadastroComponent
  ]

})
export class PaisesModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaisesPesquisaComponent } from './paises-pesquisa/paises-pesquisa.component';
import { PaisesCadastroComponent } from './paises-cadastro/paises-cadastro.component';

const routes: Routes = [

    { path: 'paises', component: PaisesPesquisaComponent },
    { path: 'paises/novo', component: PaisesCadastroComponent },
    { path: 'paises/:id', component: PaisesCadastroComponent }

];

  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class LancamentosRoutingModule { }

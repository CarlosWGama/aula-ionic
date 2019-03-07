import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TarefaEdicaoPage } from './tarefa-edicao.page';

const routes: Routes = [
  {
    path: '',
    component: TarefaEdicaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TarefaEdicaoPage]
})
export class TarefaEdicaoPageModule {}

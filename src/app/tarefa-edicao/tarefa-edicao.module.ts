import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicModule } from '@ionic/angular';

import { TarefaEdicaoPage } from './tarefa-edicao.page';
import { ServicesModule } from '../services/services.module';

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
    ServicesModule,
    RouterModule.forChild(routes)
  ],
  providers: [Camera],
  declarations: [TarefaEdicaoPage]
})
export class TarefaEdicaoPageModule {}

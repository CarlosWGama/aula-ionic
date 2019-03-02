import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfiguracoesPage } from './configuracoes.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'configuracoes',
    component: ConfiguracoesPage,
    children: [
      { path: '', redirectTo: '/configuracoes/geral', pathMatch: 'full' },
      { path: 'geral', loadChildren: './geral/geral.module#GeralPageModule' },
      { path: 'info', loadChildren: './info/info.module#InfoPageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfiguracoesPage]
})
export class ConfiguracoesPageModule {}

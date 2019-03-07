import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoGuard } from './guards/autenticacao.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate:[AutenticacaoGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: '', loadChildren: './configuracoes/configuracoes.module#ConfiguracoesPageModule' },
  { path: 'tarefa-edicao/:id', loadChildren: './tarefa-edicao/tarefa-edicao.module#TarefaEdicaoPageModule' },
  { path: 'nova-tarefa', loadChildren: './tarefa-edicao/tarefa-edicao.module#TarefaEdicaoPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

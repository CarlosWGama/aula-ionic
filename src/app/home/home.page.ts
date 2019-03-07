import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Tarefa } from '../models/tarefa';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public tarefas: Tarefa[] = [
    new Tarefa(1, "Teste 1", "2030-12-31"),
    new Tarefa(2, "Teste 2", "2018-01-01")
  ];

  public constructor(private menuCtrl:MenuController, private router:Router) {}


  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  /** Permite abrir a tela de edição de tarefa
   * @param id id da tarefa
   */
  editar(id: number) {
    this.router.navigate(['/tarefa-edicao', id]);
  }

  /** Permite excluir uma tarefa da lista
   * @param id id da tarefa
   */
  excluir(id:number) {

  }
}

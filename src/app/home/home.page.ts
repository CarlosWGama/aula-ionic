import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Tarefa } from '../models/tarefa';
import { MenuController, IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public tarefas: Tarefa[] = [];

  @ViewChild('slidingItem')
  public slidingItem: IonItemSliding;

  public constructor(private menuCtrl:MenuController, private router:Router,
      private tarefaService:TarefaService) {}


  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.tarefaService.getAll().then(tarefas => this.tarefas = tarefas);
  }

  /** Permite abrir a tela de edição de tarefa
   * @param id id da tarefa
   */
  editar(id: number) {
    this.slidingItem.close();
    this.router.navigate(['/tarefa-edicao', id]);
  }

  /** Permite excluir uma tarefa da lista
   * @param id id da tarefa
   */
  excluir(id:number) {
    this.slidingItem.close();
    this.tarefaService.delete(id);
    this.tarefaService.getAll().then(r => this.tarefas = r);
  }
}

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Tarefa } from '../models/tarefa';
import { MenuController, IonItemSliding, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('ionItemSliding')
  ionItemSliding:IonItemSliding;

  public tarefas: Tarefa[] = [];

  public constructor(private menuCtrl:MenuController, private router:Router, 
                      private tarefasService: TarefasService, private loadingController:LoadingController) {}


  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.atualizaTarefas();
  }

  /** Permite abrir a tela de edição de tarefa
   * @param id id da tarefa
   */
  editar(id: string) {
    this.ionItemSliding.closeOpened();
    this.router.navigate(['/tarefa-edicao', id]);
  }

  /** Permite excluir uma tarefa da lista
   * @param id id da tarefa
   */
  excluir(id:string) {
    this.tarefasService.excluir(id);
    this.atualizaTarefas();
  }

  /** Atualiza lista de tarefas */
  private async atualizaTarefas() {
    const loading = await this.loadingController.create({
      message: "Buscando tarefas..."
    });
    loading.present();
    this.tarefasService.buscarTodos().then(tarefas => {
      this.tarefas = tarefas
      loading.dismiss();
    });
  }
}

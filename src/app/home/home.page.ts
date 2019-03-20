import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Tarefa } from '../models/tarefa';
import { MenuController, IonItemSliding, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { TarefasService } from '../services/tarefas.service';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('ionItemSliding')
  ionItemSliding:IonItemSliding;

  public tarefas: Tarefa[] = [];

  public constructor(private menuCtrl:MenuController, private router:Router, 
                      private tarefasService: TarefasService, private loadingController:LoadingController,
                      private admobFree:AdMobFree, private toastController: ToastController, private fcm: FCM) {}

  async ngOnInit() {


    //Salva o token unico do usuário
    this.fcm.getToken().then(token => {
      let userID = firebase.auth().currentUser.uid;
      firebase.database().ref("usuarios").child(userID).child('token').set(token);
    });
    
    //Inscreve o usuário em um tópico de aula
    this.fcm.subscribeToTopic("aula");
    
    this.admobFree.banner.config({
      //id: 'ca-app-pub-8890411738087560/8014160239',

      isTesting:true, //Está em ambiente de teste
      autoShow: true
    });

     this.admobFree.banner.prepare()
       .then(() => {
            this.toastController.create({
              message: 'Sucesso',
              duration: 2000
            }).then(t => t.present());
        }).catch(e => {
          this.toastController.create({
            message: e,
            duration: 2000
          }).then(t => t.present())
        })
        
  }

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

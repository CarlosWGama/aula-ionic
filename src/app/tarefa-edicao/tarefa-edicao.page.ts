import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../models/tarefa';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tarefa-edicao',
  templateUrl: './tarefa-edicao.page.html',
  styleUrls: ['./tarefa-edicao.page.scss'],
})
export class TarefaEdicaoPage implements OnInit {

  tarefa: Tarefa;


  constructor(private activitedRouted:ActivatedRoute, private router: Router, private toastController:ToastController) {   
  }

  ngOnInit() {
    if (this.activitedRouted.snapshot.params['id'])
      this.tarefa = new Tarefa(this.activitedRouted.snapshot.params['id'], 'teste', '2023-01-01');
    else 
      this.tarefa = new Tarefa();
  }

  tirarFoto() {
    this.tarefa.imagem = "/assets/imgs/camera_on.png";
  }

  salvar() {
    this.toastController.create({
      message: 'Salvo com sucesso',
      duration: 2000
    }).then(toast => toast.present());

    this.router.navigateByUrl("/home");
  }

}

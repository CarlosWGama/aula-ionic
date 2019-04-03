import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../models/tarefa';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tarefa-edicao',
  templateUrl: './tarefa-edicao.page.html',
  styleUrls: ['./tarefa-edicao.page.scss'],
})
export class TarefaEdicaoPage implements OnInit {

  tarefa: Tarefa;


  constructor(private activitedRouted:ActivatedRoute, private router: Router,
      private toastController:ToastController, private camera: Camera) {   
  }

  ngOnInit() {
    if (this.activitedRouted.snapshot.params['id'])
      this.tarefa = new Tarefa(this.activitedRouted.snapshot.params['id'], 'teste', '2023-01-01');
    else 
      this.tarefa = new Tarefa();
  }

  tirarFoto() {
    
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      this.tarefa.imagem = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      alert(err);
    });
  }

  salvar() {
    this.toastController.create({
      message: 'Salvo com sucesso',
      duration: 2000
    }).then(toast => toast.present());

    this.router.navigateByUrl("/home");
  }

}

import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../models/tarefa';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-tarefa-edicao',
  templateUrl: './tarefa-edicao.page.html',
  styleUrls: ['./tarefa-edicao.page.scss'],
})
export class TarefaEdicaoPage implements OnInit {

  tarefa: Tarefa;

  constructor(private activitedRouted:ActivatedRoute, 
              private router: Router, private toastController:ToastController,
              private camera:Camera, private tarefasService:TarefasService) { }

  ngOnInit() {
    if (this.activitedRouted.snapshot.params['id']) 
      this.tarefasService.buscar(this.activitedRouted.snapshot.params['id'])
            .then(tarefa => this.tarefa = tarefa);
    else 
      this.tarefa = new Tarefa();
  }

  tirarFoto() {
    this.camera.getPicture({
      cameraDirection: this.camera.Direction.BACK,
      allowEdit: true,
      quality: 100,
      saveToPhotoAlbum: false,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }).then(foto => {
      this.tarefa.imagem = 'data:image/jpeg;base64,'+foto;
    });
  }

  salvar() {
    if (this.tarefa.id == null) //Cadastra
      this.tarefasService.cadastrar(this.tarefa);
    else //Atualiza
      this.tarefasService.editar(this.tarefa);

    this.toastController.create({
      message: 'Salvo com sucesso',
      duration: 2000
    }).then(toast => toast.present());

    this.router.navigateByUrl("/home");
  }

}

import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../models/tarefa';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-tarefa-edicao',
  templateUrl: './tarefa-edicao.page.html',
  styleUrls: ['./tarefa-edicao.page.scss'],
})
export class TarefaEdicaoPage implements OnInit {

  tarefa: Tarefa;


  constructor(private activitedRouted:ActivatedRoute, 
              private router: Router, private toastController:ToastController,
              private camera:Camera, private tarefaService:TarefaService) { }

  ngOnInit() {
    if (this.activitedRouted.snapshot.params['id'])
      this.tarefaService.getByID(this.activitedRouted.snapshot.params['id']).then(t => this.tarefa = t);
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
    
    if (this.tarefa.id == null) //cadastrar
      this.tarefaService.cadastrar(this.tarefa);
    else //atualiza
      this.tarefaService.update(this.tarefa, this.tarefa.id);

    this.toastController.create({
      message: 'Salvo com sucesso',
      duration: 2000
    }).then(toast => toast.present());

    this.router.navigateByUrl("/home");
  }

}

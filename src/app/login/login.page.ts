import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController, AlertController } from '@ionic/angular';
import { AutenticacaoGuard } from '../guards/autenticacao.guard';
import { Storage } from '@ionic/storage';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  msg;
  formulario: FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router, private menuCtrl:MenuController, 
              private toastController: ToastController, private alertController:AlertController,
              private storage:Storage, private usuarioService:UsuarioService) { }

  /**
   * Função que é chamada sempre que a página é exibida e fará o papel de desabilitar o menu
   */
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  /**
   * Função que é chamada primeira vez que a página é exibida na pilha 
   * Aqui montamos nosso formbuilder
   */
  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email:['', [Validators.email, Validators.required]],
      senha:['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /** Função que é executada ao clicar no botão de login */
  async logar() {
    let logou = await this.usuarioService.logar(this.formulario.get('email').value, this.formulario.get('senha').value);
    
    if (logou) {
          this.storage.set('podeAcessar', true);
          //AutenticacaoGuard.podeAcessar = true;
          this.router.navigateByUrl('home');
    } else {  
      const toast = await this.toastController.create({
        message: 'Email ou senha inválida',
        duration: 3000
      });
      toast.present();
    }
  }

  /** Função de criar nova conta */
  async cadastrar() {
    const alert = await this.alertController.create({
      header: 'Nova Conta',
      inputs: [
        {type:"email", placeholder: "Digite um e-mail", name:"login"},
        {type:"password", placeholder:"Digite sua senha", name:"senha"}
      ],
      buttons: [
        'Cancelar',
        {text: "Cadastrar", handler: (data) => {
          this.usuarioService.cadastrar(data.login, data.senha);
          this.toastController.create({
            message: 'Conta ' + data.login + ' criada',
            duration: 2000
          }).then(toast => toast.present())
        }}
      ]
    });
  
    await alert.present();
  }
}

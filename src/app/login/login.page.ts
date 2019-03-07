import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController, AlertController } from '@ionic/angular';
import { AutenticacaoGuard } from '../guards/autenticacao.guard';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  msg;
  formulario: FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router, private menuCtrl:MenuController, 
              private toastController: ToastController, private alertController:AlertController, private storage:Storage) { }

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
  async clicou() {
    if (this.formulario.valid && 
        this.formulario.get('email').value == "teste@teste.com" &&
        this.formulario.get('senha').value == "123456") {
          this.storage.set('podeAcessar', true);
          //AutenticacaoGuard.podeAcessar = true;
          this.router.navigateByUrl('home');
    } else {  
      const toast = await this.toastController.create({
        message: 'Email ou Senha incorreta',
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
          console.log("Campo login: " + data.login);
          console.log("Campo senha: " + data.senha);
        }}
      ]
    });
  
    await alert.present();
  }
}

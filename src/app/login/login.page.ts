import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController, AlertController } from '@ionic/angular';
import { AutenticacaoGuard } from '../guards/autenticacao.guard';
import { Storage } from '@ionic/storage';
import * as firebase from "firebase";

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

    let email = this.formulario.get('email').value;
    let senha = this.formulario.get('senha').value;
    firebase.auth().signInWithEmailAndPassword(email, senha).then((usuario) => {
      this.router.navigateByUrl('home');
    }).catch(erro => {
      this.errorAutenticacao(erro.code);
    })
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

          firebase.auth().createUserWithEmailAndPassword(data.login, data.senha).then((usuario) => {
            this.router.navigateByUrl('home');
          }).catch(erro => {
            this.errorAutenticacao(erro.code);
          })
        }}
      ]
    });
  
    await alert.present();
  }

  /** Possíveis mensagens de erro ao criar e usar autenticação do ofirebase */
  async errorAutenticacao(codigo) {
    let error = "Email ou senha inválidad";

    switch(codigo) {
      case 'auth/email-already-in-use': error='Email já está em uso'; break;
      case 'auth/invalid-email': error='Email inválido'; break;
      case 'auth/weak-password': error = 'Senha com menos de 6 caracteres'; break;
      case 'auth/timeout': error='Time out no servidor  '; break;
      case 'auth/user-not-found': error='Email não cadastrado'; break;
    }

    const toast = await this.toastController.create({
      message: error,
      duration: 2000
    });
    toast.present();
  }
}

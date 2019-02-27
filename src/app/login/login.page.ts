import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { AutenticacaoGuard } from '../guards/autenticacao.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  msg;
  formulario: FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router, private menuCtrl:MenuController) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    
    this.formulario = this.formBuilder.group({
      email:['', [Validators.email, Validators.required]],
      senha:['', [Validators.required, Validators.minLength(6)]]
    });
  }

  clicou() {
    if (this.formulario.valid && 
        this.formulario.get('email').value == "teste@teste.com" &&
        this.formulario.get('senha').value == "123456") {
          AutenticacaoGuard.podeAcessar = true;
          this.router.navigateByUrl('home');
    } else  
      this.msg = "Email ou senha incorreta";
       
  }

}

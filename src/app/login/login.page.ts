import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: {email:string, senha:string} = {email: 'carlos', senha: '123456'};
  msg;

  constructor() { }

  ngOnInit() {
  }

  clicou() {
    if (this.login.email == 'teste@teste.com' && this.login.senha == '123456')
      this.msg = "Sucesso";
    else
      this.msg = "Email ou senha incorreta";
  }

}

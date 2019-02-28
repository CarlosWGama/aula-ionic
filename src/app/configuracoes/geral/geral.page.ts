import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.page.html',
  styleUrls: ['./geral.page.scss'],
})
export class GeralPage implements OnInit {

  idioma: string = 'pt-BR';
  idiomas: {idioma: string, sigla: string}[] = [
    { idioma: "Português", sigla: 'pt-BR' },
    { idioma: "English", sigla: 'en' }
  ]

  constructor() { }

  ngOnInit() {
  }

  salvar() {
    console.log(this.idioma);
  }

}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

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

  constructor(private translate: TranslateService, private storage: Storage) { }

  ngOnInit() {
  }

  salvar() {
    this.translate.use(this.idioma);
    this.storage.set("idioma", this.idioma);
    console.log(this.idioma);
  }

}

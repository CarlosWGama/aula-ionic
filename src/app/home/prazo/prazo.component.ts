import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-prazo',
  templateUrl: './prazo.component.html',
  styleUrls: ['./prazo.component.scss']
})
export class PrazoComponent implements OnInit {

  @Input()
  prazo;
  dias:number = 0; //Dias de diferença
  status:number = 0; //-1 (Em dia) | 0 (Hoje)| 1 (Atrasado);

  constructor() { }

  ngOnInit() {
    //Recupera apenas YYYY-MM-DD atual
    let hoje = new Date().toISOString().split('T')[0]; 
    if (this.prazo > hoje) this.status = -1; //Em dia
    if (this.prazo == hoje) this.status = 0; //Hoje
    if (this.prazo < hoje) this.status = 1; //Atrasado

    //Pega a diferença absoluta (sempre positivo) em milisegundos
    let data1 = new Date(hoje);
    let data2 = new Date(this.prazo);
    let milisegundos = Math.abs(data1.getTime() - data2.getTime());
    
    //converte milisegundos para dias (milisegundos * segundos * minutos * horas)
    this.dias = Math.ceil(milisegundos / (1000 * 60 * 60 * 24));
  }
}

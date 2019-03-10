import { Injectable } from '@angular/core';
import { BancoService } from './banco.service';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService extends BancoService{

  protected tabela:string = 'tarefas';

  public cadastrar(tarefa: Tarefa) {
    delete tarefa.id;
    this.insert(tarefa);
  }
}

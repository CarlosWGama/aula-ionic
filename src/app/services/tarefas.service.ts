import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Tarefa } from '../models/tarefa';
@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  

  private db: firebase.database.Reference;

  constructor() {
    let userID = firebase.auth().currentUser.uid;
    this.db = firebase.database().ref('tarefas').child(userID);
  }

  /**
   * Cadastra um novo usuário
   * @param tarefa 
   */
  cadastrar(tarefa: Tarefa) {
    let uid = this.db.push().key;
    tarefa.id = uid;
    this.db.child(uid).set(tarefa);

  }

  /**
   * Edita uma tarefa
   * @param tarefa 
   */
  editar(tarefa: Tarefa) {
    this.db.child(tarefa.id).set(tarefa);
  }

  /**
   * Exclui uma tarefa
   * @param id 
   */
  excluir (id: string) {
    this.db.child(id).remove();
  }

  /**
   * BUsca todas tarefas de um usuário
   */
  async buscarTodos(): Promise<Tarefa[]> {
    return this.db.once('value').then(snapshot => {
      let tarefas = [];
      snapshot.forEach(tarefa => {
        tarefas.push(tarefa.val());
      })

      return tarefas;
    });
  }

  /**
   * Retorna a tarefa com ID informado
   * @param id 
   */
  async buscar(id: string): Promise<Tarefa> {
    return this.db.child(id).once('value').then(snapshot => {
      if (snapshot.exists())
        return snapshot.val();
      return null;
    });
  }
}

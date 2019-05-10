import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Tarefa } from '../models/tarefa';
@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  

  private db: firebase.firestore.CollectionReference;
  private userID;

  constructor() {
    this.userID = firebase.auth().currentUser.uid;
    this.db = firebase.firestore().collection('tarefas');
  }

  /**
   * Cadastra um novo usuário
   * @param tarefa 
   */
  cadastrar(tarefa: Tarefa) {
    let doc = this.db.doc();
    tarefa.id = doc.id;
    tarefa.usuarioID = this.userID;
    let obj = this.castObject(tarefa);
    doc.set(obj);
    
    //Ou
    // this.db.add(tarefa).then(doc => {
    //   tarefa.id = doc.id;
    //   doc.update({id:doc.id});
    // })
  }

  private castObject(classe: any): Object {
    let objeto = {};
    Object.keys(classe).forEach(chave => objeto[chave] = classe[chave]);
    return objeto;
  }

  /**
   * Edita uma tarefa
   * @param tarefa 
   */
  editar(tarefa: Tarefa) {
    this.db.doc(tarefa.id).set(tarefa);
  }

  /**
   * Exclui uma tarefa
   * @param id 
   */
  excluir (id: string) {
    this.db.doc(id).delete();
  }

  /**
   * BUsca todas tarefas de um usuário
   */
  async buscarTodos(): Promise<Tarefa[]> {
    return this.db.where('usuarioID', '==', this.userID).get().then(snapshot => {
      let tarefas = [];
      snapshot.forEach(doc => {
        tarefas.push(doc.data());
      })

      return tarefas;
    });
  }

  /**
   * Retorna a tarefa com ID informado
   * @param id 
   */
  async buscar(id: string): Promise<Tarefa> {
    return this.db.where('id', '==', id).where('usuarioID', '==', this.userID).get().then(snapshot => {
      let tarefa = null;
      snapshot.forEach(doc => tarefa = doc.data());
      return tarefa;
    });
  }
}

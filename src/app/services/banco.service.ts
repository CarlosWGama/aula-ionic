import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  protected tabela:string;

  constructor(private sqlite: SQLite) { 
    this.createDB();
  }

  private createDB() {
    this.getDB().then((db:SQLiteObject) => {
      //Criando Tabela Usuários
      db.executeSql("CREATE TABLE IF NOT EXISTS usuarios(\
        id INTEGER PRIMARY KEY AUTOINCREMENT,\
        email TEXT,\
        senha TEXT\
        )", []);

      //Criando tarefas 
      db.executeSql("CREATE TABLE IF NOT EXISTS tarefas(\
        id INTEGER PRIMARY KEY AUTOINCREMENT,\
        descricao TEXT,\
        data TEXT,\
        imagem DATE\
        )", []);
    });
  }
  /** Recupera o banco de dados  */
  protected getDB() {
    return this.sqlite.create({
      name: 'aula_banco.db',
      location: 'default'
    });
  }

  /** Método generico para inserir dados */
  public insert(obj: Object) {

    let key = Object.keys(obj);
    let values = Object.values(obj);
    let interrogacoes = new Array(key.length).fill('?');

    this.getDB().then((db:SQLiteObject) => {
      db.executeSql("INSERT INTO " + this.tabela + " (" + key.join(', ') + ") VALUES(" + interrogacoes.join(', ') + ")", values);
    });
  }

  /** Método generico para atualizar dados */
  public update(obj: Object, id:any) {

    let key = Object.keys(obj);
    let values = Object.values(obj);
    let campos:string[] = [];
    key.forEach((k, i) => {
      campos.push(k + ' = ?');
    }) 
    values.push(id);
    
    this.getDB().then((db:SQLiteObject) => {
      db.executeSql("UPDATE " + this.tabela + " SET " + campos.join(', ') + " WHERE id = ?", values);
    });
  }

  /** Método generico para atualizar dados */
  public delete(id:any) {
    this.getDB().then((db:SQLiteObject) => {
      db.executeSql("DELETE FROM " + this.tabela + " WHERE id = ?", [id]);
    });
  }

  public getAll(): Promise<any> {
    return this.getDB().then((db:SQLiteObject) => {
      return db.executeSql("SELECT * FROM " + this.tabela, []).then(resultado => {
        let retornar = [];
        if (resultado.rows.length > 0) {
          for(let i = 0; i < resultado.rows.length; i++) {
            retornar.push(resultado.rows.item(i));
          }
        }
        return retornar;
      })
    });
  }

  public getByID(id:any): Promise<any> {
    return this.getDB().then((db:SQLiteObject) => {
      return db.executeSql("SELECT * FROM " + this.tabela + " WHERE id = ?", [id]).then(resultado => {
        if (resultado.rows.length > 0)
          return resultado.rows.item(0);
        return null;
      })
    });
  }
}

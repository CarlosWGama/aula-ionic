import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './usuario.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { TarefaService } from './tarefa.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[UsuarioService, SQLite, TarefaService]
})
export class ServicesModule { }

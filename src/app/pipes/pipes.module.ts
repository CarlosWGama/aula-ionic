import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataBrasilPipe } from './data-brasil.pipe';

@NgModule({
  declarations: [DataBrasilPipe],
  imports: [
    CommonModule
  ],
  exports:[DataBrasilPipe]
})
export class PipesModule { }

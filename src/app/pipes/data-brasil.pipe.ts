import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataBrasil'
})
export class DataBrasilPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let data = value.toString().split('-');
    return data[2] + '/' + data[1] + '/' + data[0];
  }

}

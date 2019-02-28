import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[appPrazoBackground]'
})
export class PrazoBackgroundDirective implements OnInit {

  @Input('appPrazoBackground')
  prazo;

  ngOnInit() {
    let hoje = new Date().toISOString().split('T')[0];
    if (hoje > this.prazo)
      this.renderer.setElementProperty(this.elementRef.nativeElement, 'color', 'danger');
  }
  
  constructor(private elementRef: ElementRef, private renderer:Renderer) {  }

}

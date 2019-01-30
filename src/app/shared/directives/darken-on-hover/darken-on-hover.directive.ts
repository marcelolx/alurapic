import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

@Directive({
  selector: '[appDarkenOnHover]'
})
export class DarkenOnHoverDirective {

  @Input() brightness = '70%';

  constructor(
    private el: ElementRef, 
    private render: Renderer
  ) {}

  @HostListener('mouseover')
  darkenOn() {
    this.render.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
  }

  @HostListener('mouseleave')
  darkenOf() {
    this.render.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
  }

}

//https://cursos.alura.com.br/course/angular-autenticacao/task/44209
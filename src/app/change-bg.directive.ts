import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input() isCorrect: Boolean = false;
  constructor(private elem: ElementRef, private render: Renderer2) { }

  @HostListener('click') answer() {
    if(this.isCorrect) {
      this.render.setStyle(this.elem.nativeElement, 'background', '#00ff00');
      this.render.setStyle(this.elem.nativeElement, 'background', '#00ff00');
      this.render.setStyle(this.elem.nativeElement, 'background', '#00ff00');
    } else {
      this.render.setStyle(this.elem.nativeElement, 'background', 'red');
      this.render.setStyle(this.elem.nativeElement, 'background', 'red');
      this.render.setStyle(this.elem.nativeElement, 'background', 'red');
    }
  }


}

import { Directive, ElementRef, HostListener, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appTextareaAutoGrow]'
})
export class TextareaAutoGrowDirective implements AfterViewChecked {

  constructor(private el: ElementRef) { }

  ngAfterViewChecked(){
    this.el.nativeElement.style.height = "5px";
    this.el.nativeElement.style.height = (this.el.nativeElement.scrollHeight)+"px";
  }

  @HostListener('input') onInput() {
    this.el.nativeElement.style.height = "5px";
    this.el.nativeElement.style.height = (this.el.nativeElement.scrollHeight)+"px";
  }

}
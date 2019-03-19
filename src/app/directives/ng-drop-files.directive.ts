import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();


  constructor() { }


  @HostListener('dragover', ['$evenet'])
  public onDragEnter(event: any){
      this.mouseSobre.emit(true);
  }

  @HostListener('gragleave', ['$evenet'])
  public ondragLeave(event: any){
      this.mouseSobre.emit(false);  
  }

}

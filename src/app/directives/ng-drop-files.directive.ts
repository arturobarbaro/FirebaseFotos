import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos:FileItem[] = [];
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

  //Validaciones
  private _archivoPuedeSerCargado(archivo:File):boolean{
      (!this._archivoYaFueDrp(archivo.name)&&this._esImagen(archivo.type))?true:false;
  }

  private _prevenirDetener(e){
      e.preventDefault();
      e.stopPropagation();
  }

  private _archivoYaFueDrp(nombreArchivo: string):boolean{
      for (let archivo of this.archivos) {
          if(archivo.nombreArchivo==nombreArchivo){
              console.log(`El archivo ${nombreArchivo} ya fué añadido`);
              return true;
          }
      }
      return false;
  }

  private _esImagen(tipoArchivo: string):boolean{
      (tipoArchivo==''||tipoArchivo==undefined)?false:tipoArchivo.startsWith('image');
  }

}

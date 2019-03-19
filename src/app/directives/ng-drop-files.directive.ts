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
      this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$evenet'])
  public onDragLeave(event: any){
      this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$evenet'])
  public onDrop(event: any){
      this.mouseSobre.emit(false);
      const transferencia=this._getTransferencia(event);
      if (transferencia ){
          this._extraerArchivos(transferencia.files);
          this._prevenirDetener(event);
          this.mouseSobre.emit(false);
      }

  }

  private _getTransferencia(event:any){
      return event.dataTrasnfer? event.dataTrasnfer: event.originalEvent.dataTrasnfer;
  }

  private _extraerArchivos(archivosLista: FileList){
      console.log(archivosLista)
      for (let propiedad in Object.getOwnPropertyNames(archivosLista)) {
          const archivoT=archivosLista[propiedad];
          if(this._archivoPuedeSerCargado(archivoT)){
              const nuevoArch=new FileItem(archivoT);
              this.archivos.push(nuevoArch);
          }
      }
  }

  //Validaciones
  private _archivoPuedeSerCargado(archivo:File):boolean{
      if(!this._archivoYaFueDrp(archivo.name)&&this._esImagen(archivo.type)){
          return true;
      }
      return false;
  }

  private _prevenirDetener(e:any){
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
      if(tipoArchivo==''||tipoArchivo==undefined){
          return false
      }else if (tipoArchivo.startsWith('image')){
          return true;
      }
      return false;
  }

}

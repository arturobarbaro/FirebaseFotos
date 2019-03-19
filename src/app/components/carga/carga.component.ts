import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService } from 'src/app/providers/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];

  constructor(public _cargaImg: CargaImagenesService ) { }

  ngOnInit() {
  }

  cargarImagenes(){
    this._cargaImg.cargarImagenesFirebase(this.archivos);
  }

}

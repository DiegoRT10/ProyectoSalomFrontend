import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Map, marker, tileLayer } from 'leaflet';
import { mapTo } from 'rxjs';
import * as L from 'leaflet';
import { Coordenada, DireccionService, ID } from '../../services/direccion.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit{

  
  map:any;
  longitud!: string;

  carga!: boolean;

  private polygon: any;
  private coordinates: number[][] = [
    [14.800796, -89.544790],
    [14.800758, -89.544658],
    [14.800696, -89.544165],
    [14.800463, -89.542555],
    [14.800535, -89.543108],
    [14.800268, -89.541040],
    [14.800024, -89.539036]
  ];

  ListCoordenadas?:Coordenada[];

  ObjCoordenadas:Coordenada={
    latitud: '',
    longitud: '',
    id: ''
  }

  ObjCoordenadasOld:Coordenada={
    latitud: '',
    longitud: '',
    id: ''
  }

  ObjId:ID = {
    id: ''
  }

  constructor(private direccionService:DireccionService){

  }

  ngOnInit(): void {
    this.mapas()
    

    setInterval(() => {
      this.getCoordenadas();
    }, 8000);

  }

  mapas(): void {
    console.log('entre a mapas');
    //  this.map = new Map('map').setView([14.8012, -89.5421], 15);
    this.map = new Map('map').setView([14.800796, -89.544790], 15);

    tileLayer('https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
      attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 0,
      maxZoom: 22,
      subdomains: 'abcd',
      accessToken: 'dWEkrXd5H5laWG2CyiSd0K9PBColbhFH7MToodSFgkJoDVQeEpuRKibstrzgWRoH'
    }).addTo(this.map);

    // const farm1 = marker([14.800796, -89.544790]).addTo(map).bindPopup("Doctor Farma Guayacan");


this.polygon = L.polyline([]).addTo(this.map);



  }

  getCoordenadas(){
    console.log('entre a coordenadas');
    this.direccionService.ListCoordenada().subscribe(res => {
    this.ObjCoordenadas = <any>res;
    console.log('este es el res ',res);
    console.log('este es el objeto ',this.ObjCoordenadas);
    if(this.ObjCoordenadas != null && this.ObjCoordenadas != undefined ){
      console.log('entre al primer if');
      if(this.ObjCoordenadas.latitud != this.ObjCoordenadasOld.latitud && this.ObjCoordenadas.longitud != this.ObjCoordenadasOld.longitud ){
        console.log('entre a segundo if');
        const coordenadas = [this.ObjCoordenadas.latitud,this.ObjCoordenadas.longitud]
        this.polygon.addLatLng(coordenadas);
        this.map.setView([this.ObjCoordenadas.latitud, this.ObjCoordenadas.longitud], 15)
        this.ObjCoordenadasOld.latitud = this.ObjCoordenadas.latitud;
        this.ObjCoordenadasOld.longitud = this.ObjCoordenadas.longitud;
      }
    }
    
    },
      err => {
        console.log(err);
      }

    );
  }

  private addCoordinates() {
    if (this.coordinates.length > 0) {
      const coordinate = this.coordinates.shift();
      this.polygon.addLatLng(coordinate);
      
      setTimeout(() => this.addCoordinates(), 1000); // Espera 1 segundo antes de agregar la siguiente coordenada
    }
  }


  private setCoordenadas(){
    this.coordinates.push([Number(this.ObjCoordenadas.latitud), Number(this.ObjCoordenadas.longitud)]);
  }

}

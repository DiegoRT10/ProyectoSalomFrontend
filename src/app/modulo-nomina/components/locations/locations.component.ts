import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Map, marker, tileLayer } from 'leaflet';
import { mapTo } from 'rxjs';
import { CrudLocationService, Locations } from '../../services/crud-location.service';
import * as L from 'leaflet';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  map2:any;

  longitud!: string;

  ListaLocations?: Locations[];

  DelLocation: Locations = {
    id: '',
    name: '',
    address: '',
    latitud: '',
    longitud: '',
    visible:''
  }
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


  constructor(private crudLocationService: CrudLocationService, private router: Router) { }

  ngOnInit(): void {
    this.carga = true;

    this.mapas();
    this.listarLocations();
    this.addCoordinates();
  }

  ngAfterViewInit() {
    this.carga = false;
  }

  
  mapas(): void {
    const map = new Map('map').setView([14.8012, -89.5421], 15);
    this.map2 = map;

    tileLayer('https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
      attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 0,
      maxZoom: 22,
      subdomains: 'abcd',
      accessToken: 'dWEkrXd5H5laWG2CyiSd0K9PBColbhFH7MToodSFgkJoDVQeEpuRKibstrzgWRoH'
    }).addTo(map);

    const farm1 = marker([14.800796, -89.544790]).addTo(map).bindPopup("Doctor Farma Guayacan");

//     var polygon = new L.Polyline([
//       [14.800796, -89.544790],
//       [14.800758, -89.544658],
//       [14.800696, -89.544165],
//       [14.800463, -89.542555],
//       [14.800535, -89.543108],
//       [14.800268, -89.541040],
//       [14.800024, -89.539036]
//     ]).addTo(map);

//   polygon.bindPopup("holaaa");

//  polygon.openPopup();


this.polygon = L.polyline([]).addTo(map);


  
    // map.fitBounds([
    //   [farm1.getLatLng().lat, farm1.getLatLng().lng]
    // ]);

  }

  private addCoordinates() {
    if (this.coordinates.length > 0) {
      const coordinate = this.coordinates.shift();
      this.polygon.addLatLng(coordinate);
      
      setTimeout(() => this.addCoordinates(), 1000); // Espera 1 segundo antes de agregar la siguiente coordenada
    }
  }

  listarLocations() {
    this.crudLocationService.getLocations().subscribe(
      res => {
        this.ListaLocations = <any>res;

      },
      err => {
        console.log(err);
      }
    );

  }

  crear(): void {
    this.router.navigate(['create-location']);
  }

  Editar(id: String): void {
    localStorage.setItem('idL', <string>id);
    this.router.navigate(['update-location']);
  }

   Eliminar(id: any): void {
    this.DelLocation.id = id;
    this.DelLocation.visible='0';
    this.crudLocationService.delLocation(this.DelLocation).subscribe(
      res => {
        this.listarLocations();
      },
      err => {
        console.log(err);
      });
  }

  Ver(latitud:any, longitud:any, name:String) {
    const farm = marker([latitud, longitud]).addTo(this.map2).bindPopup(`${name}`).openPopup();
    this.map2.fitBounds([
      [farm.getLatLng().lat, farm.getLatLng().lng]
    ]);
  }



}









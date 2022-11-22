import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Map, marker, tileLayer } from 'leaflet';
import { mapTo } from 'rxjs';
import { CrudLocationService, Locations } from '../../services/crud-location.service';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  longitud!:string;

  ListaLocations?: Locations[];

  DelLocation: Locations ={
    id:'',
    name:'',
    address:'',
    latitud:'',
    longitud:''
    }



  constructor(private crudLocationService:CrudLocationService, private router:Router) { }

  ngOnInit(): void {
    this.mapas();
    this.listarLocations();
  }


  mapas():void{
    const map = new Map('map').setView([14.8012, -89.5421], 15);
    tileLayer('https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 0,
	maxZoom: 22,
	subdomains: 'abcd',
	accessToken: 'dWEkrXd5H5laWG2CyiSd0K9PBColbhFH7MToodSFgkJoDVQeEpuRKibstrzgWRoH'
}).addTo(map);

const farm1 = marker([14.800796, -89.544790]).addTo(map).bindPopup("Doctor Farma Guayacan");
// map.fitBounds([
//   [farm1.getLatLng().lat, farm1.getLatLng().lng]
// ]);

  }

  listarLocations(){
    this.crudLocationService.getLocations().subscribe(
      res=>{
        this.ListaLocations=<any>res;     
        console.log(this.ListaLocations);
        

      },
      err =>{
        console.log(err);
      }
    );
  
  }

  crear(): void{
    this.router.navigate(['create-etapa']);
  }

  Editar(id:String):void{
      localStorage.setItem('idE',<string>id);
      this.router.navigate(['update-etapa']); 
  }

  Eliminar(id:any):void{
    console.log('este es el id desde HTML '+id);
    this.DelLocation.id=id;
    console.log('este es el id desde de la Etapa '+id);
    this.crudLocationService.delLocation(id).subscribe(
      res => {
        console.log('Se elimino el puesto');
        this.listarLocations();
      },
      err => {
        console.log(err);
      });
  }

  Ver(latitud:string,longitud:string){}

}






  


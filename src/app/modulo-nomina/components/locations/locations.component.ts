import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
import { mapTo } from 'rxjs';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.mapas();
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
 
}

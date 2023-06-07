import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Locations, CrudLocationService } from '../../services/crud-location.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.css']
})
export class CreateLocationComponent implements OnInit {

  AggLocation: Locations ={
    id:'',
    name:'',
    address:'',
    latitud:'',
    longitud:'',
    visible:''
  }
  carga?: boolean;

  constructor(private crudLocationService:CrudLocationService, private router:Router) { }

  ngOnInit(): void {
    this.carga = true;
  }

  ngAfterViewInit() {
    this.carga = false;
  }

  AgregarLocation():void{
    this.crudLocationService.addLocation(this.AggLocation).subscribe(
      res => {
        this.router.navigate(['locations']);
      },
      err => {
        console.log(err)
      }
    );

  }

}

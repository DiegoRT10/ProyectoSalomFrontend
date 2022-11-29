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

  constructor(private crudLocationService:CrudLocationService, private router:Router) { }

  ngOnInit(): void {
    
  }

  AgregarLocation():void{
    this.crudLocationService.addLocation(this.AggLocation).subscribe(
      res => {
        console.log('Se agrego la location');
        this.router.navigate(['locations']);
      },
      err => {
        console.log(err)
      }
    );

  }

}

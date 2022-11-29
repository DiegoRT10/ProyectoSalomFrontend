import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudLocationService, Locations } from '../../services/crud-location.service';

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrls: ['./update-location.component.css']
})
export class UpdateLocationComponent implements OnInit {
  EditLocation: Locations ={
    id:'',
    name:'',
    address:'',
    latitud:'',
    longitud:'',
    visible:''
  }

  constructor(private crudLocationService:CrudLocationService, private router:Router) { }

  ngOnInit(): void {
    this.getOneLocation();
  }

  getOneLocation():void{
    const idEntrante = localStorage.getItem('idL');
    console.log('idL de entrada '+idEntrante);
    this.EditLocation.id = <String>idEntrante;

    if(idEntrante){
      this.crudLocationService.getOneLocation(this.EditLocation).subscribe(res=>{
        this.EditLocation = res[0];
        console.log(res);
      },
      err =>{
        console.log(err);
      }
        
        );
      }

  }



  EditarLocation():void{
    this.crudLocationService.editLocation(this.EditLocation).subscribe(
      res => {
        console.log('Se agrego la location');
        this.router.navigate(['location']);
      },
      err => {
        console.log(err)
      }
    );

  }

}
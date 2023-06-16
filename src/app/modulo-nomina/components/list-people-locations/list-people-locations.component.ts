import { Component, OnInit } from '@angular/core';
import { CrudProfileService, PeopleLocation } from '../../services/crud-profile.service';
import { Router } from '@angular/router';
import { PeopleLocationsComponent } from '../people-locations/people-locations.component';

@Component({
  selector: 'app-list-people-locations',
  templateUrl: './list-people-locations.component.html',
  styleUrls: ['./list-people-locations.component.css']
})
export class ListPeopleLocationsComponent implements OnInit{

  ListPeopleLocation?:PeopleLocation[];
  
  constructor(private router: Router, private ProfileServece: CrudProfileService){

  }

  ngOnInit(): void {
    this.ListarPeopleLocaations();
  }


  ListarPeopleLocaations():void{
    this.ProfileServece.getPeopleLocation().subscribe(res => {
  
      this.ListPeopleLocation = <any>res;
  
     },
       err => {
         console.log(err);
       }
 
     );
   
  }

  goPeopleLocations(idpeople:string, idlocation:string, meta:number, nivel:number, dia:number):void{
    PeopleLocationsComponent.CheckDataListPeopleLocation(idpeople,idlocation,meta,nivel,dia);
    this.router.navigate(['people-location']);
  }


}

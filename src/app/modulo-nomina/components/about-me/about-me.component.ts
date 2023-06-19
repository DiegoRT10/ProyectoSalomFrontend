import { Component, OnInit } from '@angular/core';
import { CrudProfileService, PIDs, Pass, People } from '../../services/crud-profile.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit{

  flag?:boolean;
  ListPeople?:People[];
  idPeople:PIDs={
    id:''
  };

  ObjPeopleLocation:Pass={
    id: '',
    apppassword: ''
  }
  constructor(private profileService: CrudProfileService){
    this.flag = false;
  }

  ngOnInit(): void {
    this.getDatos();
  }


  


  private getDatos(): void{
    const token = localStorage.getItem('token');
    let decodeToken:any = {}
    decodeToken = decode(token || '');
    this.idPeople.id = decodeToken.id;
    this.profileService.getPeople(this.idPeople).subscribe(res => {
      this.ListPeople = <any>res;
     },
       err => {
         console.log(err);
       }
 
     );
  }

  setFlasg(id:string, f:boolean):void{
    this.ObjPeopleLocation.id = id;
    if(!f){
      this.profileService.editPass(this.ObjPeopleLocation).subscribe(res => {
          this.getDatos();
       },
         err => {
           console.log(err);
         }
   
       );
    }else{}

    this.flag = f;
    
  }

  cancell(){
    this.flag = false;
  }

}

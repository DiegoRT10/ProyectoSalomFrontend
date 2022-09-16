import { CrudService, Users } from './../../services/crud.service';
import { Component, OnInit } from '@angular/core';
//import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  
ListarUsuarios?: Users[];
 
  
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {

   this.listarUsuarios();
  }

listarUsuarios(){
  this.crudService.getUser().subscribe(
    res=>{
      this.ListarUsuarios=<any>res;      
      console.log(this.ListarUsuarios);
    },
    err =>{
      console.log(err);
    }
  );

}
}

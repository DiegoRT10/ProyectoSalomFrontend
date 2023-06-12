import { CrudService, KEY, Users } from './../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

//import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  
loading?:boolean;  
ListarUsuarios?: Users[];
UsuarioD: Users={
  id:'',
  visible:''
}

Key : KEY={
  key: ''
}

  URL = environment.PORT;

  carga?: boolean;

  
  constructor(private crudService: CrudService, private router: Router) { 
    this.loading=true;}

  ngOnInit(): void {
    this.carga = true;
   this.listarUsuarios();

  }

  ngAfterViewInit() {
    this.carga = false;
  }

listarUsuarios(){
  this.Key.key = "corposalom23";
  this.crudService.getUser(this.Key).subscribe(
    res=>{
      this.ListarUsuarios=<any>res;     
      this.loading=false;
    },
    err =>{
      console.log(err);
    }
  );

}




EliminarUsuario(id:String, visible:number){
  this.UsuarioD.id=id;
  this.UsuarioD.visible=0;//eliminacion logica
  this.crudService.deleteUser(this.UsuarioD).subscribe(
    res=>{
      this.listarUsuarios();
    },
    err =>{
      console.log(err);
    });
}

ModificarUsuario(id:String){
  this.router.navigate(['/update/'+id]);
}






}



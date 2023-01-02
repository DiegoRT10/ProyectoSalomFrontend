import { CrudService, Users } from './../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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

  
  constructor(private crudService: CrudService, private router: Router) { 
    this.loading=true;}

  ngOnInit(): void {

   this.listarUsuarios();



  }

listarUsuarios(){
  this.crudService.getUser().subscribe(
    res=>{
      this.ListarUsuarios=<any>res;     
      console.log(this.ListarUsuarios);
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
      console.log('Equipo eliminado');
      console.log('Datos: '+this.UsuarioD);
      console.log('id: '+id+' '+visible);
      this.listarUsuarios();
    },
    err =>{
      console.log(err);
    });
}

ModificarUsuario(id:String){
  console.log('este es el id '+id);
  this.router.navigate(['/update/'+id]);
}
}

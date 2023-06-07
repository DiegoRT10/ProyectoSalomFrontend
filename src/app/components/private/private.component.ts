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
  this.crudService.getUser().subscribe(
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

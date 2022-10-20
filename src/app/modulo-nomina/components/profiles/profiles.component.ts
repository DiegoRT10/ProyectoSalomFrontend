import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService, Users } from 'src/app/services/crud.service';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  ListarUsuarios?: Users[];
  bandera:number = 1;
  constructor(private crudService: CrudService,
    private router: Router) { }

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

  goProfileGerencia(id:String):void{
    localStorage.setItem('id',<string>id);
    this.router.navigate(['profile']);
  }

}

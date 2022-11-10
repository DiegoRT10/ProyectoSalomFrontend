import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users,CrudService } from 'src/app/services/crud.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Usuario: Users ={
    id:'',
    name:'',
    apppassword:'',
    card:0,
    role:0,
    visible:1,
    image:'',
    auditor:0,
    token:null,
    tokenLife:null,
  };
  constructor(private CrudService:CrudService,private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    const idL = localStorage.getItem('id');
    
    this.Usuario.id=<String>idL;
    if(idL){
      this.CrudService.getOneUser(this.Usuario).subscribe(res=>{
        this.Usuario = res[0];
        console.log(this.Usuario.name);
      },
      err =>{
        console.log(err);
      });
    }
      

  }

  goUpdateProfile():void{
    this.router.navigate(['update-profile']);
  }
    
}



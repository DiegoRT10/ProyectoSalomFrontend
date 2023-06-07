import { FormBuilder, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import {CrudService, Users } from 'src/app/services/crud.service';
import { __values } from 'tslib';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  public formLogin!: FormGroup;
  public files: any = [];
  public previous: String = '';
  public loading!: boolean;

  carga?: boolean;

  patIMG:string = '';

  valido:boolean=false;

  ngSelect:String = '';

  listaOpAudi:String[] =['Si', 'No'];

  listaOp:String[] = ['Sistemas','Gerente', 'Administrador','Invitado'];

  EditUsuario: Users ={
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

  public FormUpdate!: FormGroup;


  constructor(private CrudService:CrudService, 
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.carga = true;
    this.Usuarios();
  }
  
  ngAfterViewInit() {
    this.carga = false;
  }


  Usuarios():void{
    const idEntrante = <String>this.activatedRoute.snapshot.params['id'];
    this.EditUsuario.id = idEntrante;

    if(idEntrante){
      this.CrudService.getOneUser(this.EditUsuario).subscribe(res=>{
        this.EditUsuario = res[0];

        
        let opRol=this.EditUsuario.role;
        let opAudi=this.EditUsuario.auditor;
        this.AsignarRol(opRol);
        this.AsignarAuditor(opAudi);
        this.patIMG = this.EditUsuario.image;
      },
      err =>{
        console.log(err);
      });
    }

    this.FormUpdate = this.formBuilder.group({
      id: ['',[Validators.required]],
      name: ['',[Validators.required]]
    })

    this.valido = this.FormUpdate.valid;
    this.FormUpdate.patchValue(this.EditUsuario)

  }

  EditarUsuario(){
    switch(<any>this.EditUsuario.role){
      case 'Sistemas':
        this.EditUsuario.role=0;
        break
      case 'Gerente':
        this.EditUsuario.role=1;
        break;
      case 'Administrador':
        this.EditUsuario.role=2
        break;
      case 'Invitado':
        this.EditUsuario.role=3
        break;
    }

    switch(<any>this.EditUsuario.auditor){
      case 'No': this.EditUsuario.auditor = 0;
      break;
      case 'Si': this.EditUsuario.auditor = 1;
      break; 
    }

    this.EditUsuario.visible=1;
    if(!this.EditUsuario.token){
      this.EditUsuario.token=null;
    }
    if(!this.EditUsuario.tokenLife){
      this.EditUsuario.tokenLife=null
    }
    this.CrudService.editUser(this.EditUsuario).subscribe(
      res=>{

        if(this.EditUsuario.image != this.patIMG){

        try {
          this.loading = true;
          const formularioDeDatos = new FormData();
          this.files.forEach((archivo: string | Blob) => {
            formularioDeDatos.append('file', archivo)
          })
          // formularioDeDatos.append('_id', 'MY_ID_123')
          this.EditUsuario.image = formularioDeDatos;
          this.CrudService.uploadFile(formularioDeDatos)
            .subscribe((res: any) => {
              this.loading = false;

            }, () => {
              this.loading = false;
              alert('Error');
            })
        } catch (e) {
          this.loading = false;
          console.log('ERROR', e);

        }
      }

        this.router.navigate(['private']);
      },
      err =>{
        console.log(err);
      });
  };


  capturarFile(event: any): any {
    const fileCapt = event.target.files[0];
    this.extraerBase64(fileCapt).then((imagen: any) => {
      this.previous = imagen.base;
    });
    this.files.push(fileCapt);
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return $event;
    }
  });

  UploadFile(): any {

    if(this.EditUsuario.image != this.patIMG){

   

    try {
      this.loading = true;
      const formularioDeDatos = new FormData();
      this.files.forEach((archivo: string | Blob) => {
        formularioDeDatos.append('file', archivo)
      })

      formularioDeDatos.append('id', `${this.EditUsuario.id}`);
      this.CrudService.uploadFile(formularioDeDatos)
        .subscribe((res: any) => {
          this.loading = false;

        }, () => {
          this.loading = false;
          alert('Error');
        })
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);

    }
  }

  }

  setRol(event:any):void{
    let data = event.target.value;
    this.EditUsuario.role = data;
  }

  AsignarRol(op:any):void{
    if(op==0){
      this.EditUsuario.role = 'Sistemas';
    }
    if(op==1){
      this.EditUsuario.role = 'Gerente';
    }
    if(op==2){
      this.EditUsuario.role = 'Administrador';
    }
    if(op==3){
      this.EditUsuario.role = 'Invitado';
    }

    }



    setAuditor(event:any):void{
      let data = event.target.value;
      this.EditUsuario.auditor = data;
    }

    AsignarAuditor(op:any):void{
      if(op==0){
        this.EditUsuario.auditor = 'No';
      }
      if(op==1){
        this.EditUsuario.auditor = 'Si';
      }
  
      }
  

}

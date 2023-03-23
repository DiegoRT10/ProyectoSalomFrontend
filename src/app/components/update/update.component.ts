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
    console.log('id de entrada: '+idEntrante);
    this.EditUsuario.id = idEntrante;

    if(idEntrante){
      this.CrudService.getOneUser(this.EditUsuario).subscribe(res=>{
        this.EditUsuario = res[0];

        
        let opRol=this.EditUsuario.role;
        let opAudi=this.EditUsuario.auditor;
        this.AsignarRol(opRol);
        console.log('Audi? '+this.EditUsuario.auditor)
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
    console.log('Role a editar',this.EditUsuario.role);
    console.log('Audi a editar',this.EditUsuario.auditor);
    console.log('Imagen ',this.EditUsuario.image);

    switch(<any>this.EditUsuario.role){
      case 'Sistemas':
        this.EditUsuario.role=0;
        console.log(this.EditUsuario.role);
        break
      case 'Gerente':
        this.EditUsuario.role=1;
        console.log(this.EditUsuario.role);
        break;
      case 'Administrador':
        this.EditUsuario.role=2
        console.log(this.EditUsuario.role);
        break;
      case 'Invitado':
        this.EditUsuario.role=3
        console.log(this.EditUsuario.role);
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
        console.log('Se edito el usuario');

        if(this.EditUsuario.image != this.patIMG){

        try {
          this.loading = true;
          const formularioDeDatos = new FormData();
          this.files.forEach((archivo: string | Blob) => {
            formularioDeDatos.append('file', archivo)
          })
          // formularioDeDatos.append('_id', 'MY_ID_123')
          console.log('formDatos ' + formularioDeDatos);
          this.EditUsuario.image = formularioDeDatos;
          console.log('image' + this.EditUsuario.image);
          this.CrudService.uploadFile(formularioDeDatos)
            .subscribe((res: any) => {
              this.loading = false;
              console.log('Respuesta del servidor', res);

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

      console.log(imagen);
    });
    this.files.push(fileCapt);
    // console.log(event.target.files)
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
      // console.log('formDatos '+formularioDeDatos);
      // this.AggUsuario.image=formularioDeDatos;
      // console.log('image'+this.AggUsuario.image);
      this.CrudService.uploadFile(formularioDeDatos)
        .subscribe((res: any) => {
          this.loading = false;
          console.log('Respuesta del servidor', res);

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
    console.log('rol ', data);
  }

  AsignarRol(op:any):void{
    console.log('esta es una opcion',op);
    if(op==0){
      this.EditUsuario.role = 'Sistemas';
      console.log('funcion rol',this.EditUsuario.role);
    }
    if(op==1){
      this.EditUsuario.role = 'Gerente';
      console.log('funcion rol',this.EditUsuario.role);
    }
    if(op==2){
      this.EditUsuario.role = 'Administrador';
      console.log('funcion rol',this.EditUsuario.role);
    }
    if(op==3){
      this.EditUsuario.role = 'Invitado';
      console.log('funcion rol',this.EditUsuario.role);
    }

    }



    setAuditor(event:any):void{
      let data = event.target.value;
      this.EditUsuario.auditor = data;
      console.log('Auditor ', data);
    }

    AsignarAuditor(op:any):void{
      console.log('esta es una opcion',op);
      if(op==0){
        this.EditUsuario.auditor = 'No';
        console.log('funcion audi',this.EditUsuario.auditor);
      }
      if(op==1){
        this.EditUsuario.auditor = 'Si';
        console.log('funcion audi',this.EditUsuario.auditor);
      }
  
      }
  

}

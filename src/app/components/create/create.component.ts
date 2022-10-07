import { CrudService, Users } from 'src/app/services/crud.service';
import { Component, OnInit } from '@angular/core';
//import { CrudService, Users } from './../../services/crud.service';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public formLogin!: FormGroup;
  public files: any = [];
  public previous: String = '';
  public loading!: boolean;


  listaOp: String[] = ['Sistemas', 'Gerente', 'Administrador', 'Invitado'];
  listaOpAudi: String[] = ['Si', 'No'];

  AggUsuario: Users = {
    id: '',
    name: '',
    apppassword: '',
    card: 0,
    role: 0,
    visible: 1,
    image: '',
    auditor: 0,
    token: null,
    tokenLife: null,
  };


  constructor(private CrudService: CrudService, private router: Router, private formBuilder: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {


    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });


  }

  AgregarUsuario() {
    this.AggUsuario.visible = 1;
    if (!this.AggUsuario.token) {
      this.AggUsuario.token = null;
    }
    if (!this.AggUsuario.tokenLife) {
      this.AggUsuario.tokenLife = null
    }
    switch (<any>this.AggUsuario.role) {
      case 'Sistemas':
        this.AggUsuario.role = 0;
        console.log(this.AggUsuario.role);
        break
      case 'Gerente':
        this.AggUsuario.role = 1;
        console.log(this.AggUsuario.role);
        break;
      case 'Administrador':
        this.AggUsuario.role = 2
        console.log(this.AggUsuario.role);
        break;
      case 'Invitado':
        this.AggUsuario.role = 3
        console.log(this.AggUsuario.role);
        break;
    }

    switch (<any>this.AggUsuario.auditor) {
      case 'No': this.AggUsuario.auditor = 0;
        break;
      case 'Si': this.AggUsuario.auditor = 1;
        break;
    }

    this.CrudService.addUser(this.AggUsuario).subscribe(
      res => {
        console.log('Se agrego el usuario');
        try {
          this.loading = true;
          const formularioDeDatos = new FormData();
          this.files.forEach((archivo: string | Blob) => {
            formularioDeDatos.append('file', archivo)
          })
          // formularioDeDatos.append('_id', 'MY_ID_123')
          console.log('formDatos ' + formularioDeDatos);
          this.AggUsuario.image = formularioDeDatos;
          console.log('image' + this.AggUsuario.image);
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
        this.router.navigate(['private']);
      },
      err => {
        console.log(err);
      });






  }


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
    try {
      this.loading = true;
      const formularioDeDatos = new FormData();
      this.files.forEach((archivo: string | Blob) => {
        formularioDeDatos.append('file', archivo)
      })

      formularioDeDatos.append('id', `${this.AggUsuario.id}`);
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import * as moment from 'moment';
import decode from 'jwt-decode';
import { Router } from '@angular/router';
import { CrudProfileService, PIDs, PeopleLocation } from '../../services/crud-profile.service';
import { CrudLocationService, LIDs } from '../../services/crud-location.service';

@Component({
  selector: 'app-people-locations',
  templateUrl: './people-locations.component.html',
  styleUrls: ['./people-locations.component.css']
})
export class PeopleLocationsComponent implements OnInit{
  PIDs = [''];
  LIDs = [''];
  LNivel = ['TITULAR TEMPORAL','TITULAR','TITULAR SEGUNDO','APOYO'];
  nivel = '';
  ListaPIDs?:PIDs[];
  ListaLIDs?:LIDs[];
  ListaPeopleLocations?:PeopleLocation[];
  

ObjectPIDs:PIDs={
  id: ''
}

ObjectLIDs:LIDs={
  id: ''
}

static ObjectPeopleLocations:PeopleLocation={
  idpeople: '',
  idlocation: '',
  meta: 0,
  nivel: 0,
  dia: 0
}



  constructor( private router: Router, private ProfileServece: CrudProfileService, private LocationService: CrudLocationService) { }

  ngOnInit(): void {
    this.getIDsPeople();
    this.getIDsLocation();
  }

  public get IdPeople() : string {
    return PeopleLocationsComponent.ObjectPeopleLocations.idpeople;
  }
  
  public set IdPeople(v : string) {
    PeopleLocationsComponent.ObjectPeopleLocations.idpeople = v;
  }
  
  
  public get IdLocation() : string {
    return PeopleLocationsComponent.ObjectPeopleLocations.idlocation;
    }

  public set IdLocation(v : string) {
      PeopleLocationsComponent.ObjectPeopleLocations.idlocation = v;
    }


  public get Meta() : number {
      return PeopleLocationsComponent.ObjectPeopleLocations.meta;
      }

  public set Meta(v : number) {
        PeopleLocationsComponent.ObjectPeopleLocations.meta = v;
      }

  
  public get Nivel() : number {
    return PeopleLocationsComponent.ObjectPeopleLocations.nivel;
  }
      
  public set Nivel(v : number) {
        PeopleLocationsComponent.ObjectPeopleLocations.nivel = v;
      }

  
  public get Dia() : number {
    return PeopleLocationsComponent.ObjectPeopleLocations.dia
  }
  

  public set Dia(v : number) {
        PeopleLocationsComponent.ObjectPeopleLocations.dia = v;
      }
      
            


  @ViewChild('instance', { static: true }) instance: NgbTypeahead | undefined;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();

	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => this.instance!.isPopupOpen()));
		const inputFocus$ = this.focus$;
   

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) =>
				(term === '' ? this.PIDs : this.PIDs.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
			),
		);
	};



    
  @ViewChild('instance', { static: true }) instance2: NgbTypeahead | undefined;
	focus2$ = new Subject<string>();
	click2$ = new Subject<string>();

	search2: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click2$.pipe(filter(() => this.instance2!.isPopupOpen()));
		const inputFocus$ = this.focus2$;
   

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) =>
				(term === '' ? this.LIDs : this.LIDs.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
			),
		);
	};




  @ViewChild('instance', { static: true }) instance3: NgbTypeahead | undefined;
	focus3$ = new Subject<string>();
	click3$ = new Subject<string>();

	search3: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click3$.pipe(filter(() => this.instance3!.isPopupOpen()));
		const inputFocus$ = this.focus3$;
   

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map((term) =>
				(term === '' ? this.LNivel : this.LNivel.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10),
			),
		);
	};






  getIDsPeople(): void {
    this.ProfileServece.getProfileId().subscribe(res => {
      this.ListaPIDs = <any>res;

      for (const i of this.ListaPIDs!) {
        this.PIDs.push( <any>i.id);     
      }
      
    },
      err => {
        console.log(err);
      }

    );
  }

  getIDsLocation(): void {
    this.LocationService.getLocationsID().subscribe(res => {
      this.ListaLIDs = <any>res;
    
      for (const i of this.ListaLIDs!) {
        this.LIDs.push( <any>i.id);     
      }
    },
      err => {
        console.log(err);
      }

    );
  }

  sendData():void{
   
    console.log(PeopleLocationsComponent.ObjectPeopleLocations.nivel);
    switch(<any>PeopleLocationsComponent.ObjectPeopleLocations.nivel){
      case 'TITULAR TEMPORAL': PeopleLocationsComponent.ObjectPeopleLocations.nivel = 0;
      break;
      case 'TITULAR': PeopleLocationsComponent.ObjectPeopleLocations.nivel = 1;
      break;
      case 'TITULAR SEGUNDO': PeopleLocationsComponent.ObjectPeopleLocations.nivel = 2;
      break;
      case 'APOYO': PeopleLocationsComponent.ObjectPeopleLocations.nivel = 3;
      break;
    }


    console.log("Datos de people location ", PeopleLocationsComponent.ObjectPeopleLocations);

      this.ProfileServece.setLocationPeople(PeopleLocationsComponent.ObjectPeopleLocations).subscribe(res => {
       console.log(res);    
       this.router.navigate(['list-people-location']);
      
      },
        err => {
          console.log(err);
        }
  
      );
    


  }


  public static CheckDataListPeopleLocation(idpeople:string, idlocation:string, meta:number, nivel:number, dia:number):void{
    this.ObjectPeopleLocations.idpeople = idpeople;
    this.ObjectPeopleLocations.idlocation = idlocation;
    this.ObjectPeopleLocations.meta = meta;
   
    switch(nivel){
      case 0: PeopleLocationsComponent.ObjectPeopleLocations.nivel = <any>'TITULAR TEMPORAL';
      break;
      case 1: PeopleLocationsComponent.ObjectPeopleLocations.nivel = <any>'TITULAR';
      break;
      case 2: PeopleLocationsComponent.ObjectPeopleLocations.nivel = <any>'TITULAR SEGUNDO';
      break;
      case 3: PeopleLocationsComponent.ObjectPeopleLocations.nivel = <any>'APOYO';
      break;
    }
    this.ObjectPeopleLocations.dia = dia;
   
  }


}

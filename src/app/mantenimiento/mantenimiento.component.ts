import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit{
  @ViewChild('myElement') myElementRef!: ElementRef;
  
  constructor(){

  }
  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    // Aquí puedes enfocar el elemento después de que la vista se haya inicializado completamente
    this.myElementRef.nativeElement.focus();
  }
}

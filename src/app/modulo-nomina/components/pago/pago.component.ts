import { Component, OnInit } from '@angular/core';
import { MessageWP, SmsService } from '../../services/sms.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit{

  dataMessage: MessageWP = {
    number: 0,
    message: ''
  }

  constructor(private serviceSMS: SmsService){

  }

  ngOnInit(): void {
    
  }

  MenssageSend() {
    this.serviceSMS.sendMessage(this.dataMessage).subscribe(
      res => {
        console.log(<any>res);
      },
      err => {
        console.log(err);
      }
    );

  }

}

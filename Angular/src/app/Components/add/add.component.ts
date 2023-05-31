import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { Tickets } from 'src/Domains/Tickets';
import { AwsService } from 'src/Services/aws.service';
import { Validators } from './validators';


const listMsg = {
  notNumber: "Deve essere un numero",
  ip: "IP non valido"
};


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {


  @Input() ticket: Tickets = new Tickets();
  @Output() fatto = new EventEmitter<boolean>();

  ticketfrm: FormGroup;

  constructor(public awsService: AwsService, public fb: FormBuilder, private router: Router) {
    this.ticketfrm = fb.group(new Tickets());
    if(awsService.ticket.id != -1) {
      this.ticket = {
        id: awsService.ticket.id, 
        username: awsService.ticket.username, 
        ip_caller: awsService.ticket.ip_caller, 
        ip_server: awsService.ticket.ip_server, 
        url_path_server: awsService.ticket.url_path_server, 
        patient: awsService.ticket.patient, 
        hospital: awsService.ticket.hospital, 
        department: awsService.ticket.department, 
        description: awsService.ticket.description, 
        attachment: awsService.ticket.attachment, 
        attachment_type: awsService.ticket.attachment_type, 
        valid: awsService.ticket.valid
      }
      awsService.resetTicket();
    }
  }

  ngOnInit(): void {
    this.ticketfrm = this.fb.group({
      'id': [this.ticket.id], 
      //'username': [this.ticket.username], 
      // 'ip_caller': [this.ticket.ip_caller], 
      // 'ip_server': [this.ticket.ip_server],
      // 'patient': [this.ticket.patient],
      //'valid': [this.ticket.valid]
      'username': new FormControl(this.ticket.username, [Validators.isNumber()]),      
      'ip_caller': new FormControl(this.ticket.ip_caller, [Validators.ip()]),           
      'ip_server': new FormControl(this.ticket.ip_server, [Validators.ip()]),
      'url_path_server': [this.ticket.url_path_server],      
      'patient': new FormControl(this.ticket.patient, [Validators.isNumber()]),
      'hospital': [this.ticket.hospital],
      'department': [this.ticket.department],
      'description': [this.ticket.description],
      'attachment': [this.ticket.attachment],
      'attachment_type': [this.ticket.attachment_type],
      'valid': new FormControl(this.ticket.valid, [Validators.isNumber()]),
    })
  }

  onSubmit() {
    console.log(this.ticketfrm.value);
    if(this.ticketfrm.value.id == null) {
      this.awsService.insertTicket(this.ticketfrm.value).subscribe(res => {
        this.fatto.emit(true);
        this.goToDashboard();
      })
    } else {
      this.awsService.updateTicket(this.ticketfrm.value).subscribe(res => {
        this.fatto.emit(true);
        this.goToDashboard();
      })
    }

  }

  annulla() {    
    this.fatto.emit(false);
    this.goToDashboard();
  }

  goToDashboard() {
    this.router.navigate(['dashboard']);
  }

  getErrorMessage_field(element: string) {
    let err = "";

    if (this.ticketfrm.get(element).errors) {
      
      Object.entries(this.ticketfrm.get(element).errors).forEach(
        ([errorName, errorValue]) => {
            err = listMsg[errorName];
        }
      );
    };
    
    return err;
  }


}

import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AwsService } from 'src/Services/aws.service';
import { Tickets } from 'src/Domains/Tickets';

@Component({
  selector: 'app-dashboar',
  templateUrl: './dashboar.component.html',
  styleUrls: ['./dashboar.component.css']
})
export class DashboarComponent {

  displayedColumns: string[] = ['id', 'username', 'patient', 'hospital', 'department', 'description', 'bottoni'];

  ticket$: Observable<Tickets[]> = new Observable<Tickets[]>();


  constructor(public awsService: AwsService, private router: Router) {
    this.ticket$ = this.awsService.getTicket();
    
    
  }

  canc(id: number) {
    this.awsService.deleteTicket(id).subscribe(res => {
      this.ticket$ = this.awsService.getTicket();
    })

  }

  update(ticket: Tickets) {
    this.awsService.setTicket(ticket);
    this.router.navigate(['add']);
    
  }


}

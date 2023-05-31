import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tickets } from 'src/Domains/Tickets';

@Injectable({
  providedIn: 'root'
})

export class AwsService {

  path: string = "https://grfedhahpd.execute-api.us-east-1.amazonaws.com/prod/api/";
  ticket : Tickets = new Tickets();
  setTicket(element: Tickets) { 
    this.ticket = element;
    
  }
  resetTicket() {
    this.ticket.id = -1
  }

  constructor(public http: HttpClient) {
    this.ticket.id = -1;
  }

  getTicket(): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(this.path + "get-ticket");

  }

  insertTicket(ticket: any) {
    console.log('Provo ad inserire');
    
    
    const body = JSON.stringify(ticket)
    
    return this.http.post<any>(this.path + "insert-ticket", body);
  }

  deleteTicket(id: number) {
    //TODO: da impostare i controlli su ID
    
    return this.http.delete<number>(this.path + "delete-ticket/" + id);
  }

  updateTicket(ticket: Tickets): Observable<any>{
    //TODO: da impostare i controlli su ID
    const url = this.path + "update-ticket/" + ticket.id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    const body = JSON.stringify({description: ticket.description});

    console.log(url);    
    console.log(body);

    return this.http.put(url, body, httpOptions);
  }

}

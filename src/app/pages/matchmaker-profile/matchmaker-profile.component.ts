import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-matchmaker-profile',
  templateUrl: './matchmaker-profile.component.html',
  styleUrls: ['./matchmaker-profile.component.scss']
})
export class MatchmakerProfileComponent implements OnInit {

  res : any;
  constant : any =[];

  constructor(public http : HttpClient) { }

  ngOnInit() {
   
    const headers = new HttpHeaders({
      'Content-Type': 'Application/json',  
      // 'id' : localStorage.getItem('mmID'),
    })

  
   this.http.get('http://matchmakerz.in/api/v1/client/get-matchmaker?id='+localStorage.getItem('mmID'), {headers : headers}).subscribe((res) => {
     this.constant=res;
     console.log(res);
   })
  }

}

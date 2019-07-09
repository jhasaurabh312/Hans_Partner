import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-matchmaker-profile',
  templateUrl: './matchmaker-profile.component.html',
  styleUrls: ['./matchmaker-profile.component.scss'],
   providers: [NgbModalConfig, NgbModal]
})
export class MatchmakerProfileComponent implements OnInit {

  res : any;
  member : any =[];
  getTouch:FormGroup;
  value: any;
  constructor(private http : HttpClient,private _formBuilder: FormBuilder,config: NgbModalConfig, private modalService: NgbModal, private router : Router) {
     config.backdrop = 'static';
    config.keyboard = false;
        this. getTouch= this._formBuilder.group({
      'phone_number' : '',

    });; 
  }

  ngOnInit() {
   
    const headers = new HttpHeaders({
      'Content-Type': 'Application/json',  
    })

  
   this.http.get('http://matchmakerz.in/api/v1/client/get-matchmaker?id='+localStorage.getItem('matchmaker_id'), {headers : headers}).subscribe((res) => {
     this.member=res;
     this.value = this.member.data[0];
     console.log(this.value);
   })
  }
  open(content) {
    this.modalService.open(content);
  }
  touch(){
    const NewProfile  = new FormData();
    NewProfile.append('is_working', this.getTouch.value.phone_number );   
      console.log(this.getTouch.value.phone_number)
    }


    subscribe(){
      this.router.navigate(['/subscribe'], { queryParams: { client_id: localStorage.getItem('client_id'), matchmaker_id: localStorage.getItem('matchmaker_id') } });
    }

    register(){
      this.router.navigate(['/personal-details']);
    }
}

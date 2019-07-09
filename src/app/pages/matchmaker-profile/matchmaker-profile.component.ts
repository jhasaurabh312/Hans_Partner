import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


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
  constructor(private http : HttpClient,private _formBuilder: FormBuilder,config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute) {
     config.backdrop = 'static';
    config.keyboard = false;
        this. getTouch= this._formBuilder.group({
      'phone_number' : '',

    });; 
  }

  ngOnInit() {
   const matchmaker_id: string = this.route.snapshot.queryParamMap.get('matchmaker_id');
   console.log(matchmaker_id)
    const headers = new HttpHeaders({
      'Content-Type': 'Application/json',  
      // 'id' : localStorage.getItem('mmID'),
    })

  
   this.http.get('http://matchmakerz.in/api/v1/client/get-matchmaker?id='+matchmaker_id, {headers : headers}).subscribe((res) => {
     this.member=res;
     console.log(this.member.data[0]);
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
}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModalConfig, NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
// <<<<<<< HEAD
import { ActivatedRoute } from '@angular/router';
// =======
import { Router } from '@angular/router';
import {
  SnackService
} from '../services/snack.service'

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
  client_id:any;
  getPlans:FormGroup;
  matchmaker_id:any=82;
  modalReference: any;
  lead_res:any
// <<<<<<< HEAD
  constructor(private http : HttpClient,private _formBuilder: FormBuilder,config: NgbModalConfig,public snack: SnackService,private modalService: NgbModal,private route: ActivatedRoute, private router : Router) {
// =======
  // constructor(private http : HttpClient,private _formBuilder: FormBuilder,config: NgbModalConfig, private modalService: NgbModal, private router : Router) {
// >>>>>>> beab7c4ca5212bdc31bd90ed9224a59ab5539656
     config.backdrop = 'static';
    config.keyboard = false;
        this. getTouch= this._formBuilder.group({
      'phone_number' : '',
      'name' : '',

    });
  }

  ngOnInit() {
   this.matchmaker_id = this.route.snapshot.queryParamMap.get('id');
   console.log(this.matchmaker_id)
    const headers = new HttpHeaders({
      'Content-Type': 'Application/json',  
    })

  
   this.http.get('https://matchmakerz.in/api/v1/client/get-matchmaker?id='+this.route.snapshot.queryParamMap.get('id'), {headers : headers}).subscribe((res) => {
     this.member=res;

     if(this.member.data[0].profile_pic==null)
       this.member.data[0].profile_pic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy08cK8wogTcvUJYvty4hAPwvKxTIJEqneUkNc3r4CBLkroZyn';
     
      this.value = this.member.data[0];

     console.log(this.value);
   })
  }
  open(content) {
   this.modalReference = this.modalService.open(content);
  }
  touch(){
    const NewProfile  = new FormData();
    NewProfile.append('phone_number', this.getTouch.value.phone_number );   
    NewProfile.append('name', this.getTouch.value.name );   
    NewProfile.append('matchmaker_id',this.route.snapshot.queryParamMap.get('id') );   
        const headers = new HttpHeaders({
      'Content-Type': 'Application/json',  
    })

  this.http.post('https://matchmakerz.in/api/v1/client/get-in-touch', NewProfile).subscribe((res) => {
      console.log(res)
      this.lead_res = res;
                           if (this.lead_res.status === 1) {
          this.snack.openSnackBar(this.lead_res.message, 'success')

        } else {
          this.snack.openSnackBar(this.lead_res.message, 'error')

        }
                this.modalReference.close();

     })
    }
    // 347bff
gotMyMatch(){
     window.open('https://matchmakerz.in/dashboard/get-otp', "_blank");

}

    subscribe(plan){
          // this.modelRef.close();
          this.modalReference.close();
          const NewProfile  = new FormData();
          console.log(this.getPlans.value.phone_number)
      NewProfile.append('is_working', this.getPlans.value.phone_number );
      this.router.navigate(['/subscribe'], { queryParams: { client:this.getPlans.value.phone_number, id: this.route.snapshot.queryParamMap.get('id') } });
    }

    register(){
      this.router.navigate(['/personal-details'],{ queryParams: { id: this.route.snapshot.queryParamMap.get('id') } });
    }
}

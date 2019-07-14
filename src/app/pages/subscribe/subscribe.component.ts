import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service'
import { AuthService } from '../services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {
  SnackService
} from '../services/snack.service'

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  plans :any = [];
  client:any;
  client_id:any;
  matchmaker:any;
  constructor(private http : HttpClient,private sub : SubscriptionService,private route: ActivatedRoute,public snack: SnackService) {  }

  ngOnInit(){
    const headers = new HttpHeaders({
      'Content-Type': 'Application/json',  
    })
    this.client =  this.route.snapshot.queryParamMap.get('client');
    this.matchmaker  = this.route.snapshot.queryParamMap.get('id');

    console.log(this.client)
    this.http.get('https://matchmakerz.in/api/v1/client/get-client-detail?phone_number='+this.client).subscribe((res : any) => {
      console.log(res)
      if(res.status===1){
        this.client_id  = res.id;
        
      }
      else{
        alert(res.message)
      }
      console.log(this.plans);
    })
    return this.http.get('https://matchmakerz.in/match/api/v1/client/subscribe?phone_number='+this.client+"&id="+this.matchmaker).subscribe((res : any) => {
      this.plans = res;
      console.log(this.plans);
    })

  }

   pay(amt,type,plan)
   {

     const rzp = this.sub.payNowT(amt,type,plan,this.client_id,this.matchmaker);


     console.log(localStorage.getItem('payment_id'))

     
    }
     

   

     
   

}


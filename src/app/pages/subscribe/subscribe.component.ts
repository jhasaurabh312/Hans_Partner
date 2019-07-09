import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service'
import { AuthService } from '../services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  plans :any = [];
  constructor(private http : HttpClient,private sub : SubscriptionService) {  }

  ngOnInit(){
    const headers = new HttpHeaders({
      'Content-Type': 'Application/json',  
    })

    return this.http.get('http://matchmakerz.in/api/v1/client/subscribe?phone_number=123456').subscribe((res : any) => {
      this.plans = res;
      console.log(this.plans);
    })

  }

   pay(amt,type)
   {
     let rzp = this.sub.payNowT(amt,type);
     rzp.open();
     console.log(rzp)

     
    }
     

   

     
   

}


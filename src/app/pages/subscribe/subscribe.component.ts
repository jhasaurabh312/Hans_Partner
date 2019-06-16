import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  data :any;
  constructor(private sub: SubscriptionService, private auth : AuthService) {  }

  pay(amt,type)
  {
    let rzp = this.sub.payNowT(amt,type);
    rzp.open();
  }

  ngOnInit(){
  this.auth.getSubscription().subscribe(res=>{
    this.data = res;
    console.log(res);
    console.log(this.data.PersonalizedPremium);
    
  })
  }

}


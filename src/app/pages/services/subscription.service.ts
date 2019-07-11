import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http'
import {AuthService} from '../services/auth.service'

declare var Razorpay : any;
@Injectable({
  providedIn: 'root'
})



export class SubscriptionService {
  data : any;
  rzp : any;
  paymentId:any;
  loadingProgress:any;
  plan:any;
  client_id:any;
  macthmaker_id:any;
  // check : void;
  
  constructor(private http : HttpClient, public auth : AuthService) { }

  

paymentCapture(response) {
   this.loadingProgress = true;

   this.paymentId = response.razorpay_payment_id;
   // console.log("payment id "+this.paymentId);
   // this.http.get(' http://127.0.0.1:8000/')
   //TODO
   console.log(this.paymentId)
   console.log(this.client_id)
   console.log(this.macthmaker_id)
   console.log(this.plan)
   this.auth.getSubscription(this.plan,'razorpay',this.client_id,this.paymentId,this.macthmaker_id)
}
  payNowT(amt,type,plan,client,matchmaker) {
    this.plan = plan;
    this.client_id = client;
    this.macthmaker_id = matchmaker;
    var notes = {service:''};
    var keyId;
    var transection;
    if(amt==5100)
    {
      notes.service="Limited";
    }else 
    if(amt==7100){
      notes.service="Supreme";
    }else 
    if(amt==11000){
      notes.service="Premium";
    }
    if(type == 'test')
    {
      keyId="rzp_test_I3vE1kAsW8cXdH";
    }else
    if(type=='live'){
      keyId="rzp_live_e6JpOKoIUEouZT";
    }
    const key = keyId;
    var options = {
      "key": key,
      "amount":amt*100,
      "name": " Hans Matrimony",
      "description": "Order #",
     
      "handler":  this.paymentCapture.bind(this),
          
      "prefill": {
          "name":  'test',
          "email": 'test@xyz.com',
          "contact": '1234567890',
     
      },
      "notes": notes,
      "theme": {
          "color": "blue"
      }

  };
  // if()
  this.rzp = new Razorpay(options)
       this.rzp.open();
    var check = this.check(transection)
       
  return transection;
}


  check(transection){
      console.log(transection);
    }



}


// var newclass = new SubscriptionService(this.http,this.auth);
// newclass.payNowT(this.amt,this.type);



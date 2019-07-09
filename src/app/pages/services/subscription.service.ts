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
  // check : void;
  
  constructor(private http : HttpClient, public auth : AuthService) { }

  

  payNowT(amt,type) {
    var notes = {service:''};
    var keyId;
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
     
      "handler": function (response){
            localStorage.setItem('payment_id',response.razorpay_payment_id);
            console.log(localStorage.getItem('payment_id'));  
            // this.auth.getSubscription().subscribe((res : any) =>{
            //   console.log(res)
            // })
            this.check();
         },
         
          
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
  
  return(new Razorpay(options));
}


  check(){
      console.log('hi');
    }



}


// var newclass = new SubscriptionService(this.http,this.auth);
// newclass.payNowT(this.amt,this.type);



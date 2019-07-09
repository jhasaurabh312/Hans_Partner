import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


getSubscription()
{
  const headers = new HttpHeaders({
    'Content-Type': 'Application/json',  
  })

  const data = new FormData();
  data.append('payment_id',localStorage.getItem('payment_id'));
  data.append('gateway','razorpay');
  data.append('order_id','67');
  data.append('client_id',localStorage.getItem('client_id'));
  data.append('matchmakerss_id',localStorage.getItem('matchmaker_id'));

  return this.http.post('http://matchmakerz.in/api/v1/matchmaker/client-payment-confirmation',data,{headers:headers})
}


}

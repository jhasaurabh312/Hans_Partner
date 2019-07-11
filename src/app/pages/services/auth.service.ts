import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


getSubscription(payment_id,gateway,client_id,order_id,matchmaker_id)
{
  const headers = new HttpHeaders({
    'Content-Type': 'Application/json',  
  })

  const data = new FormData();
  data.append('payment_id',payment_id);
  data.append('gateway',gateway);
  data.append('order_id',order_id);
  data.append('client_id',client_id);
  data.append('matchmakerss_id',matchmaker_id);
  // console.log(data.getAll)
  return this.http.post('http://matchmakerz.in/match/api/v1/matchmaker/client-payment-confirmation',data).subscribe((res)=>{
    console.log(res)
  })
}


}

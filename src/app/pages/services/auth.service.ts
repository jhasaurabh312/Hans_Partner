import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


getSubscription()
{
   return this.http.get('https://partner.hansmatrimony.com/api/subscription');
}


}

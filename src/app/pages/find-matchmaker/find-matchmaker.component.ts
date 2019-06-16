import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';


@Component({
  selector: 'app-find-matchmaker',
  templateUrl: './find-matchmaker.component.html',
  styleUrls: ['./find-matchmaker.component.scss']
})
export class FindMatchmakerComponent implements OnInit {
  getLocation: FormGroup;
  YOUR_API_KEY='AIzaSyDYzOj_e7CSYYRW36a4K52O1OjR7rvEN9E';
  res : any;
  val:any;
  value:any;
  suc : any;
  matchmakers : any;

  constructor(private _formBuilder: FormBuilder, private http : HttpClient) { 
    this.getLocation= this._formBuilder.group({
      'place' : [''],
    });; 
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocationInfo);
    }
    
    function displayLocationInfo(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
    
      // console.log(`longitude: ${ lng } | latitude: ${ lat }`);
      console.log(lng,lat);
    }
  }

  detectLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocationInfo);
    }
    
    function displayLocationInfo(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
    
      // console.log(`longitude: ${ lng } | latitude: ${ lat }`);
      console.log(lng,lat);
    }
  }

  findLocation(){
    console.log(this.getLocation.value.place)
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+this.getLocation.value.place+'&key='+this.YOUR_API_KEY).subscribe((res) => {
      this.val=res;  
      console.log(this.val);
      if(this.val.status === 'OK'){
        localStorage.setItem('lat',this.val.results[0].geometry.location.lat);
        localStorage.setItem('long',this.val.results[0].geometry.location.lng);
      
        console.log(localStorage.getItem('lat'),localStorage.getItem('long'));
        this.getMatchmaker();
      }
      
   });
  }

  getMatchmaker(){
    const headers = new HttpHeaders({
      'Content-Type': 'Application/json',  
    })


    return this.http.get('http://matchmakerz.in/api/v1/client/nearest-matchmaker?latitude='+localStorage.getItem('lat')+' &longitude='+localStorage.getItem('long')).subscribe((suc) => {
      this.matchmakers = suc;
      console.log(suc);
    })
  }

}

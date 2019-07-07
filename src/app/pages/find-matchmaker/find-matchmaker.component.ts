import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { Router } from '@angular/router';


@Component({
  selector: 'app-find-matchmaker',
  templateUrl: './find-matchmaker.component.html',
  styleUrls: ['./find-matchmaker.component.scss']
})
export class FindMatchmakerComponent implements OnInit {
  getLocation: FormGroup;
  matchmakers : any= [];
  YOUR_API_KEY='AIzaSyDYzOj_e7CSYYRW36a4K52O1OjR7rvEN9E';
  res : any;
  val:any;
  value:any;
  suc : any;
  show : Boolean = false;

  constructor(private _formBuilder: FormBuilder, private http : HttpClient, private router : Router) { 
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
      localStorage.setItem('lat',lat);
      localStorage.setItem('long',lng);
    }

    this.getMatchmaker();
  }

  detectLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocationInfo);
    }
    
    function displayLocationInfo(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      localStorage.setItem('lat',lat);
      localStorage.setItem('long',lng);
     
    }

    this.getMatchmaker();
  }

  findLocation(){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+this.getLocation.value.place+'&key='+this.YOUR_API_KEY).subscribe((res) => {
      this.val=res;  
      console.log(res)
      if(this.val.status === 'OK'){
        localStorage.setItem('lat',this.val.results[0].geometry.location.lat);
        localStorage.setItem('long',this.val.results[0].geometry.location.lng);
        this.getMatchmaker();
      }   
   });
  }

  getMatchmaker(){
    const headers = new HttpHeaders({
      'Content-Type': 'Application/json',  
    })

    // console.logt()
    return this.http.get('http://matchmakerz.in/api/v1/client/nearest-matchmaker?latitude='+localStorage.getItem('lat')+'&longitude='+localStorage.getItem('long')).subscribe((suc) => {
      this.matchmakers = suc;
      let l = this.matchmakers.length;
      console.log(l);
      for(var i=0;i<l;i++){
        console.log(this.matchmakers[i][1]);
        if(this.matchmakers[i][1].profile_pic == "" || this.matchmakers[i][1].profile_pic == null){
          this.matchmakers[i][1].profile_pic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy08cK8wogTcvUJYvty4hAPwvKxTIJEqneUkNc3r4CBLkroZyn'
        }
      }
    })
  }


 
  viewProfile(data){
    localStorage.setItem('matchmaker_id',data);
    this.router.navigate(['/matchmaker-profile'], { queryParams: { client_id: localStorage.getItem('client_id'), matchmaker_id: localStorage.getItem('matchmaker_id') } });
  }

  getACall(){
    document.getElementById('exampleModal').style.display = 'block';
  }


}

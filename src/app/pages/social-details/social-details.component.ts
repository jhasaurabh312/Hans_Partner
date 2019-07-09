import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-details',
  templateUrl: './social-details.component.html',
  styleUrls: ['./social-details.component.scss']
})
export class SocialDetailsComponent implements OnInit {


  AddClientEducationalDetails: FormGroup;
  error: any;
  data: any;
  castes: any;
  user : any = [];

  constructor(private _formBuilder: FormBuilder, private http : HttpClient, public router : Router) { 
    this.AddClientEducationalDetails = this._formBuilder.group({
      'marital_status': [localStorage.getItem('edit_client_marital_status')],
      'children': [localStorage.getItem('edit_client_children')],
      'mother_tongue': [localStorage.getItem('edit_client_mother_tongue')],
      'religion': [localStorage.getItem('edit_client_religion')],
      'zodiac': [localStorage.getItem('edit_client_zodiac')],
      'manglik': [localStorage.getItem('edit_client_manglik')],
      'caste': [localStorage.getItem('edit_client_caste')],
      'citizenship': [localStorage.getItem('edit_client_citizenship')],
      'want_horoscope_match': [localStorage.getItem('edit_client_want_horoscope_match')],
    });;
  }

  ngOnInit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 


    this.http.get('http://matchmakerz.in/api/v1/client/castes',{headers : headers}).subscribe((res) => {
      console.log(res)
      this.castes = res
 
    })
   if(localStorage.getItem('clientId')){


    this.http.get('http://matchmakerz.in/api/v1/client/profile?id='+localStorage.getItem('clientId'),{headers : headers}).subscribe((user) => {
      this.user = user;
      console.log(this.user);
         localStorage.setItem('newClientId',localStorage.getItem('clientId'));
      // localStorage.removeItem('clientId')

      localStorage.setItem('edit_client_marital_status',this.user.marital_status);
      localStorage.setItem('edit_client_mother_tongue',this.user.mother_tongue);
      localStorage.setItem('edit_client_children',this.user.children);
      localStorage.setItem('edit_client_religion',this.user.religion);
      localStorage.setItem('edit_client_zodiac',this.user.zodiac);
      localStorage.setItem('edit_client_manglik',this.user.manglik);
      localStorage.setItem('edit_client_caste',this.user.caste);
      localStorage.setItem('edit_client_citizenship',this.user.citizenship);
      localStorage.setItem('edit_client_want_horoscope_match',this.user.want_horoscope_match);
      this.AddClientEducationalDetails = this._formBuilder.group({
      'marital_status': [localStorage.getItem('edit_client_marital_status')],
      'children': [localStorage.getItem('edit_client_children')],
      'mother_tongue': [localStorage.getItem('edit_client_mother_tongue')],
      'religion': [localStorage.getItem('edit_client_religion')],
      'zodiac': [localStorage.getItem('edit_client_zodiac')],
      'manglik': [localStorage.getItem('edit_client_manglik')],
      'caste': [localStorage.getItem('edit_client_caste')],
      'citizenship': [localStorage.getItem('edit_client_citizenship')],
      'want_horoscope_match': [localStorage.getItem('edit_client_want_horoscope_match')],
    });;
      // localStorage.setItem('edit_client_birth_place',this.user.birth_place);
      // localStorage.setItem('edit_client_food_choice',this.user.food_choice);
      // localStorage.setItem('edit_client_disability',this.user.disability);
      // localStorage.setItem('edit_client_disabled_part',this.user.disabled_part);
    })
  }

  }



  addClient() {

    const NewProfile = new FormData();
    NewProfile.append('id', localStorage.getItem('newClientId') );   
    NewProfile.append('marital_status', this.AddClientEducationalDetails.value.marital_status);
    NewProfile.append('children', this.AddClientEducationalDetails.value.children);
    NewProfile.append('mother_tongue', this.AddClientEducationalDetails.value.mother_tongue);
    NewProfile.append('religion', this.AddClientEducationalDetails.value.religion);
    NewProfile.append('zodiac', this.AddClientEducationalDetails.value.zodiac);
    NewProfile.append('manglik', this.AddClientEducationalDetails.value.manglik);
    NewProfile.append('caste', this.AddClientEducationalDetails.value.caste);
    NewProfile.append('citizenship', this.AddClientEducationalDetails.value.citizenship);
    NewProfile.append('want_horoscope_match', this.AddClientEducationalDetails.value.want_horoscope_match);

    console.log(NewProfile);

    return this.http.post('http://matchmakerz.in/api/v1/client/client-social-update', NewProfile, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('token'),
      })
    }).pipe(catchError((error) => {
      return throwError("oops");
    })).subscribe((response: any) => {
      this.data = response;
      console.log(this.data);
      if (this.data.status === 1)
      this.router.navigate(['/client-family']);
      else{
           window.alert("Some Error Occured required filed");
         }

    }), err => {
      console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
    }

  }

}

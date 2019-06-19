import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  AddClientDetails: FormGroup;
  AddClientEducationalDetails: FormGroup;
  AddClientSocialDetails : FormGroup;
  error : any;
  data : any;

  constructor(private _formBuilder: FormBuilder, private http : HttpClient) {
    this. AddClientDetails= this._formBuilder.group({
      'name' : [''],
      'gender' : [''],
      'whatsapp_number' : [''],
      'phone_number' : [''],
      'height' : [''],
      'birth_date' : [''],
      'birth_place' : [''],
      'weight' : [''],
      'birth_time' : [''],
      'current_city' : [''],
      'food_choice' : [''],
      'disability' : [''],
      'disabled_part' : [''],
    });
    this. AddClientEducationalDetails= this._formBuilder.group({
      'is_working' : [''],
      'education' : ['NA'],
      'degree' : [''],
      'college' : [''],
      'occupation' : [''],
      'sub_occupation' : [''],
      'office_address' : [''],
      'yearly_income' : [''],
      
    });
    this.AddClientSocialDetails = this._formBuilder.group({
      'marital_status': [''],
      'children': [''],
      'mother_tongue': [''],
      'religion': [''],
      'zodiac': [''],
      'manglik': [''],
      'caste': [''],
      'citizenship': [''],
      'want_horoscope_match': [''],
    }); 
   }

  ngOnInit() {
  }

  registerStepOne(){

  const NewProfile  = new FormData(); 
  NewProfile.append('name', this.AddClientDetails.value.name );   
  NewProfile.append('phone_number', this.AddClientDetails.value.phone_number );
  NewProfile.append('gender', this.AddClientDetails.value.gender);
  NewProfile.append('whatsapp_number', this.AddClientDetails.value.whatsapp_number );
  NewProfile.append('height', this.AddClientDetails.value.height );
  NewProfile.append('birth_date', this.AddClientDetails.value.birth_date );
  NewProfile.append('birth_place', this.AddClientDetails.value.birth_place );
  NewProfile.append('weight', this.AddClientDetails.value.weight );
  NewProfile.append('birth_time', this.AddClientDetails.value.birth_time );
  NewProfile.append('current_city', this.AddClientDetails.value.current_city );
  NewProfile.append('food_choice', this.AddClientDetails.value.food_choice );
  NewProfile.append('disability', this.AddClientDetails.value.disability );
  NewProfile.append('disabled_part', this.AddClientDetails.value.disabled_part );

  console.log(NewProfile);

  return this.http.post('http://matchmakerz.in/api/v1/client/registerClient' , NewProfile ,{ 
      headers : new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('token'),
      })}).pipe(catchError((error) => {
        return throwError("oops"); })).subscribe((response:any) => {
         this.data = response;
         if(this.data.status === 1){
           localStorage.setItem('newClientId' ,this.data.id);
           window.location.replace('/educational-details');
         }
         
       
      }),err =>{
        console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
      }
}  

registerStepTwo(){

  const NewProfile  = new FormData();
  NewProfile.append('id', localStorage.getItem('newClientId') );   
  NewProfile.append('is_working', this.AddClientEducationalDetails.value.is_working );   
  NewProfile.append('degree', this.AddClientEducationalDetails.value.degree);
  NewProfile.append('college', this.AddClientEducationalDetails.value.college );
  NewProfile.append('occupation', this.AddClientEducationalDetails.value.occupation );
  NewProfile.append('sub_occupation', this.AddClientEducationalDetails.value.sub_occupation );
  NewProfile.append('office_address', this.AddClientEducationalDetails.value.office_address );
  NewProfile.append('yearly_income', this.AddClientEducationalDetails.value.yearly_income );
  NewProfile.append('education','NA');
 

  console.log(NewProfile);

  return this.http.post('http://matchmakerz.in/api/v1/client/client-career-update' , NewProfile ,{ 
      headers : new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('token'),
      })}).pipe(catchError((error) => {
        return throwError("oops"); })).subscribe((response:any) => {
         this.data = response;
         console.log(this.data);
         if(this.data.status === 1)
          window.location.replace('/social-details');
       
      }),err =>{
        console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
      }
}

registerStepThree(){
    const NewProfile = new FormData();
    NewProfile.append('id', localStorage.getItem('newClientId') );   
    NewProfile.append('marital_status', this.AddClientSocialDetails.value.marital_status);
    NewProfile.append('children', this.AddClientSocialDetails.value.children);
    NewProfile.append('mother_tongue', this.AddClientSocialDetails.value.mother_tongue);
    NewProfile.append('religion', this.AddClientSocialDetails.value.religion);
    NewProfile.append('zodiac', this.AddClientSocialDetails.value.zodiac);
    NewProfile.append('manglik', this.AddClientSocialDetails.value.manglik);
    NewProfile.append('caste', this.AddClientSocialDetails.value.caste);
    NewProfile.append('citizenship', this.AddClientSocialDetails.value.citizenship);
    NewProfile.append('want_horoscope_match', this.AddClientSocialDetails.value.want_horoscope_match);

    console.log(NewProfile);

    return this.http.post('http://matchmakerz.in/api/v1/client/client-social-update?id=' + localStorage.getItem('newClientId'), NewProfile, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('token'),
      })
    }).pipe(catchError((error) => {
      return throwError("oops");
    })).subscribe((response: any) => {
      this.data = response;
      console.log(this.data);
      if (this.data.status === 1)
        window.location.replace('/client-family');

    }), err => {
      console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
    }
}

}

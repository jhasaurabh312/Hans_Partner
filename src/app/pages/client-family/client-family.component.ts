import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  SnackService
} from '../services/snack.service'


@Component({
  selector: 'app-client-family',
  templateUrl: './client-family.component.html',
  styleUrls: ['./client-family.component.scss']
})
export class ClientFamilyComponent implements OnInit {
   
    AddClientEducationalDetails: FormGroup;
    error : any;
    data : any;
    user: any = [];
      client_data:any = {
      'family_type':'',
      'hometown':'',
      'home_address':'',
      'house_type':'',
      'gotra':'',
        'mother_status' : '',
      'mother_occupation':'',
      'father_status':'',
      'father_occupation':'',
      'married_son':'',
      'unmarried_son':'',
      'married_daughter':'',
      'unmarried_daughter':'',
      'matchmaker_note':'',
    }
  
  constructor(private _formBuilder: FormBuilder, private http : HttpClient, public router : Router,private route: ActivatedRoute,public snack: SnackService) { 
      this. AddClientEducationalDetails= this._formBuilder.group({
        'family_type' : [''],
        'hometown' : [''],
        'home_address' : [''],
        'house_type' : [''],
        'gotra' : [''],
        'mother_status' : [''],
        'mother_occupation' : [''],
        'father_status' : [''],
        'father_occupation' : [''],
        'family_income' : [''],
        'landline' : ['na'],
        'married_son' : [''],
        'unmarried_son' : [''],
        'married_daughter' : [''],
        'unmarried_daughter' : [''],
        'matchmaker_note' : [''],
        'is_active' : ['1'],
      });; 
    }
  
    ngOnInit() {

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token')
      }) 
     if(localStorage.getItem('clientId')){

      this.http.get('https://matchmakerz.in/api/v1/client/profile?id='+this.route.snapshot.queryParamMap.get('client') ,{headers : headers}).subscribe((user) => {
        this.user = user;
                this.client_data = user;

        console.log(this.user);
           localStorage.setItem('newClientId',this.route.snapshot.queryParamMap.get('client') );
          // localStorage.removeItem('clientId')

        localStorage.setItem('edit_client_family_type',this.user.family_type);
        localStorage.setItem('edit_client_hometown',this.user.hometown);
        localStorage.setItem('edit_client_home_address',this.user.home_address);
        localStorage.setItem('edit_client_house_type',this.user.house_type);
        localStorage.setItem('edit_client_gotra',this.user.gotra);
        localStorage.setItem('edit_client_mother_status',this.user.mother_status);
        localStorage.setItem('edit_client_mother_occupation',this.user.mother_occupation);
        localStorage.setItem('edit_client_father_status',this.user.father_status);
        localStorage.setItem('edit_client_want_father_occupation',this.user.father_occupation);
        localStorage.setItem('edit_client_family_income',this.user.family_income);
        localStorage.setItem('edit_client_landline',this.user.landline);
        localStorage.setItem('edit_client_married_son',this.user.married_son);
        localStorage.setItem('edit_client_unmarried_son',this.user.unmarried_son);
        localStorage.setItem('edit_client_married_daughter',this.user.married_daughter);
        localStorage.setItem('edit_client_unmarried_daughter',this.user.unmarried_daughter);
        localStorage.setItem('edit_client_matchmaker_note',this.user.matchmaker_note);
        localStorage.setItem('edit_client_is_active',this.user.is_active);
      
      })
  
      }
    }
  
  
  
    addClient(){
  
      const NewProfile  = new FormData();
      NewProfile.append('id',this.route.snapshot.queryParamMap.get('client') );
      NewProfile.append('family_type', this.AddClientEducationalDetails.value.family_type );   
      NewProfile.append('hometown', this.AddClientEducationalDetails.value.hometown );
      NewProfile.append('home_address', this.AddClientEducationalDetails.value.home_address);
      NewProfile.append('house_type', this.AddClientEducationalDetails.value.house_type );
      NewProfile.append('gotra', this.AddClientEducationalDetails.value.gotra );
      NewProfile.append('mother_status', this.AddClientEducationalDetails.value.mother_status );
      NewProfile.append('mother_occupation', this.AddClientEducationalDetails.value.mother_occupation );
      NewProfile.append('father_status', this.AddClientEducationalDetails.value.father_status );
      NewProfile.append('father_occupation', this.AddClientEducationalDetails.value.father_occupation );
      NewProfile.append('family_income', this.AddClientEducationalDetails.value.family_income );
      NewProfile.append('landline', this.AddClientEducationalDetails.value.landline );
      NewProfile.append('married_son', this.AddClientEducationalDetails.value.married_son );
      NewProfile.append('unmarried_son', this.AddClientEducationalDetails.value.unmarried_son );
      NewProfile.append('married_daughter', this.AddClientEducationalDetails.value.unmarried_daughter );
      NewProfile.append('unmarried_daughter', this.AddClientEducationalDetails.value.unmarried_daughter );
      NewProfile.append('matchmaker_note', this.AddClientEducationalDetails.value.matchmaker_note );
      NewProfile.append('is_active', "1");
      console.log(NewProfile);
  
      return this.http.post('https://matchmakerz.in/api/v1/client/client-family-update', NewProfile ,{ 
          headers : new HttpHeaders({
            'Authorization': 'Token ' + localStorage.getItem('token'),
          })}).pipe(catchError((error) => {
            return throwError("oops"); })).subscribe((response:any) => {
             this.data = response;
             console.log(this.data);
             if(this.data.status === 1){
                                                                   this.snack.openSnackBar(this.data.message, 'success')

                this.router.navigate(['/client-preferences'],{ queryParams: { client:this.route.snapshot.queryParamMap.get('client'), id: this.route.snapshot.queryParamMap.get('id') }});
             }
             else{
                                                    this.snack.openSnackBar(this.data.message, 'error')

          window.alert("Some Error Occured");
         }
         
          }),err =>{
                                            this.snack.openSnackBar('Something went wrong please try again after Sometime', 'error')

            console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
          }
          
    }
  
  }
  
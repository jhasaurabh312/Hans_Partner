import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client-preferences',
  templateUrl: './client-preferences.component.html',
  styleUrls: ['./client-preferences.component.scss']
})
export class ClientPreferencesComponent implements OnInit {
 
  AddClientEducationalDetails: FormGroup;
  error : any;
  data : any;
  castes: any;
res:any;
  constructor(private _formBuilder: FormBuilder, private http : HttpClient, public router:Router) { 

    // for(let i =)
    var castes = [];

    if(localStorage.getItem('caste')!==null){
      castes = localStorage.getItem('caste').split(',')
      if(castes.length===461)
        castes=["0"]
    }
    console.log(castes)
    this. AddClientEducationalDetails= this._formBuilder.group({
      'min_age' : [2019-parseInt(localStorage.getItem('min_age'))],
      'max_age' : [2019-parseInt(localStorage.getItem('max_age'))],
      'min_income' : [localStorage.getItem('min_income')],
      'max_income' : [((localStorage.getItem('max_income')))],
      'min_height' : [((localStorage.getItem('min_height')))],
      'max_height' : [((localStorage.getItem('max_height')))],
      'marital_status' : [((localStorage.getItem('marital_status')))],
      'manglik' : [((localStorage.getItem('manglik')))],
      'food_choice' : [((localStorage.getItem('food_choice')))],
      'occupation' : [((localStorage.getItem('occupation')))],
      'citizenship' : [((localStorage.getItem('citizenship')))],
      'caste' : [castes],
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
      // if(localStorage.getItem('clientId')){
     this.http.get('http://matchmakerz.in/api/v1/client/client-preferences?id='+localStorage.getItem('clientId'),{headers : headers}).subscribe((res) => {
      this.res = res;
      console.log((this.res));
      var cast_prefer = '';
      localStorage.setItem('newClientId',localStorage.getItem('clientId'))

      this.res.caste.map((value, index) => {
        // console.log(value)
        cast_prefer+=(value['id'])+','
      })
      cast_prefer = cast_prefer.substring(0,cast_prefer.length-1);

      if(this.res.min_age !== null)
        localStorage.setItem('min_age',(this.res.min_age).split('-')[0]);

      if(this.res.max_age !== null)
        localStorage.setItem('max_age',(this.res.max_age).split('-')[0]);

      if(this.res.min_income !== null)
        localStorage.setItem('min_income',this.res.min_income);

      if(this.res.max_income !== null)
      ((localStorage.setItem('max_income',this.res.max_income)));

      if (this.res.min_height !== null)
        ((localStorage.setItem('min_height',this.res.min_height)));

      if (this.res.max_height !== null)
        ((localStorage.setItem('max_height',this.res.max_height)));

      if (this.res.marital_status !== null)
        ((localStorage.setItem('marital_status',this.res.marital_status)));

      if(this.res.manglik !== null)
        ((localStorage.setItem('manglik',this.res.manglik)));

      if(this.res.food_choice !== null)
        ((localStorage.setItem('food_choice',this.res.food_choice)));

      if(this.res.citizenship !== null)
        ((localStorage.setItem('citizenship',this.res.citizenship)));

      if(this.res.occupation !== null)
        ((localStorage.setItem('occupation',this.res.occupation)));
      if(cast_prefer !== null)
        ((localStorage.setItem('caste',cast_prefer)));

      // if(this.res.gender === 1)
      //   ((localStorage.setItem('prgender', this.res.gender)));
          if(localStorage.getItem('gender')==='0'){
                    ((localStorage.setItem('prgender', '1')));

          }
          else{
            ((localStorage.setItem('prgender', '0')));

          }


      })


      // }
  }



  addClient(){

    const NewProfile  = new FormData();
    NewProfile.append('id', localStorage.getItem('newClientId') );   
    console.log(NewProfile.get('id'))
    NewProfile.append('min_age', (2019-(this.AddClientEducationalDetails.value.min_age)).toString()+'-01-01' );   
    NewProfile.append('max_age', (2019-(this.AddClientEducationalDetails.value.max_age)).toString()+'-01-01' );
    NewProfile.append('min_income', this.AddClientEducationalDetails.value.min_income);
    NewProfile.append('max_income', this.AddClientEducationalDetails.value.max_income );
    NewProfile.append('min_height', this.AddClientEducationalDetails.value.min_height );
    NewProfile.append('max_height', this.AddClientEducationalDetails.value.max_height );
    NewProfile.append('marital_status', this.AddClientEducationalDetails.value.marital_status );
    NewProfile.append('manglik', this.AddClientEducationalDetails.value.manglik );
    NewProfile.append('food_choice', this.AddClientEducationalDetails.value.food_choice );
    NewProfile.append('occupation', this.AddClientEducationalDetails.value.occupation );
    NewProfile.append('citizenship', this.AddClientEducationalDetails.value.citizenship );
    console.log(this.AddClientEducationalDetails.value)
    console.log(this.AddClientEducationalDetails.value.caste[0]!=='0')
    console.log(this.AddClientEducationalDetails.value.caste[0]!==0)
    console.log(this.AddClientEducationalDetails.value.caste[0]===0)
    console.log(this.AddClientEducationalDetails.value.caste[0]==='0')
        console.log(NewProfile.get('max_height'))

    if(this.AddClientEducationalDetails.value.caste !== null && this.AddClientEducationalDetails.value.caste[0]!=='0'){
      console.log("***")
      console.log(typeof(this.AddClientEducationalDetails.value.caste.join()))
      NewProfile.append('caste', this.AddClientEducationalDetails.value.caste.join());
    }
    else{

           NewProfile.append('caste', 'all');
 
    }

    // else


    localStorage.setItem('c_cp_min_age', this.AddClientEducationalDetails.value.min_age );
    localStorage.setItem('c_cp_max_age', this.AddClientEducationalDetails.value.max_age );
    localStorage.setItem('c_cp_min_income', this.AddClientEducationalDetails.value.min_income );
    localStorage.setItem('c_cp_max_income', this.AddClientEducationalDetails.value.max_income );
    localStorage.setItem('c_cp_min_height', this.AddClientEducationalDetails.value.min_height );
    localStorage.setItem('c_cp_max_height', this.AddClientEducationalDetails.value.max_height );
    localStorage.setItem('c_cp_marital_status', this.AddClientEducationalDetails.value.marital_status );
    localStorage.setItem('c_cp_manglik', this.AddClientEducationalDetails.value.manglik );
    localStorage.setItem('c_cp_food_choice', this.AddClientEducationalDetails.value.food_choice );
    localStorage.setItem('c_cp_occupation', this.AddClientEducationalDetails.value.occupation );
    localStorage.setItem('c_cp_citizenship', this.AddClientEducationalDetails.value.citizenship );

    if(this.AddClientEducationalDetails.value.caste !== null && this.AddClientEducationalDetails.value.caste[0]!=='0')
        localStorage.setItem('c_cp_caste', this.AddClientEducationalDetails.value.caste.join() );
    

    // console.log(this.AddClientEducationalDetails. );

    // console.log(NewProfile.get('caste'));
    // if(NewProfile.get('caste')){

    // }

    return this.http.post('http://matchmakerz.in/api/v1/client/updateclientpref/' , NewProfile ,{ 
        headers : new HttpHeaders({
          'Authorization': 'Token ' + localStorage.getItem('token'),
        })}).pipe(catchError((error) => {
          return throwError("oops"); })).subscribe((response:any) => {
           this.data = response;
           console.log(this.data);
           if(this.data.Status === 1)
            this.router.navigate(['/clients']);
           else{
           window.alert("Some Error Occured");
         }
         
        }),err =>{
          console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        }
        
  }

}

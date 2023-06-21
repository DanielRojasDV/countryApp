import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../../interfaces/country';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public id: string = '';
  public country?: Country;

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router,
    private countriesServices: CountriesService,
    ){}
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(switchMap(({ id }) => this.countriesServices.searchCountrybyId(id))
      )
      .subscribe(country => {
        console.log(country);
        if (!country) return this.router.navigateByUrl('');
        return this.country = country;
      });        
  }

  // searchById(){
  //   this.countriesServices.searchCountrybyId(this.id)
  //   .subscribe(countries => {
  //     //this.countries = countries;
  //     console.log(countries);
  //   });
  //}


  
}

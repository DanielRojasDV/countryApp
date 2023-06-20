import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public id: string = '';
  public countries: Country[] = [];

  constructor(private activatedRoute: ActivatedRoute, private countriesServices: CountriesService){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {
      //console.log(params['id']);
      //this.id = params['id'];

      this.countriesServices.searchCountrybyId(params['id'])
    .subscribe(countries => {
      //this.countries = countries;
      console.log(countries);
    });
    })
  }

  searchById(){
    this.countriesServices.searchCountrybyId(this.id)
    .subscribe(countries => {
      //this.countries = countries;
      console.log(countries);
    });
  }


  
}

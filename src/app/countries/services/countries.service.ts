import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1'

    constructor(private http: HttpClient) { }


    //Refactor
    private getCountryRequest(url:string): Observable<Country[]>{
        return this.http.get<Country[]>(url)
        .pipe(
            catchError( () => of( [] ) ),
            delay(200),
        );
    }

    searchCapital( searchTerm: string ): Observable<Country[]>{
        const url = `${ this.apiUrl }/capital/${ searchTerm }`;
        return this.getCountryRequest(url);
    }

    searchCountry( searchTerm: string ): Observable<Country[]>{
        const url = `${ this.apiUrl }/name/${ searchTerm }`;
        return this.getCountryRequest(url);
    }

    searchRegion( searchTerm: string ): Observable<Country[]>{
        const url = `${ this.apiUrl }/region/${ searchTerm }`;
        return this.getCountryRequest(url);
    }

    searchCountrybyId( id: string): Observable<Country | null>{
        const url = `${ this.apiUrl }/alpha/${ id }`;
        return this.http.get<Country[]>(url)
        .pipe(
            map( countries => countries.length > 0 ? countries[0] : null),
            catchError( () => of( null ) )
        );
    }
    
}
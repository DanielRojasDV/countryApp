import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';


// Se crea una constante con las rutas según componente, y por defecto
// Para esto se deben importar algunos modulos de @angular/router
const routes: Routes = [
    // {
    //     path: '',
    //     component: HomePageComponent
    // },
    {
        path: 'contact',
        component: ContactPageComponent
    },
    {
        path: 'about',
        component: AboutPageComponent
    },
    {
        path: 'countries',
        loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
    },
    {
        path: '**',
        redirectTo: 'countries'
    }
]

//Aqui se debe importar el RouterModule y especificar si es el routing principal
// y tambien exportarlo
@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]    
})
export class AppRoutingModule { }

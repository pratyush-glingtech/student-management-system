import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
    // pathMatch: 'full' ensures the redirect happens only when the URL is exactly empty (/). It would match any path that starts with the specified path (''), but here, 'full' ensures that only an exact match of the empty URL triggers the redirect.
];

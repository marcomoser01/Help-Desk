import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboarComponent } from './Components/dashboar/dashboar.component';
import { AddComponent } from './Components/add/add.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboarComponent
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'home', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'add', component: AddComponent
  },
  {
    path: 'aggiungi', redirectTo: 'add', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

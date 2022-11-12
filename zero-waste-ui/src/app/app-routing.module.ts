import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';

const accountModule = () =>
  import('./main/account/account.module').then((x) => x.AccountModule);

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'account', loadChildren: accountModule },

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {}

  ngOnInit(): void {}
}

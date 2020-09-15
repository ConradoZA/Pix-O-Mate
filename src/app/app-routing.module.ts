import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OwnersListComponent } from './components/owners-list/owners-list.component';
import { SearchComponent } from './components/search/search.component';
import { SoyProComponent } from './components/soy-pro/pro.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'owners', component: OwnersListComponent },
  { path: 'search', component: SearchComponent },
  { path: 'pro', component: SoyProComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

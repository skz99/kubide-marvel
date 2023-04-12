import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './common/common-components/default-layout/default-layout.component';
import { CharacterComponent } from './marvel/character/character.component';
import { LandComponent } from './marvel/land/land.component';

const routes: Routes = [
  { path: 'land', component: DefaultLayoutComponent, children: [ {path: '', component: LandComponent } ] },
  { path: 'characters', component: DefaultLayoutComponent, children: [ {path: '', component: CharacterComponent } ] },
  { path: '', redirectTo: '/land', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './common-components/default-layout/default-layout.component';
import { OCSpinnerComponent } from './common-components/oc-spinner/oc-spinner.component';
import { LandComponent } from '../marvel/land/land.component';
import { CharacterComponent } from '../marvel/character/character.component';

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    OCSpinnerComponent,
    CharacterComponent,
    LandComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    RouterModule,
    DefaultLayoutComponent,
    OCSpinnerComponent
  ]
})
export class CustomCommonModule { }

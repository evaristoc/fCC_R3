import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlatformComponent } from '../platform/platform.component';
import { MainbodyComponent } from '../mainbody/mainbody.component';

const appRoutes: Routes = [
{ path: '',   component: MainbodyComponent },
{path: 'platform', component: PlatformComponent},
//{path: '*', component: MainbodyComponent}
{ path: '',   redirectTo: '/mainbody', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
  ],
  exports:[
    RouterModule,
  ],
  declarations: []
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlatformComponent } from '../platform/platform.component';
import { TestingservicesComponent } from '../testingservices/testingservices.component';
import { MainbodyComponent } from '../mainbody/mainbody.component';

const appRoutes: Routes = [
{ path: '',   component: MainbodyComponent },
{path: 'platform/:selection', component: PlatformComponent},
{path: 'testingservices', component: TestingservicesComponent},
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

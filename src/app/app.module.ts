import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { GalleryComponent } from './gallery/gallery.component';

import { SuiModule } from 'ng2-semantic-ui';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { UploadComponent } from './upload/upload.component';
import { RankingComponent } from './ranking/ranking.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { PostEditComponent } from './post-edit/post-edit.component';

const appRoutes: Routes = [
  { path: 'signup', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'gallery', component: GalleryComponent, canActivate: [AuthGuard] },
  { path: 'ranking', component: RankingComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'edit/:imageid', component: PostEditComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'search/:keyword', component: SearchComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'profile/:userid', component: ProfileComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: '', redirectTo: '/gallery', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    GalleryComponent,
    LayoutComponent,
    UploadComponent,
    RankingComponent,
    SearchComponent,
    ProfileComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
    SuiModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

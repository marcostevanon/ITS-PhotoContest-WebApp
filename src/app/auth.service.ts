import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/model/loginresponse.model';
import * as moment from "moment";
import { User } from 'src/model/user.model';
import { Post } from 'src/model/post.model';
import { SearchResult } from 'src/model/search.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly base_url = environment.api_endpoint;
  private readonly defaultHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  public redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) { }

  // AUTH REQUESTS
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {

      this.http.post<LoginResponse>(`${this.base_url}/auth/login`, { username, password }, this.defaultHeader)
        .subscribe(authResult => {
          this.setSession(authResult);
          this.router.navigateByUrl(this.redirectUrl || '/gallery');
          resolve();
        }, err => {
          reject({ status: err.status, message: err.error.message || err.statusText })
        });
    });
  }

  signup(user: User) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.base_url}/auth/signup`, user)
        .subscribe(
          (response) => resolve(response),
          (err) => reject(err));
    })
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('userdata', JSON.stringify(authResult.user))
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem('userdata');
    this.router.navigateByUrl('/login');
  }

  getUserData(): User {
    var user: User = JSON.parse(localStorage.getItem('userdata'))
    if (!user.avatar) user.avatar = environment.default_avatar;
    return user;
  }

  // API REQUEST
  getGallery() {
    return new Promise((resolve, reject) => {
      this.http.get<Array<Post>>(`${this.base_url}/gallery`, this.getAuthenticatedHeader())
        .subscribe(
          (response: Array<Post>) => resolve(response),
          (err) => reject(err));
    })
  }

  getAuthenticatedHeader(): object {
    return { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') }) }
  }

  setVote(post_id, vote_value) {
    return new Promise((resolve, reject) => {
      this.http.post<Array<Post>>(`${this.base_url}/vote`,
        {
          image_id: post_id,
          user_id: this.getUserData().id,
          value: vote_value
        }, this.getAuthenticatedHeader())
        .subscribe(
          (response) => resolve(response),
          (err) => reject(err));
    })
  }

  uploadPhoto(file) {
    var formData = new FormData();
    formData.append('image', file, file.name);

    const request = new HttpRequest('POST', `${this.base_url}/upload`, formData,
      {
        headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') }),
        reportProgress: true
      })

    return this.http.request(request);
  }

  checkUpload(photo_id: number) {
    return new Promise((resolve, reject) => {
      this.http.get<Array<string>>(`${this.base_url}/upload/check/${photo_id}`, this.getAuthenticatedHeader())
        .subscribe(
          (response: Array<string>) => resolve(response),
          (err) => reject(err));
    })
  }

  autodetectInfos(url: string) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.base_url}/upload/cognitive`, { url }, this.getAuthenticatedHeader())
        .subscribe(
          (response) => resolve(response),
          (err) => reject(err));
    })
  }

  editImageInfos(image_id: number, title, description, tags) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.base_url}/gallery/edit/${image_id}`,
        { title, description, tags },
        this.getAuthenticatedHeader())
        .subscribe(
          (response) => resolve(response),
          (err) => resolve(err));
    })
  }

  getRanking() {
    return new Promise((resolve, reject) => {
      this.http.get<Array<Post>>(`${this.base_url}/gallery/ranking`, this.getAuthenticatedHeader())
        .subscribe(
          (response: Array<Post>) => resolve(response),
          (err) => reject(err));
    })
  }

  search(keyword: string) {
    return new Promise((resolve, reject) => {
      this.http.get<Array<SearchResult>>(`${this.base_url}/search/${keyword}`, this.getAuthenticatedHeader())
        .subscribe(
          (response: Array<SearchResult>) => resolve(response),
          (err) => reject(err));
    })
  }

  getProfileData(userid) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base_url}/profile/${userid}`, this.getAuthenticatedHeader())
        .subscribe(
          (response: User) => {
            if (!response.avatar) response.avatar = environment.default_avatar;
            resolve(response)
          },
          (err) => reject(err));
    })
  }

  getProfileImageList(userid) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base_url}/profile/${userid}/images`, this.getAuthenticatedHeader())
        .subscribe(
          (response: Array<Post>) => resolve(response),
          (err) => reject(err));
    })
  }

  //utils
  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/model/loginresponse.model';
import * as moment from "moment";
import { User } from 'src/model/user.model';
import { Post, PostResponse } from 'src/model/post.model';
import { SearchResult } from 'src/model/search.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly base_url = environment.api_endpoint;
  private readonly defaultHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  public redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) { }

  // Session Functions
  private _setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('userdata', JSON.stringify(authResult.user))
  }

  private _getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private _getAuthenticatedHeader(): object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      })
    }
  }

  public isLoggedIn() {
    return moment().isBefore(this._getExpiration());
  }

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem('userdata');
    this.router.navigateByUrl('/login');
  }

  public getUserData(): User {
    var user: User = JSON.parse(localStorage.getItem('userdata'))
    if (!user.avatar) user.avatar = environment.default_avatar;
    return user;
  }


  // Authentication Requests
  public login(username: string, password: string) {
    const body = { username, password };
    return new Promise((resolve, reject) => {
      this.http.post<LoginResponse>(`${this.base_url}/auth/login`, body, this.defaultHeader)
        .subscribe(
          (authResult) => {
            this._setSession(authResult);
            this.router.navigateByUrl(this.redirectUrl || '/gallery');
            resolve();
          },
          (err) => reject({ status: err.status, message: err.error.message || err.statusText }));
    });
  }

  public signup(user: User) {
    const body = user;
    return new Promise((resolve, reject) => {
      this.http.post(`${this.base_url}/auth/signup`, body)
        .subscribe(
          (response) => resolve(response),
          (err) => reject(err));
    })
  }


  // GET Requests
  public getGallery() {
    return new Promise((resolve, reject) => {
      this.http.get<Array<Post>>(`${this.base_url}/gallery`, this._getAuthenticatedHeader())
        .subscribe(
          (response: Array<Post>) => resolve(response),
          (err) => reject(err));
    })
  }

  public checkUpload(photo_id: number) {
    return new Promise((resolve, reject) => {
      this.http.get<Array<string>>(`${this.base_url}/upload/check/${photo_id}`, this._getAuthenticatedHeader())
        .subscribe(
          (response: Array<string>) => resolve(response),
          (err) => reject(err));
    })
  }

  public autoDetectInfos(url: string) {
    var body = { url }
    return new Promise((resolve, reject) => {
      this.http.post(`${this.base_url}/upload/cognitive`, body, this._getAuthenticatedHeader())
        .subscribe(
          (response) => resolve(response),
          (err) => reject(err));
    })
  }

  public getRanking() {
    return new Promise((resolve, reject) => {
      this.http.get<Array<Post>>(`${this.base_url}/gallery/ranking`, this._getAuthenticatedHeader())
        .subscribe(
          (response: Array<Post>) => resolve(response),
          (err) => reject(err));
    })
  }

  public search(keyword: string) {
    return new Promise((resolve, reject) => {
      this.http.get<Array<SearchResult>>(`${this.base_url}/search/${keyword}`, this._getAuthenticatedHeader())
        .subscribe(
          (response: Array<SearchResult>) => resolve(response),
          (err) => reject(err));
    })
  }

  public getProfileData(userid) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base_url}/profile/${userid}`, this._getAuthenticatedHeader())
        .subscribe(
          (response: User) => {
            if (!response.avatar) response.avatar = environment.default_avatar;
            resolve(response)
          },
          (err) => reject(err));
    })
  }

  public getProfileImageList(userid) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base_url}/profile/${userid}/images`, this._getAuthenticatedHeader())
        .subscribe(
          (response: Array<Post>) => resolve(response),
          (err) => reject(err));
    })
  }

  public getPost(postId) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base_url}/gallery/${postId}`, this._getAuthenticatedHeader())
        .subscribe(
          (response: PostResponse) => resolve(response),
          (err) => reject(err));
    })
  }

  public getVotesByPost(postId) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base_url}/vote/${postId}`, this._getAuthenticatedHeader())
        .subscribe(
          (response: Array<Post>) => {
            response.forEach(item => {
              if (!item.author_avatar_url) item.author_avatar_url = environment.default_avatar
            });
            resolve(response)
          },
          (err) => reject(err));
    })
  }


  // POST Requests
  public setVote(postId, vote_value) {
    var body = {
      image_id: postId,
      user_id: this.getUserData().id,
      value: vote_value
    }
    return new Promise((resolve, reject) => {
      this.http.post<Array<Post>>(`${this.base_url}/vote`, body, this._getAuthenticatedHeader())
        .subscribe(
          (response) => resolve(response),
          (err) => reject(err));
    })
  }

  public uploadPhoto(file) {
    var formData = new FormData();
    formData.append('image', file, file.name);
    const headers = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') }),
      reportProgress: true
    }

    const request = new HttpRequest('POST', `${this.base_url}/upload`, formData, headers)
    return this.http.request(request);
  }

  public editImageInfos(image_id: number, title, description, tags) {
    var body = { title, description, tags };
    return new Promise((resolve, reject) => {
      this.http.post(`${this.base_url}/gallery/edit/${image_id}`, body, this._getAuthenticatedHeader())
        .subscribe(
          (response) => resolve(response),
          // TODO il resolve qui permette di bypassare un bug nella funzione del backend che restituisce un errore anche se la richesta va a buon fine
          (err) => resolve(err));
    })
  }

  public deletePost(imageid) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.base_url}/gallery/${imageid}`, this._getAuthenticatedHeader())
        .subscribe(
          (response) => resolve(response),
          (err) => reject(err));
    })
  }

}
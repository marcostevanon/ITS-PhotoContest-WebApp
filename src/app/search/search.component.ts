import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SearchResult } from 'src/model/search.model';
import { ActivatedRoute } from '@angular/router';
import { Post, PostResponse } from 'src/model/post.model';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  minChar: number = 2;
  formValue: string;
  loggedUser;

  isSearching = false;
  byTitleDesc: Array<Post> = []
  byTags: Array<Post> = []
  byUser: Array<User> = []

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.loggedUser = this.apiService.getUserData();

    var keyword = this.route.snapshot.params.keyword;
    if (keyword) {
      this.formValue = keyword;
      this.search(keyword);
    }
  }

  search(keyword: string) {
    if (keyword.length > this.minChar) {
      this.isSearching = true;

      this.apiService.search(keyword)
        .then((res: SearchResult) => {

          this.byTitleDesc = []
          this.byTags = []
          this.byUser = res.byUser.data;

          res.byTitleDesc.data.forEach((item: PostResponse) => this.byTitleDesc.push(new Post(item, this.loggedUser)));
          res.byTags.data.forEach((item: PostResponse) => this.byTags.push(new Post(item, this.loggedUser)));

          setTimeout(() => this.isSearching = false, 200)
        })
        .catch(err => {
          console.log(err);
          setTimeout(() => this.isSearching = false, 200)
        })
    }
  }

  public last;
  public async optionsSearch(query: string) {
    // const options = await this.search(query)
    // options.map((o: string) => ({ title: o }));

    // return new Promise(resolve => {
    //   const results = options
    //     .filter(o => o.title.slice(0, query.length).toLowerCase() === query.toLowerCase());
    //   setTimeout(() => resolve(results), 300);
    // });
  }

}

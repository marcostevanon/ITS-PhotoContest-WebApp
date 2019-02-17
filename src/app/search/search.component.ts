import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SearchResult } from 'src/model/search.model';
import { Post } from 'src/model/post.model';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  minChar: number = 2;

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  isSearching = false;
  byTitleDesc: Array<Post> = []
  byTags: Array<Post> = []
  byUser: Array<User> = []

  search(keyword: string) {
    if (keyword.length > this.minChar) {
      this.isSearching = true;

      this.authService.search(keyword)
        .then((res: SearchResult) => {
          this.byTitleDesc = []
          this.byTags = []
          this.byUser = []

          this.byTitleDesc = res.byTitleDesc.data;
          this.byTags = res.byTags.data;
          this.byTags.forEach(item => item.tags = JSON.parse(item.tags))
          this.byUser = res.byUser.data;

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

import { PostResponse } from './post.model';
import { User } from './user.model';

export class SearchResult {
    byTitleDesc: SearchItem<PostResponse>
    byTags: SearchItem<PostResponse>
    byUser: SearchItem<User>
}

export class SearchItem<T> {
    count: number
    data: Array<T>
} 
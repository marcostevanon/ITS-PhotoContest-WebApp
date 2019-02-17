import { Post } from './post.model';
import { User } from './user.model';

export class SearchResult {
    byTitleDesc: SearchItem<Post>
    byTags: SearchItem<Post>
    byUser: SearchItem<User>
}

export class SearchItem<T> {
    count: number
    data: Array<T>
} 
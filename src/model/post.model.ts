import * as moment from "moment";
import { User } from './user.model';
import { environment } from 'src/environments/environment';

export class Post {
    post_id: number
    author_id: number
    author_username: string
    author_avatar_url: string
    raw_image_url: string
    thumbnail_url: string
    title: string
    description: string
    tags: Array<string> | string
    votes_n: number
    votes_avg: number
    score: number

    upload_timestamp: string
    eta: string
    ranking: number

    isVoted: boolean // isVoted by the current logged user?
    isReadonly: boolean;
    isCurrentUserOwner: boolean;
    isSendingVote: boolean = false;

    constructor(item: PostResponse, current_user: User) {
        this.post_id = item.post_id;
        this.author_id = item.author_id;
        this.author_username = item.author_username;
        this.author_avatar_url = item.author_avatar_url ? item.author_avatar_url : environment.default_avatar;
        this.raw_image_url = item.raw_image_url;
        this.thumbnail_url = item.thumbnail_url;
        this.title = item.title;
        this.description = item.description;
        this.tags = item.tags ? item.tags : [];
        this.votes_n = item.votes_n;
        this.votes_avg = item.votes_avg;

        this.upload_timestamp = item.timestamp;
        this.eta = this.eta = moment(this.upload_timestamp).fromNow();
        this.score = item.score;

        this.isVoted = item.vote ? true : false;
        this.isReadonly = this.isVoted;
        this.isCurrentUserOwner = this.author_username == current_user.username;
    }
}

export class PostResponse {
    post_id: number
    author_id: number
    author_username: string
    author_avatar_url: string
    raw_image_url: string
    thumbnail_url: string
    title: string
    description: string
    tags: Array<string> | string
    votes_n: number
    votes_avg: number
    vote: number
    timestamp: string
    score: number
}

export class UploadResponde {
    image_id: number
    filename: string
    url: string
    uuid: string

    constructor(data) {
        this.image_id = data.image_id
        this.filename = data.filename
        this.url = data.url
        this.uuid = data.uuid
    }
}
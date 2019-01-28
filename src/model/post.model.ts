import * as moment from "moment";

export class Post {
    post_id: number
    author_username: string
    author_avatar_url: string
    raw_image_url: string
    thumbnail_url: string
    title: string
    description: string
    tags: Array<string>
    eta: string
    votes_n: number
    votes_avg: number
    upload_timestamp: string
    
    isVoted: boolean // isVoted by the current logged user?
    isReadonly: boolean;
    isCurrentUserOwner: boolean;
    isSendingVote: boolean = false;

    constructor(item: PostResponse, current_user_name) {
        this.post_id = item.post_id;
        this.author_username = item.author_avatar_url;
        this.author_avatar_url = item.author_avatar_url;
        this.raw_image_url = item.raw_image_url;
        this.thumbnail_url = item.thumbnail_url;
        this.title = item.title;
        this.description = item.description;
        this.tags = item.tags ? item.tags : [];
        this.upload_timestamp = item.timestamp;
        this.eta = this.eta = moment(this.upload_timestamp).fromNow();
        this.votes_n = item.votes_n;
        this.votes_avg = item.votes_avg;
        
        this.isVoted = item.vote ? true : false;
        this.isReadonly = this.isVoted
        this.isCurrentUserOwner = this.author_username == current_user_name
    }
}

export class PostResponse {
    //todo rinominare attributi e controllare backend
    post_id: number
    author_username: string
    author_avatar_url: string
    raw_image_url: string
    thumbnail_url: string
    title: string
    description: string
    tags: Array<string>
    votes_n: number
    votes_avg: number
    vote: number
    timestamp: string
}
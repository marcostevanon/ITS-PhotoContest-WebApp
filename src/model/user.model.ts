export class User {
    id: number
    username: string
    password: string
    email: string
    firstname: string
    lastname: string
    avatar: string

    constructor(firstname, lastname, email, username, password, avatar) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.avatar = avatar;
    }

}
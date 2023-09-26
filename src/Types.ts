export interface IStory{
    _id: string;
    title:string
    story:string
    createdAt:Date
    upVote:string[]
    prompt:string
    author:{
        name:string
        _id:string
    }
}

export interface IUser{
    _id:string,
    name:string
}

export interface ILoginForm{
    email:string
    password:string
}

export interface ISignupForm extends ILoginForm{
    name:string
}
export interface IStory{
    _id: string;
    title:string
    story:string
    createdAt:Date
    upVotes:string[]
    prompt:string
    author:{
        name:string
        _id:string
    }
}

export interface IGenStory{
    prompt:string,
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

export interface IServerResponse{
    message:string
}

export interface IJwtPayload {
    email: string,
    id: string,
    iat: number,
    exp: number,
}
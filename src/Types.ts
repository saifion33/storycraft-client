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
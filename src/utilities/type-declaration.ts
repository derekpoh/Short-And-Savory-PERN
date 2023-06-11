import { ObjectId } from 'mongodb';

export type DataProps = {
  username?: String,
  email: String,
  password: String,
  confirm?: String
};

export type UserState = {
    _id?: ObjectId,
    username: string;
    email: string;
    password: string;
    bookmarks?: object[]; 
  };

export type SetUserType = (user: UserState|null) => void

export type RecipeDetails = {
  _id?: ObjectId,
  owner: UserState,
  recipe: string,
  cuisine: string,
  description?: string,
  ingredients: EmbeddedIngredients[],
  instructions: string[],
  rating?: EmbeddedRating[],
  averagerating?: string,
  views?: number,
  comments?: EmbeddedComment[],
  imageurl?: string[],
  imagefile?: string
}

type EmbeddedComment = {
  commenter?: ObjectId,
  name?: string,
  content?: string,
  createdAt?: Date 
}

type EmbeddedRating = {
  commenter?: ObjectId,
  content?: number
}

export type EmbeddedIngredients = {
  name: string,
  quantity: string,
  measurement?: string
}

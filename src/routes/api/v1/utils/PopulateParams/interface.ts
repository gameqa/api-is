import { Model } from "mongoose";

// ['topicId', Topics, 'topic']
export type PopulateRecipe = [string, Model<any>, string];

import { Model, Document } from "mongoose";
import { PrizesInterface } from "..";

export interface PrizeCategoriesInterface extends Document {
	name: string;
	unlockedImg: string;
	lockedImg: string;
	requiredLVL: number;
	prizes?: PrizesInterface[];
}

export interface PrizeCategoriesCollections
	extends Model<PrizeCategoriesInterface> {}

import { Model, Document } from "mongoose";
import { PrizesInterface } from "..";

export interface PrizeCategoriesInterface extends Document {
	name: string;
	unlockedImg: string;
	lockedImg: string;
	requiredLvl: number;
	prizes?: PrizesInterface[];
}

export interface PrizeCategoriesCollections
	extends Model<PrizeCategoriesInterface> {}

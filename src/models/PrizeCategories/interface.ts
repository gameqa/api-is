import { Model, Document } from "mongoose";

export interface PrizeCategoriesInterface extends Document {
	name: string;
	unlockedImg: string;
	lockedImg: string;
	requiredLvl: number;
}

export interface PrizeCategoriesCollections
	extends Model<PrizeCategoriesInterface> {}

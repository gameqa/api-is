import { Model, Document } from "mongoose";

export interface PrizeCategoriesInterface extends Document {
	title: string;
	openChestURL: string;
	closedChestURL: string;
	requiredLVL: number;
}

export interface PrizeCategoriesCollections
	extends Model<PrizeCategoriesInterface> {}

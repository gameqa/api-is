import { Model, Document, Types } from "mongoose";

export interface prizeGiveAwaysInterface extends Document {
	time: number;
}

export interface prizeGiveAwaysCollectionInterface
	extends Model<prizeGiveAwaysInterface> {}

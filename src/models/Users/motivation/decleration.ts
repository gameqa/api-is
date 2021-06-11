import { UserInterface } from "../interface";

export type MotivationType =
	| "close-to-prize" //   [x]
	| "compare-to-mean" //  [ ]
	| "social-impact" //    [x]
	| "hiscore-today" //    [ ]
	| "hiscore-manuver" //  [ ]
	| "login-streak" //     [ ]
	| "invite-others"; //   [x]

export interface ICloseToPrize {
	type: "close-to-prize";
	text: string;
	prizeId: string;
}

// export interface ICompareToMean {
// 	type: "compare-to-mean";
// 	description: string;
// 	contentType:
// 		| "question"
// 		| "total-content"
// 		| "answers"
// 		| "reviews"
// 		| "found-articles";
// }

export interface ISocialImpact {
	type: "social-impact";
	imageURL: string;
	videoURL?: string;
	description: string;
}

export interface IInviteOthers {
	type: "invite-others";
	description: string;
}

export type Motivation = ISocialImpact | IInviteOthers | ICloseToPrize;

export type MapUserToMotivation = (user: UserInterface) => Motivation;

export type MotivationModule = {
	isAvailable: (user: UserInterface) => boolean;
	getItem: () => MapUserToMotivation;
};

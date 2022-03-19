export interface SendNotificationRequest {
	body: {
		date: string;
		prizeCategory: string;
		lvl: string;
		time: string;
		prize: string;
	};
}

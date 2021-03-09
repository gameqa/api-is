import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

beforeAll(async (done) => {
	mongoServer = new MongoMemoryServer();
	const mongoUri = await mongoServer.getUri();
	await mongoose.connect(
		mongoUri,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		},
		(err) => {
			// if (err) console.error(err);
		}
	);

	return done();
});

afterAll(async (done) => {
	await mongoose.disconnect();
	await mongoServer.stop();
	done();
});

jest.setTimeout(30000);

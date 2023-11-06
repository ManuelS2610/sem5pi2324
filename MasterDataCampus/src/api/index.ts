import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import floor from './routes/floorRoute';
import elevator from './routes/elevatorRoute';
import passage from './routes/passageRoute';
import robotType from './routes/robotTypeRoute';
import room from './routes/roomRoute';
import robot from './routes/robotRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	building(app);
	floor(app);
	elevator(app);
	passage(app);
	robotType(app);
	room(app);
	robot(app);
	
	return app
}
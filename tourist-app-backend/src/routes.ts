import { Hono } from "hono";
import adminRouter from "./routes/admin";
import authRouter from "./routes/auth";
import bookingsRouter from "./routes/bookings";
import reviewsRouter from "./routes/reviews";
import router from "./routes/destinations";
const routes = new Hono();

// Mount routers

routes.route('/auth', authRouter);
routes.route('/bookings', bookingsRouter);
routes.route('/reviews', reviewsRouter);
routes.route('/admin', adminRouter);

export default routes;
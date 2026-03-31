import { Hono } from "hono";
import adminRouter from "./routes/admin";
import authRouter from "./routes/auth";
import bookingsRouter from "./routes/bookings";
import reviewsRouter from "./routes/reviews";
import destinationsRouter from "./routes/destinations";
import cartRouter from "./routes/cart";
const routes = new Hono();

// Mount routers

routes.route('/auth', authRouter);
routes.route('/bookings', bookingsRouter);
routes.route('/reviews', reviewsRouter);
routes.route('/admin', adminRouter);
routes.route('/destinations', destinationsRouter);
routes.route('/cart', cartRouter);
export default routes;
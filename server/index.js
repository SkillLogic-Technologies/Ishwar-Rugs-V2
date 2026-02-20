import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import categoryRoutes from './routes/categoryRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';
import productRoutes from './routes/productRoutes.js'
import userRoute from './routes/User.route.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import dashboardStatsRoutes from './routes/dashboardStatsRoutes.js';
import path from "path";
import { attachGuestId } from "./middlewares/guestId.middleware.js";

const app = express();

dotenv.config();
connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(attachGuestId);
app.use("/api/activity", activityRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoute);
app.use('/api/category', categoryRoutes)
app.use('/api/collection', collectionRoutes)
app.use('/api/product', productRoutes)
app.use('/api/user/wishlist', wishlistRoutes)
app.use('/api/user/cart', cartRoutes)
app.use('/api/contact-us', contactRoutes)
app.use('/api/admin', dashboardStatsRoutes)

const PORT = Number(process.env.PORT) || 5000;
const HOST = "127.0.0.1";

app.get("/", (req, res) => {
  res.json({ status: "Server is running" });
});

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://${HOST}:${PORT}`);
});







import { Elysia } from "elysia";
import HomeController from "./controller/DashboardController";

const Router = new Elysia().get("/", () => HomeController.invoke());

export default Router;

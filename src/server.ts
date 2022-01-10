import Express from "express";
import {ExecutionUseCase} from "./api/execution";

const app = Express();
app.use(Express.json());

const executionUseCase = new ExecutionUseCase();

app.get("/", executionUseCase.execute);

app.listen("3838", () => {
    console.log("App started in port 3838!");
})
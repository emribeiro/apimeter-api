import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

type execution = {
      count: number;
      http_status: number;
      http_status_text: string;
      time: number;
}


class ExecutionUseCase{

    async execute(request: Request, response: Response): Promise<Response>{
        const {url, count, headers} = request.body;

        let resp: AxiosResponse;
        const executions: execution[]= [];

        const instance = axios.create({baseURL: url, headers})

        let amount = 0;

        for (let index = 0; index < count; index++) {
                const before = Date.now();

                resp = await instance.get("/");

                const after = Date.now();
                const delay = after - before;
                 
                amount = amount + delay;

                executions.push({
                    count: index + 1,
                    http_status: resp.status,
                    http_status_text: resp.statusText,
                    time: delay 
                });
        }

        return response.status(200).json({
            resume: {
                url,
                executions: count,
                test_time: amount
            },
            executions
        }); 
    }

}

export {ExecutionUseCase};
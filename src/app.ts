import * as express from "express";
import { Cat } from "./app.model";
const app: express.Express = express();

const port: number = 8000;

app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  next();
});

app.get("/", (req, res) => {
  throw new Error("에러났음");
  res.status(200).send({
    Cat
  });
});

app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(error);
    res.status(400).send({ success: false, msg: "error" });
  }
);

app.listen(port, () => {
  console.log(`${port}로 켰다.`);
});

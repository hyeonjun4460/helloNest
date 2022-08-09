import * as express from "express";
import { Cat } from "./app.model";
import { catsRouter } from "./cats/route";
const port: number = 8000;

class Server {
  public app: express.Application;
  constructor() {
    const app: express.Application = express();
    this.app = app;
  }
  private setMiddleware() {
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      next();
    });

    // json
    this.app.use(express.json());

    // 에러 헨들러
    this.app.use(
      (
        error: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.log(error);
        res.status(400).send({ success: false, msg: error.message });
      }
    );
  }
  private setRouter() {
    this.app.use("/", catsRouter);
  }
  public listen() {
    this.setMiddleware();
    this.setRouter();
    this.app.listen(port, () => {
      console.log(`${port}로 켰다.`);
    });
  }
}
// 로깅

function init() {
  const server = new Server();
  server.listen();
}

init();

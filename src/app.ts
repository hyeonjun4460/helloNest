import * as express from "express";
import { nextTick } from "process";
import { Cat } from "./app.model";
const app: express.Express = express();

const port: number = 8000;

// 로깅
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  next();
});

// json
app.use(express.json());

// 데이터 전체 조회
app.get("/cats", (req, res, next) => {
  try {
    const cats = Cat;
    res.status(200).send({
      success: true,
      cats
    });
  } catch (error) {
    next(error);
  }
});

// 상세 조회

app.get("/cats/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const cat = Cat.find((value) => {
      return value.id === id;
    });
    res.send({
      success: true,
      cat
    });
  } catch (error) {
    next(error);
  }
});

app.post("/cats", (req, res, next) => {
  try {
    const data = req.body;
    Cat.push(data);
    res.status(200).send({ success: true });
  } catch (error) {
    next(error);
  }
});

// 에러 헨들러
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

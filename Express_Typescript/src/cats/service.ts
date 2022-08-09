import * as express from "express";
import { Cat } from "../app.model";
const router = express.Router();

// 데이터 전체 조회

export const getCats = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const cats = Cat;
    res.status(200).send({
      success: true,
      cats
    });
  } catch (error) {
    next(error);
  }
};
// 상세 조회
export const getPartialCats = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const cat = Cat.find((value) => {
      return value.id === id;
    });
    if (cat === undefined) {
      throw new Error("해당하는 고양이는 없습니다.");
    }
    res.send({
      success: true,
      cat
    });
  } catch (error) {
    next(error);
  }
};

export const postPartialCat = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const data = req.body;
    Cat.push(data);
    res.status(200).send({ success: true, cats: Cat });
  } catch (error) {
    next(error);
  }
};

export const putPartialCat = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    let cat = Cat.find((value) => {
      return value.id === id;
    });
    cat = data;
    res.status(200).send({ success: true, cat });
  } catch (error) {
    next(error);
  }
};

export const patchParticalCat = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    let cat = Cat.find((value) => {
      return value.id === id;
    });
    console.log(cat);
    cat = { ...cat, ...data }; // cat의 key값 중 data와 중복되는 것만 바꾸는 구조분해할당
    res.status(200).send({ success: true, cat });
  } catch (error) {
    next(error);
  }
};
export const deletePartialCat = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    let cat = Cat.filter((value) => {
      return value.id !== id;
    });
    res.status(200).send({ success: true, cat });
  } catch (error) {
    next(error);
  }
};

import * as express from "express";
import { Cat } from "../app.model";
import {
  getCats,
  getPartialCats,
  postPartialCat,
  putPartialCat,
  patchParticalCat,
  deletePartialCat
} from "./service";
const router = express.Router();

// 데이터 전체 조회
router.get("/cats", getCats);
// 상세 조회
router.get("/cats/:id", getPartialCats);

router.post("/cats", postPartialCat);

router.put("/cats/:id", putPartialCat);

router.patch("/cats/:id", patchParticalCat);

router.delete("/cats/:id", deletePartialCat);
export { router as catsRouter };

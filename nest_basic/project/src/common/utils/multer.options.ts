import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('💾 Create a root uploads folder...');

    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
  } catch (error) {
    console.log('The folder already exists...');
  }

  try {
    console.log(`💾 Create a ${folder} uploads folder...`);

    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`)); // 폴더 생성하는 js 메소드 = 현재 폴더의 부모 폴더에서 uploads/folder 폴더 생성
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);

  return multer.diskStorage({
    // storage에 대한 옵션 정하는 메소드
    destination(req, file, cb) {
      //* 어디에 저장할 지

      const folderName = path.join(__dirname, '..', `uploads/${folder}`);

      cb(null, folderName); // cb의 두번째 인자 저장 위치 설정
    },

    filename(req, file, cb) {
      //* 어떤 이름으로 올릴 지

      const ext = path.extname(file.originalname); // path.extname => 파일에서 확장자 추출

      const fileName = `${path.basename(
        //저장할 파일의 이름
        file.originalname,

        ext,
      )}${Date.now()}${ext}`; //중복된 이미지를 허용하기 위해 date를 넣음

      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  // 매개변수 명의 폴더를 생성
  const result: MulterOptions = {
    storage: storage(folder),
  };

  return result;
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUpload = void 0;
const multer_1 = __importDefault(require("multer"));
//define o destino das imagens e gera o nome
// const imageStorage = multer.diskStorage({
//     destination: function(req, file, callback){
//         callback(null, `src/public/images`);
//     },
//     filename: function(req, file, callback){
//         callback(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname));
//     }
// });
// export const imageUpload = multer({
//     storage: imageStorage,
//     fileFilter(req, file, callback){
//         if(!file.originalname.match(/\.(png|jpg)$/)){
//             return callback(new Error('Formato inválido! Envie um arquivo jpg ou png'));
//         }
//         callback(undefined, true);
//     }
// });
exports.imageUpload = (0, multer_1.default)({ dest: 'src/public/images' });

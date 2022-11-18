import multer from 'multer';
import path from 'path';



// const configMulter = multer.diskStorage({
//     destination: path.resolve(__dirname, '../public/images'),
//     filename: (request, file, callback) => {
//         const filename = file.filename

//         return callback(null, filename)
//     }
// })

// export const upload = multer({storage: configMulter});

//define o destino das imagens e gera o nome
const imageStorage = multer.diskStorage({
    destination: function(req, file, callback){

        callback(null, `src/public/images`);
    },
    filename: function(req, file, callback){
        callback(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname));
    }
});


export const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, callback){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return callback(new Error('Formato inválido! Envie um arquivo jpg ou png'));
        }
        callback(undefined, true);
    }
});
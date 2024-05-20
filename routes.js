const { nanoid } = require('nanoid');
const baju = require('./baju');

const routes = [
  {
    method: 'GET',
    path: "/predict",
    handler: () => ({
      status: 'success',
      data: {
        baju,
      },
    })
      
  },
  {
    method: '*',
    path: '/',
    handler: (request, h) => {
      return 'Halaman tidak ditemukan';
    },
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
      return 'Halaman tidak dapat diakses dengan method tersebut';
    },
  },
  {
    method: 'POST',
    path: '/upload',
    handler: (request, h) => {
    const id = nanoid(16);
    const { filename } = request.payload;
    const jenis = "baju"
    const img_url = "https://storage.googleapis.com/latihan_dataset/model-in-prod/image2471_jpg.rf.141da33af54945f5e4974e6ceaf96c34.jpg"


    const newCloth = {
      id,filename,class : jenis, img_url
    };
 
    baju.push(newCloth);
 
    const isSuccess = baju.filter((n) => n.id === id).length > 0;

    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Gambar berhasil ditambahkan',
        data: {
          baju: id,
        },
      });
      response.code(201);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
      
  },
}
];

module.exports = routes;

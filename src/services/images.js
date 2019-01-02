import {take} from "./Request";
// Todo Hock
let images = [
  'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=368766412,3699396705&fm=26&gp=0.jpg',
  'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1570909248,1025935146&fm=15&gp=0.jpg',
  'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2910392022,443127263&fm=15&gp=0.jpg',
  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3067741723,1664834221&fm=15&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=31137764,478924591&fm=26&gp=0.jpg',
  'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=368766412,3699396705&fm=26&gp=0.jpg',
  'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1570909248,1025935146&fm=15&gp=0.jpg',
  'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2910392022,443127263&fm=15&gp=0.jpg',
  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3067741723,1664834221&fm=15&gp=0.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=31137764,478924591&fm=26&gp=0.jpg'
];

// export function fetchImages() {
//   return new Promise(function (resolve) {
//     setTimeout(() => {
//       resolve({
//         status: 200,
//         data: {
//           "status": 200,
//           "msg": "OK",
//           "result": {
//             "images": images.map((i) => {
//               return {
//                 url: `${i}&time=${+new Date()}`
//               }
//             })
//           }
//         }
//       })
//     }, 1000)
//   });
// }

export function fetchImages(page, shouldLoading) {
  return take.get(`get_images?page=${page}`, {
    shouldLoading
  });
}
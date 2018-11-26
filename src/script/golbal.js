export function compress(img) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let initSize = img.src.length;
  let width = img.width;
  let height = img.height;
  canvas.width = width;
  canvas.height = height;
  // 铺底色
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, width, height);
  //进行最小压缩
  let ndata = canvas.toDataURL("image/jpeg", 0.5);
  console.log("*******压缩后的图片大小*******");
  console.log(ndata.length);
  return ndata;
}
export  default {
  compress,
}

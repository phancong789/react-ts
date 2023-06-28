const hostName: string = "http://wlp.howizbiz.com/";
let param = new URLSearchParams({
  paginate: "true",
  page: "1",
  perpage: "3",
});

let apiRoute = {
  me: "api/me",
  loainoibat: "api/loainoibat",
  webAuthenticate: "api/web-authenticate",
  News: "api/home-post",
  tyleloai: "api/tyleloai",
  loaicongbo: "api/loaicongbo",
  filter: "api/phanloaihoc/filter",
  loaihientrang: "api/loaihientrangs",
  provinces: "api/provinces",
  hesinhthai: "api/hesinhthais",
  giatriloai: "api/giatriloais",
  nghidinh: "api/nghidinhs",
  chedoquanly: "api/chedoquanlys",
  speciesStats: "api/species-stats",
  danhmuccha: "api/danhmuccha",
};

export { hostName, param, apiRoute };

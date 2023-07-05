const hostName: string = "http://wlp.howizbiz.com/";
let HomePageParam = new URLSearchParams({
  paginate: "true",
  page: "1",
  perpage: "3",
});

let getUserParam = new URLSearchParams({
  paginate: "true",
  page: "1",
  perpage: "10",
  with: "roles,createdBy,provinces",
  search: "",
});

let apiRoute = {
  me: "api/me",
  role: "api/roles",
  users: "api/users",
  logout: "api/logout",
  khubaoton: "api/khubaoton",
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

export { hostName, HomePageParam, apiRoute, getUserParam };

export default interface Specie {
  id: "";
  attachments: [
    {
      path: "";
      ten: "";
    }
  ];
  loai_hien_trang: { code: ""; ten: "" };
  ten: "";
  kingdom: { ten: "" };
  phylumn: { ten: "" };
  ten_khoa_hoc: "";
  sach_dos: [
    {
      mo_ta: "";
      ma_danh_muc: "";
      pivot: {
        nam: 0;
      };
    }
  ];
  iucns: [
    {
      mo_ta: "";
      ma_danh_muc: "";
      pivot: {
        nam: 0;
      };
    }
  ];
}

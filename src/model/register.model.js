export class Register {
  constructor() {
    this.name = "";
    this.introduction = "";
    this.cop_sn = "";
    this.ceo_nm = "";
    this.biz_kind = "";
    this.biz_type = "";
    this.email = "";
    this.allday_open = "";
    this.holiday_open = "";
    this.tel = "";
    this.company_payments = [{ ...new Company_payments() }];
    this.company_deliveries = [{ ...new Company_deliveries() }];
    this.company_infras = [{ ...new Company_infras() }];
    this.company_address = { ...new Company_address() };
    this.operating_time = [{ ...new Operating_time() }];
    this.company_document = { ...new Company_document() };
    this.company_profile_img = { ...new Company_profile_img() };
    this.company_imgs = { ...new Company_imgs() };
  }
}

export class Company_profile_img {
  constructor() {
    this.cpiid = "";
    this.key = "";
    this.isprimary = "";
    this.bucket = "";
    this.writedate = ";";
    this.modifydate = "";
    this.image = { ...new Image() };
  }
}

export class Image {
  constructor() {
    this.imagesUrl = "";
    this.message = "";
  }
}

export class Company_imgs {
  constructor() {
    this.ciid = "";
    this.key = "";
    this.isprimary = "";
    this.bucket = "";
    this.writedate = "";
    this.modifydate = "";
    this.comid = "";
    this.image = { ...new Images() };
  }
}
export class Images {
  constructor() {
    this.imagesUrl = "";
    this.message = "";
  }
}

export class Company_payments {
  constructor() {
    this.ptid = "";
    this.name_la = "";
  }
}

export class Company_deliveries {
  constructor() {
    this.delid = "";
    this.name_la = "";
    this.name_en = "";
  }
}

export class Company_infras {
  constructor() {
    this.descrp = "";
    this.if = { ...new Infra() };
  }
}

export class Infra {
  constructor() {
    this.ifid = "";
    this.name_la = "";
    this.name_en = "";
    this.name_kr = "";
    this.name_th = "";
    this.name_vn = "";
    this.name_ch = "";
  }
}

export class Company_address {
  constructor() {
    this.addr_la = "";
    this.addr_en = "";
    this.addr_kr = "";
    this.addr_th = "";
    this.addr_vn = "";
    this.addr_ch = "";
    this.logitude = "";
    this.lagitude = "";
    this.country = { ...new Country() };
    this.province = { ...new Province() };
    this.district = { ...new District() };
    this.village = "";
    this.unit = "";
    this.detail = "";
  }
}
export class Country {
  constructor() {
    this.cid = "";
    this.name_la = "";
  }
}
export class Province {
  constructor() {
    this.pvid = "";
    this.name_la = "";
  }
}

export class District {
  constructor() {
    this.dtid = "";
    this.name_la = "";
  }
}

export class Operating_time {
  constructor() {
    this.open = "";
    this.close = "";
    this.break_start = "";
    this.braek_end = "";
    this.day = { ...new Day() };
  }
}
export class Day {
  constructor() {
    this.did = "";
    this.name_la = "";
    this.name_en = "";
    this.name_ko = "";
    this.name_ch = "";
    this.name_vn = "";
  }
}

export class Company_document {
  constructor() {
    this.firstname = "";
    this.lastname = "";
    this.docid = "";
    this.issuedate = "";
    this.issueplace = "";
    this.issueby = "";
    this.expiredate = "";
    this.birthdate = "";
    this.company_document_type = { ...new Company_document_type() };
  }
}
export class Company_document_type {
  constructor() {
    this.cdtid = "";
    this.name_la = "";
    this.name_en = "";
    this.name_kr = "";
    this.name_th = "";
    this.name_ch = "";
    this.name_vn = "";
  }
}

export const register = new Register();

export default { ...register };

export class Company {
  constructor() {
    this.comid = 0;
    this.id = '';
    this.name = '';
    this.entry = '';
    this.introduction = '';
    (this.business_type = ''), (this.cop_sn = '');
    this.ceo_nm = '';
    this.biz_kind = '';
    this.biz_type = '';
    this.email = '';
    this.second_code = 0;
    this.second_code_time = 0;
    (this.starpoint = 0), (this.delete_yn = ''), (this.status = '');
    (this.expose_yn = ''),
      (this.isactive = ''),
      (this.ispartner = ''),
      (this.isonsite = ''),
      (this.allday_open = '');
    this.holiday_open = '';
    this.noinfo = '';
    this.iswithdraw = '';
    this.memo = '';
    (this.cwrid = 0), 
    (this.csid = 0), 
    (this.writedate = '');
    this.modifydate = '';
    this.company_imgs = [];
    this.company_profile_img = {};
    this.company_payments = [];
    this.lt = {};
    this.company_payments_type = {...new Company_payments_type()};
    this.company_deliveries = [ {...new Company_deliveries()} ];
    this.company_infras = [ {...new Infrastructure()}];
    this.company_address = {...new Company_Address};
    this.operating_times = [ {...new OperatingTime() }];
    this.company_document = { ...new Company_document() };
    this.company_document_type = { ...new Company_document_type() };

  }
}

export class Company_payments_type {
  constructor() {
    this.ptid = 0;
    this.name_la = '';
  }
}

export class Company_deliveries {
  constructor() {
    this.delid = 0;
    this.name_la = '';
    this.name_en = '';
  }
}

export class Infrastructure {
  constructor() {
   this.descrp = '';
   this.infra = { ...new Infra()};
  }
}

export class Infra {
  constructor(){
    this.ifid= 0;
    this.name_la= '';
    this.name_en= '';
    this.name_kr= '';
    this.name_th= '';
    this.name_vn= '';
    this.name_ch= '';
  }
}

export class Company_Address {
  constructor(){
    this.addr_la = '';
    this.addr_en ='';
    this.addr_kr ='';
    this.addr_th ='';
    this.addr_vn ='';
    this.addr_ch ='';
    this.logitude ='';
    this.lagitude ='';
    this.country = {...new Country()};
    this.province = {...new Province()};
    this.district = {...new District()};
    this.village = '';
    this.unit = '';
    this.detail = '';
  }
}

export class Country {
  constructor() { 
    this.cid = 0;
    this.name_la = '';
  }
}

export class Province {
  constructor() { 
    this.pvid = 0;
    this.name_la = '';
  }
}
export class District {
  constructor() { 
    this.dtid = 0;
    this.name_la = '';
  }
}


export class Company_document_type {
  constructor() {
    (this.cdtid = 0), (this.name_la = '');
    this.name_en = '';
    this.name_ko = '';
    this.name_ch = '';
    this.name_vn = '';
  }
}

export class Company_document {
  constructor() {
    this.firstname = '';
    this.lastname = '';
    this.docid = '';
    this.issuedate = '';
    this.issueplace = '';
    this.issueby = '';
    this.expiredate = '';
    this.birthdate = '';
  }
}




export class OperatingTime {
  constructor() {
    this.otid = 0;
    this.open = '';
    this.close = '';
    this.break_start = '';
    this.break_end = '';
    this.did_day = {...new Day()};
  }
}

export class Day {
  constructor() {
    this.did = 0;
    this.name_la = '';
    this.name_en = '';
    this.name_ko = '';
    this.name_ch = '';
    this.name_vn = '';
  }
}

export class company_address {

}

export const company = new Company();

export default { ...company };

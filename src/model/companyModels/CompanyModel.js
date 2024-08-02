class CompanyModel {
    constructor({
        comid,
        comName,
        comImage,
        comProfileImage,
        operatingTimes,
        comAddress,
        comInfra,
        starPoint,
        total,
        myFollwing,
    }) {
        this.comid = comid;
        this.comName = comName;
        this.comImage = comImage;
        this.comProfileImage = comProfileImage;
        this.comAddress = comAddress;
        this.comInfra = comInfra;
        this.operatingTimes = operatingTimes;
        this.starPoint = starPoint;
        this.total = total;
        this.myFollwing = myFollwing;
    }
}

export default CompanyModel;
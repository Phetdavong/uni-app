class ProductDetailModel {
    constructor({
        comid,
        comName,
        comImage,
        operatingTimes,
        products,
        productName,
        productDes,
        productId,
        productPrice,
        productImages,
        comAddress,
        distance,
        starPoint,
        totalReviews,
        good,
        totalReview,
        totalFav,
        totalOrder,
        totalVisit,
        myFavorite,
    }) {
        this.comid = comid;
        this.comName = comName;
        this.comImage = comImage;
        this.operatingTimes = operatingTimes;
        this.products = products;
        this.productName = productName;
        this.productDes = productDes;
        this.productId = productId;
        this.productPrice = productPrice;
        this.productImages = productImages;
        this.comAddress = comAddress;
        this.distance = distance;
        this.starPoint = starPoint;
        this.totalReviews = totalReviews;
        this.good = good;
        this.totalReview = totalReview;
        this.totalFav = totalFav;
        this.totalOrder = totalOrder;
        this.totalVisit = totalVisit;
        this.myFavorite = myFavorite;
    }
}

export default ProductDetailModel;


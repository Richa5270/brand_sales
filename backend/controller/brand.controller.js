const brand_sale = require("../model/brand_sale");

const createBrandSale = async (req, res) => {
  try {
    let brandData = req.body;
    const {
      brand,
      transactionType,
      totalOrders,
      totalOrderValue,
      grossMarginPercentage,
    } = brandData;
    if (
      !brand ||
      !transactionType ||
      !totalOrders ||
      !totalOrderValue ||
      !grossMarginPercentage
    ) {
      return res
        .status(400)
        .send({ status: false, message: "plz enter correct data" });
    }
    const brandsalesData = {
      brand: brand,
      transactionType: transactionType,
      totalOrders: parseInt(totalOrders),
      totalOrderValue:parseInt(totalOrderValue),
      grossMarginPercentage:parseFloat(grossMarginPercentage),
    }; //user.joiValidate(brandData)
    const data = await brand_sale.create(brandsalesData);
    return res.status(200).send({ status: true, data: data });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

//Get DATA API

const getBrandData = async (req, res) => {
  try {
    let getData = await brand_sale.find({});
    if (!getData) {
      return res.status(400).send({
        message: "No such document exist with the attributes.",
      });
    }
    res
      .status(200)
      .send({ status: true, message: "brand list", data: getData });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

//Get Data with query param

const getBrandDataWithQuery = async (req, res) => {
  try {
    let getData = req.query;
    if(getData.brand || getData.totalOrders || totalOrderValue||grossMarginPercentage){
      return res.status(400).send({Status: false, message: " You can't get data with given filter" })
    }
    let getqueryData = await brand_sale.findById({_id:getData}); 
    res.status(200).send({ status: true, message: "brand list", data: getqueryData });
    
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
}

//put(update) api

const updateBrandSale = async (req, res) => {
  try {
    const updateData = req.params.id;
    const details = req.body;
    const updatesDetails = await brand_sale.findByIdAndUpdate(
      { _id: updateData },
      {
        brand: details.brand,
        transactionType: details.transactionType,
        totalOrders: details.totalOrders,
        totalOrderValue: details.totalOrderValue,
        grossMarginPercentage: details.grossMarginPercentage,
      },
      { new: true, upsert: true }
    );
    res
      .status(200)
      .send({ status: true, message: 'updatesDetails', data: updatesDetails });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

//Delete Data api

const deleteBrandSale = async (req, res) => {
  try {
    let deleteData = req.params.id;
    let delData = await brand_sale.findByIdAndDelete({_id:deleteData});
    res
    .status(200)
    .send({ status: true, message: 'deleteDetails'});
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message});
  }
}

module.exports = {
  createBrandSale,
  getBrandData,
  getBrandDataWithQuery,
  updateBrandSale,
  deleteBrandSale,
};

const express = require('express');
const { createBrandSale, getBrandData,getBrandDataWithQuery, updateBrandSale, deleteBrandSale } = require('../controller/brand.controller');
const router = express.Router();

router.post('/brand_sales_daily', createBrandSale);
router.get('/brand_sales_daily', getBrandData);
router.get('/brand_sales_daily_with_query', getBrandDataWithQuery);
router.put('/brand_sales_daily/:id', updateBrandSale);
router.delete('/brand_sales_daily/:id', deleteBrandSale);



module.exports = router;


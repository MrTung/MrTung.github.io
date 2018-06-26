/**
 * Created by 张德福 on 2018/4/24.
 * 商品相关接口（品牌、商品类目等）
 */


/*
*  品牌
* */
brand = {
  id: 1218,//品牌id
  name: "",//名称
  enName: "",//英文名称
  introduction: "", //介绍
  brief: "", //简介
  logo: "", //logo
  seoTitle: "",//页面标题
  seoKeywords: "", //页面关键词
  seoDescription: "", //页面描述
}

/*
 *  商品类目
 * */
productCategory = {
  id: 101,
  name: "", //名称
  seoTitle: "", //页面标题
  seoKeywords: "", //页面关键词
  seoDescription: "", //页面描述
  grade: 1, //层级
  image: "", //展示图片
  parent: {},//父分类，略
  children: [], //子分类， 略
  products: [], //产品列表， 略
  brands: [], //筛选品牌，略
  catagoryTree: [], //类目树, 前端用于面包屑导航, 略
}

/*
 *  商品评论项
 * */
productReview = {
  id: 111,
  score: 3, //评分
  content: "", //内容
  memberName: "", //用户名
  time: 1524550787970, //时间戳
}



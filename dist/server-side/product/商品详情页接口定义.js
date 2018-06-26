/**
 * Created by 张德福 on 2018/4/24.
 * 商品详情页相关接口
 */

//  所有的json数据格式都是  {"code": "0000","data":  { ..主体.. }
//  此文档只写出 主体

/*
 *  商品基础信息接口
 *  @调用方式： GET
 *  @parameters:  id  --> 商品的id
 *  #建议地址： ${base}/product/info
 *  $说明：每次调用该接口，后台都要记录 点击量
 * */
product = {
  id: 3601, //商品的id
  isDeleted:true , //逻辑删除标识。 对于已经删除的，下面的信息不用处理  改名 deleted => isDeleted
  isMarketable: true, //是否上架（可以卖， true表示可以卖。 对于不可以卖的，下面的信息不用处理） 改名 marketable => isMarketable
  isList: true, //是否列出（是否在列表页、搜索结果页展示， true表示在所属列表页展示）改名 listable => isList
  sn: "", // 编号
  name: "博世TBM3400 10MM手电钻", //名称
  fullName: "【工具节】博世TBM3400 10MM手电钻 340W正反转多功能电动螺丝批/1把",//全称
  brief: "功率更强，转速更快；滚珠轴承更耐用，同心度更高；带正反转，调速功能，适合多种作业",//商品简介
  makerModel: "06011A9180",//制造商型号
  price: 150.34, //价格
  stock: 10, // 库存  增加
  enableStock: 8, //可用库存  增加
  allocatedStock: 2, //已分配库存  增加
  introduction: "&lt;p&gt;内容1&lt;/p&gt;", //介绍图文详情，html编码
  pdfinstructions: "", // PDF说明书的路径  改动 $删除
  offlinePayable: true, //是否支持货到付款	改动 $删除
  freeShipable: true, //是否支持包邮	改动 $删除
  seoTitle: "",//页面标题
  seoKeywords: "", //页面关键词
  seoDescription: "", //页面描述
  catagoryTree: [ //类目树, 前端用于面包屑导航
    {
      id: 79,
      name: "手动工具"
    },{
      id: 101,
      name: "螺丝批及批头"
    }, {
      id: 2531,
      name: "冲击螺丝批头"
    }
  ],
  relatedCategories:[//相关分类, 两级
    {
      id: 2531,
      name: "冲击螺丝批头",
      children:[
        {
          id: 2532,
          name: "冲击螺丝批头的子类目",
        },
      ]
    },
  ],
  brand: {//品牌，Brand类的部分字段
    id: 1218,//品牌id
    name: "",//名称
    enName: "",//英文名称
    logo: "", //logo
  },
  imageList: [//图片的数组。 考虑到cdn的应用及更换， 都用绝对网址； 再考虑到http和https； 都用 “//”开头，而不指定协议  改动 images=>imageList
    {
      thumbnail: "//192.168.100.145/image/toolmallPc/proudct/prouctView/2017/5/2cf84ebc-ae1e-408a-bb04-4976d21b58cc-medium.jpg", //小图
      medium: "", //300 * 300的图
      medium400: "", //400 * 400 的图
      large: "", //大图
    },
  ],
  video: "", //视频  改动 $删除
  paramList: [//参数					改动 parameters=>paramList
    {
      name: "磨头直径",
      value: "10mm"
    }
  ],
  reviews: [ //评论的列表。 因为现在土猫网没有开启真实评论，所以把评论信息并入商品基础信息中	改动 $删除
    {
      id: 111,
      score: 3, //评分
      content: "", //内容
      memberName: "", //用户名
      time: 1524550787970, //时间戳
    }
  ],
};

/*
 * 猫工推荐搭配（相关商品）的商品列表
 *  @调用方式： GET
 *  @parameters:  id  --> 商品的id
 *  #建议地址： ${base}/product/relatings
 * */
relatedProducts = [//选取部分product的属性
  {
    id: 3601,//商品的id
    name: "博世TBM3400 10MM手电钻", //名称
    price: 150.34, //价格
    image:{//主图
      thumbnail: "//192.168.100.145/image/toolmallPc/proudct/prouctView/2017/5/2cf84ebc-ae1e-408a-bb04-4976d21b58cc-medium.jpg", //小图
      medium: "", //300 * 300的图
      medium400: "", //400 * 400 的图
      large: "", //大图
    }
  }
]

/*
 * 商品页面的点击量
 *  @调用方式： GET
 *  @parameters:  id  --> 商品的id
 *  #建议地址： ${base}/product/hits
 $删除
 * */
productHits = {
  "id": 3601, //商品的id
  hits: 30, //总点击数
  dayHits: 4, //日点击数
  weekHits: 16, //周点击数
  monthHits: 20, //月点击数
};

/*
 * 商品销量
 *  @调用方式： GET
 *  @parameters:  id  --> 商品的id
 *  #建议地址： ${base}/product/sales
 $删除
 * */
productSales = {
  "id": 3601, //商品的id
  sales: 200, //总销量
  daySales: 7, //日销量
  weekSales: 50, //周销量
  monthSales: 150, //月销量
};

/*
 * 商品库存量
 *  @调用方式： GET
 *  @parameters:  id  --> 商品的id
 *  #建议地址： ${base}/product/stocks
 $删除
 * */
productStocks = {
  stock: 10, // 库存
  enableStock: 8, //可用库存
  allocatedStock: 2, //已分配库存
};

/*
 * 商品评分
 *  @调用方式： GET
 *  @parameters:  id  --> 商品的id
 *  #建议地址： ${base}/product/scores
 $删除
 * */
productScores = {
  score: 5.2, //评分
  totalScore: 520, //总评分
  scoreCount: 100, //评分数(打分人数)
};

/*
 * 商品评分
 *  @调用方式： GET
 *  @parameters:  id  --> 商品的id
 *  #建议地址： ${base}/product/specification
 * */
specification = {
  specificationName: "规格", //规格的名字
  specificationValue: "S1J-FF03-10",//值
  siblings:[//同规格商品列表， 选取部分字段
    {
      id: 3601,//商品的id
      name: "博世TBM3400 10MM手电钻", //名称
      price: 150.34, //价格
      image:{}, //主图, 略
      specificationValue: "S1J-FF02-10",//值
      parameters: [//参数
        {
          name: "磨头直径",
          value: "10mm"
        }
      ],
    }
  ]
};

/*----------------  促销信息（待做）  -----------------*/
/*---------------------  交互（行为） -----------------------*/
/*
 * 请求商品的限购数量
 *  @调用方式： Post
 *  @parameters:  id  --> 商品的id
 *  @parameters-cookie： session_id  -->  后台判断当前用户的依据
 *  #建议地址： ${base}/product/buyLimit
 *  $说明： 库存变动、促销活动每人限购数、当前用户是否购买过等等  都可能会影响到限购数量
 $删除
 * */
BuyLimitResponse = {
  productId: 3601, //产品id
  limitValue: 3, //限购数量。 可以认为999999是无限大（不限购）
};

/*
 * 请求地区
 *  @调用方式： Post
 *  @parameters-cookie： session_id  -->  后台判断当前用户的依据
 *  #建议地址： ${base}/common/getArea
 *  $说明： 土猫网C端的请求地址是 /common/isLoginInJsonp.jhtm
 $删除
 * */
getAreaResponse = {
  logined: true, //如果当前用户没有登录， 那么下面的信息不用处理
  id: 3,//地区的编号
  name: "北京",  //地区的名字
}

/*
 * 请求商品的限购数量
 *  @调用方式： Post
 *  @parameters:  productId    产品id
 *  @parameters:  areaId       地区的id
 *  @parameters:  quantity      购买数量
 *  @parameters-cookie： session_id  -->  后台判断当前用户的依据
 *  #建议地址： ${base}/product/calculateFreight
 *  $说明： 土猫网C端的请求地址是 /product/calculateFreightInJsonp.jhtm
 $删除
 * */
calculateFreightResponse = {
  freight: 36.74
}

/*
 * 请求省份列表
 *  @调用方式： Post
 *  #建议地址： ${base}/product/arealist
 *  $说明： 土猫网C端的请求地址是 /product/arealistInJsonp.jhtm
 $删除
 * */
getArealistResponse = [{
  id: 3,//地区的编号
  name: "北京",  //地区的名字
},]

/*
 * 把一个商品加入购物车
 *  @调用方式： Post
 *  @parameters:  productId    产品id
 *  @parameters:  quantity    数量
 *  @parameters-cookie： session_id  -->  后台判断当前用户的依据
 *  #建议地址： ${base}/cart/add
 *  $说明： 土猫网C端的请求地址是 /cart/addInJsonp.jhtm
 * */
addToCartResponse = {} //返回有状态码（还有出错原因）就可以了


/*
 * 立即购买的校验
 *  @调用方式： Post
 *  @parameters:  productId    产品id
 *  @parameters:  quantity    数量
 *  @parameters-cookie： session_id  -->  后台判断当前用户的依据
 *  #建议地址： ${base}/cart/buycheck
 *  $说明：前台的立即购买按钮，要先走此方法判断是否允许买，如果允许买就跳转到结算页
 * */
buyCheckResponse = {} //返回有状态码（还有出错原因）就可以了




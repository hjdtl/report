///////////////////////////////////////日期显示///////////////////////////////////////

Date.prototype.Format = function(format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  }

  if(/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for(var k in o) {
    if(new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}
String.prototype.replaceAll = function(s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2);
}

function showResult(data) {
  $(".footer").remove();
  $("body").append('<div class="footer"><textarea>' + JSON.stringify(data.result[0]).replaceAll(',', '\r\n') + '</textarea></div>');
}

//隐藏 年  按钮
function gmqinit() {
  $btn = $("button:contains('年')");
  $btn.parent().hide().remove();
}

// 时间水印功能
function setDay(id, page) {
  var data = $("#" + id).find(".btn-group").find(".active").attr("data");
  if(data === "day")
    $("#" + id).find(".mask_div").html(getDay(page));
  else if(data === "week") {
    var day = new Date();
    day.setDate(day.getDate() - (page - 1) * 7);
    var week = GetWeekIndex(day);
    var year = day.Format("yyyy");
    var month = day.Format("MM");
    if(week > 50 && month === "01") year = year - 1;
    if(week === 1 && month === "12") year = year + 1;
    $("#" + id).find(".mask_div").html(year + "第" + week + "周");
  } else if(data === "month") {
    var day = new Date();
    day.setMonth(day.getMonth() - (page - 1));
    $("#" + id).find(".mask_div").html(day.Format("yyyyMM"));
  } else if(data === "year") {
    var day = new Date();
    var year = day.Format("yyyy") - page + 1
    $("#" + id).find(".mask_div").html(year);
  }
}

var domain = ""; //  http://10.10.1.41:443
//var domain = "http://192.168.10.206:8080"; http://192.168.10.206

/*********************************************************/ //2.html
//专门用来 初始化url的
var initial_url = "@k";
var isload = false;
//取名规则 url_板块名称_下一级维度_日期维度
//业绩看板
var url_yjkb_day = domain + "/pages/sysb/SysbQuery/p.do?fidSysbquery=8a8a815e589911170158bdf7ba640013&time=" + new Date().getTime();

var url_yjkb_week = domain + "/pages/sysb/SysbQuery/p.do?fidSysbquery=40288a4e58d7c5630158d7c8c076001a&time=" + new Date().getTime();

var url_yjkb_month = domain + "/pages/sysb/SysbQuery/p.do?fidSysbquery=40288a4e58d7c5630158d7fcd9e2007b&time=" + new Date().getTime();

var url_yjkb_year = domain + "/pages/sysb/SysbQuery/p.do?fidSysbquery=8a8a815e5919ab8f015919c8ae930029&time=" + new Date().getTime();

//店员业绩
var url_dyyj_day = domain + "/pages/sysb/SysbQuery/p.do?fidSysbquery=8a8a81a95985ff49015991b09b8602e7&time=" + new Date().getTime();

var url_dyyj_week = domain + "/pages/sysb/SysbQuery/p.do?fidSysbquery=8a8a81a95985ff49015991b1975902e8&time=" + new Date().getTime();

var url_dyyj_month = domain + "/pages/sysb/SysbQuery/p.do?fidSysbquery=8a8a81a95985ff49015991b23a9d02e9&time=" + new Date().getTime();

var url_dyyj_year = domain + "/pages/sysb/SysbQuery/p.do?fidSysbquery=8a8a81a95985ff49015991b358e502ea&time=" + new Date().getTime();

url_spph_jm_month = domain + "" +
  new Date().getTime();
var queryUrl = "/pages/sysb/SysbQuery/p.do?fidSysbquery=";
// 数据  (all: 全部  zy: 直营  jm: 加盟 )下同
var urlJson = {
  //区域排名(
  "qyph_all_day": "40288a4e58e6210e0158e63af4b90037&pageSize=50&",
  "qyph_all_week": "40288a4e58e6210e0158e63bbf72003d&pageSize=50&",
  "qyph_all_month": "40288a4e58e6210e0158e63c5ae30045&pageSize=50&",
  "qyph_jm_day": "40288a4e58e6210e0158e63af4b90037&type=2&pageSize=50&",
  "qyph_jm_week": "40288a4e58e6210e0158e63bbf72003d&type=2&pageSize=50&",
  "qyph_jm_month": "40288a4e58e6210e0158e63c5ae30045&type=2&pageSize=50&",
  "qyph_zy_day": "40288a4e58e6210e0158e63af4b90037&type=1&pageSize=50&",
  "qyph_zy_week": "40288a4e58e6210e0158e63bbf72003d&type=1&pageSize=50&",
  "qyph_zy_month": "40288a4e58e6210e0158e63c5ae30045&type=1&pageSize=50&",
  "qyph_all_year": "8a8a815e5919ab8f015919ee7e5a0097&pageSize=50&",
  "qyph_zy_year": "8a8a815e5919ab8f015919ee7e5a0097&&type=1&pageSize=50&",
  "qyph_jm_year": "8a8a815e5919ab8f015919ee7e5a0097&&type=2&pageSize=50&",
  //区域业绩分析
  "qyyjfx_all_day":"8a8a81ab5d4f857b015dcb21b37521af&",
  "qyyjfx_all_week":"8a8a81ab5d4f857b015dcf141f792276&",
  "qyyjfx_all_month":"8a8a81ab5d4f857b015dcf1782fb2291&",
  "qyyjfx_jm_day":"8a8a81ab5d4f857b015dcb21b37521af&type=2&",
  "qyyjfx_jm_week":"8a8a81ab5d4f857b015dcf141f792276&type=2&",
  "qyyjfx_jm_month":"8a8a81ab5d4f857b015dcf1782fb2291&type=2&",
  "qyyjfx_zy_day":"8a8a81ab5d4f857b015dcb21b37521af&type=1&",
  "qyyjfx_zy_week":"8a8a81ab5d4f857b015dcf141f792276&type=1&",
  "qyyjfx_zy_month":"8a8a81ab5d4f857b015dcf1782fb2291&type=1&",
  //店铺业绩分析
  "dpyj_all_day": "8a8a81ab5dcf408a015dcfbe1acc009f&",
  "dpyj_all_week": "8a8a81ab5dcf408a015dcfc5267d00ae&",
  "dpyj_all_month": "8a8a81ab5dcf408a015dcfcc9c3600cd&",

  //店铺排名
  "dpph_all_day": "40288a4e58f59d970158f7285d6f028b&",
  "dpph_all_week": "8a8a815e5919ab8f01591a1ae9a100d0&",
  "dpph_all_month": "8a8a815e5919ab8f01591a30d21200d7&",
  "dpph_all_year": "8a8a815e5919ab8f01591aa7950600dd&",
  "dpph_jm_day": "40288a4e58f59d970158f7285d6f028b&type=2&",
  "dpph_jm_week": "8a8a815e5919ab8f01591a1ae9a100d0&type=2&",
  "dpph_jm_month": "8a8a815e5919ab8f01591a30d21200d7&type=2&",
  "dpph_jm_year": "8a8a815e5919ab8f01591aa7950600dd&type=2&",
  "dpph_zy_day": "40288a4e58f59d970158f7285d6f028b&type=1&",
  "dpph_zy_week": "8a8a815e5919ab8f01591a1ae9a100d0&type=1&",
  "dpph_zy_month": "8a8a815e5919ab8f01591a30d21200d7&type=1&",
  "dpph_zy_year": "8a8a815e5919ab8f01591aa7950600dd&type=1&",
  //商品排名
  "spph_all_day": "40288a4e58fb1d450158fc7c831401e5&",
  "spph_all_week": "40288a4e58fb1d450158fc8dd08101f2&",
  "spph_all_month": "8a8a815e5919ab8f01591b8f2e950316&",
  "spph_all_year": "40288a4e58fb1d450158fc8ff7fe0201&",
  "spph_jm_day": "40288a4e58fb1d450158fc7c831401e5&type=2&",
  "spph_jm_week": "40288a4e58fb1d450158fc8dd08101f2&type=2&",
  "spph_jm_month": "8a8a815e5919ab8f01591b8f2e950316&type=2&",
  "spph_jm_year": "40288a4e58fb1d450158fc8ff7fe0201&type=2&",
  "spph_zy_day": "40288a4e58fb1d450158fc7c831401e5&type=1&",
  "spph_zy_week": "40288a4e58fb1d450158fc8dd08101f2&type=1&",
  "spph_zy_month": "8a8a815e5919ab8f01591b8f2e950316&type=1&",
  "spph_zy_year": "40288a4e58fb1d450158fc8ff7fe0201&type=1&",
  //店铺销售
  "dpxs_day": "40288a4e58fb1d450158fbd0c0fc004c&",
  "dpxs_week": "40288a4e58fb1d450158fbd12b9b0054&",
  "dpxs_month": "40288a4e58fb1d450158fbd2e7ea0078&",
  "dpxs_year": "8a8a815e592417180159253537fa0404&",
  //营业员排名
  "yyy_all_day": "8a8a815e59241718015929934ad10b4d&",
  "yyy_all_month": "8a8a815e592417180159299a83cb0b51&",
  "yyy_all_week": "8a8a815e592417180159299742660b4f&",
  "yyy_all_year": "8a8a815e59241718015929a95a450b56&",

  "yyy_zy_day": "8a8a815e59241718015929934ad10b4d&type=1&",
  "yyy_zy_month": "8a8a815e592417180159299a83cb0b51&type=1&",
  "yyy_zy_week": "8a8a815e592417180159299742660b4f&type=1&",
  "yyy_zy_year": "8a8a815e59241718015929a95a450b56&type=1&",

  "yyy_jm_day": "8a8a815e59241718015929934ad10b4d&type=2&",
  "yyy_jm_month": "8a8a815e592417180159299a83cb0b51&type=2&",
  "yyy_jm_week": "8a8a815e592417180159299742660b4f&type=2&",
  "yyy_jm_year": "8a8a815e59241718015929a95a450b56&type=2&",
  //关键指标
  "gjzb_all_day": "8a8a815e592a6d4901592af7ac4001f4&",
  "gjzb_all_month": "8a8a815e592a6d4901592af92ec601f6&",
  "gjzb_all_week": "8a8a815e592a6d4901592af85a5801f5&",
  "gjzb_all_year": "8a8a815e592a6d4901592afae7bb01f7&",

  "gjzb_zy_day": "8a8a815e592a6d4901592af7ac4001f4&type=1&",
  "gjzb_zy_month": "8a8a815e592a6d4901592af92ec601f6&type=1&",
  "gjzb_zy_week": "8a8a815e592a6d4901592af85a5801f5&type=1&",
  "gjzb_zy_year": "8a8a815e592a6d4901592afae7bb01f7&type=1&",

  "gjzb_jm_day": "8a8a815e592a6d4901592af7ac4001f4&type=2&",
  "gjzb_jm_month": "8a8a815e592a6d4901592af92ec601f6&type=2&",
  "gjzb_jm_week": "8a8a815e592a6d4901592af85a5801f5&type=2&",
  "gjzb_jm_year": "8a8a815e592a6d4901592afae7bb01f7&type=2&",
  //地图
  "map_day": "8a8a815e592a6d4901592f68ead104f3&pageSize=50&",
  "map_year": "8a8a815e592a6d4901592f77c624050a&pageSize=50&",
  "map_month": "8a8a815e592a6d4901592f772cac0509&pageSize=50&",
  "map_week": "8a8a815e592a6d4901592f7698c70508&pageSize=50&",
  //商品列表
  proList_day: "8a8a81a9596865d501596c5ed3260109&",
  proList_week: "8a8a81a9596865d501596cb19de50160&",
  proList_month: "8a8a81a9596865d501596cb5d63f0162&",
  proList_year: "8a8a81a9596865d501596cb9aab80165&",

  //商品列表
  proMsg_day: "8a8a81a95976b784015977cfc46e0057&",
  proMsg_week: "8a8a81a95976b784015977d11c960059&",
  proMsg_month: "8a8a81a95976b784015977d1eac4005a&",
  proMsg_year: "8a8a81a95985ff4901598637c71d0002&",
  proMsg: "8a8a81a95985ff490159866c384f000a&",

  // 热卖产品数量穿透
  "reatil_khSku_day": "8a8a815e5c2e0521015c2e14568c00d3&pageSize=32&",
  "reatil_khSku_week": "8a8a815e5c2e0521015c38110d420db5&pageSize=32&",
  "reatil_khSku_month": "8a8a815e5c2e0521015c3813f36a0dea&pageSize=32&",

  //铺货店数列表
  "reatil_SkuPH":"8a8a815e5cfe748d015dc58f7f4d6e09&pageSize=100&",

  // 商品店铺销售（穿透页）
  gss_day: "8a8a815e5cfe748d015d3f911b8a4c19&",
  gss_week: "8a8a815e5cfe748d015d3f91a0df4c1f&",
  gss_month: "8a8a815e5cfe748d015d3f926f544c2a&",

  storeSearch: "8a8a81a95a2fd64c015a3066004600c1&", //店铺查询
  customerSearch: "8a8a81a95a44d864015a49c7fd4f0091&", //区域查询
  proSearch: "8a8a81a95a44d864015a49aeefe4008d&", //商品查询
  customerIndex: "8a8a81a95a63e115015a68ea3bad007b&pageSize=50&",
  proIndex: "8a8a81a95a63e115015a6917593b007f&pageSize=50&",
  storeIndex: "8a8a81a95a63e115015a68f1ed24007d&pageSize=50&",
  setMsgData: "40288a4e58fb1d450158fbd0c0fc004c&time=1488268019402&cStoreId=5086&",
  billIndex: "8a8a81a95a7e8a01015a8dff4ccd0486&",
  userRole: "8a8a81a95aa89d7d015aabdbbfb90095&",
  O2OSearch: "ff8080815a987e25015aa819adf20df8&",
  // 生产报表
  // 车间计划
  "product_all": "8a8a81a95aa633d3015aa6e615c700b2&",
  //  生产概览
  "product_scgl_day": "8a8a815e5cfe748d015d6325a20d782d&",
  "product_scgl_day_gxzrks": "8a8a815e5cfe748d015d638e858978a9&",
  "product_scgl_day_fcsczz": "8a8a815e5cfe748d015d63d6f3e07b03&",
  "product_scgl_week": "8a8a815e5cfe748d015d639ce12b78cf&",
  "product_scgl_week_gxzrks": "8a8a815e5cfe748d015d63ba322079f6&",
  "product_scgl_week_fcsczz": "8a8a815e5cfe748d015d63d8c12c7b41&",
  "product_scgl_month": "8a8a815e5cfe748d015d639fe7fe78df&",
  "product_scgl_month_gxzrks": "8a8a815e5cfe748d015d63bade847a13&",
  "product_scgl_month_fcsczz": "8a8a815e5cfe748d015d63d9adea7b5c&",
  //  订单投料
  "product_ddtl": "8a8a815e5cfe748d015d67f2fb6b0009&",
  "product_ddtl_fx": "8a8a815e5cfe748d015d67f8268e001f&",
  // 订单投料明细
  "product_ddtlmx": "8a8a815e5cfe748d015d724cb7160be2&",
  // 订单款号投料明细
  "product_ddtlkhmx": "8a8a815e5cfe748d015d729b8a640c4b&",
  "product_ddtlkhmx_bg": "8a8a815e5cfe748d015d737c94de0db3&",
  // 订单投料2
  "product_ddtl2": "8a8a815e5cfe748d015d7862e14b160a&pageSize=50&",
  //投料排行
  "product_tlph_day": "8a8a815e5cfe748d015d7d7bc5561b49&",
  "product_tlph_week": "8a8a815e5cfe748d015d7d7d066c1b51&",
  "product_tlph_month": "8a8a815e5cfe748d015d7d7dba311b59&",

  //大类占比
  "type_all_day": "8a8a815e5b43e625015b6a542194369a&pageSize=50&",
  "type_all_year": "8a8a815e5b43e625015b6a5491d3369b&pageSize=50&",
  "type_all_month": "8a8a815e5b43e625015b6a55707e369c&pageSize=50&",
  "type_all_week": "8a8a815e5b43e625015b6a55db9f369d&pageSize=50&",
  // 业绩看板/店铺业绩  日折线图
  "tot_qty_day": "8a8a81ab5b1da5cf015b226cddf603cd&",
  // 业绩看板/店铺业绩   周折线图
  "tot_qty_week": "8a8a81ab5b1da5cf015b2267d47603c2&",
  // 业绩看板/店铺业绩    月折线图
  "tot_qty_month": "8a8a81ab5b274e62015b31537fa00333&",
  // 首页/店铺 同环比
  "tot_bb_day": "8a8a815e5b43e625015b55c192630e86&",
  // 天气jia图表  7天
  "weather": "8a8a81ab5b274e62015b3cf0f94d10e5&",

  //会员
  //会员看板
  "vip_hykb_day": "8a8a815e5b43e625015b5ba29142164d&",
  "vip_hykb_week": "8a8a815e5b43e625015b5baff973168b&",
  "vip_hykb_month": "8a8a815e5b43e625015b5bbc077316bb&",
  "vip_hykb_year": "8a8a815e5b43e625015b5bc6065816cd&",
  // 卡类占比
  "vip_hykb_day_klzb": "8a8a815e5c8f881f015ca519af771c30&",
  "vip_hykb_week_klzb": "8a8a815e5c8f881f015ca51eab701c78&",
  "vip_hykb_month_klzb": "8a8a815e5c8f881f015ca51ff8671c89&",
  // 区域分布
  "vip_hykb_day_qyfb": "8a8a815e5c8f881f015ca524e0151cb1&",
  "vip_hykb_week_qyfb": "8a8a815e5c8f881f015ca527738c1cba&",
  "vip_hykb_month_qyfb": "8a8a815e5c8f881f015ca52853fb1cc4&",

  //会员画像
  //年龄段分析
  "vip_hyhx_all_day": "8a8a815e5c8f881f015c9b4185e8123a&",
  "vip_hyhx_all_week": "8a8a815e5c8f881f015c9ff669f015be&",
  "vip_hyhx_all_month": "8a8a815e5c8f881f015c9ff4991b15a4&",
  "vip_hyhx_zy_day": "8a8a815e5c8f881f015c9b4185e8123a&",
  "vip_hyhx_zy_week": "8a8a815e5c8f881f015c9ff669f015be&",
  "vip_hyhx_zy_month": "8a8a815e5c8f881f015c9ff4991b15a4&",
  "vip_hyhx_jm_day": "8a8a815e5c8f881f015c9b4185e8123a&",
  "vip_hyhx_jm_week": "8a8a815e5c8f881f015c9ff669f015be&",
  "vip_hyhx_jm_month": "8a8a815e5c8f881f015c9ff4991b15a4&",
  // 星座
  "vip_hyhx_all_day_xz": "8a8a815e5c8f881f015c9f668e4b14a4&",
  "vip_hyhx_all_week_xz": "8a8a815e5c8f881f015c9ff0807d1574&",
  "vip_hyhx_all_month_xz": "8a8a815e5c8f881f015c9ff25f661585&",
  "vip_hyhx_zy_day_xz": "8a8a815e5c8f881f015c9f668e4b14a4&",
  "vip_hyhx_zy_week_xz": "8a8a815e5c8f881f015c9ff0807d1574&",
  "vip_hyhx_zy_month_xz": "8a8a815e5c8f881f015c9ff25f661585&",
  "vip_hyhx_jm_day_xz": "8a8a815e5c8f881f015c9f668e4b14a4&",
  "vip_hyhx_jm_week_xz": "8a8a815e5c8f881f015c9ff0807d1574&",
  "vip_hyhx_jm_month_xz": "8a8a815e5c8f881f015c9ff25f661585&",

  //区域排行
  "vip_qyph_all_day": "8a8a815e5b43e625015b5fdc3fae1ba8&pageSize=50&",
  "vip_qyph_all_week": "8a8a815e5b43e625015b5fe6d63e1bf6&pageSize=50&",
  "vip_qyph_all_month": "8a8a815e5b43e625015b5fe4d0f21be9&pageSize=50&",
  "vip_qyph_all_year": "8a8a815e5b43e625015b5fea0e6d1c11&pageSize=50&",
  "vip_qyph_zy_day": "8a8a815e5b43e625015b5fdc3fae1ba8&pageSize=50&type=1&",
  "vip_qyph_zy_week": "8a8a815e5b43e625015b5fe6d63e1bf6&pageSize=50&type=1&",
  "vip_qyph_zy_month": "8a8a815e5b43e625015b5fe4d0f21be9&pageSize=50&type=1&",
  "vip_qyph_zy_year": "8a8a815e5b43e625015b5fea0e6d1c11&pageSize=50&type=1&",
  "vip_qyph_jm_day": "8a8a815e5b43e625015b5fdc3fae1ba8&pageSize=50&type=2&",
  "vip_qyph_jm_week": "8a8a815e5b43e625015b5fe6d63e1bf6&pageSize=50&type=2&",
  "vip_qyph_jm_month": "8a8a815e5b43e625015b5fe4d0f21be9&pageSize=50&type=2&",
  "vip_qyph_jm_year": "8a8a815e5b43e625015b5fea0e6d1c11&pageSize=50&type=2&",

  //店铺排行
  "vip_dpph_all_day": "8a8a815e5b43e625015b64fb98682200&",
  "vip_dpph_all_week": "8a8a815e5b43e625015b64ff1cc3221a&",
  "vip_dpph_all_month": "8a8a815e5b43e625015b6519b28422a2&",
  "vip_dpph_all_year": "8a8a815e5b43e625015b6520cdcf22c0&",
  "vip_dpph_zy_day": "8a8a815e5b43e625015b64fb98682200&type=1&",
  "vip_dpph_zy_week": "8a8a815e5b43e625015b64ff1cc3221a&type=1&",
  "vip_dpph_zy_month": "8a8a815e5b43e625015b6519b28422a2&type=1&",
  "vip_dpph_zy_year": "8a8a815e5b43e625015b6520cdcf22c0&type=1&",
  "vip_dpph_jm_day": "8a8a815e5b43e625015b64fb98682200&type=2&",
  "vip_dpph_jm_week": "8a8a815e5b43e625015b64ff1cc3221a&type=2&",
  "vip_dpph_jm_month": "8a8a815e5b43e625015b6519b28422a2&type=2&",
  "vip_dpph_jm_year": "8a8a815e5b43e625015b6520cdcf22c0&type=2&",

  // 会员生日
  "vip_hysr_all_day": "8a8a815e5b43e625015b83c44cf65a5c&",
  "vip_hysr_all_month": "8a8a815e5b43e625015b83c719c55a89&",
  "vip_hysr_all_smonth": "8a8a815e5b43e625015b83c85df65a9c&",
  "vip_hysr_zy_day": "8a8a815e5b43e625015b83c44cf65a5c&type=1&",
  "vip_hysr_zy_month": "8a8a815e5b43e625015b83c719c55a89&type=1&",
  "vip_hysr_zy_smonth": "8a8a815e5b43e625015b83c85df65a9c&type=1&",
  "vip_hysr_jm_day": "8a8a815e5b43e625015b83c44cf65a5c&type=2&",
  "vip_hysr_jm_month": "8a8a815e5b43e625015b83c719c55a89&type=2&",
  "vip_hysr_jm_smonth": "8a8a815e5b43e625015b83c85df65a9c&type=2&",

  // 会员信息
  "vip_hyxx": "8a8a815e5b43e625015b84addfde5dce&",
  "vip_hyxx_mx": "8a8a815e5c8f881f015ca9d59f8d2379&",
  // 会员印象 (标签)
  "vip_hyxx_yx": "8a8a81ab5d349ee3015d34cc36cf009d&",

  // 消费排行
  "vip_xfph_zjxf": "8a8a815e5b43e625015b8902b2c262ba&",
  "vip_xfph_xfze": "8a8a815e5b43e625015b88f91fe862ab&",
  "vip_xfph_xfpl_three": "8a8a815e5b8e340c015b8f7f556a05c7&",
  "vip_xfph_xfpl_six": "8a8a815e5b8e340c015b8f80876105d3&",
  "vip_xfph_xfpl_twelve": "8a8a815e5b8e340c015b8f813e2205de&",

  // 积分明细
  "vip_jfmx": "8a8a815e5b43e625015b851751a45e5d&",

  // 消费明细
  "vip_xfmx": "8a8a815e5b43e625015b8523fda85e7f&",

  // 会员分析
  "vip_hyfx_all_day": "8a8a815e5b8e340c015b9ddffa961db1&pageSize=50&",
  "vip_hyfx_all_week": "8a8a815e5b8e340c015b9de61d501dee&pageSize=50&",
  "vip_hyfx_all_month": "8a8a815e5b8e340c015b9de832461e03&pageSize=50&",
  "vip_hyfx_all_year": "8a8a815e5b8e340c015b9deaf5271e11&pageSize=50&",

  "vip_hyfx_zy_day": "8a8a815e5b8e340c015b9ddffa961db1&pageSize=50&type=1&",
  "vip_hyfx_zy_week": "8a8a815e5b8e340c015b9de61d501dee&pageSize=50&type=1&",
  "vip_hyfx_zy_month": "8a8a815e5b8e340c015b9de832461e03&pageSize=50&type=1&",
  "vip_hyfx_zy_year": "8a8a815e5b8e340c015b9deaf5271e11&pageSize=50&type=1&",

  "vip_hyfx_jm_day": "8a8a815e5b8e340c015b9ddffa961db1&pageSize=50&type=2&",
  "vip_hyfx_jm_week": "8a8a815e5b8e340c015b9de61d501dee&pageSize=50&type=2&",
  "vip_hyfx_jm_month": "8a8a815e5b8e340c015b9de832461e03&pageSize=50&type=2&",
  "vip_hyfx_jm_year": "8a8a815e5b8e340c015b9deaf5271e11&pageSize=50&type=2&",

  // 卡类排行
  "vip_klph_all_day": "8a8a815e5b43e625015b8a0c292b64d4&pageSize=50&",
  "vip_klph_all_week": "8a8a815e5b8e340c015b943742140d04&pageSize=50&",
  "vip_klph_all_month": "8a8a815e5b8e340c015b943d90210d3a&pageSize=50&",
  "vip_klph_all_year": "8a8a815e5b8e340c015b944054d60d4f&pageSize=50&",

  "vip_klph_zy_day": "8a8a815e5b43e625015b8a0c292b64d4&pageSize=50&type=1&",
  "vip_klph_zy_week": "8a8a815e5b8e340c015b943742140d04&pageSize=50&type=1&",
  "vip_klph_zy_month": "8a8a815e5b8e340c015b943d90210d3a&pageSize=50&type=1&",
  "vip_klph_zy_year": "8a8a815e5b8e340c015b944054d60d4f&pageSize=50&type=1&",

  "vip_klph_jm_day": "8a8a815e5b43e625015b8a0c292b64d4&pageSize=50&type=2&",
  "vip_klph_jm_week": "8a8a815e5b8e340c015b943742140d04&pageSize=50&type=2&",
  "vip_klph_jm_month": "8a8a815e5b8e340c015b943d90210d3a&pageSize=50&type=2&",
  "vip_klph_jm_year": "8a8a815e5b8e340c015b944054d60d4f&pageSize=50&type=2&",

  // 会员分布
  "vip_hyfb_all_qy": "8a8a815e5b43e625015b663ef2e825d4&",
  "vip_hyfb_all_kl": "8a8a815e5c8f881f015ca9b2533c22fd&",
  "vip_hyfb_all_dp": "8a8a815e5c8f881f015ca9b4b3262314&",

  "vip_hyfb_zy_qy": "8a8a815e5b43e625015b663ef2e825d4&type=1&",
  "vip_hyfb_zy_kl": "8a8a815e5c8f881f015ca9b2533c22fd&type=1&",
  "vip_hyfb_zy_dp": "8a8a815e5c8f881f015ca9b4b3262314&type=1&",

  "vip_hyfb_jm_qy": "8a8a815e5b43e625015b663ef2e825d4&type=2&",
  "vip_hyfb_jm_kl": "8a8a815e5c8f881f015ca9b2533c22fd&type=2&",
  "vip_hyfb_jm_dp": "8a8a815e5c8f881f015ca9b4b3262314&type=2&",

  //移动门店
  //首页
  "mobileStoreFirst": "8a8a81ab5ba8ced2015bdb9f8ddf13e7&",
  // 人员销售
  "mobileStore_ryxs_day": "8a8a815e5bf0562d015bf139fd8a0197&pageSize=50&",
  "mobileStore_ryxs_week": "8a8a815e5bf0562d015bf142d8a901bf&pageSize=50&",
  "mobileStore_ryxs_month": "8a8a815e5bf0562d015bf14531cf01d9&pageSize=50&",
  // 店铺排行
  "mobileStore_dpph_day": "8a8a815e5bf15bf5015bf1a779850094&",
  "mobileStore_dpph_week": "8a8a815e5bf15bf5015bf51b5705024e&",
  "mobileStore_dpph_month": "8a8a815e5bf15bf5015bf51f0f7a026d&",
  // 商品销售
  "mobileStore_spxs_day": "8a8a815e5bf15bf5015bf59609110350&",
  "mobileStore_spxs_week": "8a8a815e5bf15bf5015bf59d19e1036c&",
  "mobileStore_spxs_month": "8a8a815e5bf15bf5015bf5a1e29a038e&",

  // VIP销售

  // KPI销售汇总
  "mobileStore_vip_day_d": "8a8a815e5c086806015c0f45bdc606d4&",
  "mobileStore_vip_week_w": "8a8a815e5c086806015c0f418ecc06b7&",
  "mobileStore_vip_month_m": "8a8a815e5c086806015c0f42c45c06c6&",

  // 人员明细请求
  "mobileStore_vip_day": "8a8a815e5c086806015c0b0cde4d0313&",
  "mobileStore_vip_week": "8a8a815e5c086806015c0b156fc00384&",
  "mobileStore_vip_month": "8a8a815e5c086806015c0b16945f03b3&",

  // 店长概览
  "mobileStore_dzgl_dqhd": "8a8a815e5c086806015c1071af6d08e9&",

  //SKU
  "mobileStore_sku_cx": "8a8a815e5c190846015c1945687f0069&",
  "mobileStore_sku_zx": "8a8a815e5c190846015c19478207007d&",
  "mobileStore_sku_dm": "8a8a815e5c190846015c1a87061702e1&",

  //店长信息
  "mobileStore_dzxx": "8a8a815e5c190846015c1e66b51806c9&",

  //企划
  //季节发货达成
  "qh_jdfhdc": "8a8a815e5c5088a0015c628e01c81e6c&",
  //区域发货达成(穿透页)
  "qh_ctqyfhdc": "8a8a815e5c5088a0015c66e7d5c32295&pageSize=50&",
  //区域发货达成(和穿透页共用)
  "qh_qyfhdc": "8a8a815e5c5088a0015c66e7d5c32295&pageSize=50&",
  //区域店铺进销存
  "qh_qyxsxq": "8a8a815e5c8f881f015ca0b098591752&",
  //皮具进销存
  "qh_pjjxc": "8a8a815e5c670b12015c6c9edd7e067a&pageSize=50&",
  //款号进销存
  "qh_khjxc": "8a8a815e5c670b12015c763ebd1c1197&pageSize=50&"

}
// 穿透页
var pagecode = {
  ctdpyj:"8a8a81ab5dcf408a015dcf5eccd7004b",//穿透区域业绩分析 至店铺业绩
  ctdpph: "8a8a81a95967e24e0159683d3133006e", //穿透店铺排行
  dpxx: "40288a4e58fb1d450158fbcd55b20024", //店铺销售
  proList: "8a8a81a9596865d501596c36443d0102", //商品销售列表
  goodsshopsale: "8a8a81ab5d349ee3015d3f9d62cf063a", // 商品店铺销售
  productph:"8a8a815e5cfe748d015dc5716d3c6dc4",//款号铺货店数列表
  storeProTotal: "8a8a815e5ba8d016015bb22901b70a65", // 店铺商品统计
  salesMsg: "8a8a81a9596d9aaf01596da900b10042", //店员信息
  proMsg: "8a8a81a9596865d5015968cc49d000e0", //产品信息
  salesList: "8a8a81a95a7e8a01015a8deeca01047b", //全部店员
  proItem: "ff8080815ad9aef5015aefd6851f11b5", // 生产   明细
  productDdtlmx: "8a8a81ab5d3fca1c015d4e13d25d0399", // 生产  订单投料明细
  productDdtlkhmx: "8a8a81ab5d3fca1c015d4e150db703a8", // 生产  订单款号投料明细
  weather: "8a8a81ab5b274e62015b381b19930ecf", // 天气
  vipStore: "8a8a815e5b43e625015b60f4c2431fad", // 会员   	区域店铺排行
  vipInformation: "8a8a815e5b43e625015b83e09d105b2d", // 会员   	个人信息
  vipConsumeRanking: "8a8a815e5b43e625015b83dfa1935b15", // 会员   	消费排行
  vipIntegralDetail: "8a8a815e5b43e625015b83eb5d025b68", // 会员   积分明细
  vipConsumeDetail: "8a8a815e5b43e625015b83eadb845b63", // 会员   消费明细
  reatilKhSku: "8a8a815e5c2e0521015c2e0d738000b0", // 热卖产品——款号sku
  qhCtqyfhdc: "8a8a81ab5c2ef3f0015c6c5f06342017", // 企划   	区域发货达成
  qyXsxq: "8a8a815e5c5088a0015c626ae6c31e10", // 企划   	区域店铺进销存
  qhKhjxc: "8a8a815e5c5088a0015c626c78291e15", // 企划    款号进销存
  qhKhjxc2: "8a8a815e5c8f881f015c90853af7023a" // 企划    款号进销存(部分字段有权限)
}
// 标题
var pageName = {
  "p8a8a81ab5dcf408a015dcf5eccd7004b":"店铺业绩分析",
  "p8a8a81a95967e24e0159683d3133006e": "店铺排名",
  "p40288a4e58fb1d450158fbcd55b20024": "店铺业绩",
  "p8a8a81a9596865d501596c36443d0102": "销售明细 ",
  "p8a8a81a9596d9aaf01596da900b10042": "店员信息",
  "p8a8a81a9596865d5015968cc49d000e0": "商品信息",
  "pff8080815ad9aef5015aefd6851f11b5": "生产明细",
  "p8a8a81ab5b274e62015b381b19930ecf": "天气",
  "p8a8a815e5b43e625015b60f4c2431fad": "区域店铺排行",
  "p8a8a815e5b43e625015b83dfa1935b15": "消费排行",
  "p8a8a815e5b43e625015b83e09d105b2d": "个人信息",
  "p8a8a815e5b43e625015b83eb5d025b68": "积分明细",
  "p8a8a815e5b43e625015b83eadb845b63": "消费明细",
  "p8a8a81ab5ba8ced2015bdb7e888b13a9": "门店信息",
  "p8a8a81ab5c2ef3f0015c6c5f06342017": "季度区域发货达成",
  "p8a8a815e5c5088a0015c626ae6c31e10": "区域店铺进销存",
  "p8a8a81ab5d349ee3015d3f9d62cf063a": "款号销店数",
  "p8a8a815e5c2e0521015c2e0d738000b0": "SKU销售明细",
  "p8a8a815e5cfe748d015dc5716d3c6dc4": "款号铺货店数列表"
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
/*模态框*/
var button = '<div class="btn-group" style="width: 30px;">' +
  '<a id="dateSearch" class="btn btn-default" style="padding: 6px 0px;" data-toggle="modal" data-target="#myModal">' +
  '<span class="glyphicon glyphicon-calendar"></span></a></div>';

var modalss = '<div id="fade" class="black_overlay card"></div><div id="light" class="white_content">' +
  '<form class="form-horizontal" role="form"><fieldset><p><div class="form-group">' +
  '<label class="col-sm-2 control-label" for="ds_name" id="namesd"></label><div class="col-sm-4">' +
  '<input class="form-control" id="ds_name" type="text" placeholder="请输入查询条件......" /></div></div><div class="form-group">' +
  '<label class="col-sm-2 control-label " for="inputDate">请选择日期</label><div class="col-sm-4">' +
  '<input class="form-control" id="inputDate" size="16"/></div></div>' +
  '</fieldset><input id="m" type="text" style="display: none;" />' +
  '<button type="button" class="btn btn-default" id="close">关闭</button>' +
  '<button onclick="submitMessage(@id)" type="button" class="btn btn-success">查询</button></form></div>';
//////////////////////////////////////////////////////

// 带参数的   返回请求链接
function getProUrl(key, param) {
  var suffix = domain + queryUrl + eval("urlJson." + key);
  var preffix = "&time=" + new Date().getTime() + "&";
  var pd = suffix;
  if(param) {
    pd += param + preffix;
  } else {
    pd += preffix;
  }
  return pd;
}

//文字太长 换行
function LongStr(str, tl) {
  if(!str) return "";
  var longs = str.length;
  var tstr = "";
  var br = "";

  if(str && longs > tl) {
    for(x = 0; x < (longs / tl) + 1; x++) {
      tstr += br + str.substring(x * tl, (tl * (x + 1)));
      if((tl > 12 && x === 0) || tl <= 12)
        br = "<br>";
    }
    return tstr;
  } else return str;
}

// 取url 单个参数 的参数名 及值
function getCode(name) {
  var code = GetPageString(name);
  if(code !== null)
    return code = name + "=" + code + "&";
  else
    return code = name + "=6099&";
}

/*
 * 数据型页面共用方法
 * 注意，全部 加盟 直营 必须包含 data = all,jm,zy 属性
 * 所有头部
 */

// 全部，直营，加盟 按钮动画效果
function navActive(id) {
  $("#" + id).find("#navs").find('a').click(function() {
    id = $(this).parents(".parent").attr("id")
    $("#" + id).find("#navs").find('a').each(function() {
      $(this).removeClass('active');
    });
    $(this).addClass('active');
  });
}

//日，周，月 按钮动画效果及事件
function btnActive(id) {
  var arr; // 存储 class 的属性值
  $("#" + id).find("#btns").find("button").click(function() {
    id = $(this).parents(".parent").attr("id");
    $("#" + id).find("#btns").find("button").each(function() {
      $(this).removeClass("active");
    });
    $(this).addClass("active");
    $("#" + id).find("#pre").html("上一" + $(this).html()).attr("page", 1);
    $("#" + id).find("#next").html("下一" + $(this).html()).attr("page", 0);
  });
}

//  获取数据
function getDate(urls, setDate1, postData) {
  urls = getCookQuery(urls);
  var id = $(".parent").attr("id");
  //loading();
  if($("#" + id).find("#more").hasClass("disabled") && urls.indexOf("pageNumber=") > 0)
    return;
  console.info(urls);
  if(postData) {
    $.ajax({
      type: "POST",
      data: postData,
      url: urls,
      dataType: "json",
      success: setDate1,
      error: function() {
        $("#" + id).find("#more").addClass("disabled");
        loaded(); //return;
        //$("#" + id).find('#content').empty();
      }
    });
  } else
    $.ajax({
      type: "POST",
      url: urls,
      dataType: "json",
      success: setDate1,
      error: function() {
        $("#" + id).find("#more").addClass("disabled");
        loaded(); //return;
        //$("#" + id).find('#content').empty();
      }
    });
}

function getCookQuery(urls) {
  var url = window.location.hash;
  var query = url.substr(url.indexOf("?") + 1, url.length);
  var page = url.substr(1, url.indexOf("?") - 1);
  if(url.indexOf("pageOther") >= 0) {
    if(page === "")
      query = $.cookie(url.substr(1, url.length));
    else
      $.cookie(page, query);
    //console.info(query);
    urls += query;
  }
  return urls;
}

/*
 * 两个调用避免冲突
 */
function getDate1(urls, setDate2) {
  var url = window.location.hash;
  var query = url.substr(url.indexOf("?") + 1, url.length);
  var page = url.substr(1, url.indexOf("?") - 1);
  if(url.indexOf("pageOther") >= 0) {
    if(page == "")
      query = $.cookie(url.substr(1, url.length));
    else
      $.cookie(page, query);
    console.info(query);
    urls += query;
  }

  //loading();
  console.info(urls);
  $.ajax({
    type: "POST",
    url: urls,
    dataType: "json",
    success: setDate2,
    error: function() {
      loaded();
    }
  });
}

//id页ID，listid div表单ID，jhight 表单去除头部人高度
function onlyGetDatax(id, listId, jhight) {
  // 设置表格高度
  if($("#" + id).find("#" + listId).offset())
    $("#" + id).find("#" + listId).height(window.innerHeight - $("#" + id).find("#" + listId).offset().top - jhight);
  // 下拉加载数据。
  $("#" + id).find("#" + listId).scroll(function() {
    id = $(this).parents(".parent").attr("id");
    var nDivHight = $("#" + id).find("#" + listId).height();
    nScrollHight = $(this)[0].scrollHeight;
    nScrollTop = $(this)[0].scrollTop;
    var paddingBottom = parseInt($(this).css('padding-bottom'));
    var paddingTop = parseInt($(this).css('padding-top'));
    if(nScrollTop + paddingBottom + paddingTop + nDivHight >= nScrollHight) { // 滚动条到达底部，加载新的数据
      $("#" + id).find("#" + listId).removeAttr("more");
      getMoreDataMo(id, eval(id + '_setDate'));
    }
  });
}

// 单击按钮请求数据,滑动滚轮请求数据,查询页面查询数据     {带有查询的页面}
function begPage(id, setDate) {
  if($("#" + id).find("#grid").offset())
    $("#" + id).find("#grid").height(window.innerHeight - $("#" + id).find("#grid").offset().top - 36);
  $("#" + id).find(".mybtn").click(function() {
    id = $(this).parents(".parent").attr("id");
    $("#" + id).find("#pre").removeAttr("page");
    $("#" + id).find("#next").removeAttr("page");
    $("#" + id).find("#more").removeAttr("pageNumber");
    $("#" + id).find("#fade").find("#form-horizontal").find("input").val("");
    $("#" + id).find("#more").removeClass("disabled");
    var url = getUrl(id);
    $("#" + id).find("table").attr("more", "clear");
    // 添加清除会员生日数据的标识
    $("#" + id).find("#cardList").attr("more", "clear");
    loading();
    getDate(url, eval(id + '_setDate'));
    clearFindForm(id);
  });
  var url = getUrl(id);
  getDate(url, setDate);
  var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
  var nScrollTop = 0; //滚动到的当前位置
  $("#" + id).find("#grid").scroll(function() {
    id = $(this).parents(".parent").attr("id");
    var nDivHight = $("#" + id).find("#grid").height();
    nScrollHight = $(this)[0].scrollHeight;
    nScrollTop = $(this)[0].scrollTop;
    var paddingBottom = parseInt($(this).css('padding-bottom')),
      paddingTop = parseInt($(this).css('padding-top'));
    if(nScrollTop + paddingBottom + paddingTop + nDivHight >= nScrollHight)
      getMoreData(id, eval(id + '_setDate'));
  });
  var this_search = $("#" + id).attr("find");
  // console.log(this_search + " 1111111111111111111111111111111111111111");
  if(this_search != "no") { //启动查询开关 [find = no 不查询 ]
    $("#" + id).append(modalss.replace("@id", "'" + id + "'"));
    $("#" + id).find("#btns").append(button);
    $("#" + id).find("#dateSearch").click(function() {
      var d = new Date();
      var year = d.getFullYear();
      //var month= d.getMonth()+1;
      var date = d.getDate();
      // month = month <10 ? '0' + month : month;
      //var now_time= year + '-' + month + '-' + date;
      $("#" + id).find("#light").css("display", "block");
      $("#" + id).find("#fade").css("display", "block");
      $("#m").val($("#" + id).find("table").find("th").children("td").eq(1).html());
      $("#" + id).find("#namesd").html($("#m").val()); // 从页面传过来的第二个字段
      if($("#" + id).find("#btns").find(".active")) { // 获取按钮上的名称
        var sd = $("#" + id).find("#btns").find(".active").attr("data");
        var value = "";
        if(sd == "year") {
          sd = "number";
          value = year;
        } else if(sd == "day") {
          sd = "date";
          //value=now_time;  默认值
        } else {
          // 周,月
        }
        // 不能设置最大值和最小值, 否则日 默认日期会失效
        $("#" + id).find("#inputDate").attr("type", sd);
        $("#" + id).find("#inputDate").attr("value", value);
      }
    });
    $("#" + id).find("#close,#fade").click(function() {
      //modal_close(id);
      $("#" + id).find("#light").css("display", "none");
      $("#" + id).find("#fade").css("display", "none");
    });
  }
}

// 拼接按钮所对应的名称
function getUrl(id) {
  var active_code;
  var code = "";
  $("#" + id).find(".active").each(function() {
    if(code == "")
      code = $(this).attr("data");
    else
      code += "_" + $(this).attr("data");
  });
  if(code) {
    return getProUrl(id + "_" + code);
  } else {
    return getProUrl(id);
  }
}

// 移动门店——VIPSale
function mobileStore_vip_page(id, setDate) {
  if($("#" + id).find("#grid").offset()) {
    $("#" + id).find("#grid").height(window.innerHeight - $("#" + id).find("#grid").offset().top - 36);
  }
  var param = '&cStoreId=' + GetPageString("cStoreId");
  var url = getUrl(id);
  getDate(url, setDate, param);
  var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
  var nScrollTop = 0; //滚动到的当前位置
  $("#" + id).find("#grid").unbind();
  $("#" + id).find("#grid").scroll(function() {
    id = $(this).parents(".parent").attr("id");
    var nDivHight = $("#" + id).find("#grid").height();
    nScrollHight = $(this)[0].scrollHeight;
    nScrollTop = $(this)[0].scrollTop;
    var paddingBottom = parseInt($(this).css('padding-bottom')),
      paddingTop = parseInt($(this).css('padding-top'));
    if(nScrollTop + paddingBottom + paddingTop + nDivHight >= nScrollHight)
      getMoreDataMo2(id, eval(id + '_setDate'), param);
  });
}

// 在cardList 上面设置 more 的值     加载更多数据(会员生日,移动门店首页 用到了)
function getMoreDataMo(id, setDate, param) {
  if($("#" + id).find("#cardList").find("a").length % 20 > 0) {
    $("#" + id).find("#more").addClass("disabled");
  } else {
    loading();
    var url = getUrl(id);
    var pageNumber = $("#" + id).find("#more").attr("pageNumber");
    var more = $("#" + id).find("#cardList").attr("more");
    if(more == "clear") {
      $("#" + id).find('#cardList').empty(); //清空所有的数据
    }
    if(!pageNumber) {
      pageNumber = 1;
    }
    pageNumber = (Number(pageNumber) + 1);
    url += "pageNumber=" + pageNumber + "&";
    $("#" + id).find("#more").attr("pageNumber", pageNumber);
    if(param) {
      getDate(url, setDate, param);
    } else {
      getDate(url, setDate);
    }
  }
}

// 在table上面设置 more 的值   加载更多数据
function getMoreDataMo2(id, setDate, param) {
  if($("#" + id).find("table").find("#content").find("tr").length % 20 > 0) {
    $("#" + id).find("#more").addClass("disabled");
  } else {
    loading();
    var url = getUrl(id);
    var pageNumber = $("#" + id).find("#more").attr("pageNumber");
    if(!pageNumber) {
      pageNumber = 1;
    }
    pageNumber = (Number(pageNumber) + 1);
    url += "&pageNumber=" + pageNumber + "&";
    $("#" + id).find("#more").attr("pageNumber", pageNumber);
    $("#" + id).find("table").removeAttr("more");
    if(param) {
      getDate(url, setDate, param);
    } else {
      getDate(url, setDate);
    }
  }
}

//加载更多数据
function getMoreData(id, setDate) {
  // page 是上一(日,周,月,年) / 下一(日,周,月,年)
  var page = $("#" + id).find("#pre").attr("page");
  if(page) {
    page = "page=" + page + "&";
  } else {
    page = "";
  }
  if($("#" + id).find("table").find("#content").find("tr").length % 20 > 0) {
    $("#" + id).find("#more").addClass("disabled");
  } else {
    loading();
    var url = getUrl(id);
    var pageNumber = $("#" + id).find("#more").attr("pageNumber");
    if(!pageNumber) pageNumber = 1;
    pageNumber = (Number(pageNumber) + 1);
    url += "pageNumber=" + pageNumber + "&" + page;
    $("#" + id).find("#more").attr("pageNumber", pageNumber);
    $("#" + id).find("table").removeAttr("more");
    searchWithOrder(id, url, setDate);
  }
}

// url 加上 查询参数/排序参数    —————————— 在查询或者排序之后,加载更多数据
function searchWithOrder(id, url, setDate) {
  var pageValue = $("#" + id).find("#ds_name").val(); // 模态框上的输入框值
  var page = $("#" + id).find("#inputDate").val(); //日期
  var orderno = $("#" + id).find("#pageOrderx").parent().attr("orderno");
  if(!(page + pageValue + orderno)) {
    modal_close(id);
    //return;
  }
  //$("#" + id).find("#more").removeAttr("pageNumber");
  //$("#"+id).find("#more").html("加载更多数据").removeClass("disabled");
  //var url = getUrl(id);
  var day;
  if(page) {
    day = getxjDate(page);
    url += "page=" + day + "&";
    //pro_showTime(id,day)
    $("#" + id).find("#pre").attr("page", day);
    $("#" + id).find("#next").attr("page", day);
  }
  if(pageValue) {
    pageValue = "pageValue=" + pageValue + "&";
  }
  //$("#" + id).find("table").attr("more", "clear");
  loading();
  if(orderno) {
    orderCode = $("#" + id).find("#pageOrderx").attr("orderCode");
    url += "orderNo=" + orderno + "&orderCode=" + orderCode + "&";
  }
  console.log(url);
  getDate(url, eval(id + '_setDate'), pageValue);
}

// 下一日/周/月
function getNext(id, setDate) {
  clearFindForm(id);
  $("#" + id).find("#more").removeAttr("pageNumber");
  $("#" + id).find("#more").removeClass("disabled");
  var url = getUrl(id);
  var page = $("#" + id).find("#pre").attr("page");
  if(!page || page == 0 || page == 1) return;
  loading();
  page = Number(page) - 1;
  url += "page=" + page + "&";
  $("#" + id).find("#pre").attr("page", page);
  $("#" + id).find("#next").attr("page", page);
  $("#" + id).find("table").attr("more", "clear");
  searchWithOrder(id, url, setDate);
  //getDate(url, setDate);
}

// 上一日/周/月
function getPre(id, setDate) {
  clearFindForm(id);
  loading();
  $("#" + id).find("#more").removeAttr("pageNumber");
  $("#" + id).find("#more").removeClass("disabled");
  var url = getUrl(id);
  var page = $("#" + id).find("#pre").attr("page");
  if(!page) page = 1;
  page = Number(page) + 1;
  url += "page=" + page + "&";
  $("#" + id).find("#pre").attr("page", page);
  $("#" + id).find("#next").attr("page", page);
  $("#" + id).find("table").attr("more", "clear");
  searchWithOrder(id, url, setDate);
  //getDate(url, setDate);
}

// 清除搜索框的值
function clearFindForm(id) {
  $("#" + id).find("#ds_name").val("");
  $("#" + id).find("#inputDate").val("");
  $("#" + id).find("#pageOrderx").parent().css({
    "color": "black",
    "font-weight": "normal"
  });
  $("#" + id).find("#pageOrderx").remove();
}

var mytd = "<td style='padding: 2px ;vertical-align:middle;text-align: center;'>"

//-------------------------------------          生产主题           --------------------------------------
//凡是有<td></td>都是  表格数据的拼接   （下同）

// 生产
function product_setDate(data) {
  var dx, tr;
  more = $("#product").find("table").attr("more");
  if(more == "clear") {
    $("#product").find('#content').empty(); //清空所有的数据
  }
  retail2_currentPage = data.thisPageNumber;
  //console.log("当前页数：" + retail2_currentPage);
  //   当点击日的时候，需要把  金额(万) 的标题改成 金额
  var fname = "";
  var index = $("#product").find("table").find("#content").find("tr").length;
  if(data && data.result.length > 0) {
    //alert(urls +data.result.length)
    for(i = 0; i < data.result.length; i++) {
      dx = data.result[i]
      index++;
      fname = LongStr(dx.model, 9);
      tr = "<tr><td>" + index + "</td>" +
        "<td >" + dx.month +
        "</td><td class='mytd'><a href='#event/pageOther?model=" + dx.model + '&code=' + pagecode.proItem + "'>" + fname +
        "</a></td><td >" + dx.sumqty +
        "</td><td >" + dx.xx +
        "</td><td >" + dx.material +
        "</td></tr>"
      if(tr.indexOf("undefined") > 0) break;
      $("#product").find("#content").append(tr);
      //alert($("#qyph").find("#content").html());
    }
  }
  loaded("product");
  pro_setTotal("product", data);
}

//投料排行  20170803
function product_tlph_setDate(data) {
  var dx, tr;
  more = $("#product_tlph").find("table").attr("more");
  if(more == "clear") {
    $("#product_tlph").find('#content').empty(); //清空所有的数据
  }
  retail2_currentPage = data.thisPageNumber;
  console.log("当前页数：" + retail2_currentPage);

  //   当点击日的时候，需要把  金额(万) 的标题改成 金额
  var fname = "";
  var index = $("#product_tlph").find("#content").find("tr").length;
  if(data && data.result.length > 0) {
    //$("#" + id).find("#content").empty();
    //var index = $("#" + id).find("#content").find("tr").length;
    for(i = 0; i < data.result.length; i++) {
      var p = data.result[i];
      index++;
      var param = "mProductId=" + p.mProductId + "&imageId=" + p.prodNoSn + "&code=" + pagecode.productDdtlkhmx;
      tr = "<tr><td>" + index + " </td><td><a href='#/event/pageOther?" + param + "'>" + p.prodNoSn + "<a>" +
        "</td><td>" + p.productName +
        "</td><td>" + p.material +
        "</td><td>" + p.qtyinit +
        "</td></tr>"
      if(tr.indexOf("undefined") > 0) break;
      $("#product_tlph").find("#content").append(tr);
    }
  }
  loaded("product_tlph");
  setTotal("product_tlph", data);
}

//-----------------------------------         移动门店主题             -----------------------------------

// 移动门店首页
function mobileStoreFirstPage(id, setDate, param) {
  if(!id) id = "mobileStoreFirst";
  if($("#" + id).find("#cardList").offset())
    $("#" + id).find("#cardList").height(window.innerHeight - $("#" + id).find("#cardList").offset().top - 36);
  var url = getUrl(id);
  if(param) {
    getDate(url, setDate, param);
  } else {
    getDate(url, setDate);
  }
  var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
  var nScrollTop = 0; //滚动到的当前位置
  $("#" + id).find("#cardList").scroll(function() {
    id = $(this).parents(".parent").attr("id");
    var nDivHight = $("#" + id).find("#cardList").height();
    nScrollHight = $(this)[0].scrollHeight;
    nScrollTop = $(this)[0].scrollTop;
    var paddingBottom = parseInt($(this).css('padding-bottom')),
      paddingTop = parseInt($(this).css('padding-top'));
    if(nScrollTop + paddingBottom + paddingTop + nDivHight >= nScrollHight) {
      $("#" + id).find("#cardList").removeAttr("more");
      var params = $("#" + id).find("#cardList").attr("param");
      if(params) {
        getMoreDataMo(id, eval(id + '_setDate'), params);
      } else {
        getMoreDataMo(id, eval(id + '_setDate'));
      }
    }
  });
}

//-----------------------------------         会员主题             -----------------------------------

// 会员 店铺排行
function vip_dpph_setDate(data) {
  var dx, tr;
  //var vipTotal = 0; // 会员金额
  //var totActualTotal = 0; // 总金额
  more = $("#vip_dpph").find("table").attr("more");
  if(more == "clear") {
    $("#vip_dpph").find('#content').empty(); //清空所有的数据
  }
  retail2_currentPage = data.thisPageNumber;
  var fname = "";
  var index = $("#vip_dpph").find("table").find("#content").find("tr").length;
  if(data && data.result.length > 0) {
    //alert(urls +data.result.length)
    for(i = 0; i < data.result.length; i++) {
      dx = data.result[i];
      //vipTotal += parseInt(dx.vipPay);
      //totActualTotal += parseInt(dx.totAmtActual);
      index++;
      fname = LongStr(dx.cCustomerName, 6);
      tr = "<tr><td>" + index + "</td><td class='mytd'>" +
        "<a href='#/event/pageOther?cStoreId=" + dx.cStoreId + "&code=" + pagecode.vipConsumeRanking + "&' >" + fname + "<a>" +
        "</td><td class='mytd ' >" + dx.totAmtActual +
        "</td><td class='mytd '>" + dx.vipPay +
        "</td><td class='mytd '>" + dx.vipSaleRate +
        "%</td><td class='mytd '>" + dx.vipCount +
        "</td></tr>";
      //if(tr.indexOf("undefined") > 0) break;
      $("#vip_dpph").find("#content").append(tr);
    }
  }
  //			var unVipTotal = totActualTotal - vipTotal;
  loaded("vip_dpph");
  setTotal("vip_dpph", data);
}

// 会员 店铺排行(穿透页)
function vip_dpph_all_setDate(data) {
  var id = "vip_dpph_all";
  var dx, tr;
  var j = 0;
  var vipTotal = 0; // 会员金额
  var totActualTotal = 0; // 总金额
  more = $("#" + id).find("table").attr("more");
  if(more == "clear") {
    $("#" + id).find('#content').empty(); //清空所有的数据
  }
  //vip_dpph_currentPage = data.thisPageNumber;
  var fname = "";
  var index = $("#" + id).find("table").find("#content").find("tr").length;
  var level = $("#" + id).parent(".pageParent").attr("level");
  console.info(level);
  if(data && data.result.length > 0) {
    //alert(urls +data.result.length)
    for(i = 0; i < data.result.length; i++) {
      dx = data.result[i]
      vipTotal += parseInt(dx.vipPay);
      totActualTotal += parseInt(dx.totAmtActual);
      index++;
      fname = LongStr(dx.cCustomerName, 6);
      tr = "<tr><td>" + index + "</td><td class='mytd'>" +
        "<a href='#/event/pageOther" + level + "?cStoreId=" + dx.cStoreId + "&code=" + pagecode.vipConsumeRanking + "&' >" + fname + "<a>" +
        "</td><td class='mytd ' >" + dx.totAmtActual +
        "</td><td class='mytd '>" + dx.vipPay +
        "</td><td class='mytd '>" + dx.vipSaleRate +
        "%</td><td class='mytd '>" + dx.vipCount +
        "</td></tr>";
      //if(tr.indexOf("undefined") > 0) break;
      $("#" + id).find("#content").append(tr);
    }
  }
  //var unVipTotal = totActualTotal - vipTotal;
  loaded(id);
  setTotal(id, data);
}

// 会员 积分明细
function vip_jfmx_setDate(data) {
  var id = "vip_jfmx";
  //			var beg = $("#" + id).find("#begDate").val();
  //			var end = $("#" + id).find("#endDate").val();
  //			var other = vip_xfmx_get(id, beg, end);
  var dx, tr;
  var fname = "";
  var userName = "";
  more = $("#" + id).find("table").attr("more");
  if(more == "clear") {
    $("#" + id).find('#content').empty(); //清空所有的数据
  }
  // 人名水印
  $("#" + id).find(".mask_div").html($.cookie('sname'));
  //retail2_currentPage = data.thisPageNumber;
  var index = $("#" + id).find("table").find("#content").find("tr").length;
  if(data && data.result.length > 0) {
    for(i = 0; i < data.result.length; i++) {
      index++;
      dx = data.result[i];
      descrip = LongStr(dx.description, 7);
      tr = "<tr><td>" + index + "</td>" +
        "<td class='mytd'>" + dx.integralType +
        "&nbsp;&nbsp;</td><td class='mytd'>" + dx.changdate +
        "</td><td class='mytd'>" + dx.integral +
        "</td><td class='mytd'>" + descrip +
        "</td></tr>";
      //if(tr.indexOf("undefined") > 0) break;
      $("#" + id).find("#content").append(tr);
    }
    $("#" + id).find("#integral").html("当前积分: " + data.totalValMap.integral);
  }
  loaded(id); // 不传ID ,不会初始化 表格的标题
}

// 会员 消费明细
function vip_xfmx_setDate(data) {
  var id = "vip_xfmx";
  var dx, tr;
  var fname = "";
  more = $("#" + id).find("table").attr("more");
  if(more == "clear") {
    $("#" + id).find('#content').empty(); //清空所有的数据
  }
  //retail2_currentPage = data.thisPageNumber;
  $("#" + id).find(".mask_div").html($.cookie("sname"));
  var index = $("#" + id).find("table").find("#content").find("tr").length;
  if(data && data.result.length > 0) {
    for(i = 0; i < data.result.length; i++) {
      index++;
      dx = data.result[i];
      fname = LongStr(dx.cStoreName, 7);
      tr = "<tr><td>" + index + "</td>" +
        "<td class='mytd'>" + fname +
        "</td><td class='mytd'>" + dx.mProductName +
        "</td><td class='mytd'>" + dx.qty +
        "</td><td class='mytd'>" + dx.totAmtActual +
        "</td><td class='mytd'>" + dx.billdate +
        "</td></tr>";
      //if(tr.indexOf("undefined") > 0) break;
      $("#" + id).find("#content").append(tr);
    }
  }
  loaded(id);
}

// 会员 消费排行
function vip_xfph_setDate(data) {
  var id = "vip_xfph";
  var dx, ps;
  more = $("#" + id).find("#cardList").attr("more");
  if(more == "clear") {
    $("#" + id).find('#cardList').empty(); //清空所有的数据
  }
  var fname = "";
  var dLength = data.result.length;
  var level = $("#" + id).parent(".pageParent").attr("level");
  if(data && data.result.length > 0) {
    for(i = 0; i < dLength; i++) {
      dx = data.result[i];
      fname = LongStr(dx.vipName, 7);
      var d = "<a class='item item-avatar' href='#/event/pageOther" + level + "?vipId=" + dx.vipId + "&code=" + pagecode.vipInformation + "&'" +
        " style='text-align: left;'>" +
        "<img src='" + dx.headImgUrl + "'>";
      if(dx.maxBilldate) { // 最近消费
        ps = d +
          "<h2>" + fname + "&nbsp;&nbsp;" + "<span>" + dx.vipType + "&nbsp;&nbsp;" + "</span><span style='float: right;color: #5BC0DE;'>累计消费 " + dx.saleTimes + " 次</span></h2>" +
          "<span>" + dx.storeName + "</span>" +
          "<p>近期消费: " + dx.qty + "次</span><br><span>近期消费￥" + dx.thisAmtActual + "</span><br><span>近期消费: " + dx.maxBilldate + "</span></p>" +
          "<p>累计消费￥" + dx.totAmtActual + "</p>" +
          "</a>";
      } else if(dx.avgSaleAmount) { // 消费频率
        ps = d +
          "<h2>" + fname + "&nbsp;&nbsp;" + "<span>" + dx.vipType + "&nbsp;&nbsp;" + "</span><span style='float: right;color: #5BC0DE;'>累计消费 " + dx.saleTimes + " 次</span></h2>" +
          "<p>累计消费￥" + dx.avgSaleAmount + "</p>" +
          "</a>";
      } else { // 消费总额
        ps = d +
          "<h2>" + fname + "&nbsp;&nbsp;" + "<span>" + dx.vipType + "&nbsp;&nbsp;" + "</span><span style='float: right;color: #5BC0DE;'>累计消费 " + dx.saleTimes + " 次</span></h2>" +
          "<p>累计消费￥" + dx.totAmtActual + "</p>" +
          "</a>";
      }
      //if(ps.indexOf("undefined") > 0) break;
      $("#" + id).find("#cardList").append(ps);
    }
  }
  loaded();
}

//------------------------------------------------------零售主题-------------------------------------------------------
// 店铺排行
var dpph_setDate = function(data) {
  var id = "dpph";
  var dx, tr;
  more = $("#" + id).find("table").attr("more");
  if(more == "clear") {
    $("#" + id).find('#content').empty(); //清空所有的数据
  }
  retail2_currentPage = data.thisPageNumber;
  //console.log("当前页数：" + retail2_currentPage);
  //   当点击日的时候，需要把  金额(万) 的标题改成 金额
  var fname = "";
  var index = $("#" + id).find("table").find("#content").find("tr").length;
  if(data && data.result.length > 0) {
    //alert(urls +data.result.length)
    for(i = 0; i < data.result.length; i++) {
      dx = data.result[i]
      index++;
      fname = LongStr(dx.name, 7);
      tr = "<tr><td>" + index + "</td><td class='mytd'>" +
        "<a href='#event/pageOther?cStoreId=" + dx.cStoreId + "&code=" + pagecode.dpxx + "'>" + fname +
        "</td><td class='mytd'><a href='#event/pageOther?cStoreId=" + dx.cStoreId + "&code=" + pagecode.proList + "'>" + dx.qty + "</a>" +
        "</td><td>" + dx.totAmtActual +
        "</td>" + mytd + "" + dx.avgPrice +
        "</td><td>" + dx.daysAvg +
        //"</td><td>" + dx.indicatorOverRate +"%"+
        "</td></tr>"
      if(tr.indexOf("undefined") > 0) break;
      $("#" + id).find("#content").append(tr);
      //alert($("#"+id).find("#content").html());
    }
    loaded("dpph");
    setTotal(id, data);
  }
}

// 店铺排行 (穿透页)
var dpph_all_setDate = function(data) {
  var id = "dpph_all";
  var dx, tr;
  var level = $("#dpph_all").parent(".pageParent").attr("level");
  if(!level) level = "1";
  more = $("#" + id).find("table").attr("more");
  if(more == "clear") {
    $("#" + id).find('#content').empty(); //清空所有的数据
  }
  retail2_currentPage = data.thisPageNumber;
  //console.log("当前页数：" + retail2_currentPage);
  //   当点击日的时候，需要把  金额(万) 的标题改成 金额
  var fname = "";
  var index = $("#" + id).find("table").find("#content").find("tr").length;
  if(data && data.result.length > 0) {
    //alert(urls +data.result.length)
    for(i = 0; i < data.result.length; i++) {
      dx = data.result[i]
      index++;
      fname = LongStr(dx.name, 7);
      tr = "<tr><td>" + index +
        "</td>" + mytd + "<a href='#event/pageOther" + level + "?cStoreId=" + dx.cStoreId + "&code=" + pagecode.dpxx + "&'>" + fname +
        "</td>" + mytd + "<a href='#event/pageOther" + level + "?cStoreId=" + dx.cStoreId + "&code=" + pagecode.proList + "'>" + dx.qty + "</a>" +
        "</td><td>" + dx.totAmtActual +
        "</td><td>" + dx.avgPrice +
        "</td><td>" + dx.daysAvg +
        //"</td><td>" + dx.indicatorOverRate +"%"+
        "</td></tr>"
      if(tr.indexOf("undefined") > 0) break;
      $("#" + id).find("#content").append(tr);
      //alert($("#"+id).find("#content").html());
    }
  }
  loaded(id);
  setTotal(id, data);
}

//商品销售排名
var spph_setDate = function(data) {
  var id = "spph";
  var dx, tr;
  more = $("#" + id).find("table").attr("more");
  if(more == "clear") {
    $("#" + id).find('#content').empty(); //清空所有的数据
  }
  //console.log("当前页数：" + retail2_currentPage);
  //   当点击日的时候，需要把  金额(万) 的标题改成 金额
  var fname = "";
  var index = $("#" + id).find("table").find("#content").find("tr").length;

  var tim = $("#" + id).find("#btns").attr("data");
  tim = "&tim=" + tim + "&";
  var type = $("#" + id).find("#navs").attr("data");
  if(type) {
    type = '&type=' + type + "&";
  } else {
    type = '';
  }
  var page = $("#" + id).find("#pre").attr("page");
  if(page) {
    page = "page=" + page + "&";
  } else {
    page = "";
  }
  console.log("type的内容是: " + type + "    page的内容是: " + page + "  时间段:  " + tim);
  if(data && data.result.length > 0) {
    //alert(urls +data.result.length)
    for(i = 0; i < data.result.length; i++) {
      dx = data.result[i];
      index++; //proMsg
      fname = LongStr(dx.name, 6);
      tr = "<tr><td>" + index +
        "</td>" + mytd + "<a href='#event/pageOther?shoeSn=" + dx.shoeSn + "&mProductId=" + dx.mProductId + "&code=" + pagecode.proMsg + "'>" + dx.mProductName + "</a>" +
        "</td>" + mytd + "<a href='#event/pageOther?mProductId=" + dx.mProductId + "&code=" + pagecode.goodsshopsale + "'>" + dx.name + "</a>" +
        "</td><td>" + "<a href='#event/pageOther?mProductId=" + dx.mProductId + tim + type + page + "&code=" + pagecode.reatilKhSku + "'>" + dx.qty + "</a>" +
        "</td><td>" + "<a href='#event/pageOther?mProductId=" + dx.mProductId  + tim + type + page +  "&code=" + pagecode.productph + "'>" + dx.totAmtActual + "</a>" +
        "</td><td>" + dx.avgPrice +
        "</td></tr>";
      if(tr.indexOf("undefined") > 0) break;
      $("#" + id).find("#content").append(tr);
      //alert($("#"+id).find("#content").html());
    }
  }
  loaded("spph");
  setTotal("spph", data);
}

//店员销售排名
var yyy_setDate = function(data) {
  var id = "yyy";
  var dx, tr;
  more = $("#" + id).find("table").attr("more");
  if(more == "clear") {
    $("#" + id).find('#content').empty(); //清空所有的数据
  }
  //console.log("当前页数：" + retail2_currentPage);
  //   当点击日的时候，需要把  金额(万) 的标题改成 金额
  var fname = "";
  var index = $("#" + id).find("table").find("#content").find("tr").length;
  if(data && data.result.length > 0) {
    //alert(urls +data.result.length)
    for(i = 0; i < data.result.length; i++) {
      dx = data.result[i]
      index++;
      fname = LongStr(dx.salesrepName, 5);
      tr = "<tr><td>" + index +
        "</td>" + mytd + "<a href='#event/pageOther?salesrepId=" + dx.salesrepId + "&code=" + pagecode.salesMsg + "'>" + fname + "<a>" +
        "</td>" + mytd + " <a href='#event/pageOther?salesrepId=" + dx.salesrepId + "&code=" + pagecode.proList + "'>" + dx.qty + "</a>" +
        "</td><td>" + dx.totAmtActual +
        "</td><td>" + dx.avgPrice +
        "</td><td>" + dx.relateRate +
        "</td></tr>";
      //if (tr.indexOf("undefined")>0) break;
      $("#" + id).find("#content").append(tr);
      //alert($("#"+id).find("#content").html());
    }
  }
  loaded("yyy");
  setTotal("yyy", data);
}
//区域业绩分析
function qyyjfx_setDate(data) {
  var dx, tr;
  more = $("#qyyjfx").find("table").attr("more");
  if(more == "clear") {
    $("#qyyjfx").find('#content').empty(); //清空所有的数据
  }
  retail2_currentPage = data.thisPageNumber;
  //console.log("当前页数：" + retail2_currentPage);

  //   当点击日的时候，需要把  金额(万) 的标题改成 金额
  var fname = "";
  var index = $("#qyyjfx").find("table").find("#content").find("tr").length;
  if(data && data.result.length > 0) {
    //alert(urls +data.result.length)
    for(i = 0; i < data.result.length; i++) {
      dx = data.result[i]
      index++;
      tr = "<tr><td>" + index + "</td><td class='mytd'>" +
        "<a href='#/event/pageOther?cCustomerId=" + dx.cCustomerId + "&code=" + pagecode.ctdpyj + "&' >" + dx.cCustomerName + "<a>" +
        "</td><td class='mytd'>" + dx.custPrice +
        "</td><td class='mytd'>" + dx.connRate +
        "</td><td class='mytd'>" + dx.avgPrice +
        "</td><td class='mytd'>" + dx.proportionPrice +
        "</td><td class='mytd'>" + dx.empPrice +
        "</td><td class='mytd'>" + dx.costRate + "%" +
        "</td><td class='mytd'>" + dx.storePrice +
        "</td></tr>"
      if(tr.indexOf("undefined") > 0) break;
      $("#qyyjfx").find("#content").append(tr);
      //alert($("#qyph").find("#content").html());
    }
  }
  loaded("qyyjfx");
  setTotal("qyyjfx", data);
}

//区域业绩分析穿透至店铺业绩分析
var dpyj_all_setDate = function(data) {
  var id = "dpyj_all";
  var dx, tr;
  var level = $("#dpyj_all").parent(".pageParent").attr("level");
  if(!level) level = "1";
  more = $("#" + id).find("table").attr("more");
  if(more == "clear") {
    $("#" + id).find('#content').empty(); //清空所有的数据
  }
  retail2_currentPage = data.thisPageNumber;
  //console.log("当前页数：" + retail2_currentPage);
  //   当点击日的时候，需要把  金额(万) 的标题改成 金额
  var fname = "";
  var index = $("#" + id).find("table").find("#content").find("tr").length;
  if(data && data.result.length > 0) {
    //alert(urls +data.result.length)
    for(i = 0; i < data.result.length; i++) {
      dx = data.result[i]
      index++;
      tr = "<tr><td>" + index +
        "</td>" + mytd + "<a href='#event/pageOther" + level + "?cStoreId=" + dx.cStoreId + "&code=" + pagecode.dpxx + "&'>" + dx.cStoreName +
        "</td><td>" + dx.custPrice +
        "</td><td>" + dx.connRate +
        "</td><td>" + dx.avgPrice +
        "</td><td>" + dx.proportionPrice +
        "</td><td>" + dx.empPrice +
        "</td><td>" + dx.costRate +"%"+
        "</td><td>" + dx.storePrice +
        //"</td><td>" + dx.indicatorOverRate +"%"+
        "</td></tr>"
      if(tr.indexOf("undefined") > 0) break;
      $("#" + id).find("#content").append(tr);
      //alert($("#"+id).find("#content").html());
    }
  }
  loaded(id);
  setTotal(id, data);
}


//区域排行
function qyph_setDate(data) {
  var dx, tr;
  more = $("#qyph").find("table").attr("more");
  if(more == "clear") {
    $("#qyph").find('#content').empty(); //清空所有的数据
  }
  retail2_currentPage = data.thisPageNumber;
  //console.log("当前页数：" + retail2_currentPage);

  //   当点击日的时候，需要把  金额(万) 的标题改成 金额
  var fname = "";
  var index = $("#qyph").find("table").find("#content").find("tr").length;
  if(data && data.result.length > 0) {
    //alert(urls +data.result.length)
    for(i = 0; i < data.result.length; i++) {
      dx = data.result[i]
      index++;
      fname = LongStr(dx.cCustomerName, 6);
      tr = "<tr><td>" + index + "</td><td class='mytd'>" +
        "<a href='#/event/pageOther?cCustomerId=" + dx.cCustomerId + "&code=" + pagecode.ctdpph + "&' >" + fname + "<a>" +
        "</td><td class='mytd'><a href='#event/pageOther?cCustomerId=" + dx.cCustomerId + "&code=" + pagecode.proList + "'>" + dx.qty + "</a>" +
        "</td><td class='mytd' >" + dx.totAmtActual +
        "</td><td class='mytd'>" + dx.indicatorOverRate + "%" +
        "</td><td class='mytd'>" + dx.cStoreCount +
        "</td></tr>"
      if(tr.indexOf("undefined") > 0) break;
      $("#qyph").find("#content").append(tr);
      //alert($("#qyph").find("#content").html());
    }
  }
  loaded("qyph");
  setTotal("qyph", data);
}

function wan(v) {
  if(v > 10000)
    return(v / 10000).toFixed(2) + "万"
  else
    return v;
}

//页面底部   数量/金额   统计
function setTotal(id, data) {
  if(data.totalValMap && data.totalValMap.totActual) {
    $("#" + id).find("#all_m").html(wan(data.totalValMap.totActual));
    $("#" + id).find("#all_q").html(wan(data.totalValMap.qty));
  } else {
    $("#" + id).find("#all_m").html(0);
    $("#" + id).find("#all_q").html(0);
  }
  var page = $("#" + id).find("#pre").attr("page");
  if(!page) page = 1;
  setDay(id, page);
}


//alert('dd.ready beg!');
dd.ready(function() {

  dd.biz.navigation.setRight({
    show: false, //控制按钮显示， true 显示， false 隐藏， 默认true
  });
  var t1 = window.setInterval("setDdTitle()", 3000);
});

/**
 * 长按取得时间
 */
function getButtonDate() {
  var date = new Date();
  search_beg.value = date.pattern("yyyy-MM-dd");
  dd.biz.util.datepicker({
    format: 'yyyy-MM-dd',
    value: search_beg, //默认显示日期
    onSuccess: function(result) {
      //onSuccess将在点击完成之后回调
      /*{
                value: "2015-02-10"
            }
            */
    },
    onFail: function() {}
  })
}
var loadIndex =0;
function loading() {
  loadIndex ++;
  console.info("当前加载动画调次数"+loadIndex);
  if(isload) return;
  isload = true;
  setTimeout(function(){//修正可能打开没有关闭的加载动画
    isload=false;
    loaded();
  }, 5000);
  try {
    dd.device.notification.showPreloader({
      text: "数据加载中 ...",
      showIcon: true,
      onSuccess: function(result) {},
      onFail: function(err) {}
    });
  } catch(e) {
    //handle the exception
  }
}

function loaded(id) {
  loadIndex --;
  console.info("当前加载动画调次数"+loadIndex);
  isload = false;
  //alert("loaded");
  try {
    dd.device.notification.hidePreloader({
      onSuccess: function(result) {},
      onFail: function(err) {}
    })
  } catch(e) {
    //handle the exception
  }
  if(id) {
    copyWidth(id);
  }
}

//取url的参数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r != null) return unescape(r[2]);
  return null;
}

//取#后面的参数
function GetPageString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var url = window.location.hash;
  url = url.substr(url.indexOf("?") + 1, url.length);
  if(url) {
    var r = url.match(reg);
    if(r != null)
      return unescape(r[2]);
  }
  return null;
}

function setDdTitle() {
  dd.biz.navigation.setTitle({
    title: '戈美其报表中心-更新于(' + lastTime + ')',
    onSuccess: function(data) {},
    onFail: function(err) {
      log.e(JSON.stringify(err));
      //alert('error!');
    }
  });
}

//设置固定头标题,字符宽度
function copyWidth(id) {
  var tdid = "tdid" + new Date().getTime();
  var userW = 0;
  var $divTitleTh = $("#" + id).find("#divTitleTh");
  var add = false;
  if($divTitleTh.html() && $divTitleTh.html().trim().length < 5) add = true;
  var thw = $("#" + id).find("#vtable").find("tr:first").find("th").width() + 18;
  thw = thw > 30 ? thw : 30;
  if(add)
    $divTitleTh.append("<td style='padding-left: 5px;' id='" + tdid + "'  width='" + thw + "'><div style='width:" + thw + "px'>序号<div></td>");
  $("#" + id).find("#vtable").find("tr:first").find("td").each(function(index) {
    var $this = $(this);
    userW += $this.width();
    thw = $this.width() + 18
    var tv = $this.html();
    var ti = $this.attr("title");
    //var order = $this.attr("order");
    if(ti) tv = ti;
    if(add)
      $divTitleTh.append("<td id='gtd" + (index + 1) + "' align='center' orderNo='" + (index + 1) + "' onclick='orderTitle(this)'	valign='middle' style='width:" + thw + "px;text-align: center;'>" + tv + "</td>");
    else
      $divTitleTh.find("#gtd" + (index + 1)).width(thw);
    //console.info("<td width='"+thw+"</td>");
  })
  var longx = $("#" + id).find("#content").find("tr").length;
  var pageNumber = $("#" + id).find("#more").attr("pageNumber");
  //$("#"+tdid).width($("body").width()-userW-60);
  //if ($divTitleTh.offset() && (!pageNumber || pageNumber == "1"))
  //console.info("body "+window.innerHeight+" $divTitleTh "+$divTitleTh.offset().top);
  //$("#"+id).find("#all_q").html($("#"+id).find("#grid").height());
  if(longx < 21) {
    var speed = 200; //滑动的速度
    $("#" + id).find("#grid").animate({
      scrollTop: 0
    }, speed);
  }

}

//数据查询功能
function submitMessage(id) {
  var pageValue = $("#" + id).find("#ds_name").val(); // 模态框上的输入框值
  var page = $("#" + id).find("#inputDate").val(); //日期
  var orderno = $("#" + id).find("#pageOrderx").parent().attr("orderno");
  if(!(page + pageValue + orderno)) {
    modal_close(id);
    return;
  }
  $("#" + id).find("#more").removeAttr("pageNumber");
  //$("#"+id).find("#more").html("加载更多数据").removeClass("disabled");
  var url = getUrl(id);
  var day;
  if(page) {
    day = getxjDate(page);
    url += "page=" + day + "&";
    //pro_showTime(id,day)
    $("#" + id).find("#pre").attr("page", day);
    $("#" + id).find("#next").attr("page", day);
  } else { // 获取  上一页/下一页  page 值
    var pp = $("#" + id).find("#pre").attr("page");
    if(pp) {
      url += "page=" + pp + "&";
    }
  }
  if(pageValue) {
    pageValue = "pageValue=" + pageValue + "&";
  }
  $("#" + id).find("table").attr("more", "clear");
  loading();
  if(orderno) {
    orderCode = $("#" + id).find("#pageOrderx").attr("orderCode");
    url += "orderNo=" + orderno + "&orderCode=" + orderCode + "&";
  }
  console.log(url);
  getDate(url, eval(id + '_setDate'), pageValue);
  modal_close(id);
}

// 关闭查询框
function modal_close(id) {
  $("#" + id).find("#light").css("display", "none");
  $("#" + id).find("#fade").css("display", "none");
}

//   /^\d{4}-\d{2}-\d{2}/  日
//   /^\d{4}-[W0-9]+/    周
//   /^\d{4}-\d{2}/		月

// 查询界面上的日期转成 page
function getxjDate(sDate) {
  var time;
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  month = month < 10 ? '0' + month : month;

  var pattern_day = /^\d{4}-\d{2}-\d{2}/;
  var pattern_week = /^\d{4}-W[0-9]+/;
  var pattern_month = /^\d{4}-\d{2}/;
  if(pattern_day.test(sDate)) {
    var sdate = new Date(sDate);
    var days = d.getTime() - sdate.getTime();
    time = parseInt(days / (1000 * 60 * 60 * 24));
  } else if(pattern_week.test(sDate)) {
    var sweek = sDate.substring(sDate.lastIndexOf('W') + 1);
    time = parseInt(theWeek()) - parseInt(sweek);
  } else if(pattern_month.test(sDate)) {
    var yearMonth = year + "-" + month;
    time = parseInt(yearMonth) - parseInt(sDate);
  } else {
    return;
  }　　 //var sdate = new Date(sDate.replace(/-/g, "/"));

  return time + 1;
}

// 当前时间是一年中的第几周
function theWeek() {
  var totalDays = 0;
  now = new Date();
  years = now.getYear()
  if(years < 1000)
    years += 1900
  var days = new Array(12);
  days[0] = 31;
  days[2] = 31;
  days[3] = 30;
  days[4] = 31;
  days[5] = 30;
  days[6] = 31;
  days[7] = 31;
  days[8] = 30;
  days[9] = 31;
  days[10] = 30;
  days[11] = 31;
  //判断是否为闰年，针对2月的天数进行计算
  if(Math.round(now.getYear() / 4) == now.getYear() / 4) {
    days[1] = 29
  } else {
    days[1] = 28
  }
  if(now.getMonth() == 0) {
    totalDays = totalDays + now.getDate();
  } else {
    var curMonth = now.getMonth();
    for(var count = 1; count <= curMonth; count++) {
      totalDays = totalDays + days[count - 1];
    }
    totalDays = totalDays + now.getDate();
  }
  //得到第几周
  var week = Math.round(totalDays / 7);
  return week;
}

//字段排序功能
//glyphicon glyphicon-triangle-top 		ASC
//glyphicon glyphicon-triangle-bottom   DESC
function orderTitle(obj) {
  var orderCode = "DESC";
  var orderNo = 1;
  var id = $(obj).parents(".parent").attr("id");
  if($(obj).find("span").length) { // 已表示 DESC 或  ASC
    if($(obj).find("span").hasClass("glyphicon-triangle-top")) {
      $(obj).find("span").attr("class", "glyphicon glyphicon-triangle-bottom");
      $(obj).find("span").attr("orderCode", "DESC");
      $(obj).css({
        "color": "green",
        "font-weight": "normal"
      });
    } else {
      $(obj).find("span").attr("class", "glyphicon glyphicon-triangle-top");
      $(obj).find("span").attr("orderCode", "ASC");
      $(obj).css({
        "color": "red",
        "font-weight": "bold"
      });
    }
  } else {
    var dk = $(obj).parent().find("td").not(":first"); // not(":first") 排除序号  那一列
    dk.each(function() {
      if(dk.find("span").length) {
        dk.find("span").remove();
        dk.css({
          "color": "black",
          "font-weight": "normal"
        });
      }
    });
    orderCode = "ASC";
    $(obj).css({
      "color": "red",
      "font-weight": "bold"
    });
    $(obj).append('<span orderCode=' + orderCode + ' id="pageOrderx" class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>');
  }
  submitMessage(id);
}

function getDay(page) {
  var day = new Date();
  day.setDate(day.getDate() - (page - 1));
  var s = day.Format("yyyy-MM-dd") + "<br>星期" + "日一二三四五六".charAt(day.getDay());
  return s;
}

function GetWeekIndex(dateobj) {
  var firstDay = GetFirstWeekBegDay(dateobj.getFullYear());
  if(dateobj < firstDay) {
    firstDay = GetFirstWeekBegDay(dateobj.getFullYear() - 1);
  }
  d = Math.floor((dateobj.valueOf() - firstDay.valueOf()) / 86400000);
  //document.write(dateobj.getYear() + "/" + (dateobj.getMonth()+1) + "/" + dateobj.getDate()  + " 第" + (Math.floor(d / 7) + 1) + "周"+"<br/>");
  return Math.floor(d / 7) + 1;
}

function GetFirstWeekBegDay(year) {
  var tempdate = new Date(year, 0, 1);
  var temp = tempdate.getDay();
  if(temp == 1)
    return tempdate;
  temp = temp == 0 ? 7 : temp;
  tempdate = tempdate.setDate(tempdate.getDate() + (8 - temp));
  return new Date(tempdate);
}

Date.prototype.pattern = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if(/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
  }
  for(var k in o) {
    if(new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}
var activeId = "";

//商品店铺销售
function gss_setDate(data) {
  var id = "gss";
  var dx, tr;
  more = $("#" + id).find("table").attr("more");
  if(more == "clear") {
    $("#" + id).find('#content').empty(); //清空所有的数据
  }
  var fname = "";
  var index = $("#" + id).find("table").find("#content").find("tr").length;
  if(data && data.result.length > 0) {
    var lengths = data.result.length;
    for(i = 0; i < lengths; i++) {
      dx = data.result[i];
      index++;
      fname = LongStr(dx.cStoreName, 10);
      tr = "<tr><td>" + index +
        "</td><td>" + fname + "</a>" +
        "</td><td>" + dx.mProductName +
        "</td><td>" + dx.qty +
        "</td><td>" + dx.totAmtActual +
        "</td></tr>";
      if(tr.indexOf("undefined") > 0) break;
      $("#" + id).find("#content").append(tr);
      $("#" + id).find("#content").find("td").css("text-align", "center");
      //alert($("#"+id).find("#content").html());
    }
  }
  loaded("gss");
  setTotal("gss", data);
}

//商品销售排名
function proList_setDate(data) {
  var id = "proList";
  var level = $("#" + id).parent(".pageParent").attr("level");
  var dx, tr;
  more = $("#" + id).find("table").attr("more");
  if(more == "clear") {
    $("#" + id).find('#content').empty(); //清空所有的数据
  }
  //console.log("当前页数：" + retail2_currentPage);
  //   当点击日的时候，需要把  金额(万) 的标题改成 金额
  var fname = "";
  var index = $("#" + id).find("table").find("#content").find("tr").length;
  if(data && data.result.length > 0) {
    //alert(urls +data.result.length);
    for(i = 0; i < data.result.length; i++) {
      dx = data.result[i];
      index++;
      fname = LongStr(dx.name, 6);
      tr = "<tr><td>" + index +
        "</td><td>" + "<a href='#event/pageOther" + level + "?shoeSn=" + dx.shoeSn + "&mProductId=" + dx.mProductId + "&code=" + pagecode.proMsg + "'>" + dx.mProductName + "</a>" +
        "</td><td>" + dx.name +
        "</td><td>" + dx.qty +
        "</td><td>" + dx.totAmtActual +
        "</td><td>" + dx.avgPrice +
        "</td></tr>";
      if(tr.indexOf("undefined") > 0) break;
      $("#" + id).find("#content").append(tr);
      //alert($("#"+id).find("#content").html());
    }
  }
  loaded("proList");
  setTotal("proList", data);
}

function customerSearch_setDate(urls) {
  var qdata = $.cookie("repSearch");
  $.ajax({
    type: "POST",
    url: urls,
    data: qdata,
    dataType: "json",
    success: function(data) {
      var id = "customerSearch";
      var dx, tr;
      more = $("#" + id).find("table").attr("more");
      if(more == "clear") {
        $("#" + id).find('#content').empty(); //清空所有的数据
      }
      retail2_currentPage = data.thisPageNumber;
      var fname = "";
      var index = $("#" + id).find("table").find("#content").find("tr").length;
      if(data && data.result.length > 0) {
        //alert(urls +data.result.length)
        for(i = 0; i < data.result.length; i++) {
          dx = data.result[i]
          index++;
          fname = LongStr(dx.cCustomerName, 7);
          tr = "<tr><td>" + index + "</td><td class='mytd'>" +
            fname +
            "</td><td class='mytd'>" + dx.qty + "</td><td class='mytd'>" + dx.totAmtActual +
            "</td>" + mytd + "" + dx.cn +
            "</td><td class='mytd'>" + dx.r +
            //"</td><td>" + dx.indicatorOverRate +"%"+
            "</td></tr>"
          if(tr.indexOf("undefined") > 0) break;
          $("#" + id).find("#content").append(tr);
          //alert($("#"+id).find("#content").html());
        }
      }
      loaded(id);
      setTotal(id, data);
    },
    error: function() {
      loaded();
    }
  });
}

function O2OSearch_setDate(urls) {
  var qdata = $.cookie("repSearch");
  $.ajax({
    type: "POST",
    url: urls,
    data: qdata,
    dataType: "json",
    success: function(data) {
      var id = "O2OSearch";
      var dx, tr;
      more = $("#" + id).find("table").attr("more");
      if(more == "clear") {
        $("#" + id).find('#content').empty(); //清空所有的数据
      }
      retail2_currentPage = data.thisPageNumber;
      var fname = "";
      var index = $("#" + id).find("table").find("#content").find("tr").length;
      if(data && data.result.length > 0) {
        //alert(urls +data.result.length)
        for(i = 0; i < data.result.length; i++) {
          dx = data.result[i]
          index++;
          //fname = LongStr(dx.productName, 7);
          tr = "<tr><td>" + index
            //+ "</td><td class='mytd'><a href='#event/pageOther?shoeSn=" + dx.shoeSn + "&code=" 	+ pagecode.proList + "'>" + dx.shoeSn + "</a>"
            +
            "</td><td>" + dx.cCustomerName +
            "&nbsp &nbsp </td><td  class='mytd'>" + dx.qty0
            //							+ "</td><td>" + dx.qty1
            +
            "&nbsp &nbsp &nbsp &nbsp </td><td>" + dx.qty2 +
            "</td><td>" + dx.t0
            //							+ "</td><td class='mytd'>" + dx.t1
            +
            "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp </td><td class='mytd'>" + dx.t2
          //"</td><td>" + dx.indicatorOverRate +"%"+
          "</td></tr>"
          if(tr.indexOf("undefined") > 0) break;
          $("#" + id).find("#content").append(tr);
          //alert($("#"+id).find("#content").html());
        }
      }
      loaded(id);
      setTotal(id, data);
    },
    error: function() {
      loaded();
    }
  });
}

function proIndex_setDate(urls) {
  var qdata = $.cookie("repSearch");
  $.ajax({
    type: "POST",
    url: urls,
    data: qdata,
    dataType: "json",
    success: function(data) {
      var id = "proIndex";
      var dx, tr;
      more = $("#" + id).find("table").attr("more");
      if(more == "clear") {
        $("#" + id).find('#content').empty(); //清空所有的数据
      }
      retail2_currentPage = data.thisPageNumber;
      var fname = "";
      var index = $("#" + id).find("table").find("#content").find("tr").length;
      if(data && data.result.length > 0) {
        //alert(urls +data.result.length)
        for(i = 0; i < data.result.length; i++) {
          dx = data.result[i]
          index++;
          tr = "<tr><td>" + index + "</td><td class='mytd'>" +
            "<a href='#event/pageOther?mProductId=" + dx.dProductId + "&code=" + pagecode.proMsg + "&shoeSn=" + dx.dProductName + "'>" + dx.dProductName +
            "</td>" + mytd + "" + dx.rdx +
            "</td><td class='mytd'><a href='#event/pageOther?mProductId=" + dx.mProductId + "&code=" + pagecode.proMsg + "&shoeSn=" + dx.mProductName +
            "'>" + dx.mProductName + "</a>" + "</td><td>" + dx.rmx +

            //"</td><td>" + dx.indicatorOverRate +"%"+
            "</td></tr>"
          //if (tr.indexOf("undefined") > 0) break;
          $("#" + id).find("#content").append(tr);
          //alert($("#"+id).find("#content").html());
        }
      }
      loaded(id);
      setTotal(id, data);
    },
    error: function() {
      loaded();
    }
  });
}

function storeIndex_setDate(urls) {
  var qdata = $.cookie("repSearch");
  $.ajax({
    type: "POST",
    url: urls,
    data: qdata,
    dataType: "json",
    success: function(data) {
      var id = "storeIndex";
      var dx, tr;
      more = $("#" + id).find("table").attr("more");
      if(more == "clear") {
        $("#" + id).find('#content').empty(); //清空所有的数据
      }
      retail2_currentPage = data.thisPageNumber;
      var fname = "";
      var index = $("#" + id).find("table").find("#content").find("tr").length;
      if(data && data.result.length > 0) {
        //alert(urls +data.result.length)
        for(i = 0; i < data.result.length; i++) {
          dx = data.result[i]
          index++;
          fname = LongStr(dx.dname, 7);
          mname = LongStr(dx.mname, 7);
          tr = "<tr><td>" + index + "</td><td class='mytd'>" +
            fname + "</td>" +
            "<td class='mytd'>" + dx.rdx +
            "</td><td class='mytd'>" + mname + "</td><td>" +
            dx.rmx +
            //"</td><td>" + dx.indicatorOverRate +"%"+
            "</td></tr>"
          if(tr.indexOf("undefined") > 0) break;
          $("#" + id).find("#content").append(tr);
          //alert($("#"+id).find("#content").html());
        }
      }
      loaded(id);
      setTotal(id, data);
    },
    error: function() {
      loaded();
    }
  });
}

function storeSearch_setDate(urls) {
  var qdata = $.cookie("repSearch");
  $.ajax({
    type: "POST",
    url: urls,
    data: qdata,
    dataType: "json",
    success: function(data) {
      var id = "storeSearch";
      var dx, tr;
      more = $("#" + id).find("table").attr("more");
      if(more == "clear") {
        $("#" + id).find('#content').empty(); //清空所有的数据
      }
      retail2_currentPage = data.thisPageNumber;
      var fname = "";
      var index = $("#" + id).find("table").find("#content").find("tr").length;
      if(data && data.result.length > 0) {
        //alert(urls +data.result.length)
        for(i = 0; i < data.result.length; i++) {
          dx = data.result[i]
          index++;
          fname = LongStr(dx.cStoreName, 7);
          tr = "<tr><td>" + index + "</td><td class='mytd'>" +
            fname +
            "</td><td class='mytd'>" + dx.qty + "</td><td>" + dx.totAmtActual +
            "</td>" + mytd + "" + dx.avgPrice +
            "</td><td class='mytd'>" + dx.r +
            //"</td><td>" + dx.indicatorOverRate +"%"+
            "</td></tr>"
          if(tr.indexOf("undefined") > 0) break;
          $("#" + id).find("#content").append(tr);
          //alert($("#"+id).find("#content").html());
        }
      }
      loaded(id);
      setTotal(id, data);
    },
    error: function() {
      loaded();
    }
  });
}

function proSearch_setDate(urls) {
  var qdata = $.cookie("repSearch");
  $.ajax({
    type: "POST",
    url: urls,
    data: qdata,
    dataType: "json",
    success: function(data) {
      var id = "proSearch";
      var dx, tr;
      more = $("#" + id).find("table").attr("more");
      if(more == "clear") {
        $("#" + id).find('#content').empty(); //清空所有的数据
      }
      retail2_currentPage = data.thisPageNumber;
      var fname = "";
      var index = $("#" + id).find("table").find("#content").find("tr").length;
      if(data && data.result.length > 0) {
        //alert(urls +data.result.length)
        for(i = 0; i < data.result.length; i++) {
          dx = data.result[i]
          index++;
          //fname = LongStr(dx.productName, 7);
          tr = "<tr><td>" + index +
            "</td><td class='mytd'>" + dx.shoeSn +
            "</td><td  class='mytd'>" + dx.productName +
            "</td><td  class='mytd'>" + dx.qty +
            "</td><td  class='mytd'>" + dx.totAmtActual +
            "</td><td  class='mytd'>" + dx.avgPrice +
            "</td><td class='mytd'>" + dx.r +
            //"</td><td>" + dx.indicatorOverRate +"%"+
            "</td></tr>"
          if(tr.indexOf("undefined") > 0) break;
          $("#" + id).find("#content").append(tr);
          //alert($("#"+id).find("#content").html());
        }
      }
      loaded(id);
      setTotal(id, data);
    },
    error: function() {
      loaded();
    }
  });
}

// 获取选中复选框的参数
function getParam(p) {
  var v = "";
  var dh = "";
  $("#repSearch").find("#" + p).find("input:checkbox:checked").each(function() {
    var $this = $(this);
    v += dh + $this.attr("name");
    dh = ",";
  });
  return v;
}

// 搜索页面
function saveQuery() {
  setTimeout("_saveQuery('repSearch')", 200);
}

function _saveQuery(id) {
  var word = $("#" + id).serialize();
  var date = word.substr(0, 30);
  //	var ddd = word.substr(30);
  //	var t = ddd.split("=on");
  //	var xx = t.join(",").replace(/&/g,'');
  //	var dd = xx.substr(0,xx.length-1);
  //	var nn = "cCustomerId="+ dd;
  //	console.log("参数 :" + nn);
  var c = '',
    d = '',
    e = '',
    f = '';
  if(getParam("jxs")) {
    c = "cCustomerId=" + getParam("jxs");
    console.log("经销商有  :" + c);
  }
  if(getParam("dl")) {
    c += "&classId=" + getParam("dl");
  }
  if(getParam("nf")) {
    c += "&year=" + getParam("nf");
  }
  if(getParam("jj")) {
    c += "&seasonId=" + getParam("jj");
  }
  var mm = date + c;

  $.cookie(id, mm, { //$("#" + id).serialize()
    path: '/'
  });
  //console.info($("#" + id).serialize());
  data = dataAll[dataAll.length - 1].list;
  for(i = 0; i < data.length; i++) {
    $("#" + data[i].fid).html("");
  }

  //	$("#customerSearch").remove();
  //	$("#storeSearch").remove();
  //	$("#proSearch").remove();
  //	$("#proSearch").remove();

  begSearch("customerSearch");
  //	begSearch("storeSearch");
  //	begSearch("proSearch");
  //	begSearch("proSearch");

}

//function loadForm(){
//	var index =0;
//	var name = $("#homeq").find(".tab-active").html();
//		if (name){
//			name = name.replace(/<[^>]+>/g,"");
//				for (i=0;i<data.length;i++){
//					if (data[i].fname == name)  {
//						index = i;
//						break;
//					}
//			}
//			var url = domain +"/Dd/ph.do?code="+data[index].fid;
//			var id = data[index].fid;
//			getHtml(url,id);
//		}
//	}

//查询报表  TODO
function begSearch(id) {
  if($("#" + id).find("#grid").offset())
    $("#" + id).find("#grid").height(window.innerHeight - $("#" + id).find("#grid").offset().top - 36);
  $("#" + id).find("table").attr("more", "clear");
  $("#" + id).find("#grid").scroll(function() {
    id = $(this).parents(".parent").attr("id");
    activeId = id;
    var nDivHight = $("#" + id).find("#grid").height();
    nScrollHight = $(this)[0].scrollHeight;
    nScrollTop = $(this)[0].scrollTop;
    var paddingBottom = parseInt($(this).css('padding-bottom')),
      paddingTop = parseInt($(this).css('padding-top'));
    if(nScrollTop + paddingBottom + paddingTop + nDivHight >= nScrollHight)
      var url = getMoreUrl(id);
    //console.info(url + $.cookie("repSearch"));
    if(url)
      eval(id + "_setDate('" + url + "')");
  });
  var url = getProUrl(id)
  console.info(url + $.cookie("repSearch"));
  eval(id + "_setDate('" + url + "')");
}

function getMoreUrl(id) {
  var page = $("#" + id).find("#pre").attr("page");
  if(page) {
    page = "page=" + page + "&";
  } else {
    page = "";
  }
  if($("#" + id).find("table").find("#content").find("tr").length % 20 > 0) {
    $("#" + id).find("#more").addClass("disabled");
  } else {
    var url = getProUrl(id);
    var pageNumber = $("#" + id).find("#more").attr("pageNumber");
    if(!pageNumber) pageNumber = 1;
    pageNumber = (Number(pageNumber) + 1)
    url += "pageNumber=" + pageNumber + "&" + page;
    $("#" + id).find("#more").attr("pageNumber", pageNumber);
    $("#" + id).find("table").removeAttr("more");
  }
  return url;
}

//-------------------------------------------------------------------
//;(function ( $, window, document, undefined ){
//	var _id,_index,column;
//	$.fn.park = function(){
//
//	}
//})(jQuery, window,document);

var title_name = {
  cStoreId: "店铺ID"

}

function t2v(t) {
  var title = "";
  try {
    title = eval("title_name." + t);
  } catch(e) {}
  if(title) return title;
  else return t;
}

/**
 * 用于注入一个表单 index 必须是数字或无效的东西，
 * column 是要显示的标题
 * @param {Object} id
 */
function setMsgData(id, index, column) {
  var mtable = '<table class="table-bordered" id="vtable0" width="100%" style="padding-left:0px;padding-right:0px;">' +
    '<tr style=""><th class="hrtitle" width="15%" height="30px" style="line-height: 30px;text-align: center;" >名称</th>' +
    '<th  class="hrtitle" width="85%" style="line-height: 30px;text-align: center;" >信息</th>' +
    '</tr><tbody id="content" style="font-size:1em;margin-left: 0px;margin-right: 0px;">'

  //urls = getCookQuery(id);
  //loading();

  var urls = getProUrl(id);
  console.info(urls);
  $.ajax({
    type: "POST",
    url: urls, //"http://10.10.1.41:443/pages/sysb/SysbQuery/p.do?fidSysbquery=40288a4e58fb1d450158fbd0c0fc004c&time=1488268019402&cStoreId=5086&",
    dataType: "json",
    success: function(data) {
      if(data) {
        var row;
        if(index) {
          $("#" + id).append(mtable.replace('id="vtable0"', 'id="vtable' + index + '"'));
          row = data.result[index];
          setPageHtml(id, row, index, column);
        } else
          for(i = 0; i < data.result.length; i++) {
            $("#" + id).append(mtable.replace('id="vtable0"', 'id="vtable' + i + '"'));
            row = data.result[i];
            setPageHtml(id, row, i, column);
          }
      }
    },
    error: function() {
      loaded();
    }
  });
}

function setPageHtml(id, row, i, title) {
  var iddiv = "";
  var $content = $("#" + id).find("#vtable" + i).find("#content");
  $content.empty();
  if(title) {
    var ts = title.split(",");
    for(x = 0; x < ts.length; x++) {
      var name = t2v(ts[x])
      var val = eval("row." + ts[x]);
      var html = "<tr><td class='text-right myv'>" + name + "</td>" +
        "<td class='text-left myv'>" + val + "</td></tr>"
      $content.append(html);
    }
  } else
    $.each(row, function(name, value) {
      var html = "<tr><td class='text-right myv'>" + t2v(name) + "</td>" +
        "<td class='text-left myv'>" + value + "</td></tr>"
      $content.append(html);
      //$("#"+id).find("#"+name).html(value);
    });
}

///////-------------------------------------------------------------
/**
 * 计算字符宽度
 */
function calcStringPixelsCount(str, strFontSize) {
  // 字符串字符个数
  var stringCharsCount = str.length;

  // 字符串像素个数
  var stringPixelsCount = 0;
  var stringPixelsCount = 0;
  var stringPixelsCount = 0;
  var stringPixelsCount = 0;
  var stringPixelsCount = 0;

  // JS 创建HTML元素：span
  var elementPixelsLengthRuler = document.createElement("span");
  elementPixelsLengthRuler.style.fontSize = strFontSize; // 设置span的fontsize
  elementPixelsLengthRuler.style.visibility = "hidden"; // 设置span不可见
  elementPixelsLengthRuler.style.display = "inline-block";
  elementPixelsLengthRuler.style.wordBreak = "break-all !important"; // 打断单词

  // 添加span
  document.body.appendChild(elementPixelsLengthRuler);

  for(var i = 0; i < stringCharsCount; i++) {
    // 判断字符是否为空格，如果是用&nbsp;替代，原因如下：
    // 1）span计算单个空格字符（ ），其像素长度为0
    // 2）空格字符在字符串的开头或者结果，计算时会忽略字符串
    if(str[i] == " ") {
      elementPixelsLengthRuler.innerHTML = "&nbsp;";
    } else {
      elementPixelsLengthRuler.innerHTML = str[i];
    }
    stringPixelsCount += elementPixelsLengthRuler.offsetWidth;
  }
  return stringPixelsCount;
}

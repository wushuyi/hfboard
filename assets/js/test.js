//var xhr = new XMLHttpRequest();
//xhr.onreadystatechange = function(){
//    if(xhr.readyState==4){
//        console.log(xhr.status);
//        if(xhr.status==200){
//            var msg = xhr.getResponseHeader('Date');
//            console.log(msg);
//        }
//    }
//};
//
//xhr.open("GET", "http://localhost/", true);
//xhr.send(null);

//(function($){
//    $(document).ready(function($){
//
//    })
//})(window.jQuery);

var areaInfo = [
    ["安徽","合肥|芜湖|安庆|亳州|六安|宣城|宿州|池州|淮北|淮南|滁州|蚌埠|铜陵|阜阳|马鞍山|黄山"],
    ["北京","北京"],
    ["天津","天津"],
    ["河北","石家庄|保定|唐山|廊坊|张家口|承德|沧州|秦皇岛|衡水|邢台|邯郸"],
    ["山西","太原|大同|临汾|吕梁|忻州|晋中|晋城|朔州|运城|长治|阳泉"],
    ["内蒙古","呼和浩特|包头|赤峰|呼伦贝尔|乌兰察布|通辽|乌海|兴安盟|巴彦淖尔|鄂尔多斯|锡林郭勒盟|阿拉善盟"],
    ["辽宁","沈阳|大连|葫芦岛|丹东|抚顺|朝阳|本溪|盘锦|营口|辽阳|铁岭|锦州|阜新|鞍山"],
    ["吉林","长春|吉林|通化|四平|松原|白城|白山|辽源|延边州"],
    ["黑龙江","哈尔滨|大庆|佳木斯|鹤岗|七台河|伊春|双鸭山|牡丹江|绥化|鸡西|黑河|齐齐哈尔|大兴安岭"],
    ["上海","上海"],
    ["江苏","南京|苏州|南通|宿迁|常州|徐州|扬州|无锡|泰州|淮安|盐城|连云港|镇江"],
    ["浙江","杭州|宁波|绍兴|温州|台州|嘉兴|丽水|湖州|舟山|衢州|金华"],
    ["福建","福州|厦门|泉州|漳州|三明|南平|宁德|莆田|龙岩"],
    ["江西","南昌|九江|抚州|赣州|上饶|吉安|宜春|新余|景德镇|萍乡|鹰潭"],
    ["山东","济南|青岛|威海|泰安|德州|日照|枣庄|济宁|淄博|滨州|潍坊|烟台|聊城|莱芜|菏泽|东营|临沂"],
    ["河南","郑州|洛阳|濮阳|安阳|三门峡|信阳|南阳|周口|商丘|平顶山|开封|新乡|济源|漯河|焦作|许昌|驻马店|鹤壁"],
    ["湖北","武汉|荆州|荆门|襄阳|仙桃|十堰|咸宁|天门|孝感|宜昌|恩施|潜江|神农架|鄂州|随州|黄冈|黄石"],
    ["湖南","长沙|株洲|湘潭|娄底|岳阳|常德|张家界|怀化|永州|湘西州|益阳|衡阳|邵阳|郴州"],
    ["广东","广州|深圳|东莞|茂名|中山|云浮|佛山|惠州|揭阳|梅州|汕头|汕尾|江门|河源|清远|湛江|潮州|珠海|肇庆|阳江|韶关"],
    ["广西","南宁|桂林|北海|柳州|玉林|崇左|来宾|梧州|河池|百色|贵港|贺州|钦州|防城港"],
    ["海南","海口|三亚|省直辖"],
    ["重庆","重庆"],
    ["四川","成都|绵阳|乐山|德阳|内江|南充|宜宾|巴中|广元|广安|攀枝花|泸州|眉山|自贡|资阳|达州|遂宁|雅安|甘孜州|凉山州|阿坝州"],
    ["贵州","贵阳|遵义|六盘水|安顺|毕节|铜仁|黔东南州|黔南州|黔西南州"],
    ["云南","昆明|玉溪|丽江|保山|临沧|普洱|曲靖|大理州|德宏州|怒江州|迪庆州|文山州|昭通|楚雄州|红河州|西双版纳州"],
    ["西藏","拉萨|日喀则|昌都|林芝|阿里|山南"],
    ["陕西","西安|咸阳|宝鸡|榆林|汉中|延安|渭南|铜川|商洛|安康"],
    ["甘肃","兰州|天水|张掖|武威|白银|酒泉|嘉峪关|定西|平凉|庆阳|金昌|陇南|临夏|甘南州"],
    ["青海","西宁|果洛州|海东|海北州|海南州|海西州|玉树州|黄南州"],
    ["宁夏","银川|中卫|吴忠|固原|石嘴山"],
    ["新疆","乌鲁木齐|克拉玛依|吐鲁番|塔城|喀什|伊犁州|巴音郭楞州|昌吉州|石河子|阿克苏|阿勒泰|克孜勒苏柯尔克孜州|博尔塔拉州|和田|哈密|五家渠|阿拉尔"]
];

//function loadScript(src){
//    (function(i,s,o,g,r,a,m){a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script",src,"js");
//}
//loadScript("http://localhost/framework/localForage-master/dist/localforage.min.js");
//
//var test = [
//    ["安徽","合肥|芜湖|安庆|亳州|六安|宣城|宿州|池州|淮北|淮南|滁州|蚌埠|铜陵|阜阳|马鞍山|黄山"]
//    ];

var test = [
    ["安徽","合肥|芜湖|安庆|亳州|六安|宣城|宿州|池州|淮北|淮南|滁州|蚌埠|铜陵|阜阳|马鞍山|黄山"],
    ["北京","北京"],
    ["天津","天津"],
    ["河北","石家庄|保定|唐山|廊坊|张家口|承德|沧州|秦皇岛|衡水|邢台|邯郸"],
    ["山西","太原|大同|临汾|吕梁|忻州|晋中|晋城|朔州|运城|长治|阳泉"],
    ["内蒙古","呼和浩特|包头|赤峰|呼伦贝尔|乌兰察布|通辽|乌海|兴安盟|巴彦淖尔|鄂尔多斯|锡林郭勒盟|阿拉善盟"],
    ["辽宁","沈阳|大连|葫芦岛|丹东|抚顺|朝阳|本溪|盘锦|营口|辽阳|铁岭|锦州|阜新|鞍山"],
    ["吉林","长春|吉林|通化|四平|松原|白城|白山|辽源|延边州"],
    ["黑龙江","哈尔滨|大庆|佳木斯|鹤岗|七台河|伊春|双鸭山|牡丹江|绥化|鸡西|黑河|齐齐哈尔|大兴安岭"],
    ["上海","上海"],
    ["江苏","南京|苏州|南通|宿迁|常州|徐州|扬州|无锡|泰州|淮安|盐城|连云港|镇江"],
    ["浙江","杭州|宁波|绍兴|温州|台州|嘉兴|丽水|湖州|舟山|衢州|金华"],
    ["福建","福州|厦门|泉州|漳州|三明|南平|宁德|莆田|龙岩"],
    ["江西","南昌|九江|抚州|赣州|上饶|吉安|宜春|新余|景德镇|萍乡|鹰潭"],
    ["山东","济南|青岛|威海|泰安|德州|日照|枣庄|济宁|淄博|滨州|潍坊|烟台|聊城|莱芜|菏泽|东营|临沂"],
    ["河南","郑州|洛阳|濮阳|安阳|三门峡|信阳|南阳|周口|商丘|平顶山|开封|新乡|济源|漯河|焦作|许昌|驻马店|鹤壁"],
    ["湖北","武汉|荆州|荆门|襄阳|仙桃|十堰|咸宁|天门|孝感|宜昌|恩施|潜江|神农架|鄂州|随州|黄冈|黄石"],
    ["湖南","长沙|株洲|湘潭|娄底|岳阳|常德|张家界|怀化|永州|湘西州|益阳|衡阳|邵阳|郴州"],
    ["广东","广州|深圳|东莞|茂名|中山|云浮|佛山|惠州|揭阳|梅州|汕头|汕尾|江门|河源|清远|湛江|潮州|珠海|肇庆|阳江|韶关"],
    ["广西","南宁|桂林|北海|柳州|玉林|崇左|来宾|梧州|河池|百色|贵港|贺州|钦州|防城港"],
    ["海南","海口|三亚|省直辖"],
    ["重庆","重庆"],
    ["四川","成都|绵阳|乐山|德阳|内江|南充|宜宾|巴中|广元|广安|攀枝花|泸州|眉山|自贡|资阳|达州|遂宁|雅安|甘孜州|凉山州|阿坝州"],
    ["贵州","贵阳|遵义|六盘水|安顺|毕节|铜仁|黔东南州|黔南州|黔西南州"],
    ["云南","昆明|玉溪|丽江|保山|临沧|普洱|曲靖|大理州|德宏州|怒江州|迪庆州|文山州|昭通|楚雄州|红河州|西双版纳州"],
    ["西藏","拉萨|日喀则|昌都|林芝|阿里|山南"],
    ["陕西","西安|咸阳|宝鸡|榆林|汉中|延安|渭南|铜川|商洛|安康"],
    ["甘肃","兰州|天水|张掖|武威|白银|酒泉|嘉峪关|定西|平凉|庆阳|金昌|陇南|临夏|甘南州"],
    ["青海","西宁|果洛州|海东|海北州|海南州|海西州|玉树州|黄南州"],
    ["宁夏","银川|中卫|吴忠|固原|石嘴山"],
    ["新疆","乌鲁木齐|克拉玛依|吐鲁番|塔城|喀什|伊犁州|巴音郭楞州|昌吉州|石河子|阿克苏|阿勒泰|克孜勒苏柯尔克孜州|博尔塔拉州|和田|哈密|五家渠|阿拉尔"]
];

for(var key in test){
    var Plist = test[key];
    var P = Plist[0];
    var DList =Plist[1].split('|');
    //console.log(DList);
    for(var Dindex in DList){
        var D = DList[Dindex];
        var postData = {
            do: 'GETSUBDISTRICTNAME',
            p: P,
            d: D
        };
        //console.log(postData);
        $.ajax({
            url: 'http://www.jd100.com/service/district/',
            type: 'POST',
            dataType: 'json',
            data: postData,
            pData : postData,
            //cache: false,
            //contentType: false,
            //processData: false,
            //forceSync: false,
            success: function (data, message, xhr){
                //console.log();

                getschool(this.pData, data);
            },
            error: function (xhr, status, errMsg){
                console.log(arguments);
            }
        });
    }
}

function getschool(postPData, data){
    for(var Sindex in data.data){
        console.log(data.data[Sindex].districtname);
        var S = data.data[Sindex].districtname;
        var postData = {
            do: 'GETSCHOOL',
            s: S,
            p: postPData.p,
            d: postPData.d,
            t: 0
        };
        $.ajax({
            url: 'http://www.jd100.com/service/district/',
            type: 'POST',
            dataType: 'json',
            data: postData,
            myData: postData,
            success: function (data, message, xhr){
                //console.log(data);
                //localforage.setItem(this.data, data);

                var thisData = '';
                for(var i = 0; i < data.length; i ++){
                    thisData +=  data.data[i].districtname + '|';
                }

                var postDataA = {
                    p: this.myData.p,
                    d: this.myData.d,
                    s: this.myData.s,
                    data: thisData
                };
                $.ajax({
                    url: 'http://192.168.3.126:8080/LMS/',
                    type: 'POST',
                    dataType: 'json',
                    data: postDataA,
                    //cache: false,
                    //contentType: false,
                    //processData: false,
                    //forceSync: false,
                    success: function (data, message, xhr){
                        //console.log();
                        //getschool(this.pData, data);
                    },
                    error: function (xhr, status, errMsg){
                        console.log(arguments);
                    }
                });

            },
            error: function (xhr, status, errMsg){
                console.log(arguments);
            }
        });
    }
}
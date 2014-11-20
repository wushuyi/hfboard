/**
 * Created by Administrator on 2014/11/19.
 */
var test = '{"0": "现金方式","1": "中国银行","2": "建设银行","3": "农业银行","4": "工商银行","5": "交通银行","6": "支付宝",}';
test = test.split(',}')[0]+'}';
var bankJson = $.parseJSON(test);
var dataB = $.parseJSON(test);
var dataC = $.parseJSON(test);
for(var key in dataA){
    if(key != 0){
        delete  dataA[key];
    }
}
for(var key in dataB){
    if(key == 0){
        delete  dataB[key];
    }
}
for(var key in dataC){
    if(key == 0 || key == 6){
        delete  dataC[key];
    }
}

$('a').on('click', function(e){
    var select = '';
    for(var key in bankJson){
        if(key != 0){
            select += '<option value ="'+key+'">'+bankJson[key]+'</option>';
        }
    }
    select = '<select>' + select + '</select>';
    console.log(select);
});
$('b').on('click', function(e){

});
$('c').on('click', function(e){

});

(function($){
    $(document).ready(function($){
        var json = '{"0": "现金方式","1": "中国银行","2": "建设银行","3": "农业银行","4": "工商银行","5": "交通银行","6": "支付宝",}';
        json = json.split(',}')[0]+'}';
        var bankJson = $.parseJSON(json);
        var selectA = '';
        var selectB = '';
        var selectC = '';

        for(var key in bankJson){
            if(key == 0){
                selectA += '<option value ="'+key+'">'+bankJson[key]+'</option>';
            }
        }
        selectA = '<select>' + selectA + '</select>';
        console.log(selectA);


        for(var key in bankJson){
            if(key != 0){
                selectB += '<option value ="'+key+'">'+bankJson[key]+'</option>';
            }
        }
        selectB = '<select>' + selectB + '</select>';
        console.log(selectB);


        for(var key in bankJson){
            if(key != 0 || key != 6){
                selectC += '<option value ="'+key+'">'+bankJson[key]+'</option>';
            }
        }
        selectC = '<select>' + selectC + '</select>';
        console.log(selectC);

    });
})(window.jQuery);
let url = window.location.toString()
let city = url.split('/')[4]
//按钮标记
let flag = true
columnsNmae = ['id', 'city', 'countyName', 'yares2017', 'yares2016', 'yares2015', 'yares2014', 'yares2013', 'yares2012', 'yares2011', 'yares2010', 'yares2009', 'yares2008', 'yares2007', 'yares2006', 'yares2005', 'yares2004', 'yares2003', 'yares2002', 'yares2001', 'yares2000']

/*
* 合并单元格
* */
function mergeCells(data, fieldName, colspan, target) {
    //声明一个map计算相同属性值在data对象出现的次数和
    var sortMap = {};
    for (var i = 0; i < data.length; i++) {
        for (var prop in data[i]) {
            if (prop == fieldName) {
                var key = data[i][prop]
                if (sortMap.hasOwnProperty(key)) {
                    sortMap[key] = sortMap[key] * 1 + 1;
                } else {
                    sortMap[key] = 1;
                }
                break;
            }
        }
    }
    var index = 0;
    for (var prop in sortMap) {
        var count = sortMap[prop] * 1;
        $(target).bootstrapTable('mergeCells', {index: index, field: fieldName, colspan: colspan, rowspan: count});
        index += count;
    }
}

//end function

$(document).ready(function () {
    let columns = []
    for (let i = 1; i < columnsNmae.length; i++) {
        columns.push({
            title: columnsNmae[i],
            field: columnsNmae[i],
        })
    }
    $('#detail_info_table').bootstrapTable({
        method: 'get',
        url: "/get_city_info/" + city,//请求路径
        striped: true, //是否显示行间隔色
        pageNumber: 1, //初始化加载第一页
        pagination: true,//是否分页
        sidePagination: 'client',//server:服务器端分页|client：前端分页
        pageSize: 10,//单页记录数
        pageList: [5, 10, 20, 30],//可选择单页记录数
        showRefresh: true,//刷新按钮
        columns: columns,
        onLoadSuccess: function (data) {
            for (let i = 11; i < columnsNmae.length; i++) {
                $('#detail_info_table').bootstrapTable('hideColumn', columnsNmae[i]);
            }
            initLineTable(data)
            mergeCells(data, "city", 1, $('#detail_info_table'));
        },
        onPageChange: function (index) {
            var data = $('#detail_info_table').bootstrapTable('getData', true);
            //合并单元格
            mergeCells(data, "city", 1, $('#detail_info_table'));
        },
    });
    //bootstrapTable end


    initListener()
})

/*
* 加载折线图
* */
function initLineTable(data) {
    var series = []
    let data_obj = data
    for (i = 0; i < data_obj.length; i++) {
        _data = []
        for (let c = columnsNmae.length - 1; c > 2; c--) {
            _data.push(parseFloat(data_obj[i][columnsNmae[c]]))
        }
        series.push({
            name: data_obj[i]['countyName'],
            data: _data
        })
    }
    $('#detail_container').highcharts({
        title: {text: '大豆豆种植面积'},
        subtitle: {
            text: 'com.crack.CoreOfBean'
        },
        //x轴
        xAxis: {
            categories: ['2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000'].reverse()
        },
        //y轴
        yAxis: {
            title: {
                text: '种植面积 (亩)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '亩'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        credits: {
            text: ''
        },
        series: series,
    })
}

/*
* 加载折线图end
* */

/*
*
* 初始化监听方法
* */
function initListener() {
    $(".container-fluid button").click(function (e) {
        if (flag) {
            for (var i = 10; i < columnsNmae.length; i++) {
                $('#detail_info_table').bootstrapTable('showColumn', columnsNmae[i]);
            }
        } else {
            for (var i = 10; i < columnsNmae.length; i++) {
                $('#detail_info_table').bootstrapTable('hideColumn', columnsNmae[i]);
            }
        }
        flag = !flag
        let data = $('#detail_info_table').bootstrapTable('getData', true);
        //合并单元格
        mergeCells(data, "city", 1, $('#detail_info_table'));
    })
}


let columnsNmae = ['id', 'city', 'countyName', 'yares2017', 'yares2016', 'yares2015', 'yares2014', 'yares2013', 'yares2012', 'yares2011', 'yares2010', 'yares2009', 'yares2008', 'yares2007', 'yares2006', 'yares2005', 'yares2004', 'yares2003', 'yares2002', 'yares2001', 'yares2000']
let columns = [
    {
        title: columnsNmae[1], field: columnsNmae[1], formatter: aFormatterCity,
    },
    {
        title: columnsNmae[2], field: columnsNmae[2], formatter: aFormatterCounty,
    }]

for (let i = 3; i < 10; i++) {
    columns.push(
        {
            title: columnsNmae[i], field: columnsNmae[i],
        }
    )
}
let colors = ['#7cb5ec', '#90ed7d', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655',
    '#FFF263', '#6AF9C4']

//end for

function aFormatterCity(value, row, index) {
    return ['<a href="/detail_info/' + value + '">' + value + '</a>'].join("")
}

function aFormatterCounty(value, row, index) {
    return ['<a href="/detail_info/' + row['city'] + '%' + value + '">' + value + '</a>'].join("")
}

function modify(value, row, index) {
    return ['<a href="/modify/' + row['city'] + '%' + row['countyName'] + '">' + '修改' + '</a>'].join("")
}

columns.push({
    title: '操作',
    formatter: modify,
})
$(document).ready(function () {
        $('#index_table').bootstrapTable({
            method: 'get',
            url: "/get_all_info",//请求路径
            pagination: true,//是否分页
            sidePagination: 'client',//server:服务器端分页|client：前端分页
            search: true,
            pageSize: 10,//单页记录数
            pageList: [5, 10, 20, 30],//可选择单页记录数
            showRefresh: true,//刷新按钮
            columns: columns,
            onLoadSuccess: function () {
                var data = $('#index_table').bootstrapTable('getData', true);
                mergeCells(data, "city", 1, $('#index_table'));
            },
            onPageChange: function () {
                var data = $('#index_table').bootstrapTable('getData', true);
                //合并单元格
                //success中写入了 否则用var data = $('#index_table').bootstrapTable('getData', true); 获取date
                mergeCells(data, "city", 1, $('#index_table'));
            },
        });


        $.ajax({
            url: '/get_provinces_info/',
            success: function (data) {
                let data_obj = jQuery.parseJSON(data)
                initLineTable(data_obj)
            }
        })

        /*
        * 合并单元格的函数*/
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
    }
);

/*
* 加载折线图
* */
function initLineTable(data) {
    var series = []
    aire_data = []
    production_data = []
    for (let i = 2; i < data.length; i++) {
        aire_data.push(data[i][1])
    }
    for (let i = 2; i < data.length; i++) {
        production_data.push(data[i][2])
    }

    series.push({
        name: '大豆产量',
        data: production_data,
        tooltip: {
            valueSuffix: ' kg'
        },
    })
    series.push({
        name: '种植面积',
        data: aire_data,
        tooltip: {
            valueSuffix: '亩'
        },
    })

    $('#index_container').highcharts({
        title: {text: '全省大豆豆种植面积及产量'},
        subtitle: {
            text: 'com.crack.CoreOfBean'
        },
        //x轴
        xAxis: {
            categories: ['2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001'].reverse()
        },
        //y轴
        yAxis: [{
            title: {
                text: '种植面积 (亩)',
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        }, { // 第二条Y轴
            title: {
                text: '大豆产量 (千克)',
            },
            labels: {
                format: '{value} kg',
            }
        },],
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
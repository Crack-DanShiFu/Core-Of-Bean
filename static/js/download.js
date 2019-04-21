$(document).ready(function () {
    $("select[name='city-section']").change(function () {
        $('select[name="years-section"]').empty();
        let city_select_val = $('select[name="city-section"]').find('option:selected').val()
        $.ajax({
            url: '/download/get_list_pdf/' + city_select_val,
            success: function (res) {
                var data_obj = jQuery.parseJSON(res)
                let flag = 2018
                for (let i = 0; i < data_obj[0].length; i++) {
                    if (data_obj[0][i] == '1') {
                        $('select[name="years-section"]').append("<option>" + flag + "</option>")
                    }
                    flag--
                }
            },
            error: function (e) {
            }
        });
    })
    $('.download_button').click(function () {
        let city = $('select[name="city-section"]').val()
        let year = $('select[name="years-section"]').val()
        url = '/download/files/' + city + '&' + year
        window.open(url);
    })

})
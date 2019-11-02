$(function () {
    $('.list-lecture').on('click', '.card-lecture' ,function () {
        console.log('과목클릭')
        $('#modal-lecture-info').modal('show');
    });

    $('.lecture-time > a').click(function () {
        $('#modal-lecture-task').modal('show');
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $(function () {
        $('[data-toggle="popover"]').popover({
            container: 'body',
            html: true,
            placement: 'right',
            sanitize: false,
            content: function () {
                return $("#PopoverContent").html();
            }
        });
    });
    $('#search-form > input').change(function () {
        let search = $(this).val();
        $.ajax({
            url: '/api/searchItem',
            dataType: 'json',
            type: 'GET',
            data: {search:search},
            success: function(result) {
                let list = document.querySelector(".list-lecture");
                while(list.hasChildNodes()){
                    list.removeChild(list.firstChild);
                }
                if (result.count > 0) {
                result.rows.forEach(element => {
                    $(".list-lecture").append("<li class='card-lecture'><a href='#' class='lecture-title'>"+element.lecture+"</a><h6 class='lecture-time'><i class='material-icons ic-lecture-info'>access_time</i><span>"+element.start_time+" - "+element.end_time+" | "+element.dayofweek+" </span></h6><ul class='list-lecture-info'><li> 교과목 코드 : "+element.code+"</li><li> 담당 교수 : "+element.professor+"</li><li> 강의실 : "+element.location+"</li></ul></li>");
                });
                }else{
                    list.appendChild("<li class='card-lecture'>검색하는 강의가 존재하지 않습니다.</li>");
                }
        }
        });
    });
    
})
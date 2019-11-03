let selectCode = '';
$(function () {
    $('.list-lecture').on('click', '.card-lecture' ,function () {
        let text = $(this).children('.list-lecture-info').children().first().text().split(":");
        let code = text[1].trim();
        selectCode = code;
        $.ajax({
            url: '/api/seleteItem',
            dataType: 'json',
            type: 'GET',
            data: {code:code},
            success: function(result) {
                if(result){
                    $(".modal-body").empty();
                    $(".modal-body").append('<h3 class="lecture-title">'+result.lecture
                    +'</h3><ul class="lecture-info"><li class="lecture-time"><i class="material-icons ic-lecture-info">access_alarm</i><span>강의 시간 : '+
                    result.start_time+' - '+result.end_time+' | '+result.dayofweek+'</span></li><li class="lecture-time"><i class="material-icons ic-lecture-info">code</i><span>교과목 코드 : '+result.code
                    +'</span></li><li class="lecture-time"><i class="material-icons ic-lecture-info">school</i><span>담당 교수 : '+result.professor+'</span></li><li class="lecture-time"><i class="material-icons ic-lecture-info">business</i><span>강의실 : '+
                    result.location+'</span></li></ul><div class="lecture-description"><p class="txt-description">본 강의에서는 JSP를 이용한 웹 기반 프로그래밍 기초 및 응용기술에 대해 학습합니다. 특히 실습 위주의 수업으로 프로그래밍 스킬 향상 및 실무 능력을 갖출 수 있도록 합니다.</p></div>');
                }
                    
            }
        });
        $('#modal-lecture-info').modal('show');
    });

    $('#modal-lecture-info .btn-primary').on('click', function () {
        $.ajax({
            url: '/api/addschedule',
            dataType: 'json',
            type: 'post',
            data: {code:selectCode},
            success: function(result) {
                if(result){
                    $('#modal-lecture-info').modal('hide');
                    document.location.href = '/';
                }else{
                    alert('선택하신 시간에 이미 등록된 강의가 있습니다.');
                }
            }
        });
        
    });

    $('.lecture-time > a').click(function () {
        let lecture = $(this).children('.lecture-info').children('.lecture-title').text();
        $.ajax({
            url: '/api/seletescheduleItem',
            dataType: 'json',
            type: 'GET',
            data: {lecture:lecture},
            success: function(result) {
                if(result){
                    selectCode = result.code;
                    let memo = '';
                    let memolist = result.memo ? JSON.parse(result.memo) : 0;
                    memo = '<div class="lecture-memo"><h5 class="memo-header">메모</h5><ul>';
                    if(memolist.length > 0){
                        memolist.forEach((m,index)=>{
                            memo +=`<li class="memo-list">
                                    <div class="memo-content" data-toggle="tooltip" data-placement="top" title="" data-original-title="`+m.message+`">
                                    <i class="material-icons ic-lecture-noti">assignment</i>
                                    <span class="lecture-noti-title">`+m.title+`</span>
                                    </div>
                                    <div class="memo-btn">
                                    <a href="#" onclick="delectmemo(`+index+`)"><i class="material-icons ic-lecture-noti">delete</i></a>
                                    </div>
                                    </li>`;
                        });
                    }
                    memo += '</ul></div>';
                    $(".modal-body").empty();
                    $(".modal-body").append('<h3 class="lecture-title">'+result.lecture
                    +'</h3><ul class="lecture-info"><li class="lecture-time"><i class="material-icons ic-lecture-info">access_alarm</i><span>강의 시간 : '+
                    result.start_time+' - '+result.end_time+' | '+result.dayofweek+'</span></li><li class="lecture-time"><i class="material-icons ic-lecture-info">code</i><span>교과목 코드 : '+result.code
                    +'</span></li><li class="lecture-time"><i class="material-icons ic-lecture-info">school</i><span>담당 교수 : '+result.professor+'</span></li><li class="lecture-time"><i class="material-icons ic-lecture-info">business</i><span>강의실 : '+
                    result.location+'</span></li></ul><div class="lecture-description"><p class="txt-description">본 강의에서는 JSP를 이용한 웹 기반 프로그래밍 기초 및 응용기술에 대해 학습합니다. 특히 실습 위주의 수업으로 프로그래밍 스킬 향상 및 실무 능력을 갖출 수 있도록 합니다.</p></div>'
                    +memo)
                }
                    
            }
        });
        
        $('#modal-lecture-task').modal('show');
    });
    $('#modal-lecture-task .btn-danger').on('click', function () {
        $.ajax({
            url: '/api/deleteschedule',
            dataType: 'json',
            type: 'post',
            data: {code:selectCode},
            success: function(result) {
                $('#modal-lecture-info').modal('hide');
                document.location.href = '/';
            }
        });
        
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
    $('body').tooltip({
        selector: '.memo-content'
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
                    $(".list-lecture").append("<li class='card-lecture'>검색하는 강의가 존재하지 않습니다.</li>");
                }
        }
        });
    });
})
function memobtnAction() {
    let titles = document.querySelectorAll("#recipient-name");
    let title = '';
    titles.forEach(element => {
        if(element.value != ''){
            title = element.value;
        }
    });
    let messages = document.querySelectorAll("#message-text");
    let message = '';
    messages.forEach(element => {
        if(element.value != ''){
            message = element.value;
        }
    });
    if(title && message){
        $.ajax({
            url: '/api/addMemo',
            dataType: 'json',
            type: 'post',
            data: {code:selectCode, title:title, message:message},
            success: function(result) {
                let togle =document.querySelector("#modal-lecture-task >.modal-dialog >.modal-content >.modal-footer >.left >button");
                togle.click();
                document.location.href = '/';
            }
        });
    }
}

function delectmemo(index) {
    $.ajax({
        url: '/api/deleteMemo',
        dataType: 'json',
        type: 'post',
        data: {code:selectCode, deletememo:index},
        success: function(result) {
            document.location.href = '/';
        }
    });
    
    
}
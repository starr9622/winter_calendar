$(function () {
    $('.card-lecture').click(function () {
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
})
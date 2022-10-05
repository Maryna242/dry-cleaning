$(function(){
    scrollTo()
    burger()
})

function scrollTo() {
    $('.menu a').on('click', function(e){
        e.preventDefault();
        
        let selector = $(this).attr('href');
        let h = $(selector);
        $('html, body').animate({
            scrollTop: h.offset().top
        }, 1000);

    })
}
function burger(){
    $('#nav-icon1').on('click', function(){
        $(this).toggleClass('open');
    });
};
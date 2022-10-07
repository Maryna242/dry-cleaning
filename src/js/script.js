$(function(){
    scrollTo()
    burger()
    maskedPhone()
    footerFormValidate()
    radioChecker()
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
    let menuList = $('ul.nav_list')
    let btn = $('#nav-icon1')
    let menu = $('.menu')

    btn.on('click', function(){
        menu.toggleClass('open');
    });
    $(document).mouseup( function(e) {
		if ( !menuList.is(e.target) && menuList.has(e.target).length === 0 && !btn.is(e.target) && btn.has(e.target).length === 0) {
            menu.removeClass('open')
		}
	});
};
function radioChecker() {
    const radioBtns = $('#form_first input[type=radio]')
    radioBtns.on('change', function () {
        radioBtns.prop("checked", false)
        $(this).prop("checked", true)
    })
}
//Маска для ввода телефона
function maskedPhone(){
	let firstSectionFormPhone = $('#form_phone_1');
	let footerSectionFormPhone = $('#form_phone_2');
	firstSectionFormPhone.mask("+38 (000) 000-0000");
	footerSectionFormPhone.mask("+38 (000) 000-0000");
}
//Валидация формы подвала
function footerFormValidate(){
	let form = $('#form_first');
	form.validate({
		rules: {
			"phone": {
				required: true,
				minlength: 18,
			},
			"name": {
				required: true
			},
		},
		messages: {
			"phone": {
				required: "Введіть номер телефону",
				minlength: "Номер повинен бути у форматі +38 (099) 999 99 99",
			},
			"name": {
				required: "Введіть Ваше ім'я"
			}
		},
		submitHandler:	function(e){
			$.ajax({
				type: "POST",
				url: "/send-message.php",
				data: form.serialize(),
				success: function(res) {
                    console.log(res);
					$.fancybox.open({
						src: '#popup_thanks',
						opts: {
							smallBtn: false,
							baseClass: 'custom-fancybox',
							touch: false,
							hideScrollbar: false,							
						}
					});
				}
			});
			return false;
		}
	});
}
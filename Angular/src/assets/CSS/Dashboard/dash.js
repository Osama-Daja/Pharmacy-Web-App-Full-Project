$(document).ready(function () {
    $(".sidebar-menu ul li a").click(function () {
        $("a").each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
    });

    // start Notification transtion code
    // $('.fa-bell').click(function (e) {
    //     e.stopPropagation(); 

    //     $('active-profile-menu').removeClass('active-profile-menu');
    //     const noti = document.querySelector('.notification-ul');
    //     noti.classList.toggle('active-notification-ul');

    //     if ($('.profile-menu').hasClass('active-profile-menu') == true) {
    //         $('.profile-menu').removeClass('active-profile-menu')
    //     }

    //     if ($('.chat').hasClass('chat-active') == true) {
    //         $('.chat').removeClass('chat-active')
    //     }
    // });


    // start Chat transtion code  
    // $('#msg').click(function (e) {
    //     e.stopPropagation(); 

    //     const chat = document.querySelector('.chat');
    //     chat.classList.toggle('chat-active');

    //     if ($('.profile-menu').hasClass('active-profile-menu') == true) {
    //         $('.profile-menu').removeClass('active-profile-menu')
    //     }

    //     if ($('.notification-ul').hasClass('active-notification-ul') == true) {
    //         $('.notification-ul').removeClass('active-notification-ul')
    //     }
    // });
    

    // Start profile-menu code 
    // $('.user-icon').click(function (e) {
    //     console.log('user-icon');
    //     e.stopPropagation(); 
    //     const toggleMenu = document.querySelector('.profile-menu');
    //     toggleMenu.classList.toggle('active-profile-menu');

    //     if ($('.notification-ul').hasClass('active-notification-ul') == true) {
    //         $('.notification-ul').removeClass('active-notification-ul');
    //     }

    //     if ($('.chat').hasClass('chat-active') == true) {
    //         $('.chat').removeClass('chat-active')
    //     }
    // });


    // body click to close every drop down or chat div 
    $(document).click(function(){
        if ($('.profile-menu').hasClass('active-profile-menu') == true) {
            $('.profile-menu').removeClass('active-profile-menu')
        }

        if ($('.notification-ul').hasClass('active-notification-ul') == true) {
            $('.notification-ul').removeClass('active-notification-ul');
        }

        // if ($('.chat').hasClass('chat-active') == true) {
        //     $('.chat').removeClass('chat-active')
        // }
    });
});




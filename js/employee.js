document.getElementById('close_employees').onclick = () => {
    $('#popup_updateEmployee').css('animation', 'transition_addInfomation1 .5s ease-in-out both');
    
    $('body').css('height', 'auto');
    $('body').css('overflow', 'auto');
    setTimeout(()=> {
        $('#popup_updateEmployee').addClass('d-none');
        $('#information_employees').addClass('d-none');
    }, 500);
};

document.querySelector('.addInfo').onclick = () => {
    $('#popup_updateEmployee').css('animation', 'transition_addInfomation2 .5s ease-in-out both');
    $('body').css('height', '100vh');
    $('body').css('overflow', 'hidden');
    $('#information_employees').removeClass('d-none');
    $('#popup_updateEmployee').removeClass('d-none');
};
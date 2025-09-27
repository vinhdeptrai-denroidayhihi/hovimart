const labelClick = $('.label-images');
labelClick.each((index, value) => {
    $(value).click(() => {
        const inputChange = $('.input-images');
        inputChange.each((i, val) => {
            if (i == index) {
                $(val).off('change').on('change', function () {
                    console.log(val);
                    const file = this.files[0];
                    console.log(file);
                    if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        const parent = $(value).closest('.parent-img');
                        if (file.type.startsWith("image/")) {
                            parent.find('.img_popup').prop('src', imageUrl).show();
                            parent.find('.pdf_popup').hide();
                        }
                        // Nếu là PDF
                        else if (file.type === "application/pdf") {
                            parent.find('.pdf_popup').prop('src', imageUrl).show();
                            parent.find('.img_popup').hide();
                        }

                    }
                });
            }
        });
    });
});

if (!$('#close').length) {

} else {
    document.getElementById('close').onclick = () => {
        $('#popup').css('animation', 'transition_addInfomation1 .5s ease-in-out both');
        $('body').css('height', 'auto');
        $('body').css('overflow', 'auto');
        setTimeout(() => {
            $('#popup').addClass('d-none');
            $('#cover').addClass('d-none');
        }, 500);
    };
}


if (!$('.addInfo').length) {

} else {
    document.querySelector('.addInfo').onclick = () => {
        $('#popup').css('animation', 'transition_addInfomation2 .5s ease-in-out both');
        $('body').css('height', '100vh');
        $('body').css('overflow', 'hidden');
        $('#cover').removeClass('d-none');
        $('#popup').removeClass('d-none');
    };
}



$('.idData').each((index, value) => {
    $(value).click(() => {
        $('#sectionInfo').removeClass('d-none');
        $('#sectionInfo').removeClass('animationInfoDetailCustomer_1');
        $('#sectionInfo').addClass('animationInfoDetailCustomer');
        $('.listInfo').addClass('d-none');
        $('.listInfo').removeClass('d-block');
        $('#sectionInfo').addClass('d-block');
    });
});

$('#back').click(() => {
    $('#sectionInfo').removeClass('d-block');
    $('#sectionInfo').removeClass('animationInfoDetailCustomer');
    $('#sectionInfo').addClass('animationInfoDetailCustomer_1');
    $('.listInfo').removeClass('d-none');
    $('.listInfo').addClass('d-block');
    setTimeout(() => {
        $('#sectionInfo').addClass('d-none');
    }, 100);
});


$('.parents-btn_select').find('div').each((index, value) => {
    if (index === 0) {
        $('.border_line').css('width', '70px');
        $('.border_line').css('left', value.offsetLeft);
        $(value).css('top', '-2px');
        $(value).css('text-shadow', '-1px 1px 1px #f7a554ff');
    }
    $(value).click(() => {
        $('.border_line').css('width', value.offsetWidth);
        $('.border_line').css('left', value.offsetLeft);
        $('.parents-btn_select').find('div').each((index, value) => { $(value).css('text-shadow', ''); $(value).css('top', '0px'); });
        $(value).css('top', '-2px');
        $(value).css('text-shadow', '-1px 1px 1px #f7a554ff');
        if (index == 0) {
            $('#form_product').removeClass('d-block');
            $('#form_product').addClass('animationInfoDetailCustomer_1');
            $('#form_product').removeClass('animationInfoDetailCustomer');
            setTimeout(() => {
                $('#form_product').addClass('d-none');
            }, 100);
        } else {
            $('#form_product').addClass('d-block');
            $('#form_product').removeClass('d-none');
            $('#form_product').addClass('animationInfoDetailCustomer');
            $('#form_product').removeClass('animationInfoDetailCustomer_1');
        }
    });
});

// form thêm sản phẩm

// thêm ảnh sản phẩm
var index = 0;
$('.add-img').each((i, val) => {
    $(val).click(() => {
        if (i === 0) {
            const parent = '#add-img__product';
            const addClick = ' #add-img';
            const length = 9;
            if ($('.img_popup').length) {
                $('.img_popup').each((i, val) => {
                    if ($(val).attr('src') == "") {
                        $(val).closest('.parent-img').remove();
                    }
                });
            }
            console.log($(parent + ' .add-img'));
            $(parent + ' .add-img').before(textImage());
            $('#product_' + index).click();
            renderImage(parent, addClick, length);
            deleteImage(parent, addClick);

        }
        if (i === 1) {
            const parent = '#add-avatar__product';
            const addClick = ' #add-avatar';
            const length = 1;
            if ($('.img_popup').length) {
                $('.img_popup').each((i, val) => {
                    if ($(val).attr('src') == "") {
                        $(val).closest('.parent-img').remove();
                    }
                });
            }
            $(parent + ' .add-img').before(textImage());
            $('#product_' + index).click();
            renderImage(parent, addClick, length);
            deleteImage(parent, addClick);
        }
        if (i === 2) {
            const parent = '#add-video__product';
            const addClick = ' #add-video';
            const length = 1;
            if ($('.img_popup').length) {
                $('.img_popup').each((i, val) => {
                    if ($(val).attr('src') == "") {
                        $(val).closest('.parent-img').remove();
                    }
                });
            }
            $(parent + ' .add-img').before(textVideo());
            $('#product_' + index).click();
            renderImage(parent, addClick, length);
            deleteImage(parent, addClick);
        }
    });
})

function textImage() {
    return `
        <div class="p-2 d-none parent-img">
            <div class="position-relative " style="width: 90px; height: 90px;">
                <div class="position-absolute bg-danger d-flex align-items-center rounded-circle deleteImg"
                    style="top: -5px; right: -5px; width: 16px; height: 16px; cursor: pointer; z-index: 999; ">
                        <ion-icon name="close-circle-outline" class="text-white"></ion-icon>
                </div>
                <div class="border border-1 border-dark border-opacity-10 mx-auto d-flex align-items-center overflow-hidden backgroudInput position-relative"
                    style="width: 90px; height: 90px;">
                        <img src="" alt="" class="img-fluid img_popup position-absolute top-0 end-0 bottom-0 start-0 w-100 h-100"
                            style="object-fit: contain !important;">
                        <input type="file" class="d-none input-images " id="product_${index}"
                            name="productImg[]" accept=".jpg,.jpeg,.png">
                </div>
            </div>
        </div>
        `
}

function textAvatar() {
    return `
        <div class="p-2 d-none parent-img">
            <div class="position-relative " style="width: 90px; height: 90px;">
                <div class="position-absolute bg-danger d-flex align-items-center rounded-circle deleteImg"
                    style="top: -5px; right: -5px; width: 16px; height: 16px; cursor: pointer; z-index: 999; ">
                        <ion-icon name="close-circle-outline" class="text-white"></ion-icon>
                </div>
                <div class="border border-1 border-dark border-opacity-10 mx-auto d-flex align-items-center overflow-hidden backgroudInput position-relative"
                    style="width: 90px; height: 90px;">
                        <img src="" alt="" class="img-fluid img_popup position-absolute top-0 end-0 bottom-0 start-0 w-100 h-100"
                            style="object-fit: contain !important;">
                        <input type="file" class="d-none input-images " id="product_${index}"
                            name="avatar" accept=".jpg,.jpeg,.png">
                </div>
            </div>
        </div>
        `
}

function textVideo() {
    return `
        <div class="p-2 d-none parent-img">
            <div class="position-relative " style="width: 90px; height: 90px;">
                <div class="position-absolute bg-danger d-flex align-items-center rounded-circle deleteImg"
                    style="top: -5px; right: -5px; width: 16px; height: 16px; cursor: pointer; z-index: 999; ">
                        <ion-icon name="close-circle-outline" class="text-white"></ion-icon>
                </div>
                <div class="border border-1 border-dark border-opacity-10 mx-auto d-flex align-items-center overflow-hidden backgroudInput position-relative"
                    style="width: 90px; height: 90px;">
                        <video class="video_popup" width="90" height="90" controls style="object-fit: contain;"></video>

                        <input type="file" class="d-none input-images " id="product_${index}"
                            name="video" accept="video/mp4">
                </div>
            </div>
        </div>
        `
}

function renderImage(parent, addClick, length) {
    const inputChange = $('#product_' + index);
    inputChange.off('change').on('change', function () {
        const file = this.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            $('#product_' + index).parent().find('.img_popup').prop('src', imageUrl);
            if (parent === '#add-video__product') {
                $('#product_' + index).parent().find('.video_popup')
                    .attr('src', imageUrl)
                    .trigger("load");
            }
            $('.parent-img').removeClass('d-none')
            if ($(parent + ' .parent-img').length == length) {
                $(parent + addClick).addClass('d-none');
            }
            index++;
            $(parent + ' .setIndex').html($(parent + ' .parent-img').length);
        }
    });
}

function deleteImage(parent, addClick) {
    $(parent + ' .deleteImg').each((i, value) => {
        $(value).click(() => {
            $(value).closest('.parent-img').remove()
            $(parent + addClick).removeClass('d-none');
            $(parent + ' .setIndex').html($(parent + ' .parent-img').length);
        });
    });
}


// kết thúc thêm ảnh sản phẩm



// hover option của các select

let itemLast;
$('.selectItem').each((index, value) => {
    $('.selectItem div').each((i, val) => {
        $(val).hover(
            function () {
                $(val).addClass('active');
                itemLast = val;
            },
            function () {
                $('.selectItem div').each((i, val) => {
                    $(val).removeClass('active');
                });
            }
        );
    });
    $(value).hover(
        function () {
            $('.selectItem div').each((i, val) => {
                $(val).removeClass('active');
                if (itemLast == val) {
                    $(val).addClass('active');
                }
            });
        },
        function () {
            $('.selectItem div').each((i, val) => {
                $(val).removeClass('active');
                if (itemLast == val) {
                    $(val).addClass('active');
                }
            });
        }
    );
});

// kết thúc hover option của các select

// set value cho intput khi chọn các option

$('#productBrand').click(() => {
    $('#productBrand').parent().find('.selectItem').removeClass('d-none');
    setDateInput('#productBrand');
});

$('#productBrand').blur(() => {
    setTimeout(() => {
        $('#productBrand').parent().find('.selectItem').addClass('d-none');
    }, 200);
});

function setDateInput(value) {
    $(value).parent().find('.selectItem div').each((i, val) => {
        $(val).click(() => {
            $(value).val(val.dataset.value);
        });
    });
};

// set value cho intput khi chọn các option


// thêm phân loại cho sản phẩm
let indexClassify = 0;
$('#addClassifyProduct').click(() => {
    if (indexClassify < 2) {
        $('#formPrice').addClass('d-none');
        $('#addClassify').removeClass('d-none');
        $('#addClassify').append(formClassify(indexClassify));
        $('#tableClassify').removeClass('d-none');
        if(indexClassify == 1){
            $('.classification_2').each((i, v)=> {
                $(v).removeClass('d-none');
            })
        }
        indexClassify++;
        handleDeleteClassify();//gọi hàm xóa biến thể
        autoAddInput();//gọi hàm khởi đông tạo biến thể
        handleEventAddClassify();//gọi hàm xử lý value classify
    }
});

$(document).on("click", ".closeFormClassify", function () {
    $(this).closest(".classifyParent").remove();
    indexClassify--;
    
    if (indexClassify == 0) {
        $('#addClassify').addClass('d-none');
        $('#tableClassify').addClass('d-none');
        $('#formPrice').removeClass('d-none');
    }else{
        $('#addClassify .classifyParent').find('.titleClassify').text('Phân loại 1');
        $('#addClassify .classifyParent').find('.classifyName').prop('name', 'classifyName' + 0);
        $('#addClassify .classifyParent').find('.classify').each((i, val) => {
            $(val).prop('name', 'classify' + 0 + '[]');
        });
        $('.addElement').prop('id', 'addElement' + 0);
        deleteColumn();
        $('#formClassify1').prop('id', 'formClassify' + 0);
        autoAddInput();//gọi hàm khởi đông tạo biến thể
        handleEventAddClassify();//gọi hàm xử lý value classify
    }
});


function autoAddInput() {
    const inputElement = $('.classifyParent');
    inputElement.each((i, val) => {
        $(val).find('#addElement' + i)
            .off('click')
            .on('click', () => {
                recursionInput(i);//gọi hàm tạo biến thể
            });
    });
}

function deleteColumn() {
    if($('#formClassify1').length){

    }else {
        $('.classification_2').each((i, v)=> {
            if(i == 0) {
                $(v).addClass('d-none');
                $('#addDataTable .parent' + i).children(':nth-child(2)').addClass('d-none');
                $('#addDataTable .parent' + i).children(':nth-child(2)').text('');
            }else {
                $('#addDataTable .parent' + i).each((j, val)=> {
                    $(val).children(':nth-child(2)').addClass('d-none');
                });
                $('#addDataTable .children' + i).each((j, val)=> {
                    $(val).remove();
                });
            }
        })
    }
}


var arr = [];
var checkAddInput = false;
function recursionInput(i) {
    const length = $('#addElement' + i + ' .col-lg-6').length - 1;
    $('#addElement' + i + ' .col-lg-6').each((j, value) => {
        if (j == length) {
            $(value).find('.classify')
                .off('input')
                .on('input', () => {
                    if ($(value).find('.classify').val().trim()) {
                        if (i == 0) {
                            if ($('#addDataTable .parent' + j).length) {
                                $('#addDataTable .parent' + j).children().first().text($(value).find('.classify').val().trim());
                            } else {
                                $('#addDataTable').append(tableClassify($(value).find('.classify').val().trim(), '', '', 'd-none', 'parent' + j));
                                if ($('#addElement' + 1).length) {
                                    $('#addElement' + 1 + ' .col-lg-6').each((e, value) => {
                                        if ($(value).find('.classify').val()) {
                                            if (e == 0) {
                                                console.log($('#addDataTable .parent' + j));
                                                $('#addDataTable .parent' + j).children(':nth-child(2)').text($(value).find('.classify').val().trim());
                                            } else {
                                                $('#addDataTable .parent' + j).after(tableClassify('', $(value).find('.classify').val().trim(), 'd-none', '', 'children' + j));
                                                $('#addDataTable .parent' + j).children().first().prop('rowspan', (e + 1));
                                            }
                                        }
                                    });
                                }
                                arr.push(j);
                            }
                        }
                        if (i == 1) {

                            $(value).find('.classify').each((v, values) => {
                                if ($(values).val()) {
                                    if ($('#addDataTable .children' + j).length) {
                                        $('#addDataTable .children' + j).children(':nth-child(2)').text($(values).val().trim());
                                    } else {

                                        if (j == 0) {
                                            arr.forEach((element, e) => {
                                                $('#addDataTable .parent' + e).children(':nth-child(2)').text($(values).val().trim())
                                            });
                                        } else {
                                            arr.forEach((element, e) => {
                                                $('#addDataTable .parent' + e).after(tableClassify('', $(values).val().trim(), 'd-none', '', 'children' + j));
                                                $('#addDataTable .parent' + e).children().first().prop('rowspan', (j + 1));
                                            });
                                        }
                                    }
                                }
                            })

                        }
                        if (j == $('#addElement' + i + ' .col-lg-6').length - 1) {
                            $('#addElement' + i).append(inputElementText(i));
                            // thêm nút xóa biến thể đầu tiên
                            if ($('#addElement' + i).find('.deleteClassify').length < 2) {
                                const iconDeletClassify = '<ion-icon class="ms-3 deleteClassify" style="font-size: 25px; color: rgb(182, 127, 127); cursor: pointer;" name="trash-outline"></ion-icon>';
                                $('#addElement' + i).children().first().find('.addDelete').append(iconDeletClassify);
                            }
                            handleDeleteClassify();//gọi hàm xóa biến thể
                            recursionInput(i);// hàm gọi tạo biến thể (Đệ quy)
                        }
                    }
                });
        }
    });
}

function handleDeleteClassify() {
    $('.deleteClassify').each((d, vall) => {
        $(vall)
            .off('click')
            .on('click', () => {
                const inputElement = $('.classifyParent');
                inputElement.each((i, val) => {
                    $(val).find('#addElement' + i)
                        .off('click')
                        .on('click', () => {
                            $(val).find(vall).closest('.col-lg-6').remove();
                            // $('#addDataTable .parent' + i)
                            console.log(d);
                            // xóa nút xóa biến thể
                            if ($('#addElement' + i).find('.deleteClassify').length < 2) {
                                $('#addElement' + i).children().first().find('.deleteClassify').remove();
                            }
                            autoAddInput();
                        });
                });
            });
    });
}

function formClassify(i) {
    return `
        <div class="row mx-4 mt-5 classifyParent">
            <div class="col-lg-2 col-12 titleClassify">Phân loại ${i + 1}</div>
            <div class="col-lg-10 col-12">
                <!-- thêm phân loại-->
                <div class="d-md-flex" id="formClassify${i}">
                    <div class="bg-secondary bg-opacity-10 w-100 rounded-2">
                        <div class="d-flex justify-content-between p-3 border-bottom">
                            <div class="d-flex align-items-center classifyNameParent">
                                <h6 class="me-2 mb-0">Tên phân loại</h6>
                                <div class="d-flex align-items-center">
                                    <input type="text" name="classifyName${i}" class="classifyName inputBorder rounded-1 px-1">
                                    <ion-icon id="" class="ms-2 successClassify" style="font-size: 25px; color: #EB8D2C; cursor: pointer;" name="checkbox-outline"></ion-icon>
                                </div>
                                <div class="textClassify d-flex align-items-center d-none">
                                    : <p class="mb-0 mx-2"></p>
                                    <i class="fa-solid fa-pen"></i>
                                </div>
                            </div>
                            <div class="">
                                <ion-icon class="closeFormClassify" name="close-outline" style="font-size: 30px; cursor: pointer;"></ion-icon>
                            </div>
                        </div>
                        <div class="p-3">
                            <h6 class="me-2 mb-0">Tên biến thể</h6>
                            <div class="row addElement" id="addElement${i}">
                                <div class="col-lg-6">
                                    <div class="p-3 d-flex align-items-center addDelete">
                                        <div class="position-relative w-100">
                                            <div class="border-start position-absolute top-50 end-0 translate-middle-y ps-1 me-1"
                                                style="font-size: 15px;"><span class="productNameChar">0</span>/60
                                            </div>
                                            <input type="text" name="classify${i}[]" class="classify inputBorder rounded-1 w-100 ps-1" style="height: 35px; padding-right: 40px">    
                                        </div>
                                        <!--<ion-icon class="ms-3 deleteClassify" style="font-size: 25px; color: rgb(182, 127, 127); cursor: pointer;" name="trash-outline"></ion-icon>-->
                                    </div>
                                </div>               
                            </div>
                        </div>
                    </div>
                </div>
                <!-- kết thúc thêm phân loại-->
            </div>
        </div>

    `;
}
function inputElementText(i) {
    return `
        <div class="col-lg-6">
            <div class="p-3 d-flex align-items-center addDelete">
                <div class="position-relative w-100">
                    <div class="border-start position-absolute top-50 end-0 translate-middle-y ps-1 me-1"
                        style="font-size: 15px;"><span class="productNameChar">0</span>/60
                    </div>
                    <input type="text" name="classify${i}[]" class="classify inputBorder rounded-1 w-100 ps-1" style="height: 35px; padding-right: 40px">    
                </div>
                <ion-icon class="ms-3 deleteClassify" style="font-size: 25px; color: rgb(182, 127, 127); cursor: pointer;" name="trash-outline"></ion-icon>
            </div>
        </div>
    `;
}


// Thêm phân loại


function handleEventAddClassify() {
    $('.successClassify').each((i, classifyName) => {
        $(classifyName)
            .off('click')
            .on('click', () => {
                if (i == 0) {
                    const parent = $(classifyName).closest('.classifyNameParent');
                    parent.find('.classifyName').parent().addClass('d-none');
                    parent.find('.textClassify p').text(parent.find('.classifyName').val());
                    parent.find('.textClassify').removeClass('d-none');
                    $('.classify_1').text(parent.find('.classifyName').val());
                } else {
                    const parent = $(classifyName).closest('.classifyNameParent');
                    parent.find('.classifyName').parent().addClass('d-none');
                    parent.find('.textClassify p').text(parent.find('.classifyName').val());
                    parent.find('.textClassify').removeClass('d-none');
                    $('.classify_2').text(parent.find('.classifyName').val());
                }
            });
    });
}


function tableClassify(value1, value2, hidden1, hidden2, location) {
    return `
    
        <tr class="${location}">
            <td rowspan="" class="text-wrap text-break ${hidden1}" style="max-width: 200px">${value1}</td>
            <td class="classification_2 ${hidden2 == '' ? hidden2 : 'd-none'}">${value2}</td>
            <td>
                <input type="text" name="sellingPrice"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57" readonly
                    maxlength="20" value="0" class="px-1 rounded-2 bg-white border-1 border-secondary opacity-50" style="height: 35px; min-width: 150px; outline: none;">
            </td>
            <td>
                <input type="text" name="profit"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="20" class="px-1 rounded-2 inputBorder" style="height: 35px; min-width: 150px;">
            </td>
            <td>
                <input type="text" name="importPrice"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="20" class="px-1 rounded-2 inputBorder" style="height: 35px; min-width: 150px;">
            </td>
            <td>
                <input type="text" name="warehouse"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="20" class="px-1 rounded-2 inputBorder" style="height: 35px; min-width: 150px;">
            </td>
            <td>
                <input type="text" name="weight"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="20" class="transpotClassify px-1 rounded-2 inputBorder" style="height: 35px; min-width: 150px;">
            </td>
            <td>
                <input type="text" name="length"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="20" class="transpotClassify px-1 rounded-2 inputBorder" style="height: 35px; min-width: 150px;">
            </td>
            <td>
                <input type="text" name="width"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="20" class="transpotClassify px-1 rounded-2 inputBorder" style="height: 35px; min-width: 150px;">
            </td>
            <td>
                <input type="text" name="height"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="20" class="transpotClassify px-1 rounded-2 inputBorder" style="height: 35px; min-width: 150px;">
            </td>
        </tr> 
    
    `;
}

//kết thúc thêm phân loại



// kết thúc thêm phân loại cho sản phẩm
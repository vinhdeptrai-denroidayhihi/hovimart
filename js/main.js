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
    back();
});

$('.cancelAddProduct').click(()=> {
    back();
});

function back() {
    $('#sectionInfo').removeClass('d-block');
    $('#sectionInfo').removeClass('animationInfoDetailCustomer');
    $('#sectionInfo').addClass('animationInfoDetailCustomer_1');
    $('.listInfo').removeClass('d-none');
    $('.listInfo').addClass('d-block');
    setTimeout(() => {
        $('#sectionInfo').addClass('d-none');
    }, 100);
}

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

// kết thúc set value cho intput khi chọn các option


// thêm phân loại cho sản phẩm
let indexClassify = 0;
$('#addClassifyProduct').click(() => {
    if (indexClassify < 2) {
        $('#formPrice').addClass('d-none');
        $('#addClassify').removeClass('d-none');
        $('#addClassify').append(formClassify(indexClassify));
        $('#tableClassify').removeClass('d-none');
        $('#addBtnTogger').append(btnTogger());
        if (indexClassify == 1) {
            $('.classification_2').each((i, v) => {
                $(v).removeClass('d-none');
            })
        }else {
            $('#formPrice').empty();
            btnToggerTransportClick();
        }
        indexClassify++;
        handleDeleteClassify();//gọi hàm xóa biến thể
        autoAddInput();//gọi hàm khởi đông tạo biến thể
        handleEventAddClassify();//gọi hàm xử lý value classify
        setValueInputTable();
        formSetValueAll();
    }
});

$(document).on("click", ".closeFormClassify", function () {
    $(this).closest(".classifyParent").remove();
    indexClassify--;

    if (indexClassify == 0) {
        $('#addClassify').addClass('d-none');
        $('#tableClassify').addClass('d-none');
        $('#formPrice').removeClass('d-none');
        $('#formPrice').html(formPrice());
        $('.classify_1').text('Phân loại 1');
        $('#addBtnTogger').children(':nth-child(2)').remove();
        addDataTable.empty();
        arrForm1 = [];
    } else {
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

var addDataTable = $('#addDataTable');

//xóa cột phân loại
function deleteColumn() {
    if ($('#formClassify1').length) {
        $('.classification_1').each((i, v) => {
            if ($('#formClassify1').find('.classifyName').val().trim()) {
                $('.classify_1').text($('#formClassify1').find('.classifyName').val());
                $('.classification_2').text('Phân loại 2');
            } else {
                $('.classify_1').text('Phân loại 1');
            }
            if (i == 0) {
                $($('.classification_2')[i]).addClass('d-none');
                $('#addDataTable .parent' + i).children(':nth-child(2)').addClass('d-none');
                $('#addDataTable .parent' + i).children(':nth-child(2)').text('');
            } else {
                $('#addDataTable .parent' + i).each((j, val) => {
                    $(val).children(':nth-child(2)').addClass('d-none');
                });
                $('#addDataTable .children' + i).each((j, val) => {
                    $(val).remove();
                });
            }
        });
        arrForm1 = [];
        $('#formClassify1').find('.classify').each((q, value) => {
            if ($(value).val().trim()) {
                if (q == 0) {
                    addDataTable.empty();
                    addDataTable.append(tableClassify($(value).val(), '', '', 'd-none', 'parent' + q));
                    arrForm1.push(q);
                } else {
                    $('.parent' + (q - 1)).after(tableClassify($(value).val(), '', '', 'd-none', 'parent' + q));
                    arrForm1.push(q);
                }
            } else {


            }
        });
    } else {
        $('.classification_2').each((i, v) => {
            $('.classify_2').text('Phân loại 2');
            if (i == 0) {
                $(v).addClass('d-none');
                $('#addDataTable .parent' + i).children(':nth-child(2)').addClass('d-none');
                $('#addDataTable .parent' + i).children(':nth-child(2)').text('');
            } else {
                $('#addDataTable .parent' + i).each((j, val) => {
                    $(val).children(':nth-child(2)').addClass('d-none');
                });
                $('#addDataTable .children' + i).each((j, val) => {
                    $(val).remove();
                });
            }
        })
    }
}
// kết thúc xóa cột phân loại

// tự động tăng input
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


var arrForm1 = [];
var arrForm2 = [];
var checkAddInput = false;
var indexInput = 0;
function recursionInput(r) {
    indexInput = r;
    var length = $('#addElement' + r + ' .col-lg-6').length - 1;
    $('#addElement' + r + ' .col-lg-6').each((j, value) => {
        // if (j == length) {
        $(value).find('.classify')
            .off('input')
            .on('input', () => {
                var i = indexInput;
                if ($(value).find('.classify').val().trim()) {
                    if (i == 0) {
                        if ($('#addDataTable .parent' + j).length) {
                            $('#addDataTable .parent' + j).children().first().text($(value).find('.classify').val().trim());
                        } else {
                            if ($('#formClassify1').length) {
                                $('#addDataTable').append(tableClassify($(value).find('.classify').val().trim(), '', '', '', 'parent' + j));
                            } else {
                                $('#addDataTable').append(tableClassify($(value).find('.classify').val().trim(), '', '', 'd', 'parent' + j));
                            }
                            if ($('#addElement' + 1).length) {
                                $('#addElement' + 1 + ' .col-lg-6').each((e, value) => {
                                    if ($(value).find('.classify').val()) {
                                        if (e == 0) {
                                            $('#addDataTable .parent' + j).children(':nth-child(2)').text($(value).find('.classify').val().trim());
                                        } else {
                                            console.log();
                                            $('#addDataTable .parent' + j).after(tableClassify('', $(value).find('.classify').val().trim(), 'd-none', '', 'children' + e));
                                            $('#addDataTable .parent' + j).children().first().prop('rowspan', (e + 1));
                                        }
                                    }
                                });
                            }
                            arrForm1.push(j);
                        }
                    }
                    if (i == 1) {
                        setValueTable(j, value);
                        arrForm2.push(j);
                    }
                    if (j == $('#addElement' + i + ' .col-lg-6').length - 1) {
                        $('#addElement' + i).append(inputElementText(i));
                        // thêm nút xóa biến thể đầu tiên
                        if ($('#addElement' + i).find('.deleteClassify').length < 2) {
                            const iconDeletClassify = '<ion-icon class="ms-3 deleteClassify" style="font-size: 25px; color: rgb(182, 127, 127); cursor: pointer;" name="trash-outline"></ion-icon>';
                            $('#addElement' + i).children().first().find('.addDelete').append(iconDeletClassify);
                        }
                        handleDeleteClassify();//gọi hàm xóa biến thể
                        autoAddInput();// hàm gọi tạo biến thể 
                    }
                    transport();
                    renderInputTransport();
                    loopSetValueInput();
                }
            });
        // }
    });
}

// kết thúc tự động tăng input

function setValueTable(j, value) {
    $(value).find('.classify').each((v, values) => {
        if ($(values).val()) {
            if ($('#addDataTable .children' + j).length) {
                $('#addDataTable .children' + j).children(':nth-child(2)').text($(values).val().trim());
            } else {
                if (j == 0) {
                    arrForm1.forEach((element, e) => {
                        $('#addDataTable .parent' + e).children(':nth-child(2)').text($(values).val().trim())
                    });
                } else {
                    arrForm1.forEach((element, e) => {
                        $('#addDataTable .parent' + e).after(tableClassify('', $(values).val().trim(), 'd-none', '', 'children' + j));
                        $('#addDataTable .parent' + e).children().first().prop('rowspan', (j + 1));
                    });
                }
            }
        }
    })
}

// xóa input

function handleDeleteClassify() {
    $('#addElement0').find('.deleteClassify').each((d, vall) => {
        $(vall)
            .off('click')
            .on('click', () => {
                $(vall).closest('.col-lg-6').remove();
                if ($('#addDataTable .parent' + d).length) {
                    if (index !== -1) {
                        arrForm1.splice(arrForm1.indexOf(d), 1); // xóa tại index
                    }
                    if ($('#addDataTable .parent' + (d + 1)).length || $('#addDataTable .parent' + (d - 1)).length) {
                        var a = $('#addDataTable .parent' + d).nextUntil($('#addDataTable .parent' + (d + 1)));
                        console.log(a);
                        a.each((e, element) => {
                            $(element).remove();
                        });
                        $('#addDataTable .parent' + d).remove();
                        let increase = -1;
                        $('#addElement0 .col-lg-6').find('.classify').each((inc, deles) => {
                            if ($('#addDataTable .parent' + inc)) {
                                $('#addDataTable .parent' + inc).prop('class', 'parent' + (increase + 1))
                            }
                        });
                    } else {
                        $('#addDataTable .parent' + d).nextAll().remove();
                        $('#addDataTable .parent' + d).remove();
                        $('#addElement1 .col-lg-6').each((ind, val) => {
                            if ($(val).find('.classify').val().trim()) {
                                $(val).remove();
                            }
                        });
                    }
                }
                if ($('#addElement0').find('.deleteClassify').length < 2) {
                    $('#addElement0').children().first().find('.deleteClassify').remove();
                }
                autoAddInput();
            });
    });


    function addElement1() {
        $('#addElement1').find('.deleteClassify').each((d, vall) => {
            $(vall)
                .off('click')
                .on('click', () => {
                    $(vall).closest('.col-lg-6').remove();
                    if (arrForm1.length >= 2) {
                        var lengthRow = $('#addElement1 .col-lg-6').find('.classify').filter(function () { return $(this).val().trim() !== ""; }).length;
                        addDataTable.find('.classification_1').each((n, element) => {
                            if (lengthRow == 1 || lengthRow == 0) {
                                $(element).prop('rowspan', 1);
                            } else {
                                $(element).prop('rowspan', (lengthRow));
                            }
                        });
                        if (d != 0) {
                            addDataTable.find('.children' + d).each((c, child) => {
                                $(child).remove();
                            });
                            const lengthClassify1 = arrForm1.length;
                            for (var i = 0; i < lengthClassify1; i++) {
                                var a = $('#addDataTable .parent' + i).nextUntil($('#addDataTable .parent' + (i + 1)));
                            }
                        } else {
                            addDataTable.find('.children1').each((c, child) => {
                                $('#addDataTable .parent' + c).children(':nth-child(2)').text($(child).children(':nth-child(2)').text());
                                $(child).remove();
                            });
                            let children = 1;
                            let lengthInput = $('#addElement1 .col-lg-6').length;
                            for (let i = 2; i <= lengthInput; i++) {
                                $('.children' + i).each((n, val) => {
                                    $(val).prop('class', ('children' + children));
                                });
                                children++;
                            }
                        }
                    }

                    $('#addElement1 .col-lg-6').find('.classify').each((de, dele) => {
                        if ($('#addDataTable .parent' + (de + 1)).length || $('#addDataTable .parent' + (de - 1)).length) {

                        } else {
                            if ($('#addDataTable .parent' + de).nextAll().length) {
                                $('#addDataTable .parent' + de).nextAll().each((c, children) => {
                                    $(children).remove();
                                });
                                callBaclValue();
                                function callBaclValue() {
                                    $('#addElement1 .col-lg-6').find('.classify').each((ins, deles) => {
                                        if (ins > 0) {
                                            if ($(deles).val().trim()) {
                                                $('#addDataTable .parent' + de).after(tableClassify('', $(deles).val().trim(), 'd-none', '', 'children' + ins));
                                            }
                                        } else {
                                            if (!$(deles).val().trim()) {
                                                !$(deles).closest('.col-lg-6').remove();
                                                autoAddInput();
                                                callBaclValue();
                                                return false;
                                            } else {
                                                $('#addDataTable .parent' + de).children(':nth-child(2)').text($(deles).val().trim());
                                            }
                                        }
                                    });
                                }
                            } else {
                                if (de == 0) {
                                    $('#addDataTable .parent' + de).children(':nth-child(2)').text($(dele).val().trim())
                                }
                            }
                        }
                    });
                    if ($('#addElement1').find('.deleteClassify').length < 2) {
                        $('#addElement1').children().first().find('.deleteClassify').remove();
                    }
                    autoAddInput();
                    addElement1();
                });
        });
    }

    addElement1();

}

// kết thúc xóa input


function formClassify(i) {
    return `
        <div class="row mx-4 mt-5 classifyParent">
            <div class="col-lg-2 col-12 titleClassify">Phân loại ${i + 1}</div>
            <div class="col-lg-10 col-12 px-0 px-md-auto">
                <!-- thêm phân loại-->
                <div class="d-md-flex" id="formClassify${i}">
                    <div class="bg-secondary bg-opacity-10 w-100 rounded-2">
                        <div class="d-flex justify-content-between p-3 border-bottom">
                            <div class="d-flex flex-wrap align-items-center classifyNameParent">
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
                                    <div class="p-md-3 pt-2 d-flex align-items-center addDelete">
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
            <div class="p-md-3 pt-2 d-flex align-items-center addDelete">
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


// Thêm form phân loại

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

// kết thúc Thêm form phân loại

function tableClassify(value1, value2, hidden1, hidden2, location) {
    return `
    
        <tr class="${location}">
            <td rowspan="" class="text-wrap text-break ${hidden1} classification_1" style="max-width: 200px">${value1}</td>
            <td class="classification_2 ${hidden2 == '' ? hidden2 : 'd-none'}">${value2}</td>
            <td>
                <input type="text" name="sellingPrice"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57" readonly
                    maxlength="20" value="0" class="px-1 rounded-2 bg-white border-1 border-secondary opacity-50" style="height: 35px; min-width: 150px; outline: none;">
            </td>
            <td>
                <input type="text" name="profit"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="20" class="px-1 rounded-2 inputBorder profit" style="height: 35px; min-width: 150px;">
            </td>
            <td>
                <input type="text" name="importPrice"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="20" class="px-1 rounded-2 inputBorder importPrice" style="height: 35px; min-width: 150px;">
            </td>
            <td>
                <input type="text" name="warehouse"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="20" class="px-1 rounded-2 inputBorder" style="height: 35px; min-width: 150px;">
            </td>
            <td class="transport">
                <input type="text" name="weight"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="20" class="transpotClassify px-1 rounded-2 inputBorder" style="height: 35px; min-width: 150px;">
            </td>
            <td class="transport">
                <input type="text" name="length"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="20" class="transpotClassify px-1 rounded-2 inputBorder" style="height: 35px; min-width: 150px;">
            </td>
            <td class="transport">
                <input type="text" name="width"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="20" class="transpotClassify px-1 rounded-2 inputBorder" style="height: 35px; min-width: 150px;">
            </td>
            <td class="transport">
                <input type="text" name="height"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    maxlength="20" class="transpotClassify px-1 rounded-2 inputBorder" style="height: 35px; min-width: 150px;">
            </td>
        </tr> 
    
    `;
}

//kết thúc thêm phân loại



// set value cho từng biến thể

function setValueInputTable() {
    $('.applyToAll')
        .off('click')
        .on('click', () => {
            loopSetValueInput();
        });
}


function loopSetValueInput() {
    $('#addDataTable').find('tr').each((i, input) => {
        $(input).find('input').each((j, value) => {
            if (j != 0) {
                if (j == 2) {
                    let inputPrice = $(input).find('input').eq(0);
                    let profit = $(input).find('input').eq(1);
                    calculator(inputPrice, profit, value);
                    eventChangeinput(inputPrice, profit, value);
                    $(value).val($('#inputAll').find('input').eq(j - 1).val()).trigger('valueSet');
                } else {
                    $(value).val($('#inputAll').find('input').eq(j - 1).val());
                }
            }
        });
    });
}

function calculator(inputPrice, profit, value) {
    $(value).on('valueSet', function () {
        let price = Number($(this).val().replace(/\D/g, ""));
        let profits = Number($(profit).val().replace(/\D/g, ""));
        $(inputPrice).val(profits + price);
    });
}

function eventChangeinput(inputPrice, profit, inputTarget) {
    $(inputTarget).add(profit)
        .off('input')
        .on('input', function () {
            let price = Number($(inputTarget).val().replace(/\D/g, ""));
            let profits = Number($(profit).val().replace(/\D/g, ""));
            value = new Intl.NumberFormat('vi-VN').format($(this).val().replace(/\D/g, ""));
            $(this).val(value);
            if(!price == ''){
                let total = profits + price;
                $(inputPrice).val(new Intl.NumberFormat('vi-VN').format(total));
            }else {
                $(inputPrice).val(0);
            }
        });
}

// kết thúc set value cho từng biến thể

function formSetValueAll() {
    $('#inputAll').find('input').each((i, val)=> {
        formatCurrencyInput(val);
    });
}

validateInput();


function validateInput() {
    formatCurrencyInput('#importPrice');
    formatCurrencyInput('#profit');
    formatCurrencyInput('#warehouse');
    formatCurrencyInput('#weight');
    formatCurrencyInput('#width');
    formatCurrencyInput('#height');
}


// định dạng input 
function formatCurrencyInput(input) {
    $(input).on('input', function () {
        let value = $(input).val().replace(/\D/g, ""    );
        if (value) {
            value = new Intl.NumberFormat('vi-VN').format(value);
            $(input).val(value);
        } else {
            $(input).val("");
        }
    });
}

// kết thúc định dạng input giá


// kết thúc thêm phân loại cho sản phẩm

// thêm thông tin vận chuyển

addFormTransport();

function addFormTransport() {
    $('#formPrice').html(formPrice());
    $('#formTransport').html(formTransport());
    eventChangeinput('#sellingPrice', '#profit', '#importPrice');
    validateInput();
}

let bool = false;
function btnToggerTransportClick() {
    $('#btnToggerTransportClick').on('click', function() {
        if(!bool){
            bool = true;
            $('#btnToggerTransport')        
            .animate({ left: '25px' }, 100);
            $(this).addClass('bg-success');
            $(this).removeClass('bg-danger');
            $('.transport').css('display', 'table-cell');
            transport();
            $('#formTransport').empty();
        }else {
            bool = false;
            $('#btnToggerTransport')
            .animate({ left: '0px' }, 100);        
            $(this).removeClass('bg-success');
            $(this).addClass('bg-danger');
            $('.transport').css('display', 'none');
            transport();
            $('#formTransport').html(formTransport());
        }
    });
}

function transport() {
    if(!bool){
        addDataTable.find('.transport').find('input').prop('disabled', true);
    }else {
        addDataTable.find('.transport').find('input').prop('disabled', false);
    }
}

function renderInputTransport() {
    if(bool){
        $('.transport').css('display', 'table-cell');
    }else {
        $('.transport').css('display', 'none');
    }
}

function btnTogger() {
    return `
        <div class="bg-danger rounded-pill position-relative" id="btnToggerTransportClick" style="width: 50px;height: 22px; cursor: pointer;">
            <div class="position-absolute rounded-pill bg-white transition" id="btnToggerTransport" style="width: 25px;height: 22px; "></div>
        </div>
    `;
}

function formPrice() {
    return `
        <div class="">
            <div class="row mx-4 mt-5">
                <div class="col-lg-2 col-12">Giá nhập<span class="text-danger">*</span></div>
                <div class="col-lg-10 col-12">
                    <!-- thêm giá nhập -->
                    <div class="d-md-flex" id="">
                        <div class="w-100 ps-2">
                            <div class="position-relative m-2 m-md-0">
                                <div class="position-relative setWidthInput">
                                    <div class="border-start position-absolute top-50 end-0 translate-middle-y ps-2 me-2"
                                        style="font-size: 15px;">đ
                                    </div>
                                    <input type="text" name="importPrice" id="importPrice" placeholder="0"
                                        onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                        maxlength="20" class="w-100 inputBorder rounded-2 px-2 setStytleInput">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- kết thúc thêm giá nhập-->
                </div>
            </div>
            <div class="row mx-4 mt-5">
                <div class="col-lg-2 col-12">Lợi nhận<span class="text-danger">*</span></div>
                <div class="col-lg-10 col-12">
                    <!-- thêm giá lợi nhuận -->
                    <div class="d-md-flex" id="">
                        <div class="w-100 ps-2">
                            <div class="position-relative m-2 m-md-0">
                                <div class="position-relative setWidthInput">
                                    <div class="border-start position-absolute top-50 end-0 translate-middle-y ps-2 me-2"
                                        style="font-size: 15px;">đ
                                    </div>
                                    <input type="text" name="profit" id="profit" class="w-100 inputBorder rounded-2 px-2 setStytleInput"
                                        onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                        maxlength="20" placeholder="0">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- kết thúc thêm lợi nhuận-->
                </div>
            </div>
            <div class="row mx-4 mt-5">
                <div class="col-lg-2 col-12">Giá bán<span class="text-danger">*</span></div>
                <div class="col-lg-10 col-12">
                    <!-- thêm giá bán -->
                    <div class="d-md-flex" id="">
                        <div class="w-100 ps-2">
                            <div class=" m-2 m-md-0">
                                <div class="position-relative setWidthInput">
                                    <div class="border-start position-absolute top-50 end-0 translate-middle-y ps-2 me-2"
                                        style="font-size: 15px;">đ
                                    </div>
                                    <input type="text" name="sellingPrice" id="sellingPrice" readonly
                                        class="rounded-2 px-2 border-1 border-secondary w-100 opacity-50 setStytleInput"
                                        placeholder="0"
                                        onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                        maxlength="20"
                                        style=" outline: none;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- kết thúc thêm giá bán-->
                </div>
            </div>
            <div class="row mx-4 mt-5">
                <div class="col-lg-2 col-12">Kho<span class="text-danger">*</span></div>
                <div class="col-lg-10 col-12">
                    <!-- thêm số lượng kho -->
                    <div class="d-md-flex" id="">
                        <div class="w-100 ps-2">
                            <div class="m-2 m-md-0">
                                <input type="text" name="warehouse" id="warehouse"
                                    class="inputBorder w-100 rounded-2 px-2 setStytleInput setWidthInput" placeholder="0"
                                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                    maxlength="20">
                            </div>
                        </div>
                    </div>
                    <!-- kết thúc thêm số lượng kho-->
                </div>
            </div>
        </div>
    `;
}

function formTransport() {
    return `
        <div class="">
            <div class="row mx-4 mt-4">
                <div class="col-lg-2 col-12">Cân nặng<span class="text-danger">*</span></div>
                <div class="col-lg-10 col-12">
                    <div class="d-md-flex ps-2 p" id="">
                        <div class="w-100">
                            <div class="position-relative m-2 m-md-0 setWidthInput">
                                <div class="border-start position-absolute top-50 end-0 translate-middle-y ps-2 me-2"
                                    style="font-size: 15px;">g
                                </div>
                                <input type="text" name="weight" id="weight"
                                    class="transpotClassify w-100 px-1 rounded-2 inputBorder"
                                    style="height: 35px;" placeholder="Cân nặng (gram)">
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5 mx-4 p-0">
                <div class="col-lg-2 col-12">Kích thước</div>
                <div class="col-lg-10 col-12">
                    <!-- thêm thông tin vận chuyển -->
                    <div class="ps-2 w-100 d-flex flex-wrap">
                        <div class="size">
                            <div class="d-md-flex pb-2" id="">
                                <div class="position-relative m-2 m-md-0 setWidthInputShip">
                                    <div class="border-start position-absolute top-50 end-0 translate-middle-y ps-2 me-2"
                                        style="font-size: 15px;">cm
                                    </div>
                                    <input type="text" name="length" id="length"
                                        class="transpotClassify w-100 px-1 rounded-2 inputBorder"
                                        style="height: 35px;" placeholder="Chiều dài (cm)">
                                </div>
                            </div>
                        </div>
                        <div class="pb-2 pt-md-0 px-md-2 px-2 d-flex align-items-center core">
                            <div class="w-100 fs-4 d-flex justify-content-center align-items-center" id="">
                                x
                            </div>
                        </div>
                        <div class="size">
                            <div class="d-md-flex pb-2" id="">
                                <div class="position-relative m-2 m-md-0 setWidthInputShip">
                                    <div class="border-start position-absolute top-50 end-0 translate-middle-y ps-2 me-2"
                                        style="font-size: 15px;">cm
                                    </div>
                                    <input type="text" name="width" id="width"
                                        class="transpotClassify w-100 px-1 rounded-2 inputBorder"
                                        style="height: 35px;" placeholder="Chiều rộng (cm)">
                                </div>
                            </div>
                        </div>
                        <div class="pb-2 pt-md-0 px-md-2 d-flex align-items-center core">
                            <div class="w-100 fs-4 d-flex justify-content-center align-items-center" id="">
                                x
                            </div>
                        </div>
                        <div class="size">
                            <div class="d-md-flex pb-2" id="">
                                <div class="position-relative m-2 m-md-0 setWidthInputShip">
                                    <div class="border-start position-absolute top-50 end-0 translate-middle-y ps-2 me-2"
                                        style="font-size: 15px;">cm
                                    </div>
                                    <input type="text" name="height" id="height"
                                        class="transpotClassify w-100 px-1 rounded-2 inputBorder"
                                        style="height: 35px;" placeholder="Chiều cao (cm)">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- kết thúc thêm thông tin vận chuyển-->
                </div>
            </div>
        </div>
    
    `;
}


// kết thúc thêm thông tin vận chuyển
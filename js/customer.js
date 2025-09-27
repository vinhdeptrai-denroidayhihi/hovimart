// const labelClick = $('.label-images');
// labelClick.each((index, value) => {
//     $(value).click(() => {
//         const inputChange = $('.input-images');
//         inputChange.each((i, val) => {
//             if(i == index) {
//                 $(val).off('change').on('change', function () {
//                     console.log(val);
//                     const file = this.files[0];
//                     console.log(file);
//                     if (file) {
//                         const imageUrl = URL.createObjectURL(file);
//                         const parent = $(value).closest('.parent-img');
//                         if (file.type.startsWith("image/")) {
//                             parent.find('.img_popup-shippingPolicy').prop('src', imageUrl).show();
//                             parent.find('.pdf_popup-shippingPolicy').hide();
//                         }
//                         // Nếu là PDF
//                         else if (file.type === "application/pdf") {
//                             parent.find('.pdf_popup-shippingPolicy').prop('src', imageUrl).show();
//                             parent.find('.img_popup-shippingPolicy').hide();
//                         }

//                     }
//                 });
//             }
//         });
//     });
// });


$('.parents-btn_select-customer').find('div').each((index, value) => {
    if (index === 0) {
        $('.border_line').css('width', value.offsetWidth);
        $('.border_line').css('left', value.offsetLeft);
        $(value).css('top', '-2px');
        $(value).css('text-shadow', '-1px 1px 1px #f7a554ff');
    }
    $(value).click(() => {
        $('.border_line').css('width', value.offsetWidth);
        $('.border_line').css('left', value.offsetLeft);
        $('.parents-btn_select-customer').find('div').each((index, value) => { $(value).css('text-shadow', ''); $(value).css('top', '0px'); });
        $(value).css('top', '-2px');
        $(value).css('text-shadow', '-1px 1px 1px #f7a554ff');
    });
});


const handleData = {
    addData: () => {
        document.querySelector('.addInfo').onclick = () => {
            document.querySelector('#popup_createCustomer').innerHTML = handleData.form('', 'Tạo tài khoản mới', handleData.buttonAdd());
            handleData.handleOpenForm();
            handleData.handleCloseForm();
        };

        document.querySelectorAll('.idBrand').forEach(value => value.onclick = () => {
            const id = value.id.trim();
            if (id !== '') {
                handleData.handleData('/api/get/brand', '');
            } else {
                console.error('Lỗi hiển thị dữ liệu!');
            }
        });

        document.querySelectorAll('.btn_update').forEach(value => value.onclick = () => {
            const id = value.closest('tr').querySelector('.idData').id.trim();
            // const id = 'dab1';
            if (id !== '') {
                handleData.handleData(`http://localhost:3000/user/${id}`, 'Cập nhật khách hàng', handleData.buttonUpdate());
            } else {
                console.error('Lỗi hiển thị dữ liệu!');
            }
        });

    },

    handleData: (api, title, btn) => {
        if (api != '') {
            fetch(api)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Đường truyền xảy ra lỗi" + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    document.querySelector('#popup_createCustomer').innerHTML = handleData.form(data, title, btn);
                    handleData.handleOpenForm();
                    handleData.handleCloseForm();
                })
                .catch(error => {
                    console.log('Không thể lấy dữ liệu');
                })
        } else {
            return handleData.form("", title, btn);
        }
    },

    form: (data, title, btn) => {
        return `
                
                <div id="addFormData">
                    <form action="" method="post" enctype="multipart/form-data" class="p-5 pt-2" id="form_add">
                        <div class="">
                            <div class="row mb-3 mb-lg-2 d-flex align-items-center">
                                <div class="col">
                                    <div class="">
                                        <label for="customerID">Mã khách hàng:</label><br>
                                        <input type="text" name="customerID" id="customerID" value="${data ? data.id : ''}" class="border border-1 border-dark rounded-2 mb-3 px-1 w-100" disabled
                                            style="min-width: 240px; height: 35px;">
                                    </div>
                                    <div class="">
                                        <label for="customeName">Tên khách hàng:</label><br>
                                        <input type="text" name="customeName" id="customeName" value="${data ? data.fullName : ''}" class="border border-1 border-dark rounded-2 mb-3 px-1 w-100"
                                            style="min-width: 240px; height: 35px;">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="">
                                        <label for="dateOfBirth">Ngày sinh:</label><br>
                                        <input type="date" name="dateOfBirth" id="dateOfBirth" value="${data ? data.dateOfBirth : ''}" class="border border-1 border-dark rounded-2 mb-3 px-1 w-100"
                                            style="min-width: 240px; height: 35px;">
                                    </div>
                                    <div class="">
                                        <label for="customerGender">Giới tính:</label><br>
                                         <select class="border border-1 border-dark rounded-2 mb-3 px-1 w-100" name="customerGender" id="searchStatus" style="min-width: 240px; height: 35px;">
                                            <option value="">--Chọn giới tính--</option>
                                            <option value="boy" ${data?.gender === "boy" ? "selected" : ""}>Nam</option>
                                            <option value="girl" ${data?.gender === "girl" ? "selected" : ""}>Nữ</option>
                                            <option value="Orther" ${data?.gender === "Orther" ? "selected" : ""}>Khác</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-3 mb-lg-2 d-flex align-items-center">
                                <div class="col">
                                    <div class="">
                                        <label for="customerPhoneNumber">Số điện thoại:</label><br>
                                        <input type="text" name="customerPhoneNumber" id="customerPhoneNumber" value="${data ? data.phone : ''}" class="border border-1 border-dark rounded-2 mb-3 px-1 w-100" s
                                            style="min-width: 240px; height: 35px;">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="">
                                        <label for="customerEmail">Email:</label><br>
                                        <input type="text" name="customerEmail" id="customerEmail" value="${data ? data.email : ''}" class="border border-1 border-dark rounded-2 mb-3 px-1 w-100"
                                            style="min-width: 240px; height: 35px;">
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3 mb-lg-2 d-flex align-items-center">
                                <div class="col">
                                    <div class="">
                                        <label for="provinceCityCustomer">Tỉnh/Thành phố:</label><br>
                                         <select class="border border-1 border-dark rounded-2 mb-3 px-1 w-100" name="provinceCityCustomer" id="provinceCityCustomer" style="min-width: 240px; height: 35px;">
                                            <option value="">--Chọn giới tính--</option>
                                            <option value="Thanh Hóa" ${data?.city === "Thanh Hóa" ? "selected" : ""}>Thanh Hóa</option>
                                        </select>
                                    </div>
                                    <div class="">
                                        <label for="communeWardTownCustomer">Xã/Phường/Thị trấn:</label><br>
                                         <select class="border border-1 border-dark rounded-2 mb-3 px-1 w-100" name="communeWardTownCustomer" value="${data ? data.ward : ''}" id="communeWardTownCustomer" style="min-width: 240px; height: 35px;">
                                            <option value="">--Chọn trạng thái--</option>
                                            <option value="Thiệu Hóa">Thiệu Hóa</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="">
                                        <label for="specificAddressCustomer">Địa chỉ cụ thể:</label><br>
                                        <input type="text" name="specificAddressCustomer" id="specificAddressCustomer" value="${data ? data.specific : ''}" class="border border-1 border-dark rounded-2 mb-3 px-1 w-100"
                                            style="min-width: 240px; height: 35px;">
                                    </div>
                                    <div class="">
                                        <label for="customerRole">Vai trò:</label><br>
                                         <select class="border border-1 border-dark rounded-2 mb-3 px-1 w-100" name="customerRole" id="customerRole" style="min-width: 240px; height: 35px;">
                                            <option value="">--Chọn vai trò--</option>
                                            <option value="Khách hàng" ${data?.role === "Khách hàng" ? "selected" : ""}>Khách hàng</option>
                                        </select>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="row mb-3 mb-lg-2 d-flex align-items-center">
                                <div class="col col-12 col-md-6">
                                    <div class="">
                                        <label for="customerStatus">Trạng thái:</label><br>
                                         <select class="border border-1 border-dark rounded-2 mb-3 px-1 w-100" name="customerStatus" id="customerStatus" style="min-width: 240px; height: 35px;">
                                            <option value="">--Chọn trạng thái--</option>
                                            <option value="active" ${data?.status === "active" ? "selected" : ""}>Hoạt động</option>
                                            <option value="shutDown" ${data?.status === "shutDown" ? "selected" : ""}>Ngưng hoạt động</option>
                                        </select>
                                    </div>
                                </div>
                                
                            </div>
                            
                            ${btn ? btn : ''}
                        </div>
                    </form>
                </div>
        `
    },

    buttonAdd: () => {
        return `
            <!-- Button thêm mới -->
            <div class="d-flex justify-content-center mt-5 pb-5">
                <button class="btnSetData_popup px-5 pt-1 pb-1 border border-1 rounded-3 fs-6 text-capitalize text-white"
                        style="background-color: var(--main-color); cursor: pointer;">
                    Thêm mới
                </button>
                <div class="px-5 pt-1 pb-2 rounded-3 fs-5 text-capitalize d-none"
                     style="background-color: var(--main-color);">
                    Bỏ duyệt
                </div>
            </div>
        `;
    },

    buttonUpdate: () => {
        return `
            <!-- Button update -->
            <div class="d-flex justify-content-center mt-5 pb-5">
                <button class="btnUpdateData_popup px-5 pt-1 pb-1 border border-1 rounded-3 fs-6 text-capitalize text-white"
                        style="background-color: var(--main-color); cursor: pointer;">
                    Cập nhật
                </button>
            </div>
        `;
    },

    handleOpenForm: () => {
        $('#popup_createCustomer').css('animation', 'transition_addInfomation2 .5s ease-in-out both');
        $('#information_customer').removeClass('d-none');
        $('body').css('height', '100vh');
        $('body').css('overflow', 'hidden');
        $('#information_customer').addClass('d-block');
    },
    handleCloseForm: () => {
        document.getElementById('close_createcustomer').onclick = () => {
            $('#popup_createCustomer').css('animation', 'transition_addInfomation1 .5s ease-in-out both')
            $('#information_customer').removeClass('d-block');
            $('body').css('height', 'auto');
            $('body').css('overflow', 'auto');
            setTimeout(() => {
                $('#information_customer').addClass('d-none');
                document.querySelector('#addFormData').innerHTML = '';
            }, 500)
        };
    }

}

handleData.addData();


$('#backListCustomer').click(()=> {
    $('#sectionInfoBuy').removeClass('d-block');
    $('#sectionInfoBuy').removeClass('animationInfoDetailCustomer');
    $('#sectionInfoBuy').addClass('animationInfoDetailCustomer_1');
    $('.list_employeee').removeClass('d-none');
    $('.list_employeee').addClass('d-block');
    setTimeout(()=> {
        $('#sectionInfoBuy').addClass('d-none');
    }, 100);
}); 

$('.idPerson').each((index, value)=> {
    $(value).click(()=> {
        $('#sectionInfoBuy').removeClass('d-none');
        $('#sectionInfoBuy').removeClass('animationInfoDetailCustomer_1');
        $('#sectionInfoBuy').addClass('animationInfoDetailCustomer');
        $('.list_employeee').addClass('d-none');
        $('.list_employeee').removeClass('d-block');
        $('#sectionInfoBuy').addClass('d-block');
    });
});






// start brand Manager 
document.getElementById('close_addBrand').onclick = () => {
    $('#popup_updateBrand').css('animation', 'transition_addInfomation1 .5s ease-in-out both')
    $('#information_brand').removeClass('d-block');
    $('body').css('height', 'auto');
    $('body').css('overflow', 'auto');
    setTimeout(() => {
        $('#information_brand').addClass('d-none');
        document.querySelector('#addFormData').innerHTML = '';
    }, 500)
};

const handleData = {
    addData: () => {
        console.log(document.querySelector('.addBrand'));
        document.querySelector('.addBrand').onclick = ()=> {
            document.querySelector('#addFormData').innerHTML = handleData.form('', handleData.buttonAdd());
            $('#popup_updateBrand').css('animation', 'transition_addInfomation2 .5s ease-in-out both');
            $('#information_brand').removeClass('d-none');
            $('body').css('height', '100vh');
            $('body').css('overflow', 'hidden');
            $('#information_brand').addClass('d-block');
            handleData.handleImages();
        };
        
        document.querySelectorAll('.idBrand').forEach(value => value.onclick = ()=> {
            const id = value.id.trim();
            if(id !== ''){
                handleData.handle('/api/get/brand', '');
            }else {
                console.error('Lỗi hiển thị dữ liệu!');
            }
        });

        document.querySelectorAll('.btn_update').forEach(value => value.onclick = ()=> {
            const id = value.closest('tr').querySelector('.idBrand').id.trim();
            console.log(id);
            if(id !== ''){
                handleData.handle('/api/get/brand', '');
            }else {
                console.error('Lỗi hiển thị dữ liệu!');
            }
        });
        
    },

    handle: (api, btn) => {
        if(api){
            fetch(api)
            .then(response => {
                if (!response.ok) {        
                    throw new Error("Đường truyền xảy ra lỗi" + response.status);
                }
                return response.json();
            })
            .then(data => {
                return handleData.form(data, btn);
            })
            .catch(error => {
                console.log('Không thể lấy dữ liệu');
            })
        }else {
            return handleData.form("", btn);
        }
    },

    form: (data, btn) => {
    return `
        <form action="" method="post" enctype="multipart/form-data" class="p-5 pt-2" id="form_add">
            <div class="row mb-3 mb-lg-2 d-flex align-items-center">
                
                <!-- Hình ảnh logo -->
                <div class="col-12 col-md-5 parent-img d-flex justify-content-center">
                    <div class="mb-3">
                        <div class="border border-1 border-dark border-opacity-50 mt-2 d-flex align-items-center overflow-hidden"
                             style="width: 140px; height: 150px;">
                            <img src="${data ? data.imageUrl : ''}" alt="" class="img-fluid" id="img_popup-addBrand" style="object-fit: cover;">
                            <input type="file" class="d-none input-images" id="logobrand"
                                   name="logobrand" accept="image/*">
                        </div>
                        <label for="logobrand"
                               class="label-images text-secondary d-flex justify-content-center align-items-center"
                               style="width: 140px; cursor: pointer; font-size: 14px;">
                            Logo thương hiệu
                            <ion-icon class="h5 text-dark text-opacity-50 ms-2 mb-0" name="camera-outline"></ion-icon>
                        </label>
                    </div>
                </div>

                <!-- Thông tin cơ bản -->
                <div class="col-12 col-md-7">
                    <div class="">
                        <div class="">
                            <label for="brandID">Mã thương hiệu</label><br>
                            <input type="text" name="brandID" id="brandID" value="${data ? data.idBrand : ''}"
                                   class="border border-1 border-dark rounded-2 mb-3 px-1 w-100"
                                   style="min-width: 240px; height: 35px;">
                        </div>
                        <div class="">
                            <label for="brandName">Tên thương hiệu</label><br>
                            <input type="text" name="brandName" id="brandName" value="${data ? data.nameBrand : ''}"
                                   class="border border-1 border-dark rounded-2 mb-2 px-1 w-100"
                                   style="min-width: 240px; height: 35px;">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Thông tin người thêm / ngày thêm / mô tả -->
            <div class="row d-flex justify-content-center align-items-center flex-column-reverse flex-lg-row">

                <div class="col-12 col-lg-5">
                    <div class="mb-3">
                        <label>Người thêm:</label><br>
                        <input type="text" class="w-100 border-1 border-dark rounded-2 px-1" disabled value="${data ? data.personAddBrand : ''}"
                               style="min-width: 240px; height: 35px;">
                    </div>
                    <div class="mb-3">
                        <label>Ngày thêm:</label><br>
                        <input type="datetime-local" class="w-100 border-1 border-dark rounded-2 px-1" disabled value="${data ? data.dateAddBrand : ''}"
                               style="min-width: 240px; height: 35px;">
                    </div>
                    <div class="mb-3">
                        <label>Người update:</label><br>
                        <input type="text" class="w-100 border-1 border-dark rounded-2 px-1" disabled value="${data ? data.personUpdateBrand : ''}"
                               style="min-width: 240px; height: 35px;">
                    </div>
                    <div class="mb-3">
                        <label>Ngày update:</label><br>
                        <input type="datetime-local" class="w-100 border-1 border-dark rounded-2 px-1" disabled value="${data ? data.dateUpdateBrand : ''}"
                               style="min-width: 240px; height: 35px;">
                    </div>
                </div>

                <div class="col-12 col-lg-7">
                    <div class="mb-3">
                        <label for="brandDescription">Mô tả thương hiệu</label><br>
                        <textarea name="brandDescription" id="brandDescription" class="w-100 rounded-2 p-1 noteBrand" 
                                  style="min-width: 240px; max-height: 320px;">${data ? data.noteBrand : ''}</textarea>
                    </div>
                </div>
            </div>
            ${btn ? btn : ""}
            
        </form>
        `
    },

    buttonAdd:()=> {
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

    buttonUpdate:()=> {
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

    handleImages: ()=> {
        const labelClick = $('.label-images');
        console.log(labelClick);
        labelClick.each((index, value) => {
            $(value).click(() => {
                const inputChange = $('#logobrand');
                console.log(inputChange);
                inputChange.off('change').on('change', function () {
                    const file = this.files[0];
                    if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        $(value).closest('.parent-img').find('#img_popup-addBrand').prop('src', imageUrl);
                    }
                });
            });
        });
    }

}

handleData.addData();

// end brand Manager 



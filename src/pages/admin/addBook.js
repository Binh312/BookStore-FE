/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react'
import { getMethod, postMethodPayload, deleteMethod, uploadMultipleFile, uploadSingleFile } from '../../services/request'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';


var linkbanner = '';
var description = '';
const listFile = [];

const AddBookAdmin = () => {
    const editorRef = useRef(null);
    const [product, setProduct] = useState(null);
    const [itemDanhmuc, setItemDanhMuc] = useState([]);
    const [itemTacgia, setItemTacGia] = useState([]);
    const [itemNXB, setItemNXB] = useState([]);
    const [danhMucSelected, setDanhMucSelected] = useState([]);
    const [tacGiaSelected, setTacGiaSelected] = useState([]);
    const [nxbSelected, setNxbSelected] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if (id != null) {
                var response = await getMethod('http://localhost:8080/api/book/find-book?id=' + id);
                var result = await response.json();
                setProduct(result)
                linkbanner = result.image
                description = result.description;
                var cate = [];
                for (var i = 0; i < result.bookCategories.length; i++) {
                    cate.push(result.bookCategories[i].category)
                };
                var author = [];
                for (var y = 0; y < result.bookAuthors.length; y++) {
                    author.push(result.bookAuthors[y].author)
                };
                setDanhMucSelected(cate);
                setTacGiaSelected(author);
                setNxbSelected(result.publisher);
            }
        };
        getProduct();

        const getDanhMuc = async () => {
            var response = await getMethod("/api/category/get-list-category");
            var list = await response.json();
            setItemDanhMuc(list)
        };
        getDanhMuc();
        const getTacGia = async () => {
            var response = await getMethod("/api/author/get-list-author");
            var list = await response.json();
            setItemTacGia(list)
        };
        getTacGia();
        const getNhaXB = async () => {
            var response = await getMethod("/api/publisher/get-list-publisher");
            var list = await response.json();
            setItemNXB(list)
        };
        getNhaXB();

    }, []);


    function handleEditorChange(content, editor) {
        description = content;
    }

    function openChonAnh() {
        document.getElementById("choosefile").click();
    }


    async function deleteImage(id) {
        var con = window.confirm("Bạn muốn xóa ảnh này?");
        if (con === false) {
            return;
        }
        const response = await deleteMethod('/api/book-image/delete?id=' + id)
        if (response.status < 300) {
            toast.success("xóa ảnh thành công!");
            document.getElementById("imgdathem" + id).style.display = 'none';
        }
        if (response.status === 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }


    async function saveProduct(event) {
        event.preventDefault();
        document.getElementById("loading").style.display = 'block'
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        var listLinkImg = await uploadMultipleFile(listFile);
        var ims = await uploadSingleFile(document.getElementById("imgbanner"))
        if (ims != null) {
            linkbanner = ims
        }
        const listcate = [];
        for (var i = 0; i < danhMucSelected.length; i++) {
            listcate.push(danhMucSelected[i].id)
        }
        const listauthor = [];
        for (var y = 0; y < tacGiaSelected.length; y++) {
            listauthor.push(tacGiaSelected[y].id)
        }
        var payload = {
            "id": id,
            "title": event.target.elements.title.value,
            "image": linkbanner,
            "price": event.target.elements.price.value,
            "oldPrice": event.target.elements.oldPrice.value,
            "numberPage": event.target.elements.numberPage.value,
            "size": event.target.elements.size.value,
            "publishYear": event.target.elements.publishYear.value,
            "quantity": event.target.elements.quantity.value,
            "description": description,
            "publisher": {
                "id": nxbSelected.id
            },
            "listLink": listLinkImg,
            "listCategoryId": listcate,
            "listAuthorId": listauthor,
        }
        console.log(payload);

        const response = await postMethodPayload('/api/book/create-update', payload);
        var result = await response.json();
        console.log(result)
        if (response.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Thêm sản phẩm thành công!",
                preConfirm: () => {
                    window.location.href = 'book'
                }
            });
        } else {
            toast.error("Thêm/ sửa sản phẩm thất bại");
            document.getElementById("loading").style.display = 'none'
        }
    }


    return (
        <div>
            <div class="col-sm-12 header-sps">
                <div class="title-add-admin">
                    <h4>Thêm/ cập nhật sản phẩm</h4>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-add">
                    <div class="form-add">
                        <form class="row" onSubmit={saveProduct} method='post'>
                            <div class="col-md-4 col-sm-12 col-12">
                                <label class="lb-form">Tên sản phẩm</label>
                                <input name="title" defaultValue={product?.title} class="form-control" />
                                <label class="lb-form">Số lượng</label>
                                <input name="quantity" defaultValue={product?.quantity} class="form-control" />
                                <label class="lb-form">Giá tiền hiện tại</label>
                                <input name="price" defaultValue={product?.price} class="form-control" />
                                <label class="lb-form">Giá tiền cũ</label>
                                <input name="oldPrice" defaultValue={product?.oldPrice} class="form-control" />
                                <label class="lb-form">Số trang</label>
                                <input name="numberPage" defaultValue={product?.numberPage} class="form-control" />
                                <label class="lb-form">Kích thước</label>
                                <input name="size" defaultValue={product?.size} class="form-control" />
                                <label class="lb-form">Năm xuất bản</label>
                                <input name="publishYear" defaultValue={product?.publishYear} class="form-control" />
                                <label class="lb-form">Danh mục</label>
                                <Select
                                    className="select-container"
                                    isMulti
                                    value={danhMucSelected}
                                    onChange={setDanhMucSelected}
                                    options={itemDanhmuc}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    name='danhmuc'
                                    placeholder="Chọn danh mục"
                                />
                                <label class="lb-form">Tác giả</label>
                                <Select
                                    className="select-container"
                                    isMulti
                                    value={tacGiaSelected}
                                    onChange={setTacGiaSelected}
                                    options={itemTacgia}
                                    getOptionLabel={(option) => option.fullName}
                                    getOptionValue={(option) => option.id}
                                    name='tacgia'
                                    placeholder="Chọn tác giả"
                                />
                                <label class="lb-form">Nhà xuất bản</label>
                                <Select
                                    className="select-container"
                                    options={itemNXB}
                                    value={nxbSelected}
                                    onChange={setNxbSelected}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                    name='NhaXB'
                                    placeholder="Chọn nhà xuất bản"
                                />
                                <br />
                                <div class="loading" id="loading">
                                    <div class="bar1 bar"></div>
                                </div><br />
                                <button class="btn btn-primary form-control">Thêm/ cập nhật</button>
                            </div>
                            <div class="col-md-8 col-sm-12 col-12">
                                <label class="lb-form">Ảnh nền</label>
                                <input id="imgbanner" type="file" class="form-control" />
                                <img src={product == null ? '' : product.image} id="imgpreproduct" className='imgadmin' />
                                <br /><br /><label class="lb-form">Ảnh phụ</label>
                                <input accept="image/*" onChange={() => previewImages()} id="choosefile" multiple type="file" className='hidden' />
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row" id="preview">
                                            <div class="col-md-3" id="chon-anhs">
                                                <div id="choose-image" class="choose-image" onClick={() => openChonAnh()}>
                                                    <p><i class="fas fa-camera" id="camera"></i></p>
                                                    <p id="numimage">Chọn ảnh phụ cho sản phẩm</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {
                                        product == null ? <></> : <div class="row">
                                            <div class="col-sm-12">
                                                <h4 className='lbanhdathem'>Ảnh đã thêm</h4>
                                            </div>
                                            <div id="listanhdathem" class="row">
                                                {product == null ? '' :
                                                    product.bookImages.map((item => {
                                                        return <div id={"imgdathem" + item.id} class="col-md-3 col-sm-4 col-4">
                                                            <img src={item.image} class="image-upload" />
                                                            <button type='button' onClick={() => deleteImage(item.id)} class="btn btn-danger form-control">Xóa ảnh</button>
                                                        </div>
                                                    }))}
                                            </div>
                                        </div>

                                    }
                                </div>
                                <label class="lb-form lbmotadv">Mô tả dịch vụ</label>
                                <Editor name='editor' tinymceScriptSrc={'https://cdn.tiny.cloud/1/f6s0gxhkpepxkws8jawvfwtj0l9lv0xjgq1swbv4lgcy3au3/tinymce/6/tinymce.min.js'}
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={product == null ? '' : product.description}
                                    value={product == null ? '' : product.description}
                                    onEditorChange={handleEditorChange} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


function previewImages() {
    var files = document.getElementById("choosefile").files;
    for (var i = 0; i < files.length; i++) {
        listFile.push(files[i]);
    }

    var preview = document.querySelector('#preview');

    for (i = 0; i < files.length; i++) {
        readAndPreview(files[i]);
    }

    function readAndPreview(file) {

        var reader = new FileReader(file);

        reader.addEventListener("load", function () {
            document.getElementById("chon-anhs").className = 'col-sm-3';
            document.getElementById("chon-anhs").style.height = '100px';
            document.getElementById("chon-anhs").style.marginTop = '5px';
            document.getElementById("choose-image").style.height = '120px';
            document.getElementById("numimage").innerHTML = '';
            document.getElementById("camera").style.fontSize = '20px';
            document.getElementById("camera").style.marginTop = '40px';
            document.getElementById("camera").className = 'fas fa-plus';
            document.getElementById("choose-image").style.width = '90%';

            var div = document.createElement('div');
            div.className = 'col-md-3 col-sm-6 col-6';
            div.style.height = '120px';
            div.style.paddingTop = '5px';
            div.marginTop = '100px';
            preview.appendChild(div);

            var img = document.createElement('img');
            img.src = this.result;
            img.style.height = '85px';
            img.style.width = '90%';
            img.className = 'image-upload';
            img.style.marginTop = '5px';
            div.appendChild(img);

            var button = document.createElement('button');
            button.style.height = '30px';
            button.style.width = '90%';
            button.innerHTML = 'xóa'
            button.className = 'btn btn-warning';
            div.appendChild(button);

            button.addEventListener("click", function () {
                div.remove();
                console.log(listFile.length)
                for (i = 0; i < listFile.length; i++) {
                    if (listFile[i] === file) {
                        listFile.splice(i, 1);
                    }
                }
                console.log(listFile.length)
            });
        });

        reader.readAsDataURL(file);

    }

}
export default AddBookAdmin;
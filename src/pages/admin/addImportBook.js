import { useState, useEffect } from 'react'
import { getMethod, postMethodPayload } from '../../services/request'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Select from 'react-select';



const AddImportBookAdmin = () => {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        const getProduct = async () => {
            var response = await getMethod('/api/book/find-all-list');
            var result = await response.json();
            setProduct(result)
        };
        getProduct();
    }, []);

    async function themIB(event) {
        event.preventDefault();
        var importBook = {
            content: event.target.elements.content.value,
            quantity: event.target.elements.quantity.value,
            price: event.target.elements.price.value,
            book: {
                id: event.target.elements.sach.value
            }
        }
        var response = await postMethodPayload("/api/import-book/create", importBook);
        if (response.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Thêm nhập hàng thành công!",
                preConfirm: () => {
                    window.location.href = 'importBook'
                }
            });
        }
        else {
            if (response.status === 417) {
                var mess = await response.json();
                toast.error(mess.defaultMessage);
            }
            else {
                toast.error("Thất bại");
            }
        }
    }



    return (
        <div>
            <div class="col-sm-12 header-sps">
                <div class="title-add-admin">
                    <h4>Thêm/ cập nhật nhập hàng</h4>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-add">
                    <div class="form-add">
                        <form onSubmit={themIB} class="row" method='post'>
                            <div class="col-md-4 col-sm-12 col-12">
                                <label class="lb-form">Sách</label>
                                <Select
                                    className="select-container"
                                    options={products}
                                    getOptionLabel={(option) => option.title}
                                    getOptionValue={(option) => option.id}
                                    name='sach'
                                    placeholder="Chọn sách"
                                />
                                <label class="lb-form">Số lượng</label>
                                <input name="quantity" class="form-control" />
                                <label class="lb-form">giá nhập</label>
                                <input name="price" class="form-control" />
                                <label class="lb-form">Nội dung</label>
                                <textarea name="content" class="form-control"></textarea>
                                <br />
                                <button class="btn btn-primary form-control">Thêm/ cập nhật</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default AddImportBookAdmin;
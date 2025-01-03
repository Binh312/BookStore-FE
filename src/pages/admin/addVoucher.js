import { useState, useEffect } from 'react'
import { postMethodPayload, getMethod } from '../../services/request'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';



const AddVoucherAdmin = () => {

    const [voucher, setVoucher] = useState(null);

    useEffect(() => {
        const getVoucher = async () => {
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if (id != null) {
                var response = await getMethod('http://localhost:8080/api/voucher/find-voucher?id=' + id);
                var result = await response.json();
                setVoucher(result)

            }
        };
        getVoucher();
    }, []);

    async function addVoucher(event) {
        event.preventDefault();
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        var voucher = {
            "id": id,
            "title": event.target.elements.title.value,
            "price": event.target.elements.price.value,
        }
        var response = await postMethodPayload("/api/voucher/create-update", voucher);
        if (response.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Thêm voucher thành công!",
                preConfirm: () => {
                    window.location.href = 'voucher'
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
                    <h4>Thêm/ cập nhật Voucher</h4>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-add">
                    <div class="form-add">
                        <form onSubmit={addVoucher} class="row" method='post'>
                            <div class="col-md-4 col-sm-12 col-12">
                                <label class="lb-form">Tiêu đề</label>
                                <input name="title" defaultValue={voucher?.title} class="form-control" />
                                <label class="lb-form">Giảm giá</label>
                                <input name="price" defaultValue={voucher?.price} class="form-control" />
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



export default AddVoucherAdmin;
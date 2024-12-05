import { useState, useEffect } from 'react'
import { postMethodPayload, getMethod } from '../../services/request'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';



const AddPublisherAdmin = () => {

    const [publisher, setPublisher] = useState(null);

    useEffect(() => {
        const getPublisher = async () => {
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if (id != null) {
                var response = await getMethod('http://localhost:8080/api/publisher/find-publisher?id=' + id);
                var result = await response.json();
                setPublisher(result)

            }
        };
        getPublisher();
    }, []);

    async function addPublisher(event) {
        event.preventDefault();
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        var publisher = {
            "id": id,
            "name": event.target.elements.name.value,
            "address": event.target.elements.address.value,
            "phone": event.target.elements.phone.value,
        }
        var response = await postMethodPayload("/api/publisher/create-update", publisher);
        if (response.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Thêm nhà xuất bản thành công!",
                preConfirm: () => {
                    window.location.href = 'publisher'
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
                    <h4>Thêm/ cập nhật Nhà xuất bản</h4>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-add">
                    <div class="form-add">
                        <form onSubmit={addPublisher} class="row" method='post'>
                            <div class="col-md-4 col-sm-12 col-12">
                                <label class="lb-form">Tên nhà xuất bản</label>
                                <input name="name" defaultValue={publisher?.name} class="form-control" />
                                <label class="lb-form">Địa chỉ</label>
                                <input name="address" defaultValue={publisher?.address} class="form-control" />
                                <label class="lb-form">Số điện thoại</label>
                                <input name="phone" defaultValue={publisher?.phone} class="form-control" />
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



export default AddPublisherAdmin;
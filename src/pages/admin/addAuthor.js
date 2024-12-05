import { useState, useEffect } from 'react'
import { postMethodPayload, getMethod } from '../../services/request'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';



const AddAuthorAdmin = () => {

    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const getAuthor = async () => {
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if (id != null) {
                var response = await getMethod('http://localhost:8080/api/author/find-author?id=' + id);
                var result = await response.json();
                setAuthor(result)

            }
        };
        getAuthor();
    }, []);

    async function addAuthor(event) {
        event.preventDefault();
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        var author = {
            "id": id,
            "fullName": event.target.elements.fullName.value,
        }
        var response = await postMethodPayload("/api/author/create-update", author);
        if (response.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Thêm tác giả thành công!",
                preConfirm: () => {
                    window.location.href = 'author'
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
                    <h4>Thêm/ cập nhật Tác giả</h4>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-add">
                    <div class="form-add">
                        <form onSubmit={addAuthor} class="row" method='post'>
                            <div class="col-md-4 col-sm-12 col-12">
                                <label class="lb-form">Tên tác giả</label>
                                <input name="fullName" defaultValue={author?.fullName} class="form-control" />
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



export default AddAuthorAdmin;
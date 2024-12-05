import { useState, useEffect } from 'react'
import { postMethodPayload, getMethod } from '../../services/request'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';



const AddCategoryAdmin = () => {
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const getCategory = async () => {
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if (id != null) {
                var response = await getMethod('http://localhost:8080/api/category/find-Category?id=' + id);
                var result = await response.json();
                setCategory(result)

            }
        };
        getCategory();
    }, []);



    async function addCategory(event) {
        event.preventDefault();
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        var category = {
            "id": id,
            "name": event.target.elements.name.value,
        }
        var response = await postMethodPayload("/api/category/create-update", category);
        if (response.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Thêm danh mục thành công!",
                preConfirm: () => {
                    window.location.href = 'category'
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
                    <h4>Thêm/ cập nhật Danh mục</h4>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-add">
                    <div class="form-add">
                        <form onSubmit={addCategory} class="row" method='post'>
                            <div class="col-md-4 col-sm-12 col-12">
                                <label class="lb-form">Tên danh mục</label>
                                <input name="name" defaultValue={category?.name} class="form-control" />
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



export default AddCategoryAdmin;
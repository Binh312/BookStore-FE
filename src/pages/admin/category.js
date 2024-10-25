import lich from '../../assest/images/lich.png'
import { useState, useEffect } from 'react'
import { formatMoney } from '../../services/money'
import { getMethod, postMethod, postMethodPayload, deleteMethod } from '../../services/request'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';


var url = '';
const CategoryAdmin = () => {
    const [items, setItems] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const getCategory = async () => {
            var response = await getMethod('/api/category/get-all-category?size=5&page=' + 0);
            var result = await response.json();
            console.log(result);
            setItems(result.content)
            setTotalPage(result.totalPages)
            url = '/api/category/get-all-category?size=5&page=';
        };
        getCategory();
    }, []);

    const handlePageClick = async (data) => {
        var currentPage = data.selected
        var response = await getMethod(url + currentPage)
        var result = await response.json();
        setItems(result.content)
        setTotalPage(result.totalPages)
        setCurrentPage(currentPage)
    }

    async function handleCreateClick(data) {
        var response = await postMethodPayload("/api/category/create-update", data)
        if (response.status < 300) {
            var result = await response.text();
            toast.success(result);
            reloadData();
        }
        else {
            if (response.status == 417) {
                var result = await response.json()
                toast.error(result.defaultMessage)
            }
            else {
                toast.error("Thất bại")
            }
        }
    }

    async function handleDeleteClick(id) {
        var con = window.confirm("Bạn muốn xóa danh mục này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod("/api/category/delete?id=" + id)
        if (response.status < 300) {
            var result = await response.text();
            toast.success(result);
            reloadData();
        }
        else {
            if (response.status == 417) {
                var result = await response.json()
                toast.error(result.defaultMessage)
            }
            else {
                toast.error("Thất bại")
            }
        }
    }

    const reloadData = async () => {
        var response = await getMethod(url + currentPage)
        var result = await response.json();
        setItems(result.content)
    }

    return (
        <>
            <div>
                <button data-bs-toggle="modal" data-bs-target="#addtk" class="btn btn-primary ms-2"><i className='fa fa-plus'></i></button>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách danh mục</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Tên danh mục</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item => {
                                var btn = <button onClick={() => handleCreateClick(item.data)} class="btn btn-primary"><i class="fa fa-edit"></i></button>;
                                var btn2 = <button onClick={() => handleDeleteClick(item.id)} class="btn btn-danger"><i class="fa fa-trash"></i></button>

                                return <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td class="sticky-col button-action">
                                        {btn}
                                        {btn2}
                                    </td>
                                </tr>
                            }))}
                        </tbody>
                    </table>

                    <ReactPaginate
                        marginPagesDisplayed={2}
                        pageCount={totalPage}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName='page-item'
                        previousLinkClassName='page-link'
                        nextClassName='page-item'
                        nextLinkClassName='page-link'
                        breakClassName='page-item'
                        breakLinkClassName='page-link'
                        previousLabel='Trang trước'
                        nextLabel='Trang sau'
                        activeClassName='active' />
                </div>
            </div>
        </>
    );
}
export default CategoryAdmin;
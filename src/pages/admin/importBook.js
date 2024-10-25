import lich from '../../assest/images/lich.png'
import { useState, useEffect } from 'react'
import { formatMoney } from '../../services/money'
import { getMethod, postMethod, postMethodPayload, deleteMethod } from '../../services/request'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';


var url = '';
const ImportBookAdmin = () => {
    const [items, setItems] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const getBook = async () => {
            var response = await getMethod('/api/import-book/get-all-Import-book?size=5&page=' + 0);
            var result = await response.json();
            console.log(result);
            setItems(result.content)
            setTotalPage(result.totalPages)
            url = '/api/import-book/get-all-Import-book?size=5&page=';
        };
        getBook();
    }, []);

    const handlePageClick = async (data) => {
        var currentPage = data.selected
        var response = await getMethod(url + currentPage)
        var result = await response.json();
        setItems(result.content)
        setTotalPage(result.totalPages)
        setCurrentPage(currentPage)
    }

    async function handleDeleteClick(id) {
        var con = window.confirm("Bạn muốn xóa đơn nhập sách này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod("/api/import-book/delete?id=" + id)
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
                <a href='addImportBook' class="btn btn-primary ms-2"><i className='fa fa-plus'></i></a>
            </div>

            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Quản lý sách</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Tên sách</th>
                                <th>Số lượng</th>
                                <th>Ngày tạo</th>
                                <th>Giá nhập</th>
                                <th>Nội dung</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item => {

                                return <tr>
                                    <td>{item.id}</td>
                                    <td>{item.book?.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.createdDate}</td>
                                    <td>{item.price}</td>
                                    <td>{item.content}</td>
                                    <td class="sticky-col button-action">
                                        <button onClick={() => handleDeleteClick(item.id)} class="deletebtn"><i class="fa fa-trash"></i></button>
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
export default ImportBookAdmin;
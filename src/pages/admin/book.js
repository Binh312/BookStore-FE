import { useState, useEffect } from 'react'
import { getMethod, deleteMethod } from '../../services/request'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';


var url = '';
const BookAdmin = () => {
    const [items, setItems] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const getBook = async () => {
            var response = await getMethod('/api/book/get-all-book?size=5&page=' + 0);
            var result = await response.json();
            console.log(result);
            setItems(result.content)
            setTotalPage(result.totalPages)
            url = '/api/book/get-all-book?size=5&page=';
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
        var con = window.confirm("Bạn muốn xóa sách này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod("/api/book/delete?id=" + id)
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
                <a href='addBook' class="btn btn-primary ms-2"><i className='fa fa-plus'></i></a>
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
                                <th>Ảnh sách</th>
                                <th>Mô tả</th>
                                <th>Số lượng</th>
                                <th>Đã bán</th>
                                <th>Ngày tạo</th>
                                <th>Giá bán</th>
                                <th>Giá cũ</th>
                                <th>Số trang</th>
                                <th>Kích thước</th>
                                <th>Năm xuất bản</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item => {
                                var btn = <a href={'addBook?id=' + item.id} class="btn btn-primary"><i class="fa fa-edit"></i></a>;
                                var btn2 = <button onClick={() => handleDeleteClick(item.id)} class="btn btn-danger"><i class="fa fa-trash"></i></button>


                                return <tr>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td><img class="book-image" src={item.image} /></td>
                                    <td class="short-text">{item.description}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.sold}</td>
                                    <td>{item.createdDate}</td>
                                    <td>{item.price}</td>
                                    <td>{item.oldPrice}</td>
                                    <td>{item.numberPage}</td>
                                    <td>{item.size}</td>
                                    <td>{item.publishYear}</td>
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
export default BookAdmin;
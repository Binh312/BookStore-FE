import { useState, useEffect } from 'react'
import { getMethod, deleteMethod } from '../../services/request'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';


var url = '';
const AuthorAdmin = () => {
    const [items, setItems] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const getAuthor = async () => {
            var response = await getMethod('/api/author/get-all-author?size=5&page=' + 0);
            var result = await response.json();
            console.log(result);
            setItems(result.content)
            setTotalPage(result.totalPages)
            url = '/api/author/get-all-author?size=5&page=';
        };
        getAuthor();
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
        var con = window.confirm("Bạn muốn xóa tác giả này?");
        if (con === false) {
            return;
        }
        var response = await deleteMethod("/api/author/delete?id=" + id)
        if (response.status < 300) {
            var result = await response.text();
            toast.success(result);
            reloadData();
        }
        else {
            if (response.status === 417) {
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
                <a href='addAuthor' class="btn btn-primary ms-2"><i className='fa fa-plus'></i></a>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách tác giả</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Tên tác giả</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item => {
                                var btn = <a href={`addAuthor?id=${item.id}`} class="btn btn-primary"><i class="fa fa-edit"></i></a>;
                                var btn2 = <button onClick={() => handleDeleteClick(item.id)} class="btn btn-danger"><i class="fa fa-trash"></i></button>

                                return <tr>
                                    <td>{item.id}</td>
                                    <td>{item.fullName}</td>
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
export default AuthorAdmin;
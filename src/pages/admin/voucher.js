import { useState, useEffect } from 'react'
import { getMethod, deleteMethod } from '../../services/request'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';


var url = '';
const VoucherAdmin = () => {
    const [items, setItems] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const getVoucher = async () => {
            var response = await getMethod('/api/voucher/get-all-voucher?size=5&page=' + 0);
            var result = await response.json();
            console.log(result);
            setItems(result.content)
            setTotalPage(result.totalPages)
            url = '/api/voucher/get-all-voucher?size=5&page=';
        };
        getVoucher();
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
        var con = window.confirm("Bạn muốn xóa voucher này?");
        if (con === false) {
            return;
        }
        var response = await deleteMethod("/api/voucher/delete?id=" + id)
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
                <a href='addVoucher' class="btn btn-primary ms-2"><i className='fa fa-plus'></i></a>
            </div>

            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách voucher</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Tiêu đề</th>
                                <th>Giảm giá</th>
                                <th>Ngày tạo</th>
                                <th>Ngày hết hạn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item => {
                                var btn = <a href={'addVoucher?id=' + item.id} class="btn btn-primary"><i class="fa fa-edit"></i></a>;
                                var btn2 = <button onClick={() => handleDeleteClick(item.id)} class="btn btn-danger"><i class="fa fa-trash"></i></button>


                                return <tr>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td>{item.createDate}</td>
                                    <td>{item.endDate}</td>
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
export default VoucherAdmin;
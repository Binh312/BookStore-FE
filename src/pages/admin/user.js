import lich from '../../assest/images/lich.png'
import { useState, useEffect } from 'react'
import { formatMoney } from '../../services/money'
import { getMethod, postMethod } from '../../services/request'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

var url = '';
const UserAdmin = () => {
    const [items, setItems] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const getUser = async () => {
            var response = await getMethod('/api/user/admin/get-all-user?size=5&page=' + 0);
            var result = await response.json();
            console.log(result);
            setItems(result.content)
            setTotalPage(result.totalPages)
            url = '/api/user/admin/get-all-user?size=5&page=';
        };
        getUser();
    }, []);

    const handlePageClick = async (data) => {
        var currentPage = data.selected
        var response = await getMethod(url + currentPage)
        var result = await response.json();
        setItems(result.content)
        setTotalPage(result.totalPages)
        setCurrentPage(currentPage)
    }

    const filterAccount = async () => {
        var role = document.getElementById("role").value;
        var uls = '/api/user/admin/get-all-user?size=5';
        if (role != "") {
            uls += '&role=' + role;
        }
        uls += '&page='
        url = uls;
        var response = await getMethod(uls + 0)
        var result = await response.json();
        setItems(result.content)
        setTotalPage(result.totalPages)
    }

    async function lockOrUnlock(id) {
        var response = await postMethod("/api/user/admin/lock-or-unlock?id=" + id)
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
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Tài Khoản</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div class="search-container">
                        <select onChange={filterAccount} id='role' class="form-control">
                            <option value="">Tất cả quyền</option>
                            <option value="ROLE_USER">Tài khoản người dùng</option>
                            <option value="ROLE_ADMIN">Tài khoản admin</option>
                        </select>
                    </div>
                    <button data-bs-toggle="modal" data-bs-target="#addtk" class="btn btn-primary ms-2"><i className='fa fa-plus'></i></button>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách tài khoản</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Tên đăng nhập</th>
                                <th>Họ tên</th>
                                <th>Số điện thoại</th>
                                <th>Ngày tạo</th>
                                <th>Quyền</th>
                                <th>Khóa</th>
                            </tr>
                        </thead>
                        <tbody>

                            {items.map((item => {
                                var btn = '';
                                if (item.actived == false) {
                                    var btn = <button onClick={() => lockOrUnlock(item.id)} class="btn btn-danger"><i class="fa fa-unlock"></i></button>
                                } else {
                                    var btn = <button onClick={() => lockOrUnlock(item.id)} class="btn btn-primary"><i class="fa fa-lock"></i></button>
                                }
                                return <tr>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.createdDate}</td>
                                    <td>{item.role}</td>
                                    <td class="sticky-col">
                                        {btn}
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
export default UserAdmin;
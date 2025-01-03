import { handleChangePass } from '../../services/auth'
import '../admin/layout.scss'
import lich from '../../assest/images/lich.png'
import avatar from '../../assest/images/user.svg'
import { useState, useEffect } from 'react'

function Header({ children }) {
    checkAdmin();
    const [items, setItems] = useState([]);
    useEffect(() => {
        getDateTime();

    }, []);
    function getDateTime() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();

        if (month.toString().length == 1) {
            month = '0' + month;
        }
        if (day.toString().length == 1) {
            day = '0' + day;
        }
        if (hour.toString().length == 1) {
            hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
            minute = '0' + minute;
        }
        if (second.toString().length == 1) {
            second = '0' + second;
        }
        var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' +
            minute + ':' + second;
        return dateTime;
    }
    setInterval(function () {
        var currentTime = getDateTime();
        document.getElementById("digital-clock").innerHTML = currentTime;
    }, 1000);

    return (
        <>
            <div class="navleft" id="navleft">
                <div class="divroot">
                    <h3>Quản trị</h3>
                </div>
                <div class="listmenumain">
                    <a href='/'>Trang chủ</a>
                    <a href="index">Thống kê</a>
                    <a href="user">Tài khoản</a>
                    <a href="category">Danh mục</a>
                    <a href="book">Sách</a>
                    <a href="author">Tác giả</a>
                    <a href="publisher">Nhà xuất bản</a>
                    <a href="invoice">Đơn hàng</a>
                    <a href="importBook">Nhập hàng</a>
                    <a href="voucher">Voucher</a>
                    <a href="#" onClick={() => logout()}>Đăng xuất</a>
                </div>
            </div>
            <div class="contentadminweb">
                <div class="headerweb" id="headerweb">
                    <div class="lichheader">
                        <img class="iconlich" src={lich} />
                        <p class="text-gray fst-italic mb-0">
                            <p id="digital-clock"></p>
                        </p>
                    </div>
                    <div class="userheader">
                        <a class="nav-link dropdown-toggle menucha" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="tendangnhap"></span>
                            <img src={avatar} class="userlogo" />
                        </a>
                        <ul class="dropdown-menu listitemtk" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="../profileUser"> Tài khoản</a></li>
                            <li><a class="dropdown-item" onClick={() => logout()} href="#"><i class="fa fa-sign-out"></i> Đăng xuất</a></li>
                        </ul>
                    </div>
                </div>
                <div class="contentmain">
                    {children}
                </div>
            </div>
        </>
    );
}

async function checkAdmin() {
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/user/admin/check-role-admin';
    const response = await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status > 300) {
        window.location.replace('../login')
    }
}


function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace('../login')
}

export default Header;
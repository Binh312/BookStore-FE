import logo from '../../../assest/images/logo.png';
import cart from '../../../assest/images/cartheader.png';
import avatar from '../../../assest/images/user.svg'
import { useState, useEffect } from 'react'
import { getMethod, getMethodByToken } from '../../../services/request'
import React, { createContext, useContext } from 'react';

export const HeaderContext = createContext();


function Header() {
    const [isCssLoaded, setCssLoaded] = useState(false);
    const [items, setItems] = useState([]);

    var [numCart, setNumCart] = useState(0);

    useEffect(() => {
        import('../styleUser/style.scss').then(() => setCssLoaded(true));
        const getProfile = async () => {
            // var url = new URL(document.URL)
            // var id = url.searchParams.get("id");

            // if (id != null) {
            var response = await getMethod('http://localhost:8080/api/user/admin/get-all-user');
            var result = await response.json();
            setItems(result)
            console.log(result)
            // }
        };
        getProfile();
    }, []);

    if (!isCssLoaded) {
        return <></>
    }
    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.replace('login')
    }

    var token = localStorage.getItem('token');
    var authen = <li><a id="login-modal" href="/login">Đăng nhập</a></li>
    if (token != null) {
        authen = <>

            <li><a id="login-modal" href='profileUser'  >Tài khoản</a></li>

            <li onClick={() => logout()}><a id="login-modal" href="#">Đăng xuất</a></li></>
    }

    return (
        <div id="headerweb">
            <div class="subheader">
                <div class="container subcontainerheader">
                    <ul>

                        <li><a href="">Địa chỉ cửa hàng</a></li>
                        <li><a href="/kiemtradonhang">Tra cứu đơn hàng</a></li>
                        {authen}
                    </ul>
                </div>
            </div>
            <div class="container">
                <div class="headertop">
                    <div class="row">
                        <div class="col-sm-3">
                            <a href='/'><img src={logo} class="logoheader" /></a>
                        </div>
                        <div class="col-sm-6">
                            <form action='product' class="searchheader">
                                <input name='search' placeholder="Hôm nay bạn cần tìm gì?" class="inputsearchheader" />
                                <button class="btnsearchheader"><i class="fa fa-search"></i></button>
                            </form>
                        </div>
                        <div class="col-sm-3">
                            <div class="row">
                                <div class="col-7">
                                    <a class="btnkiemtradh" href="/kiemtradonhang">
                                        <span class="icon"><i class="fa fa-truck"></i></span>
                                        <span class="text">Kiểm tra đơn hàng</span>
                                    </a>
                                </div>
                                <div class="col-5">
                                    <div class="shoppingcartheader">
                                        <div class="shopingcontentcart">
                                            <a href="cart"><img src={cart} class="imgcartheader" /></a>
                                            <span id='soluongcart' class="cart-total">{numCart}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default Header;
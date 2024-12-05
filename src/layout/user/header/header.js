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
    const infoUser = JSON.parse(window.localStorage.getItem("user"))


    useEffect(() => {
        import('../styleUser/style.scss').then(() => setCssLoaded(true));
        const getCart = async () => {
            if (infoUser) {
                var response = await getMethod(`/api/cart/get-list-cart?userId=${infoUser.id}`)
                var result = await response.json();
                console.log(result)
                setItems(result)
            }
        };
        getCart();
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
            {infoUser.role === "ROLE_ADMIN" ? (
                <>
                    <li><a href='./admin/user'>Quản trị</a></li>
                    <li><a id="login-modal" href={`profileUser?id=${infoUser.id}`}>Tài khoản</a></li>
                    <li onClick={() => logout()}><a id="login-modal" href="#">Đăng xuất</a></li>
                </>
            ) : (<>
                <li><a id="login-modal" href={`profileUser?id=${infoUser.id}`}>Tài khoản</a></li>
                <li onClick={() => logout()}><a id="login-modal" href="#">Đăng xuất</a></li>
            </>)}
        </>
    }



    return (
        <div id="headerweb">
            <div class="subheader">
                <div class="container subcontainerheader">
                    <ul>
                        <li><a href="/index">Trang chủ</a></li>
                        <li><a href="/facilityFirst">Địa chỉ cửa hàng</a></li>
                        <li>{infoUser ? (
                            <a href="/kiemtradonhang">Tra cứu đơn hàng</a>
                        ) : (
                            <a href="/login">Tra cứu đơn hàng</a>
                        )}</li>
                        {authen}
                    </ul>
                </div>
            </div>
            <div class="container">
                <div class="headertop">
                    <div class="row">
                        <div class="col-sm-3">
                            <a href='/index'><img src={logo} class="logoheader" /></a>
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
                                    {infoUser ? (
                                        // Hiển thị khi có user
                                        <a class="btnkiemtradh" href="/kiemtradonhang">
                                            <span class="icon"><i class="fa fa-truck"></i></span>
                                            <span class="text">Kiểm tra đơn hàng</span>
                                        </a>
                                    ) : (
                                        // Hiển thị khi không có user
                                        <a class="btnkiemtradh" href="/login">
                                            <span class="icon"><i class="fa fa-truck"></i></span>
                                            <span class="text">Kiểm tra đơn hàng</span>
                                        </a>
                                    )}
                                </div>
                                <div class="col-5">
                                    <div class="shoppingcartheader">
                                        <div class="shopingcontentcart">
                                            {infoUser ? (
                                                // Hiển thị khi có user
                                                <>
                                                    <a href={`cart?userId=${infoUser.id}`}><img src={cart} class="imgcartheader" /></a>
                                                </>
                                            ) : (
                                                // Hiển thị khi không có user
                                                <>
                                                    <a href={`/login`}><img src={cart} class="imgcartheader" /></a>
                                                </>
                                            )}
                                            <span id='soluongcart' class="cart-total">{items.length}</span>

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
import { getMethod, deleteMethod, postMethod, } from '../../services/request'
import { useState, useEffect } from 'react'
import { formatMoney } from '../../services/money'
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

function Payment() {
    const infoUser = JSON.parse(window.localStorage.getItem("user"))
    const [listChecked, setListChecked] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Lấy danh sách item đã chọn từ localStorage
        const storedListChecked = JSON.parse(localStorage.getItem("listChecked")) || [];
        // setListChecked(storedListChecked);

        // Giả sử bạn cần lấy thêm thông tin chi tiết của các sản phẩm đã chọn
        const getProducts = async () => {
            // Lấy tất cả thông tin giỏ hàng từ API
            var response = await getMethod(`/api/cart/get-list-cart?userId=${infoUser.id}`)
            var result = await response.json();
            // Lọc ra các sản phẩm đã chọn
            const selectedItems = result.filter((item) => storedListChecked.includes(item.id));
            setItems(selectedItems);
        };

        getProducts();
    }, []);

    const calculateTotalPrice = () => {
        return items.reduce((total, item) => {
            return total + item.book.price * item.quantity;
        }, 0);
    };

    return (
        <div className="payment-container">
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                    <div className="checkout-block-address">
                        <div className="checkout-block-title">Địa chỉ giao hàng</div>
                        <div className="checkout-block-address-content">

                        </div>
                    </div>
                    <div className="checkout-block">
                        <div className="checkout-block-title">Kiểm tra lại đơn hàng</div>
                        <div className="checkout-block-content">
                            {items.map((item => {
                                return <div className="checkout-products-item">
                                    <div className="checkout-products-item-image">
                                        <img className="img-product" src={item?.book?.image} alt="image-product" />
                                    </div>
                                    <div className="checkout-products-item-detail">
                                        <div className="checkout-products-item-name">{item?.book?.title}</div>
                                        <div className="checkout-products-item-price">
                                            <strong className="new-price">{formatMoney(item?.book?.price)}</strong>
                                            <span className="old-price">{item?.book?.oldPrice == null ? '' : formatMoney(item?.book?.oldPrice)}</span>
                                        </div>
                                        <div className="checkout-products-item-quantity">{item?.quantity}</div>
                                        <div className="checkout-products-item-total">{formatMoney(item?.book?.price * item?.quantity)}</div>
                                    </div>
                                </div>
                            }))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;

import { getMethod, deleteMethod, postMethod, } from '../../services/request'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { formatMoney } from '../../services/money'
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

function Cart() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [listChecked, setListChecked] = useState([]);
    const [allChecked, setAllChecked] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const infoUser = JSON.parse(window.localStorage.getItem("user"))

    useEffect(() => {
        const getCart = async () => {
            var response = await getMethod(`/api/cart/get-list-cart?userId=${infoUser.id}`)
            var result = await response.json();
            console.log(result)
            setItems(result);
            const initialQuantities = {};
            result.forEach((item) => {
                initialQuantities[item.book.id] = item.quantity;
            });
            setQuantity(initialQuantities);
        };
        getCart();
    }, []);

    async function handleDeleteClick(id) {
        var response = await deleteMethod(`/api/cart/delete?id=${id}`)
        if (response.status < 300) {
            var result = await response.text();
            toast.success(result);
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

    const handleCheckout = () => {
        localStorage.setItem("listChecked", JSON.stringify(listChecked));
        navigate("/payment");
    };

    const handleCheckAll = (e) => {
        const checked = e.target.checked; // Kiểm tra trạng thái của checkbox
        setAllChecked(checked); // Cập nhật trạng thái "Chọn tất cả"
        if (checked) {
            // Nếu chọn tất cả, thêm tất cả id sản phẩm vào listChecked
            const allIdChecked = items.map(item => item.id);
            setListChecked(allIdChecked);
        } else {
            // Nếu bỏ chọn tất cả, làm rỗng listChecked
            setListChecked([]);

        }
    };

    const onChecked = (e) => {
        const value = parseInt(e.target.value)
        if (!listChecked.includes(value)) {
            setListChecked([...listChecked, value]);
        } else {
            const newListchecked = listChecked.filter((item) => item !== value)
            setListChecked(newListchecked);
        }
    }

    const calculateTotalCheckedPrice = () => {
        return listChecked.reduce((total, checkedId) => {
            const item = items.find((item) => item.id === checkedId); // Tìm sản phẩm theo id
            if (item) {
                const itemQuantity = quantity[item.book.id] || 1; // Lấy số lượng của sản phẩm
                return total + item.book.price * itemQuantity; // Cộng dồn giá trị
            }
            return total;
        }, 0);
    };

    async function handleMinus(bookId) {
        var response = await postMethod(`/api/cart/decrease-quantity?bookId=${bookId}`)
        var newQuantity = await response.json();
        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [bookId]: newQuantity
        }));
    }

    async function handlePlus(bookId) {
        const response = await postMethod(`/api/cart/increase-quantity?bookId=${bookId}`);
        const newQuantity = await response.json();
        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [bookId]: newQuantity
        }));
    }

    return (
        <div className="cart-container">
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                    <div className="cart" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="cart-title-page">
                            <h1 style={{ display: 'inline-block', width: 'auto', margin: '4px 0', fontSize: '30px', fontWeight: '450' }}>GIỎ HÀNG</h1>
                            <span className="cart-title-num-items">( {items.length} sản phẩm)</span>
                        </div>
                        <div className="cart-form-content">
                            <div className='col-sm-9 col-12' style={{ width: '1000px' }}>
                                <div className="header-cart-item">
                                    <div className="checkbox-all-product">
                                        <input type="checkbox" onChange={handleCheckAll} checked={allChecked} className="checkbox-add-cart" ></input>
                                    </div>
                                    <div style={{ margin: '0 320px 0 20px' }}>
                                        <span>Chọn tất cả ( {items.length} sản phẩm)</span>
                                    </div>
                                    <div>Số lượng</div>
                                    <div style={{ margin: '0 50px 0' }}>Thành tiền</div>
                                </div>
                                <div className="list-cart-left">
                                    {items.length !== 0 ? (
                                        <>
                                            {items.map((item => {
                                                return <div className="item-product-cart">
                                                    <div className="checked-product-cart">
                                                        <input type="checkbox" className="checkbox-add-cart" onChange={onChecked} value={item?.id} checked={listChecked.includes(item?.id)} ></input>
                                                    </div>
                                                    <div className="image-product-cart">
                                                        <a href={`bookDetail?id=${item?.id}`}>
                                                            <img className="img-product" src={item.book.image} alt="image-product" />
                                                        </a>
                                                    </div>
                                                    <div className="group-product-info">
                                                        <div className="info-product-cart">
                                                            <a href={`bookDetail?id=${item?.id}`}>
                                                                <div className="name-product">{item.book.title}</div>
                                                            </a>
                                                            <div className="price-original">
                                                                <strong className="new-price">{formatMoney(item.book.price)}</strong>
                                                                <span className="old-price">{item.book.oldPrice == null ? '' : formatMoney(item.book.oldPrice)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="number-product-cart">
                                                            <div className="product-quantity-box">
                                                                <div className="product-quantity-box-block">
                                                                    <button onClick={() => handleMinus(item.book.id)} className="fa fa-minus"></button>
                                                                    <input type="number" value={quantity[item.book.id] || 1} className="number-quantity" />
                                                                    <button onClick={() => handlePlus(item.book.id)} className="fa fa-plus"></button>
                                                                </div>
                                                            </div>
                                                            <div className="price-total-cart">{formatMoney(item.book.price * quantity[item.book.id])}</div>
                                                        </div>
                                                        <div onClick={() => handleDeleteClick(item.id)} className="remove-button-cart">
                                                            <button className="fa fa-trash" style={{ color: '#545759', border: 'none' }}></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }))}
                                        </>) : (<>
                                            <div>Giỏ Hàng trống</div>
                                        </>)
                                    }
                                </div>
                            </div>
                            <div className='col-sm-3 col-12'>
                                <div className="block-total-cart">
                                    <div className="block-totals-cart-page">
                                        <div className="total-cart-first">
                                            <div className="title-cart-first-left">Thành tiền</div>
                                            <div className="number-cart-first-right">{formatMoney(calculateTotalCheckedPrice())}</div>
                                        </div>
                                        <div className="total-cart-second">
                                            <div className="title-cart-second-left">Tổng số tiền (gồm VAT)</div>
                                            <div className="number-cart-second-right">{formatMoney(calculateTotalCheckedPrice())}</div>
                                        </div>
                                    </div>
                                    <div className="checkout-button-cart">
                                        <button onClick={handleCheckout} className="btn-pay-cart" type="button" >THANH TOÁN</button>
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

export default Cart;

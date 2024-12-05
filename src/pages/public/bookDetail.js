import { getMethod, postMethod, postMethodPayload, uploadSingleFile } from '../../services/request'
import { useState, useEffect } from 'react'
import { formatMoney } from '../../services/money'
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

function BookDetail() {

    const infoUser = JSON.parse(window.localStorage.getItem("user"))
    const [product, setProduct] = useState(null);
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        const getProduct = async () => {
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if (id != null) {
                var response = await getMethod(`http://localhost:8080/api/book/find-book?id=${id}`);
                var result = await response.json();
                setProduct(result)
                console.log('product:', result)
            }
        };
        getProduct();


    }, []);

    const handleAddToCart = async (event) => {
        event.preventDefault();
        if (!infoUser.id) {
            toast.warning("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng");
            window.location.href = 'login'
        }

        var response = await postMethodPayload(`http://localhost:8080/api/cart/create-update?userId=${infoUser.id}&bookId=${product.id}&quantity=${amount}`);
        if (response.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Thêm sản phẩm vào giỏ hàng thành công!",
            });
        }
        else {
            if (response.status === 417) {
                var mess = await response.json();
                toast.error(mess.defaultMessage);
            }
            else {
                toast.error("Thất bại");
            }
        }
    }

    const handleBuyProduct = async (event) => {
        event.preventDefault();
        if (!infoUser.id) {
            toast.warning("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng");
            window.location.href = 'login'
        }

        var response = await postMethodPayload(`http://localhost:8080/api/cart/create-update?userId=${infoUser.id}&bookId=${product.id}&quantity=${amount}`);
        if (response.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Thêm sản phẩm vào giỏ hàng thành công!",
                preConfirm: () => {
                    window.location.href = 'cart'
                }
            });
        }
        else {
            if (response.status === 417) {
                var mess = await response.json();
                toast.error(mess.defaultMessage);
            }
            else {
                toast.error("Thất bại");
            }
        }
    }

    const handleMinus = async (product) => {
        var response = await postMethod(`/api/book/decrease-amount?bookId=${product.id}`)
        var result = await response.json();
        setAmount(result);
    }

    const handlePlus = async (product) => {
        var response = await postMethod(`/api/book/increase-amount?bookId=${product.id}`)
        var result = await response.json();
        setAmount(result);
    }

    return (
        <div className="content-bookdetail">
            <div className="bookdetail-first-block">
                <div class="col-md-8 col-sm-12 col-12">
                    <div className="product-view-addtocart">
                        <div className="product-image-main">
                            <img src={product == null ? '' : product.image} alt="product-image" className='main-image' />
                        </div>
                        <div className="product-image-thumbnail">
                            <div id="list-image-thumbnail" class="row">
                                {product == null ? '' :
                                    product.bookImages.map((item => {
                                        return <div id={item.id} class="col-md-3 col-sm-3 col-2">
                                            <img src={item.image} className="image-thumbnail" />
                                        </div>
                                    }))}
                            </div>
                        </div>
                    </div>
                    <div className="product-view-add-button">
                        <button className="btn-add-cart" onClick={(e) => handleAddToCart(e)}>
                            <span class="fa fa-shopping-cart iconbtncart"></span>
                            <span>Thêm vào giỏ hàng</span>
                        </button>
                        <button className="btn-buy-product" onClick={(e) => handleBuyProduct(e)}>
                            <span>Mua ngay</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="bookdetail-second-block">
                <div className="block-title-product">
                    <div className="tiltle-product">{product?.title}</div>
                    <div className="sub-title-product">
                        <div className="sub-title-product-first">
                            <div className="publisher">
                                <span>Nhà xuất bản: {product?.publisher.name}</span>
                            </div>
                            <div className="sold-product">
                                <span>Đã bán: {product?.sold}</span>
                            </div>
                            {/* <div id="list-author-product" class="row">
                                <span>Tác giả:
                                    {product == null ? '' :
                                        product.bookAuthors.map((item => {
                                            return <div id={item.id} class="col-md-3 col-sm-3 col-2">
                                                <span className="author">{item.author.fullName}</span>
                                            </div>
                                        }))}
                                </span>
                            </div> */}
                        </div>
                    </div>
                    <div className="price-box">
                        <div className="price-product">{formatMoney(product?.price)}</div>
                        <div className="oldprice-product">{formatMoney(product?.oldPrice)}</div>
                    </div>
                    <div className="quantity-product">
                        <div className="quantity-label">Số lượng:</div>
                        <div className="quantity-box">
                            <button onClick={() => handleMinus(product)} className="btn-decrease fa fa-minus"></button>
                            <input type="number" value={amount} min={1} step={1} className="quantity-number-view" />
                            <button onClick={() => handlePlus(product)} className="btn-increase fa fa-plus"></button>
                        </div>
                    </div>
                </div>
                <div className="block-detail-product">
                    <div className="title-detail-product">Thông tin chi tiết</div>
                    <div className="table-detail-product">
                        <table className="data-table">
                            <tbody>
                                <tr>
                                    <th className="table-label">Tác giả</th>
                                    {/* <td className="data-0">{product?.publisher.name}</td> */}
                                </tr>
                                <tr>
                                    <th className="table-label">Nhà xuất bản</th>
                                    <td className="data-1">{product?.publisher.name}</td>
                                </tr>
                                <tr>
                                    <th className="table-label">Năm xuất bản</th>
                                    <td className="data-2">{product?.publishYear}</td>
                                </tr>
                                <tr>
                                    <th className="table-label">Số trang</th>
                                    <td className="data-3">{product?.numberPage}</td>
                                </tr>
                                <tr>
                                    <th className="table-label">Kích thước</th>
                                    <td className="data-4">{product?.size}</td>
                                </tr>
                                <tr>
                                    <th className="table-label">Danh mục</th>
                                    {/* <td className="data-5">{product?.size}</td> */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        Giá sản phẩm trên đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm,
                        hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển,
                        phụ phí hàng cồng kềnh,...
                    </div>
                </div>
                <div className="block-description-product">
                    <div className="title-description-product">Mô tả sản phẩm</div>
                    <p className="content-description-product">
                        {product?.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;

import { useState, useEffect } from 'react'
import { getMethod, postMethodPayload } from '../../services/request'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Select from 'react-select';



const AddInvoiceAdmin = () => {
    const [vouchers, setVouchers] = useState([]);
    const [invoiceStatuses, setInvoiceStatuses] = useState([]);
    const [payTypes, setPayTypes] = useState([]);

    useEffect(() => {
        const getVoucher = async () => {
            var response = await getMethod('/api/voucher/get-list-voucher');
            var result = await response.json();
            setVouchers(result)
        };
        const getInvoiceStatuses = async () => {
            const response = await getMethod('/api/invoice/get-invoice-status');
            const result = await response.json();
            setInvoiceStatuses(result.map(status => ({ value: status, label: status })));
        };
        const getPayTypes = async () => {
            var response = await getMethod('/api/invoice/get-pay-type');
            var result = await response.json();
            setPayTypes(result.map(payType => ({ value: payType, label: payType })))
        }

        getVoucher();
        getInvoiceStatuses();
    }, []);

    async function addInvoice(event) {
        event.preventDefault();
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        var invoice = {
            "id": id,
            "totalAmount": event.target.elements.totalAmount.value,
            "contact": event.target.elements.contact.value,
            "address": event.target.elements.address.value,
            "invoiceStatus": event.target.elements.invoiceStatus.value,
            "payType": event.target.elements.payType.value,
            "voucher": {
                id: event.target.elements.voucher.value
            }
        }
        var response = await postMethodPayload("/api/invoice/create", invoice);
        if (response.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Thêm đơn hàng thành công!",
                preConfirm: () => {
                    window.location.href = 'invoice'
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



    return (
        <div>
            <div class="col-sm-12 header-sps">
                <div class="title-add-admin">
                    <h4>Thêm/ cập nhật đơn hàng</h4>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-add">
                    <div class="form-add">
                        <form onSubmit={addInvoice} class="row" method='post'>
                            <div class="col-md-4 col-sm-12 col-12">
                                <label class="lb-form">Tổng tiền</label>
                                <input name="totalAmount" class="form-control" />
                                <label class="lb-form">Liên hệ</label>
                                <input name="contact" class="form-control" />
                                <label class="lb-form">Địa chỉ</label>
                                <input name="address" class="form-control"></input>
                                <label class="lb-form">Trạng thái đơn hàng</label>
                                <Select
                                    className="select-container"
                                    options={invoiceStatuses}
                                    getOptionLabel={(option) => option.title}
                                    getOptionValue={(option) => option.id}
                                    name='invoiceStatuses'
                                    placeholder="Chọn trạng thái đơn hàng"
                                />
                                <label class="lb-form">Kiểu thanh toán</label>
                                <Select
                                    className="select-container"
                                    options={payTypes}
                                    getOptionLabel={(option) => option.title}
                                    getOptionValue={(option) => option.id}
                                    name='payTypes'
                                    placeholder="Chọn kiểu thanh toán"
                                />
                                <label class="lb-form">Voucher</label>
                                <Select
                                    className="select-container"
                                    options={vouchers}
                                    getOptionLabel={(option) => option.title}
                                    getOptionValue={(option) => option.id}
                                    name='voucher'
                                    placeholder="Chọn voucher"
                                />
                                <br />
                                <button class="btn btn-primary form-control">Thêm/ cập nhật</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default AddInvoiceAdmin;
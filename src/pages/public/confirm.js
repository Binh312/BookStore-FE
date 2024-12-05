import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logologin from '../../assest/images/logologin.jpg'
import { postMethodPayload, postMethod } from '../../services/request';
import Swal from 'sweetalert2'



function confirmFunction() {

    async function handleConfirm(event) {
        event.preventDefault();
        var uls = new URL(document.URL)
        var email = uls.searchParams.get("email");
        var key = event.target.elements.key.value

        var response = await postMethod('/api/user/confirm?key=' + key + '&email=' + email);
        if (response.status > 300) {
            if (response.status == 417) {
                var result = await response.json();
                toast.warning(result.defaultMessage)
            }
            else {
                toast.warning("Xác thực thất bại")
            }
        }
        else {
            Swal.fire({
                title: "Thông báo",
                text: "Xác thực tài khoản thành công",
                preConfirm: () => {
                    window.location.href = 'login'
                }
            });
        }
    }

    return (
        <div class="contentweb">
            <div class="container">
                <div class="dangnhapform">
                    <div class="divimglogin">
                        <img src={logologin} alt="" />
                    </div>
                    <div class="divctlogin">
                        <p class="labeldangnhap">XÁC NHẬN ĐĂNG KÝ TÀI KHOẢN</p>
                        <form onSubmit={handleConfirm} autocomplete="off" method='post'>
                            <label class="lbform">Nhập mã xác thực</label>
                            <input required name='key' id="username" class="inputlogin" />
                            <button class="btndangnhap">XÁC THỰC</button>
                            <button type="button" onClick={() => { window.location.href = 'login' }} class="btndangky">ĐĂNG NHẬP</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default confirmFunction;
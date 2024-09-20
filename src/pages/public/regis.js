import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logologin from '../../assest/images/logologin.jpg'
import Swal from 'sweetalert2'
// import {handleLogin} from '../../services/auth';
import { postMethodPayload } from '../../services/request';



function regis() {

    async function handleRegis(event) {
        event.preventDefault();
        if (event.target.elements.password.value != event.target.elements.repassword.value) {
            toast.warning("Mật khẩu không trùng khớp");
            return;
        }
        const payload = {
            email: event.target.elements.email.value,
            password: event.target.elements.password.value,
            fullName: event.target.elements.fullname.value,
            phoneNumber: event.target.elements.phone.value,
        };
        var response = await postMethodPayload('/api/user/regis', payload);
        if (response.status > 300) {
            if (response.status == 417) {
                var result = await response.json();
                toast.warning(result.defaultMessage)
            }
            else {
                toast.warning("Đăng ký thất bại")
            }
        }
        else {
            Swal.fire({
                title: "Thông báo",
                text: "Đăng ký tài khoản thành công, hãy kiểm tra email của bạn!",
                preConfirm: () => {
                    window.location.href = 'confirm?email=' + event.target.elements.email.value
                }
            });
        }
    }

    return (
        <div class="contentweb">
            <div class="container">
                <div class="dangnhapform">
                    <div class="divimglogin">
                        <img src={logologin} class="imgbacklogin" />
                    </div>
                    <div class="divctlogin">
                        <p class="labeldangnhap">Đăng Ký</p>
                        <form onSubmit={handleRegis} autocomplete="off">
                            <label class="lbform">Họ tên</label>
                            <input required name='fullname' id="fullname" class="inputlogin" />
                            <label class="lbform">Email</label>
                            <input required name='email' id="email" class="inputlogin" />
                            <label class="lbform">Số điện thoại</label>
                            <input required name='phone' id="phone" class="inputlogin" />
                            <label class="lbform">Mật khẩu</label>
                            <input required name='password' type="password" id="password" class="inputlogin" />
                            <label class="lbform">Nhập lại mật khẩu</label>
                            <input required name='repassword' type="password" id="repassword" class="inputlogin" />
                            <button class="btndangnhap">ĐĂNG KÝ</button>
                            <button type="button" onClick={() => { window.location.href = 'login' }} class="btndangky">ĐĂNG NHẬP</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    );
}
export default regis;
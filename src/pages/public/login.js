import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logologin from '../../assest/images/logologin.jpg'
import { postMethodPayload } from '../../services/request';
import Swal from 'sweetalert2'



function login() {

    async function handleLogin(event) {
        event.preventDefault();
        const payload = {
            email: event.target.elements.username.value,
            password: event.target.elements.password.value
        };
        var response = await postMethodPayload('/api/user/login/email', payload);
        if (response.status > 300) {
            if (response.status == 417) {
                var result = await response.json();
                var errorCode = result.errorCode;
                if (errorCode == 444) {
                    Swal.fire({
                        title: "Thông báo",
                        text: result.defaultMessage,
                        preConfirm: () => {
                            window.location.href = 'confirm?email=' + event.target.elements.username.value
                        }
                    });
                }
                else {
                    toast.warning(result.defaultMessage)
                }
            }
            else {
                toast.warning("Đăng nhập thất bại")
            }
        }
        else {
            var result = await response.json();
            var token = result.token;
            var user = result.user;
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("user", JSON.stringify(user));
            if (user.role === "ROLE_ADMIN") {
                window.location.href = '/admin/index'
            }
            else if (user.role === "ROLE_USER") {
                window.location.href = '/index'
            }
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
                        <p class="labeldangnhap">Đăng Nhập</p>
                        <form onSubmit={handleLogin} autocomplete="off" method='post'>
                            <label class="lbform">Tên tài khoản</label>
                            <input required name='username' id="username" class="inputlogin" />
                            <label class="lbform">Mật khẩu</label>
                            <input required name='password' type="password" id="password" class="inputlogin" />
                            <button class="btndangnhap">ĐĂNG NHẬP</button>
                            <button type="button" onClick={() => { window.location.href = 'regis' }} class="btndangky">ĐĂNG KÝ</button>
                        </form>
                        <a href="forgot" class="lbquenmk">Quên mật khẩu ?</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default login;
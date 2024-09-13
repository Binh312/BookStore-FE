import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logologin from '../../assest/images/logologin.jpg'
import Swal from 'sweetalert2'
// import {handleLogin} from '../../services/auth';



function regis(){
    return(
        <div class="contentweb">
        <div class="container">
            <div class="dangnhapform">
                <div class="divimglogin">
                    <img src={logologin} class="imgbacklogin"/>
                </div>
                <div class="divctlogin">
                    <p class="labeldangnhap">Đăng Ký</p>
                    <form  autocomplete="off">
                        <label class="lbform">Họ tên</label>
                        <input required name='fullname' id="fullname" class="inputlogin"/>
                        <label class="lbform">Email</label>
                        <input required name='email' id="email" class="inputlogin"/>
                        <label class="lbform">Số điện thoại</label>
                        <input required name='phone' id="phone" class="inputlogin"/>
                        <label class="lbform">Mật khẩu</label>
                        <input required name='password' type="password" id="password" class="inputlogin"/>
                        <label class="lbform">Nhập lại mật khẩu</label>
                        <input required name='repassword' type="password" id="repassword" class="inputlogin"/>
                        <button class="btndangnhap">ĐĂNG KÝ</button>
                        <button type="button" onClick={()=>{window.location.href = 'login'}} class="btndangky">ĐĂNG NHẬP</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

        
    );
}
export default regis;
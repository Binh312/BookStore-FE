import { getMethod, postMethodPayload, uploadSingleFile } from '../../services/request'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

var url = '';
var linkavatar = '';
function ProfileUser() {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const getProfile = async () => {
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");

            if (id != null) {
                var response = await getMethod('http://localhost:8080/api/user/find-user?id=' + id);
                var result = await response.json();
                setProfile(result)
                linkavatar = result.image
            }
            console.log(result)
        };
        getProfile();
    }, []);

    async function updateInfo(event) {
        event.preventDefault();
        document.getElementById("loading").style.display = 'block'
        var ims = await uploadSingleFile(document.getElementById("imgavatar"))
        if (ims != null) {
            linkavatar = ims
        }
        var user = {
            "avatar": linkavatar,
            "email": event.target.elements.email.value,
            "password": event.target.elements.password.value,
            "fullName": event.target.elements.fullName.value,
            "createdDate": event.target.elements.createdDate.value,
            "phoneNumber": event.target.elements.phoneNumber.value,
            "role": event.target.elements.role.value,
        }

        var response = await postMethodPayload("/api/user/update-info", user);
        if (response.status < 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Thay đổi thông tin tài khoản thành công!",
                preConfirm: () => {
                    window.location.href = 'user'
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
        <div className='contentweb'>
            <div className="form-profile">
                <form onSubmit={updateInfo} class="row" method='post'>
                    <div class="col-md-7 col-sm-12 col-12">
                        <label class="lb-form">Ảnh đại diện</label>
                        <input id="imgavatar" type="file" class="form-control" />
                        <img src={profile == null ? '' : profile.avatar} className='imgavatar' />

                        <label class="lb-form">Ngày tạo: {profile?.createdDate}</label>
                        <label class="lb-form">Role: {profile?.role}</label>

                        <label class="lb-form">Email</label>
                        <input name="email" defaultValue={profile?.email} class="form-control" />
                        <label class="lb-form">Mật khẩu</label>
                        <input name="password" defaultValue={profile?.password} class="form-control" />
                        <label class="lb-form">Họ tên</label>
                        <input name="fullName" defaultValue={profile?.fullName} class="form-control" />
                        <label class="lb-form">Số điện thoại</label>
                        <input name="phoneNumber" defaultValue={profile?.phoneNumber} class="form-control" />
                        <br />
                        <button class="btn btn-primary form-control">Lưu lại thông tin</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ProfileUser;
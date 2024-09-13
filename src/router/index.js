import layoutAdmin from '../layout/admin/Layout'
import layoutLogin from '../layout/user/loginlayout/login'

//admin
import homeAdmin from '../pages/admin/index'


//public
import login from '../pages/public/login'
import index from '../pages/public/index'
import regis from '../pages/public/regis'

const publicRoutes = [
    { path: "/", component: index},
    { path: "/index", component: index},
    { path: "/login", component: login, layout: layoutLogin },
    { path: "/regis", component: regis, layout: layoutLogin },
   
];


const adminRoutes = [
    { path: "/admin/index", component: homeAdmin, layout: layoutAdmin },
];



export { publicRoutes, adminRoutes};

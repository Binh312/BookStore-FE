import layoutAdmin from '../layout/admin/Layout'
import layoutLogin from '../layout/user/loginlayout/login'

//admin
import homeAdmin from '../pages/admin/index'
import UserAdmin from '../pages/admin/user'
import BookAdmin from '../pages/admin/book'
import AuthorAdmin from '../pages/admin/author'
import CategoryAdmin from '../pages/admin/category'
import InvoiceAdmin from '../pages/admin/invoice'
import VoucherAdmin from '../pages/admin/voucher'
import AddBookAdmin from '../pages/admin/addBook'
import ImportBookAdmin from '../pages/admin/importBook'
import AddImportBookAdmin from '../pages/admin/addImportBook'
import AddVoucherAdmin from '../pages/admin/addVoucher'
import AddCategoryAdmin from '../pages/admin/addCategory'
import AddAuthorAdmin from '../pages/admin/addAuthor'
import AddInvoiceAdmin from '../pages/admin/addInvoice'


//public
import login from '../pages/public/login'
import index from '../pages/public/index'
import regis from '../pages/public/regis'
import confirmFunction from '../pages/public/confirm'
import profileUser from '../pages/public/profileUser'
import bookDetail from '../pages/public/bookDetail'


const publicRoutes = [
    { path: "/", component: index },
    { path: "/index", component: index },
    { path: "/login", component: login, layout: layoutLogin },
    { path: "/regis", component: regis, layout: layoutLogin },
    { path: "/confirm", component: confirmFunction, layout: layoutLogin },
    { path: "/profileUser", component: profileUser },
    { path: "/bookDetail", component: bookDetail },

];


const adminRoutes = [
    { path: "/admin/index", component: homeAdmin, layout: layoutAdmin },
    { path: "/admin/user", component: UserAdmin, layout: layoutAdmin },
    { path: "/admin/book", component: BookAdmin, layout: layoutAdmin },
    { path: "/admin/author", component: AuthorAdmin, layout: layoutAdmin },
    { path: "/admin/category", component: CategoryAdmin, layout: layoutAdmin },
    { path: "/admin/invoice", component: InvoiceAdmin, layout: layoutAdmin },
    { path: "/admin/voucher", component: VoucherAdmin, layout: layoutAdmin },
    { path: "/admin/addBook", component: AddBookAdmin, layout: layoutAdmin },
    { path: "/admin/importBook", component: ImportBookAdmin, layout: layoutAdmin },
    { path: "/admin/addImportBook", component: AddImportBookAdmin, layout: layoutAdmin },
    { path: "/admin/addVoucher", component: AddVoucherAdmin, layout: layoutAdmin },
    { path: "/admin/addCategory", component: AddCategoryAdmin, layout: layoutAdmin },
    { path: "/admin/addAuthor", component: AddAuthorAdmin, layout: layoutAdmin },
    { path: "/admin/addInvoice", component: AddInvoiceAdmin, layout: layoutAdmin },

];



export { publicRoutes, adminRoutes };

export class ApiUrl {
    // LOGIN
    public static LOGIN_API = '/api/user/admin/adminlogin.php';
    public static DASHBOARD_API = '/api/home/dashboard.php';
    // USER
    public static GET_USER_INFO_API = '/api/user/getuserbyid.php';
    public static GET_USER_BY_AUTH = '/api/user/getusersbyauth.php';
    public static UPDATE_INFO_USER = '/api/user/updateuserinfo.php';
    public static CHECK_OLD_PASSWORD = '/api/user/checkoldpassword.php';
    // REQUISITION
    public static GET_REQUISITIONS_API = '/api/requisitioncourse/getrequisitioncourses.php';
    public static GET_REQUISITIONS_BY_ID_API = '/api/requisitioncourse/getrequisitioncoursebyid.php';
    // VERIFICATION DOCUMENT
    public static GET_VERIFICATION_USER = '/api/verificationdocument/getverificationdocumentsuser.php';
    public static GET_VERIFICATION_ID = '/api/verificationdocument/getverificationdocumentbyid.php';
    public static UPDATE_VERIFICATION = '/api/verificationdocument/updateverificationdocument.php';
    // BANNED
    public static ADD_BANNED = '/api/banned/addnewbanned.php';
    public static DELETE_BANNED = '/api/banned/deletebanned.php';
    public static GET_BANNEDS = '/api/banned/getbanneds.php';
    public static GET_BANNED_USER = '/api/banned/getbanneduser.php';
}

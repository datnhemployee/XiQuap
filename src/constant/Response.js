const Codes = {
    Ok: 200,
    Success: 201,
    Exception: 404,
    Authorization: 403,

}

const Encodes = {
    [Codes.Ok]: 'Ok',
    [Codes.Success]: 'Success',
    [Codes.Exception]: 'Exception',
    [Codes.Authorization]: 'Forbiden',
}
const Contents = {
    notImplement: 'Chưa định nghĩa hàm này',
    Ok: 'Đã xử lý',
    Success: 'Thành công và trả về dữ liệu',
    NotFound: 'Không tìm thấy xử lý tương ứng',
    Authorization: 'Không có quyền truy xuất.',
}
export{ 
    Contents,
    Codes,
    Encodes,
}
export default {
    code: true,
    content: Contents.notImplement,
}
const validatePhoneNumber = (phoneNumber) => {
  let errMsg = "";
  const checkPhone = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(
    phoneNumber
  );
  if (checkPhone) {
    errMsg = "";
  } else {
    errMsg = "Số điện thoại ko hợp lệ";
  }
  return errMsg;
};

const validateEmail = (email) => {
  let errMsg = "";
  const checkEmail = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (checkEmail) {
    errMsg = "";
  } else {
    errMsg = "Email ko hợp lệ";
  }
  return errMsg;
};

const validateString = (name, string) => {
  let errMsg = "";
  const checkString =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u.test(
      string
    );
  if (checkString) {
    errMsg = "";
  } else {
    if (name == "fullName") {
      errMsg = "Họ tên không đúng định dạng";
    } else {
      errMsg = "Địa chỉ không đúng định dạng";
    }
  }
  return errMsg;
};

const validateConfirmPassword = (value, password) => {
  let errMsg = "";
  if (value === password) {
    errMsg = "";
  } else {
    errMsg = "Xác nhận mật khẩu không trùng khơp";
  }
  return errMsg;
};

module.exports = {
  validatePhoneNumber: validatePhoneNumber,
  validateEmail: validateEmail,
  validateString: validateString,
  validateConfirmPassword: validateConfirmPassword,
};

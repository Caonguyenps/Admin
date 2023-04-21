import axios from "axios";
import api from "../config/api";
import { getAccessToken } from "../helper/token";

export const addCategory = (data) => {
    return new Promise(async (resolve, reject) => {
      await api
        .post("/api/v1/admin/category", data, {
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };


  export const getListBranch = (data) => {
    return new Promise(async (resolve, reject) => {
      await api
        .get("/api/v1/admin/branch", data, {
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };


  export const addBranch = (data) => {
    return new Promise(async (resolve, reject) => {
      await api
        .post("/api/v1/admin/branch", data, {
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };

  export const updateBranch = (data, id) => {
    return new Promise(async (resolve, reject) => {
      await api
        .patch(`/api/v1/admin/branch/${id}`, data, {
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };


  
  export const getListsUser = (data) => {
    return new Promise(async (resolve, reject) => {
      await api
        .get("/api/v1/admin/users/9999", data, {
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };

    
  export const getListProduct = () => {
    return new Promise(async (resolve, reject) => {
      await api
        .get("/api/v1/admin/product/lists", {
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };



  export const addProduct = async (data) => {
    const formData = new FormData();
    for (let item of data.image) {
      formData.append('image', item);
    }
  
    formData.append('categoryID', data.categoryID);
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('code', data.code);
    formData.append('description', data.description);
    formData.append('introduce', data.introduce);
    formData.append('subCategoryID', data.subCategoryID);
    formData.append('branchID', data.branchID);
    return await api
      .post('/api/v1/admin/product/add', formData, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };


  export const updateCategoryName = (categoryID, data) => {
    return new Promise(async (resolve, reject) => {
      await api
        .patch(`api/v1/admin/category/${categoryID}`, data,{
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };

  export const addSubCategory = (categoryID, data) => {
    return new Promise(async (resolve, reject) => {
      await api
        .post(`api/v1/admin/sub-category/${categoryID}`, data,{
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };

  export const deleteSubCategory = (categoryID, subCategoryID) => {
    return new Promise(async (resolve, reject) => {
      await api
        .delete(`api/v1/admin/sub-category/${categoryID}/${subCategoryID}`,{
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };

  export const deleteCategroy = (categoryID) => {
    return new Promise(async (resolve, reject) => {
      await api
        .delete(`api/v1/admin/category/${categoryID}`,{
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };


  export const updateSubCategory = (id,data ) => {
    return new Promise(async (resolve, reject) => {
      await api
        .patch(`api/v1/admin/sub-category/${id}`,data,{
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };



  export const deleteBranch = (branchID) => {
    return new Promise(async (resolve, reject) => {
      await api
        .delete(`api/v1/admin/branch/${branchID}`,{
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };

  export const getBranchCategory = (id) => {
    return new Promise(async (resolve, reject) => {
      await api
        .get(`api/v1/branch/${id}`,{
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };

  export const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
      await api
        .delete(`api/v1/admin/product/delete/${id}`,{
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };


  export const addCategoryBranch = (id, data) => {
    return new Promise(async (resolve, reject) => {
      await api
        .patch(`api/v1/admin/branch/category/${id}`,data,{
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };


  export const statics = () => {
    return new Promise(async (resolve, reject) => {
      await api
        .get(`api/v1/admin/statics`,{
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };

  export const getDetailsProduct = (productID) => {
    return new Promise(async (resolve, reject) => {
      await api
        .get(`api/v1/product/details/${productID}`,{
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };


  export const editProduct = async (data, id) => {
    const formData = new FormData();
    for (let item of data.image) {
      if (item.image) {
        formData.append("image", item.image);
      } else {
        formData.append("image", JSON.stringify(item));
      }
    }
    formData.append('categoryID', data.categoryID);
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('code', data.code);
    formData.append('description', data.description);
    formData.append('introduce', data.introduce);
    formData.append('subCategoryID', data.subCategoryID);
    formData.append('branchID', data.branchID);
    console.log(formData.entries());
    return await api
      .post(`/api/v1/admin/product/edit/${id}`, formData, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };


  export const getListOrder = () => {
    return new Promise(async (resolve, reject) => {
      await api
        .get(`api/v1/admin/order/list`,{
          headers: {
            Authorization: getAccessToken(),
          },
        })
        .then((result) => {
          return resolve(result.data);
        })
        .catch((error) => {
          return reject(error.response);
        });
    });
  };
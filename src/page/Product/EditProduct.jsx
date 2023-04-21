import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import queryString from "query-string";
import { useHistory, useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// import { addProduct } from '../../api/api';
import ImagePreview from "../../components/Preview/ImagePreview";
import UploadButton from "../../components/Preview/UploadBtn";
import ThumbnailComponent from "../../components/Thumbnail/Thumbnail.component";
import { getCategoryProduct } from "../../api/category.api";
import SelectCategory from "../../components/Category Select/CategorySelect.component";
import {
  addProduct,
  editProduct,
  getBranchCategory,
  getDetailsProduct,
} from "../../api/admin.api";
import path from "../../resources/path";
import SubCategorySelect from "../../components/Category Select/SubCategorySelect";
import BranchSelect from "../../components/Category Select/BranchSelect";
export default function EditProduct(props) {
  const history = useHistory();
  const productID = useParams().id;
  const [subCategory, setSubCategory] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState();
  const [description, setDescription] = useState("");
  const [listsImg, setListsImg] = useState([]);
  const [listsImgUpload, setListsImgUpload] = useState([]);
  const [arrCategory, setArrCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState();
  const [introduce, setIntroduce] = useState();
  const [subCategorySelect, setSubCategorySelect] = useState("");
  const [arrBranch, setArrBranch] = useState([]);
  const [branchSelect, setBranchSelect] = useState();
  const [categoryNew, setCategoryNew] = useState();
  const [subCategoryNew, setSubCategoryNew] = useState();
  const [branchNew, setBranchNew] = useState();

  useEffect(async () => {
    props.handleLoading(true);
    if (productID) {
      let cate = "";
      await getDetailsProduct(productID).then((res) => {
        setProduct(res.data.product);
        setCategorySelect(res.data.category._id);
        cate = res.data.category._id;
        console.log("data product", res.data);
        setCategoryNew(res.data.category);
        setSubCategoryNew(res.data.category.subCategory[0]);
        setBranchNew(res.data.branch);
        setName(res.data.product.productName);
        setDescription(res.data.product.description);
        setIntroduce(res.data.product.introduce);
        setCode(res.data.product.code);
        setPrice(res.data.product.price);
        setListsImg(res.data.product.image);
      });
      await getCategoryProduct().then((res) => {
        setArrCategory(res.data);

        const arr = res.data.filter((e) => {
          return e._id == cate;
        });
        setSubCategory(arr[0].subCategory);
      });
    }
    props.handleLoading(false);
  }, [productID]);

  useEffect(async () => {
    if (categorySelect !== "" && categorySelect) {
      props.handleLoading(true);
      await getBranchCategory(categorySelect).then((res) => {
        setArrBranch(res.data);
      });
      props.handleLoading(false);
    }
  }, [categorySelect]);

  const handleChangeCategory = (value) => {
    if (value !== "") {
      setCategorySelect(value._id);
      setCategoryNew(value._id);
      const arr = arrCategory.filter((e) => {
        return e._id == value._id;
      });
      setSubCategory(arr[0].subCategory);
    } else {
      setCategorySelect("");
      setCategoryNew("");
    }
  };

  const handleChangeSubCategory = (value) => {
    console.log(value);
    if (value !== "") {
      setSubCategoryNew(value._id);
    } else {
      setSubCategoryNew("");
    }
  };

  const handleChangeBranch = (value) => {
    if (value !== "") {
      setBranchNew(value._id);
    } else {
      setBranchSelect("");
    }
  };

  const handleChangeInput = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "code") {
      setCode(event.target.value);
    } else if (event.target.name === "price") {
      setPrice(event.target.value);
    } else if (event.target.name === "description") {
      setDescription(event.target.value);
    } else if (event.target.name === "introduce") {
      setIntroduce(event.target.value);
    }
  };

  const handleSubmit = async () => {
    console.log("subCategoryNew", subCategoryNew);
    let category;
    let subCategory;
    let branch;
    if (categoryNew._id) {
      category = categoryNew._id;
    } else {
      category = categoryNew;
    }
    if (subCategoryNew._id) {
      subCategory = subCategoryNew._id;
    } else {
      subCategory = subCategoryNew;
    }
    if (branchNew._id) {
      branch = branchNew._id;
    } else {
      branch = branchNew;
    }
    const data = {
      code: code,
      name: name,
      price: price,
      image: listsImg,
      description: description,
      introduce: introduce,
      categoryID: category,
      subCategoryID: subCategory,
      branchID: branch,
    };

    console.log(data);
    if (
      data.code == "" ||
      data.name == "" ||
      data.price == "" ||
      data.description == "" ||
      data.introduce == "" ||
      data.categoryID == "" ||
      data.subCategoryID == "" ||
      data.branchID == ""
    ) {
      alert("Please fill out the information completely!");
    } else {
      console.log("data", data);
      props.handleLoading(true);
      await editProduct(data, productID).then((res) => {
        history.push(path.PRODUCT);
      });
    }
  };

  const handleChangeImage = (file, fileImg) => {
    setListsImg((listsImg) => [...listsImg, { image: fileImg, url: file }]);
  };

  const handleClickDeleteImg = (imgIndex) => {
    const arr = [...listsImg];
    const arrImg = [...listsImgUpload];
    setListsImg(
      arr.filter((e, index) => {
        return index != imgIndex;
      })
    );
  };

  console.log("arrCategory", arrCategory);

  const showListsImg = listsImg.map((e, index) => {
    console.log("image", e);
    return (
      <Grid item lg={3} style={{ width: "100%", height: "150px" }}>
        <img
          src={e.url || e}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt=""
        />
        <div
          className="btn-delete-img"
          onClick={() => {
            handleClickDeleteImg(index);
          }}
        >
          <HighlightOffIcon />
        </div>
      </Grid>
    );
  });
  return (
    <div className="wrap-content-admin">
      <div>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12}>
            <TextField
              id="outlined-basic"
              label="Product name"
              variant="outlined"
              name="name"
              style={{ width: "100%" }}
              onChange={handleChangeInput}
              defaultValue={product?.productName}
              key={product?.productName}
            />
          </Grid>
          <Grid item lg={4} md={4}>
            {categoryNew != undefined ? (
              <SelectCategory
                data={arrCategory}
                handleChange={handleChangeCategory}
                value={categoryNew}
              />
            ) : (
              <></>
            )}
          </Grid>
          <Grid item lg={4} md={4}>
            {subCategoryNew != undefined ? (
              <SubCategorySelect
                data={subCategory}
                handleChange={handleChangeSubCategory}
                value={subCategoryNew}
              />
            ) : (
              <></>
            )}
          </Grid>
          <Grid item lg={4} md={4}>
            {branchNew != undefined ? (
              <BranchSelect
                data={arrBranch}
                handleChange={handleChangeBranch}
                value={branchNew}
              />
            ) : (
              <></>
            )}
          </Grid>
          <Grid item lg={4} md={4}>
            <TextField
              id="outlined-basic"
              label="Product Code"
              name="code"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={handleChangeInput}
              defaultValue={product?.code}
              key={product?.code}
            />
          </Grid>
          <Grid item lg={4} md={4}>
            <TextField
              id="outlined-basic"
              label="Product Price"
              name="price"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={handleChangeInput}
              defaultValue={product?.price}
              key={product?.price}
            />
          </Grid>
          <Grid item lg={12} md={12}>
            <hr />

            <div className="news-editor mt-3">
              <p style={{ fontWeight: "500" }}>Product Image:</p>
              <Grid container spacing={1}>
                {showListsImg}
                {listsImg.length < 2 ? (
                  <Grid item lg={3}>
                    <ThumbnailComponent handleChangeImage={handleChangeImage} />
                  </Grid>
                ) : (
                  <></>
                )}
              </Grid>
            </div>
          </Grid>

          <Grid item lg={12} md={12}>
            <hr />

            <div className="news-editor mt-3">
              <p style={{ fontWeight: "500" }}> Introduce: </p>
            </div>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              placeholder="Minimum 3 rows"
              style={{ width: "100%" }}
              name="introduce"
              onChange={handleChangeInput}
              defaultValue={product?.introduce}
              key={product?.introduce}
            />
          </Grid>

          <Grid item lg={12} md={12}>
            <hr />

            <div className="news-editor mt-3">
              <p style={{ fontWeight: "500" }}> Description: </p>
            </div>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              placeholder="Minimum 3 rows"
              style={{ width: "100%" }}
              name="description"
              onChange={handleChangeInput}
              defaultValue={product?.description}
              key={product?.description}
            />
          </Grid>
        </Grid>
        <div className="">
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            style={{ float: "right" }}
            onClick={handleSubmit}
            className="mb-4"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

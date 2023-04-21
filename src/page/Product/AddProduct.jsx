import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import "./screens/product.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
// import { addProduct } from '../../api/api';
import ThumbnailComponent from "../../components/Thumbnail/Thumbnail.component";
import { getCategoryProduct } from "../../api/category.api";
import SelectCategory from "../../components/Category Select/CategorySelect.component";
import { addProduct, getBranchCategory } from "../../api/admin.api";
import path from "../../resources/path";
import SubCategorySelect from "../../components/Category Select/SubCategorySelect";
import BranchSelect from "../../components/Category Select/BranchSelect";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
export default function AddProduct(props) {
  const history = useHistory();
  const [subCategory, setSubCategory] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState();
  const [defaultSelect, setDefaultSelect] = useState();
  const [imagePreview, setImagePreview] = useState([]);
  const [highlight, setHighlight] = useState(false);
  const [count, setCount] = useState(1);
  const [image, setImage] = useState([]);
  const [content, setContent] = useState([]);
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [sale, setSale] = useState(false);
  const [listsImg, setListsImg] = useState([]);
  const [listsImgUpload, setListsImgUpload] = useState([]);
  const [arrCategory, setArrCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState();
  const [introduce, setIntroduce] = useState();
  const [subCategorySelect, setSubCategorySelect] = useState("");
  const [type, setType] = useState("");
  const [arrBranch, setArrBranch] = useState([]);
  const [branchSelect, setBranchSelect] = useState();

  useEffect(async () => {
    props.handleLoading(true);
    await getCategoryProduct().then((res) => {
      setArrCategory(res.data);
    });
    props.handleLoading(false);
  }, []);

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
      const arr = arrCategory.filter((e) => {
        return e._id == value._id;
      });
      setSubCategory(arr[0].subCategory);
    } else {
      setCategorySelect("");
    }
  };

  const handleChangeSubCategory = (value) => {
    if (value !== "") {
      setSubCategorySelect(value._id);
    } else {
      setSubCategorySelect("");
    }
  };

  const handleChangeBranch = (value) => {
    if (value !== "") {
      setBranchSelect(value._id);
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
    const data = {
      code: code,
      name: name,
      price: price,
      image: listsImgUpload,
      description: description,
      introduce: introduce,
      categoryID: categorySelect,
      subCategoryID: subCategorySelect,
      branchID: branchSelect,
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
      props.handleLoading(true);
      await addProduct(data).then((res) => {
        history.push(path.PRODUCT);
      });
    }
  };

  const handleChangeImage = (file, fileImg) => {
    setListsImg((listsImg) => [...listsImg, file]);
    setListsImgUpload((listsImgUpload) => [...listsImgUpload, fileImg]);
  };

  const handleClickDeleteImg = (imgIndex) => {
    const arr = [...listsImg];
    const arrImg = [...listsImgUpload];
    setListsImg(
      arr.filter((e, index) => {
        return index != imgIndex;
      })
    );
    setListsImgUpload(
      arrImg.filter((e, index) => {
        return index != imgIndex;
      })
    );
  };

  const showListsImg = listsImg.map((e, index) => {
    return (
      <Grid
        item
        lg={3}
        style={{ width: "100%", height: "150px" }}
        className="Wrap-add-product"
      >
        <img
          src={e}
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
            />
          </Grid>
          <Grid item lg={4} md={4}>
            <SelectCategory
              data={arrCategory}
              handleChange={handleChangeCategory}
            />
          </Grid>
          <Grid item lg={4} md={4}>
            <SubCategorySelect
              data={subCategory}
              handleChange={handleChangeSubCategory}
            />
          </Grid>
          <Grid item lg={4} md={4}>
            <BranchSelect data={arrBranch} handleChange={handleChangeBranch} />
          </Grid>
          <Grid item lg={4} md={4}>
            <TextField
              id="outlined-basic"
              label="Product Code"
              name="code"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={handleChangeInput}
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
            />
          </Grid>
          <Grid item lg={12} md={12}>
            <hr />

            <div className="news-editor mt-2">
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
            />
          </Grid>
        </Grid>
        <div className="btn-save">
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

import React, { useState } from "react";
import Wizard from "../components/Forms/Wizard/Wizard";
import { Alert, Card, Row, Tab, Tabs } from "react-bootstrap";
import TextField from "../components/TextField";
import { Form, Formik } from "formik";
import { SketchPicker } from "react-color";

const VariationOptions = ({
  setShow,
  setShowOptions,
  hasColor,
  setHasColor,
  hasSize,
  setHasSize,
  setProductVariationList,
}) => {
  const [color, setColor] = useState("FAF5F5");
  const [offer, setOffer] = useState({ checked: false });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const [formikFileArray, setFormikFileArray] = useState([]);

  const handleVariationImageChange = async (e, formik) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));

      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }

    const files = Array.from(e.target.files).map((file) => file);

    console.log(files);

    Array.from(e.target.files).forEach((file) => {
      formikFileArray.push(file);
    });

    console.log(formikFileArray);

    formik.setFieldValue("images", formikFileArray);
  };

  const renderPhotos = (source, formik) => {
    return source.map((photo, index) => {
      return (
        <div className="col w-100">
          <Card
            className="my-2 p-1 rounded"
            style={{ height: "180px", objectFit: "contain" }}
          >
            <Card.Img
              style={{ height: "170px", objectFit: "contain" }}
              src={photo}
              variant="top"
              key={photo}
            />
            <button
              onClick={(e) =>
                handleRemoveVariationImage(
                  e,
                  source[index],
                  index,
                  source,
                  formikFileArray,
                  formik
                )
              }
              type="button px-1"
              className="btn btn-white text-danger rounded fs-3"
              style={{ position: "absolute" }}
            >
              <i className="bx bx-trash"></i>
            </button>
          </Card>
        </div>
      );
    });
  };

  const handleRemoveVariationImage = (
    e,
    fileToRemove,
    index,
    source,
    formikFileArray,
    formik
  ) => {
    e.preventDefault();

    source = source.filter((fileName) => fileName !== fileToRemove);
    console.log(source);
    formikFileArray.filter((fileName) => fileName !== fileToRemove);

    setSelectedFiles(source);
    const files = Array.from(formikFileArray).filter((file, i) => index !== i);
    formik.setFieldValue("images", files);
    console.log(files);
    setFormikFileArray(files);
    //console.log(fileimages);
  };

  const addToVariationList = (e, formik) => {
    e.preventDefault();
    formik.setFieldValue("blobImage", selectedFiles);
    setProductVariationList((prev) => [...prev, formik.values]);
    formik.setFieldValue("price", "");
    formik.setFieldValue("offerprice", "");
    formik.setFieldValue("stocks", "");
    formik.setFieldValue("color_name", "");
    formik.setFieldValue("color_value", "");
    formik.setFieldValue("hasoffer", "");
    formik.setFieldValue("size_value", "");
    setFormikFileArray([]);
    setSelectedFiles([]);
    formik.setFieldValue("images", []);
  };

  const handleSaveVariation = (e, formik) => {
    if (
      formik.values.images.length === 0 ||
      formik.values.price === "" ||
      formik.values.stocks === "" ||
      (formik.values.color_name !== "" && formik.values.color_value === "") ||
      (hasColor.checked === true && formik.values.color_name === "") ||
      (hasSize.checked === true && formik.values.size_value === "") ||
      (offer.checked === true && formik.values.offerprice === "")
    ) {
      setShowAlert(true);
      setTimeout(() => {
        // ***
        setShowAlert(false); // *** If you want to clear the error message as well
      }, 5000);
    } else {
      addToVariationList(e, formik);
      setShow(false);
      setShowAlert(false);
      setColor("");
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        images: [],
        price: "",
        offerprice: "",
        stocks: "",
        color_name: "",
        color_value: "",
        hasoffer: "",
        size_value: "",
      }}
      onSubmit={(values, { resetForm }) => {}}
    >
      {(formik) => (
        <Form>
          <Tabs
            defaultActiveKey="details"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="details" title="DETAILS">
              <div>
                <div>
                  <div className="row g-3">
                    <div className="my-4">
                      <label
                        style={{ cursor: "pointer" }}
                        className="text-nowrap border shadow py-3 px-4 bg-white text-success add-photo rounded w-100"
                        htmlFor="file"
                      >
                        <i className="bx bx-image-add my-5 mx-4"> </i>
                      </label>
                    </div>
                    <div className="col">
                      <input
                        name="images"
                        type="file"
                        id="file"
                        multiple
                        onChange={(e) => handleVariationImageChange(e, formik)}
                      />
                      <div className="result">
                        <Row>{renderPhotos(selectedFiles, formik)}</Row>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <TextField
                        className="form-control shadow-none rounded"
                        label="Price"
                        name="price"
                        type="number"
                      />
                    </div>
                    <div className="col-md-6">
                      <TextField label="Stock" name="stocks" type="number" />
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                          checked={offer.checked}
                          onChange={(d) => {
                            offer.checked === true ? (d = false) : (d = true);
                            setOffer({ checked: d });
                            formik.setFieldValue("hasoffer", d);
                          }}
                        />
                        {console.log(formik.values)}
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckDefault"
                        >
                          Has Offer
                        </label>
                      </div>
                    </div>
                    {offer.checked ? (
                      <div className="col-md-6">
                        <TextField
                          label="Offer Price"
                          name="offerprice"
                          type="number"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </Tab>

            <Tab eventKey="choose" title={"SIZE & COLOR"}>
              <div className="row g-3 mx-1">
                {hasColor.checked ? (
                  <div className="col-md-6">
                    <TextField
                      label="Color Name"
                      name="color_name"
                      type="text"
                    />
                  </div>
                ) : (
                  ""
                )}

                {hasSize.checked ? (
                  <div className="col-md-6">
                    <TextField label="Size" name="size_value" type="text" />
                  </div>
                ) : (
                  ""
                )}
              </div>
              {hasColor.checked ? (
                <div className="row g-3 mx-1">
                  <div className="col-md-6">
                    <SketchPicker
                      color={color}
                      onChange={(updatedColor) => {
                        setColor(updatedColor.hex);
                        formik.setFieldValue("color_value", updatedColor.hex);
                      }}
                      width="300px"
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      className={`form-control shadow-none rounded`}
                      style={{ backgroundColor: `${color}` }}
                    ></input>
                  </div>
                </div>
              ) : (
                ""
              )}
            </Tab>
          </Tabs>
          <div className="d-flex justify-content-end my-5">
            <div>
              <button
                className="text-nowrap btn btn-outline-success mx-2 rounded p-3 my-2"
                onClick={(e) => {
                  e.preventDefault();
                  handleSaveVariation(e, formik);
                }}
              >
                Save Variation
              </button>
            </div>
          </div>
          {showAlert ? (
            formik.values.images.length === 0 ? (
              <Alert variant="danger">image required</Alert>
            ) : formik.values.price === "" ? (
              <Alert variant="danger">price required</Alert>
            ) : formik.values.stocks === "" ? (
              <Alert variant="danger">stock is required</Alert>
            ) : formik.values.color_name !== "" &&
              formik.values.color_value === "" ? (
              <Alert variant="danger">select a color</Alert>
            ) : hasColor.checked === true && formik.values.color_name === "" ? (
              <Alert variant="danger">color is required</Alert>
            ) : hasSize.checked === true && formik.values.size_value === "" ? (
              <Alert variant="danger">size is required</Alert>
            ) : offer.checked === true && formik.values.offerprice === "" ? (
              <Alert variant="danger">offer price required</Alert>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Form>
      )}
    </Formik>
  );
};

export default VariationOptions;

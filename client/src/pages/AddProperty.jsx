import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar";
import Container from "react-bootstrap/esm/Container";
import { useEffect } from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";

import { json, Navigate, useNavigate } from "react-router-dom";

function AddProperty() {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
  });

  let navigate = useNavigate();

  // const [showAlert, setShowAlert] = useState(false);
  // const [alertVariant, setAlertVariant] = useState("success");
  // const [alertMessage, setAlertMessage] = useState("Data berhasil disimpan");

  // const [amenities, setAmenities] = useState([]); //Store all category data
  // const [amenitiesId, setAmenitiesId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    image: "",
    nameProperty: "",
    city: "",
    address: "",
    price: "",
    typeOfRent: "",
    amenities: [],
    bedroom: "",
    bathroom: "",
    description: "",
  });

  // Handle change data on form
  const handleChange = (e) => {
    // setForm({
    //   ...form,
    //   [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    // });

    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let newAmenities = [...form.amenities];
      if (checked) {
        newAmenities.push(value);
      } else {
        newAmenities = newAmenities.filter((amen) => amen !== value);
      }
      setForm({ ...form, amenities: newAmenities });
    } else {
      setForm({
        ...form,
        [name]: type === "file" ? e.target.files : e.target.value,
      });
    }

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      console.log("ini data blob", url);
      setPreview(url);
    }
  };

  // Create function for handle insert product data with useMutation here ...
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      console.log("ini data rumahmu", form);
      const formData = new FormData();
      formData.append("image", form.image[0]);
      formData.append("name", form.nameProperty);
      formData.append("city_name", form.city);
      formData.append("address", form.address);
      formData.append("price", form.price);
      formData.append("amenities", JSON.stringify(form.amenities));
      formData.append("type_rent", form.typeOfRent);
      formData.append("bedroom", form.bedroom);
      formData.append("bathroom", form.bathroom);
      formData.append("description", form.description);

      const response = await API.post("/house", formData);
      console.log("berhasil menambahkan property", response);
      alert("data berhasil ditambahkan!");
      navigate(`/home-owner`);
      // setShowAlert(true);
    } catch (err) {
      console.log("gagal upload product", err);
      console.log(form.amenities);
      alert("gagal upload property!");
      // setAlertVariant("danger");
      // setAlertMessage("Data gagal disimpan");
      // setShowAlert(true);
    }
  });

  return (
    <>
      {/* {showAlert && (
      <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
        {alertMessage}
      </Alert>
    )} */}
      <Navbar />
      <Container className="w-75 mb-5" style={{ marginTop: "150px" }}>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          {preview && (
            <div className="mb-2">
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
                alt={preview}
              />
            </div>
          )}
          <Button>
            <input
              type="file"
              id="upload"
              name="image"
              hidden
              onChange={handleChange}
            />
            <label for="upload" className="label-file-add-product">
              Upload file
            </label>
          </Button>
          <Form.Group
            className="mb-3"
            controlId="nameProperty"
            onChange={handleChange}
          >
            <Form.Label className="fw-bold">Name Property</Form.Label>
            <Form.Control
              name="nameProperty"
              className="bgad"
              type="text"
              value={form.nameProperty}
            />
          </Form.Group>
          <Form.Group className="mb-3 " controlId="address">
            <Form.Label className="fw-bold">Address</Form.Label>
            <Form.Control
              onChange={handleChange}
              className="rs bgad"
              as="textarea"
              name="address"
              style={{ height: "80px" }}
              value={form.address}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Price">
            <Form.Label className="fw-bold">Price</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="price"
              className="bgad"
              type="text"
              value={form.price}
            />
          </Form.Group>

          <Form.Label className="fw-bold">Amenities</Form.Label>
          <Form.Group className="mb-3 d-flex gap-5" controlId="amenities">
            <Form.Check
              onChange={handleChange}
              checked={form.amenities.includes("Furnished")}
              value="Furnished"
              type="checkbox"
              label="Furnished"
            />
            <Form.Check
              onChange={handleChange}
              checked={form.amenities.includes("Pet Allowed")}
              value="Pet Allowed"
              type="checkbox"
              label="Pet Allowed"
            />
            <Form.Check
              onChange={handleChange}
              checked={form.amenities.includes("Shared Accomodation")}
              value="Shared Accomodation"
              type="checkbox"
              label="Shared Accomodation"
            />
            {/* <Form.Check type="checkbox" label="Furnished" /> */}
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label className="fw-bold">City</Form.Label>
            <Form.Select
              onChange={handleChange}
              className="bgad"
              name="city"
              aria-label="Default select example"
            >
              <option></option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
              <option value="Semarang">Semarang</option>
              <option value="Surabaya">Surabaya</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="typeOfRent">
            <Form.Label className="fw-bold">Type of Rent</Form.Label>
            <Form.Select
              onChange={handleChange}
              className="bgad"
              name="typeOfRent"
              aria-label="Default select example"
            >
              <option></option>
              <option value="Year">Day</option>
              <option value="Year">Month</option>
              <option value="Month">Year</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 " controlId="bedroom">
            <Form.Label className="fw-bold">Bedroom</Form.Label>
            <Form.Select
              onChange={handleChange}
              className="bgad"
              name="bedroom"
              aria-label="Default select example"
            >
              <option></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 " controlId="bathroom">
            <Form.Label className="fw-bold">Bathroom</Form.Label>
            <Form.Select
              onChange={handleChange}
              className="bgad"
              name="bathroom"
              aria-label="Default select example"
            >
              <option></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="2">5</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 " controlId="description">
            <Form.Label className="fw-bold">Description</Form.Label>
            <Form.Control
              onChange={handleChange}
              className="rs bgad"
              as="textarea"
              name="description"
              style={{ height: "80px" }}
              value={form.description}
            />
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button
              style={{ padding: "8px 100px" }}
              variant="primary"
              type="submit"
            >
              Save
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default AddProperty;

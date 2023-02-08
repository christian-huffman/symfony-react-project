import "./register.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(6, "Password must be at least 6 characters"),
});

export default function Register(props) {
  const handleFormSubmit = (values) => {
    axios
      .post(`http://localhost:8000/api/register`, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        window.alert(`Succesfully registered 
          id: ${response.data.id},
          email: ${response.data.email},
          password: ${response.data.password}
        `);
      })
      .catch((errors) => {
        window.alert("Failed, please check the console errors.");
        console.error("errors", errors);
      });
  };
  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        enableReinitialize={true}
        initialValues={{ email: "", password: "" }}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="register">
            <div className="form">
              <form noValidate onSubmit={handleSubmit}>
                <span>Register User</span>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email"
                  className="form-control inp_text"
                  id="email"
                />
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                <button type="submit">Register</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

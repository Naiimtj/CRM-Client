import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Forms = ({ client, load }) => {
  //-POST FORM REDIRECTION
  const navigate = useNavigate();
  //-VALIDATION ERRORS
  const newClientSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name is too short")
      .max(20, "The name is too long")
      .required("Client Name is Required"),
    surname: Yup.string()
      .min(3, "Surname is too short")
      .max(20, "The surname is too long")
      .required("Client surname is Required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    birthdate: Yup.date().required("Birthdate is required"),
  });
  //-API DATABASE
  const handleSubmit = async (valores) => {
    try {
      let respuesta;
      if (client.id) {
        //-EDITING RECORD
        const url = `${import.meta.env.VITE_API_URL}/${client.id}`;
        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        //-NEW REGISTRATION
        const url = import.meta.env.VITE_API_URL;
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      await respuesta.json();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  //-
  return load ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {client?.nombre ? "Edit Client" : "Add Client"}
      </h1>
      <Formik
        initialValues={{
          name: client?.name ?? "",
          surname: client?.name ?? "",
          email: client?.email ?? "",
          birthdate: client?.birthdate ?? "",
          notes: client?.notes ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={newClientSchema}
      >
        {({ errors, touched }) => {
          // console.log(data);
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                  Name:
                </label>
                <Field
                  id="name"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Customer Name"
                  name="name"
                />
                {errors.name && touched.name ? (
                  <Alerta>{errors.name}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="Surname">
                  Surname:
                </label>
                <Field
                  id="surname"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Customer Surname"
                  name="surname"
                />
                {errors.surname && touched.surname ? (
                  <Alerta>{errors.surname}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  E-mail:
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Customer Email"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="birthdate">
                  Birthdate:
                </label>
                <Field
                  id="birthdate"
                  type="date"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  name="birthdate"
                />
                {errors.birthdate && touched.birthdate ? (
                  <Alerta>{errors.birthdate}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notes">
                  Notes:
                </label>
                <Field
                  as="textarea"
                  id="notes"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Customer Notes"
                  name="notes"
                />
              </div>
              <input
                type="submit"
                value={client?.name ? "Edit Client" : "Add Client"}
                className="mt-5 w-full bg-blue-800 text-white uppercase font-bold text-lg hover:bg-blue-700"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Forms.defaultProps = {
  client: {},
  load: false,
};

export default Forms;

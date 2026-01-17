import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { addUser, updateUser } from "../../service/apis/user.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  DOB: string;
  password?: string;
  profileImage: string | null;
  maritalStatus: string;
  gender: string;
  role: string;
  careerId: string;
}
export const useAddUser = (id?: string) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form validation schema
  const validationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Enter valid 10-digit phone number")
      .required("Phone number is required"),
    DOB: yup.string().required("Date of birth is required"),
    gender: yup.string().required("Gender is required"),
    maritalStatus: yup.string().required("Marital status is required"),
    role: yup.string().required("Role is required"),
    careerId: yup.string().when("role", {
      is: "agency",
      then: (schema) => schema.required("Career is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    password: id
    ? yup.string().notRequired()
    : yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
  });

  // Formik setup
  const addUserFormik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profileImage: null,
      DOB: "",
      maritalStatus: "",
      gender: "",
      phoneNumber: "",
      role: "",
      careerId: ""
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values.profileImage);
      setLoading(true);
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("DOB", values.DOB);
      formData.append("maritalStatus", values.maritalStatus);
      formData.append("gender", values.gender);
      formData.append("role", values.role);
      if (values.role === "agency") {
        formData.append("careerId", values.careerId);
      }
      if (values.profileImage) {
        formData.append("profileimageurl", values.profileImage);
      }
      for (let pair of formData.entries()) {
        console.log(
          pair[0] + ": " + (pair[1] instanceof File ? pair[1].name : pair[1])
        );
      }
      try {
        if (id) {
          const response = await updateUser(id, formData);
          if (response.status === 200) {
            toast.success(response.message);
            navigate("/admin/users");
          }
        } else {
          formData.append("email", values.email);
          if (values.password && values.password.trim() !== "") {
            formData.append("password", values.password);
          }
          const response = await addUser(formData);
          if (response.status === 200) {
            toast.success(response.message);
            resetForm();
            navigate("/admin/users");
          }
        }
      } catch (error) {
        console.log("An error occurred while saving the user.");
      } finally {
        setLoading(false);
      }
    },
  });
  return {
    addUserFormik,
    loading,
  };
};

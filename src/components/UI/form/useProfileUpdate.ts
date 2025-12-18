import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { updateProfile } from "../../../service/apis/user.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/auth.store";

interface FormValues {
  firstName: string;
  lastName: string;
  DOB: Date | null;
  maritalStatus: string;
  gender: string;
  phoneNumber: string;
  email: string;
}
export const useProfileUpdate = () => {
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    DOB: yup.date().required("Birthday is required"),
    maritalStatus: yup.string().required("Marital Status is required"),
    gender: yup.string().required("Gender is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
  });

  // Formik setup
  const addProfileFormik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      DOB: null,
      maritalStatus: "",
      gender: "",
      phoneNumber: "",
      email: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      const bodyData = {
        firstName: values.firstName,
        lastName: values.lastName,
        DOB: values.DOB,
        maritalStatus: values.maritalStatus,
        gender: values.gender,
        phoneNumber: values.phoneNumber,
        email: values.email,
      };
      try {
        const response = await updateProfile(bodyData);
        toast.success("Profile updated successfully");
        dispatch(setUser(response.userData));
      } catch (error) {
        console.log("An error occurred while updating the profile.");
      } finally {
      }
    },
  });
  return {
    addProfileFormik,
  };
};

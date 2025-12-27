import { useEffect, useState } from "react";
import Input from "../input/Input";
import form from "./formcus.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useProfileUpdate } from "./useProfileUpdate";
import Select from "react-select";
import Avatar from "../../../../src/assets/images/avatar.jpg";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/auth.store";
import toast from "react-hot-toast";
import { updateProfileImage } from "../../../service/apis/user.api";
import GoogleAutoComplete from "../../../layout/GoogleAutoComplete";

const FormCus = () => {
  const { addProfileFormik } = useProfileUpdate();
  const user = useSelector((state: RootState) => state.authSlice.user);
  const [preview, setPreview] = useState(Avatar);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      addProfileFormik.setValues({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        DOB: user.DOB,
        maritalStatus: user.maritalStatus || "",
        gender: user.gender || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || ""
      });
      setPreview(user.profileimageurl);
    }
  }, [user]);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Update preview
      handleUpload(file);
    }
  };

  const handleUpload = async (file: any) => {
    if (!file) {
      alert("Please select an image file first.");
      return;
    }
    const formData = new FormData();
    formData.append("profileimageurl", file);
    //console.log(file);
    try {
      const response = await updateProfileImage(formData);
      toast.success("Profile image updated successfully");
      dispatch(setUser(response.userData));
    } catch (error) {
      toast.error("An error occurred while updating the profile.");
    } finally {
    }
  };

  return (
    <div id='editprofile' className={`${form.myprofilewrapper} dashboard-card-global edit-profile-wrap`}>
      <div className='profile-card profileform'>
        <div className="dashboard-card-title">
          <h2>Update Profile</h2>
        </div>

        <div className='profile-picture-upload'>
          <div className='uploadimage'>
            <div className='upimg'>
              <img src={preview} alt='Avatar' />
            </div>
            <div className='upbtn'>
              <input
                className='choosefile'
                type='file'
                accept='image/*'
                onChange={handleFileChange}
              />
              <button className="custom-button">Upload Picture</button>
            </div>
          </div>
        </div>

        <form onSubmit={addProfileFormik.handleSubmit} className=" from-fix-global-wrap" autoComplete='off'>
          <div className={`from-fix-global`}>

            {/* First Name */}
            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='fName'>
                  First Name <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  classes='passwordlabel'
                  type={"text"}
                  id='firstName'
                  placeholder={"Enter your first name"}
                  name='firstName'
                  onChange={addProfileFormik.handleChange}
                  value={addProfileFormik.values.firstName}
                />
                {addProfileFormik.touched.firstName &&
                  addProfileFormik.errors.firstName && (
                    <div className='error'>
                      {addProfileFormik.errors.firstName}
                    </div>
                  )}
              </div>
            </div>

            {/* Last Name */}
            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='lName'>
                  Last Name <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  classes='passwordlabel'
                  type={"text"}
                  id='lastName'
                  placeholder={"Enter your last name"}
                  name='lastName'
                  onChange={addProfileFormik.handleChange}
                  value={addProfileFormik.values.lastName}
                />
                {addProfileFormik.touched.lastName &&
                  addProfileFormik.errors.lastName && (
                    <div className='error'>
                      {addProfileFormik.errors.lastName}
                    </div>
                  )}
              </div>
            </div>

            {/* Email */}
            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='Email'>
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  classes={`passwordlabel ${addProfileFormik.values.email ? 'disabled-input' : ''}`}
                  type={"text"}
                  id='email'
                  placeholder={"Enter your email address"}
                  name='email'
                  onChange={addProfileFormik.handleChange}
                  value={addProfileFormik.values.email}
                  disabled
                />
                {addProfileFormik.touched.email &&
                  addProfileFormik.errors.email && (
                    <div className='error'>{addProfileFormik.errors.email}</div>
                  )}
              </div>
            </div>
            {/* DOB */}
            <div className={form.profileformcol}>
              <div className="formgrp">
                <label htmlFor='dob'>
                  Date of Birth <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  classes={`passwordlabel`}
                  type="date"
                  name="DOB"
                  id='DOB'
                  value={
                    addProfileFormik.values.DOB
                      ? new Date(addProfileFormik.values.DOB)
                        .toISOString()
                        .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    addProfileFormik.setFieldValue(
                      "DOB",
                      e.target.value ? new Date(e.target.value) : null
                    )
                  }
                />
              </div>
            </div>
            {/* Marital Status */}
            <div className={form.profileformcol}>
              <div className="formgrp">
                <label htmlFor='maritial'>
                  Marital Status<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="maritalStatus"
                  value={addProfileFormik.values.maritalStatus}
                  onChange={addProfileFormik.handleChange}
                >
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>

            {/* Gender */}
            <div className={form.profileformcol}>
              <div className="formgrp">
                <label htmlFor='gender'>
                  Gender<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="gender"
                  value={addProfileFormik.values.gender}
                  onChange={addProfileFormik.handleChange}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Phone Number */}
            <div className={form.profileformcol}>
              <div className="formgrp">
                <label htmlFor='phone'>
                  Phone Number<span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  classes='passwordlabel'
                  type={"text"}
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Enter phone number"
                  onChange={addProfileFormik.handleChange}
                  value={addProfileFormik.values.phoneNumber}
                />
              </div>
            </div>

          </div>
          <button className="custom-button mt-20">Save</button>
        </form>
      </div>
    </div>
  );
};
export default FormCus;

import { useEffect, useState } from "react";
import Input from "../UI/input/Input";
import form from "./formcus.module.scss";
import { useAddUser } from "./useAddUser";
import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useParams,useLocation } from "react-router-dom";
import { userDetails } from "../../service/apis/user.api";
import { CareerList } from "../../service/apis/carrer.api";

const UpdateUser = () => {
  const params = useParams();
  const location = useLocation();
  const { id } = params;
  const { addUserFormik, loading } = useAddUser(id);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [careerList, setCareerList] = useState<any[]>([]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchCData = async () => {
      const careerData = await CareerList();
        setCareerList(careerData || []);
    };
    fetchCData();
  }, []);

  useEffect(() => {
  if (addUserFormik.values.role !== "agency") {
    addUserFormik.setFieldValue("careerId", "");
  }
}, [addUserFormik.values.role]);


  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const userData = await userDetails(id);
          if (userData.status === 200) {
            addUserFormik.setValues({
                firstName: userData.userData?.firstName || "",
                lastName: userData.userData?.lastName || "",
                email: userData.userData?.email || "",
                profileImage: userData.userData?.profileimageurl || "",
                DOB: userData.userData?.DOB
                ? userData.userData.DOB.split("T")[0]
                : "",
                maritalStatus: userData.userData?.maritalStatus || "",
                gender: userData.userData?.gender || "",
                phoneNumber: userData.userData?.phoneNumber || "",
                role: userData.userData?.role || "",
                password: "",
                careerId: userData.userData?.careerId || "",
            });
            setImagePreview(userData.userData?.profileimageurl || "");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      addUserFormik.setFieldValue("profileImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div id='editprofile' className={`${form.myprofilewrapper} dashboard-card-global` }>
      <div className='profile-card'>
        <div className={form.profile_flex}>
          <h2>{id ? "Update User" : "Add User"}</h2>
          <Link to='/admin/users'state={{ fromPage: location.state?.fromPage }}>
            <button className="custom-button">Back</button>
          </Link>
        </div>

        <form
          onSubmit={addUserFormik.handleSubmit}
          autoComplete='off'
          className='formadduser from-fix-global-wrap'
        >
          <div className={`${form.profileform}  from-fix-global`}>
            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='Name'>
                  First Name <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  classes='passwordlabel'
                  type={"text"}
                  id='firstName'
                  placeholder={"Enter your first name"}
                  name='firstName'
                  onChange={addUserFormik.handleChange}
                  value={addUserFormik.values.firstName}
                />
                {addUserFormik.touched.firstName &&
                  addUserFormik.errors.firstName && (
                    <div className='error'>{addUserFormik.errors.firstName}</div>
                  )}
              </div>
            </div>

            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='Name'>
                  Last Name <span style={{ color: "red" }}>*</span>
                </label>
                <Input
                  classes='passwordlabel'
                  type={"text"}
                  id='lastName'
                  placeholder={"Enter your last name"}
                  name='lastName'
                  onChange={addUserFormik.handleChange}
                  value={addUserFormik.values.lastName}
                />
                {addUserFormik.touched.lastName &&
                  addUserFormik.errors.lastName && (
                    <div className='error'>{addUserFormik.errors.lastName}</div>
                  )}
              </div>
            </div>

            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='Name'>
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                {id ? (
                  <Input
                    classes='passwordlabel'
                    type='text'
                    id='email'
                    name='email'
                    value={addUserFormik.values.email}
                    disabled
                  />
                ) : (
                  <Input
                    classes='passwordlabel'
                    type='text'
                    id='email'
                    placeholder={"Enter your email address"}
                    name='email'
                    onChange={addUserFormik.handleChange}
                    value={addUserFormik.values.email}
                  />
                )}
                {addUserFormik.touched.email && addUserFormik.errors.email && (
                  <div className='error'>{addUserFormik.errors.email}</div>
                )}
              </div>
            </div>

            <div className={form.profileformcol}>
            <div className='formgrp'>
               <label htmlFor='Phone Number'>
                  Phone Number <span style={{ color: "red" }}>*</span>
                </label>
              <Input
                classes='passwordlabel'
                type={"text"}
                name="phoneNumber"
                id='phoneNumber'
                placeholder="Enter phone number"
                onChange={addUserFormik.handleChange}
                value={addUserFormik.values.phoneNumber}
              />
              {addUserFormik.touched.phoneNumber &&
                addUserFormik.errors.phoneNumber && (
                  <div className="error">{addUserFormik.errors.phoneNumber}</div>
                )}
            </div>
          </div>

          <div className={form.profileformcol}>
          <div className='formgrp'>
            <label htmlFor='dob'>
              DOB <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              classes='passwordlabel'
              type="date"
              name="DOB"
              id="DOB"
              onChange={addUserFormik.handleChange}
              value={addUserFormik.values.DOB}
            />
            {addUserFormik.touched.DOB && addUserFormik.errors.DOB && (
              <div className="error">{addUserFormik.errors.DOB}</div>
            )}
          </div>
          </div>

          <div className={form.profileformcol}>
          <div className='formgrp'>
            <label>Gender <span style={{ color: "red" }}>*</span></label>
            <select
              name="gender"
              value={addUserFormik.values.gender}
              onChange={addUserFormik.handleChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {addUserFormik.touched.gender && addUserFormik.errors.gender && (
              <div className="error">{addUserFormik.errors.gender}</div>
            )}
          </div>
        </div>

        <div className={form.profileformcol}>
          <div className='formgrp'>
            <label>Marital Status <span style={{ color: "red" }}>*</span></label>
            <select
              name="maritalStatus"
              value={addUserFormik.values.maritalStatus}
              onChange={addUserFormik.handleChange}
            >
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="domestic Partnership">Domestic Partnership</option>
              <option value="civil Union">Civil Union</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
              <option value="separated">Separated</option>
            </select>
            {addUserFormik.touched.maritalStatus && addUserFormik.errors.maritalStatus && (
              <div className="error">{addUserFormik.errors.maritalStatus}</div>
            )}
          </div>
        </div>

        <div className={form.profileformcol}>
          <div className='formgrp'>
            <label>
              Role <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="role"
              value={addUserFormik.values.role}
              onChange={addUserFormik.handleChange}
            >
            <option value="">Select</option>
              <option value="agency">Agency</option>
              <option value="admin">Admin</option>
            </select>
            {addUserFormik.touched.role && addUserFormik.errors.role && (
              <div className="error">{addUserFormik.errors.role}</div>
            )}
          </div>
        </div>

        {addUserFormik.values.role === "agency" && (
        <div className={form.profileformcol}>
          <div className="formgrp">
            <label>
              Career <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="careerId"
              value={addUserFormik.values.careerId}
              onChange={addUserFormik.handleChange}
            >
              <option value="">Select Insurance Career</option>
              {careerList.map((career) => (
                <option key={career._id} value={career._id}>
                  {career.careerName}
                </option>
              ))}
            </select>

            {addUserFormik.touched.careerId &&
              addUserFormik.errors.careerId && (
                <div className="error">
                  {addUserFormik.errors.careerId}
                </div>
              )}
          </div>
        </div>
      )}


          {id === undefined && (
              <div className={form.profileformcol}>
                <div className='formgrp'>
                  <label htmlFor='password'>
                    Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    classes='passwordlabel updateUser'
                    type={isPasswordVisible ? "text" : "password"}
                    id='password'
                    placeholder={"Enter your password"}
                    name='password'
                    onChange={addUserFormik.handleChange}
                    value={addUserFormik.values.password}
                    autoComplete='new-password'
                    rightIcon={
                      <FontAwesomeIcon
                        icon={isPasswordVisible ? faEyeSlash : faEye}
                        onClick={togglePasswordVisibility}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          bottom: "10px",
                          transform: "translateY(-50%)",
                          right: "15px",
                        }}
                      />
                    }
                  />
                  {addUserFormik.touched.password &&
                    addUserFormik.errors.password && (
                      <div className='error'>
                        {addUserFormik.errors.password}
                      </div>
                    )}
                </div>
              </div>
            )}

            <div className={form.profileformcol}>
              <div className='formgrp'>
                <label htmlFor='profileImage'>Profile Image</label>
                <input
                  type='file'
                  id='profileImage'
                  name='profileImage'
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className='image-preview'>
                    <img
                      src={imagePreview}
                      alt='Preview'
                      width={100}
                      height={100}
                    />
                  </div>
                )}
                {addUserFormik.touched.profileImage &&
                  addUserFormik.errors.profileImage && (
                    <div className='error'>
                      {addUserFormik.errors.profileImage}
                    </div>
                  )}
              </div>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className={`${form.profileformcol} submit-btn-wrap`}>
              {" "}
              <button className="custom-button submit-btn">Save</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;

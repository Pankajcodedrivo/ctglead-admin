import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";

export const careerApi = catchAsync(async (values: any) => {
  const searchQuery = values.search || "";
  const data = await httpsCall.get(
    `/admin/career/get/${values.currentPage}/${values.limit}?search=${searchQuery}`,
    values
  );
  return data;
});

export const CareerList = catchAsync(async () => {
  const response = await httpsCall.get(`/admin/career/clist`);
  return response;
});

export const CareerDetails = catchAsync(async (id: any, values: any) => {
  const response = await httpsCall.get(`/admin/career/edit-career/${id}`);
  return response;
});

export const addCareer = catchAsync(async (values: any) => {
  const data = await httpsCall.post(`/admin/career/add-career`, values);
  return data;
});

export const deleteCareer = catchAsync(async (uid) => {
  const data = await httpsCall.delete(`/admin/career/delete-career/${uid}`);
  return data;
});

export const updateCareer = catchAsync(async (id, values: any) => {
  const data = await httpsCall.patch(`/admin/career/update-career/${id}`, values);
  return data;
});
import axiosClient from "../../../utils/services/AxiosServices";

export const UpdateProfileAPI = async ({data}:any) => {
	return axiosClient.request({
		url: `/users/bulk`,
		method: 'put',
        data: [data]
	});
};
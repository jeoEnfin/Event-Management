
import axiosClient from "../../../utils/services/AxiosServices";

export const GetRegistrationFieldsAPI = async ({expId}:any) => {

	return axiosClient.request({
		url: `profile-fields?pFFormType=expo_${expId}`,
		method: 'get'
	});
};

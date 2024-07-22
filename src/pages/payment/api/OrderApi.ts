import axiosClient from "../../../utils/services/AxiosServices";

export const OrderAPI = async (data:any) => {
	return axiosClient.request({
		url: `order`,
		method: 'post',
        data: data?.data
	});
};

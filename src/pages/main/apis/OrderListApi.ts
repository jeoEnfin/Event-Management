import axiosClient from "../../../utils/services/AxiosServices";
import AsyncStorageUtil from "../../../utils/services/LocalCache";

export const OrderListAPI = async () => {
    const userData = await AsyncStorageUtil.getData('userData');
	return axiosClient.request({
		url: userData ? `order?eoUserId=${userData.uuid}`: `order`,
		method: 'get',
	});
};
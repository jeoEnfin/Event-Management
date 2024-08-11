import axiosClient from "../../../utils/services/AxiosServices";

export const ParticipantApi = async (data:any) => {
    console.log(data.data, 'dataa')
	return axiosClient.request({
		url: `participant/bulk-create`,
		method: 'post',
        data: data?.data
	});
};
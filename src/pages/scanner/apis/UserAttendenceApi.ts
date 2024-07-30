import axiosClient from "../../../utils/services/AxiosServices";

export const UserAttendenceApi = async ({ data, platform }: any) => {
    return axiosClient.request({
        url: `attendance`,
        method: 'post',
        data: {
            payload: data,
            attDeviceInfo: {os: platform}
        }
    });
};
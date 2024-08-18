import axiosClient from "../../../utils/services/AxiosServices";

export const UserAttendenceApi = async ({ data, platform ,eventId}: any) => {
    return axiosClient.request({
        url: `participant/mark-attendance`,
        method: 'post',
        data: {
            payload: data,
            attDeviceInfo: {os: platform},
            expoId: eventId
        }
    });
};
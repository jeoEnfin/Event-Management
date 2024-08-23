import axiosClient from "../../../utils/services/AxiosServices";

export const FetchPaymentSheetParams = async (data: any) => {
    //console.log(data, "payment api API")
    return axiosClient.request({
        url: `stripe/create-checkout-mobile`,
        method: 'post',
        data: data?.data,
        headers: {
            'context': 'admin'
        }
    });
};

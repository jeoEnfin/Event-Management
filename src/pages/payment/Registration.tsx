import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, Keyboard, ActivityIndicator } from 'react-native';
import CustomTextField from '../../components/common/CustomTextField';
import CustomSelector from '../../components/common/CustomSelector';
import { COLORS } from '../../constants';
import Button from '../../components/common/Button';
import CustomFileUpload from '../../components/common/CustomFileUpload';
import axiosClient from '../../utils/services/AxiosServices';
import { generateRandomId } from '../../utils/common';
import AsyncStorageUtil from '../../utils/services/LocalCache';
import { OrderAPI } from './api/OrderApi';
import { useNavigation } from '@react-navigation/native';
import MobileNumberInput from '../../components/common/CustomMobileNumberInput';
import { ParticipantApi } from './api/ParticipentApi';
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/toast/ToastActions';
import CustomDateField from '../../components/common/CustomDateField';
import { FetchPaymentSheetParams } from './api/FetchPaymentSheetParams';
import { config } from '../../utils/config';
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
import { toggleStateAsync } from '../../store/actions';
import OverlayLoader from '../../components/modals/OverlayLoader';
import { Icon } from 'react-native-elements';
import { togglePayment } from './paymentSlice';


interface FormDataItem {
    _id: string;
    pFLabel?: string;
    pFType?: 'input' | 'select' | 'file' | 'phoneNumber' | 'date' | 'datetime'; // Define all possible types here
    pFData?: any;
    pFOrder?: number;
    pFUploadParams?: any;
    pFPlaceholder?: string;
    pFHelperText?: string;
    pFStatus?: number;
    pFFormType?: string;
    pFRequired?: number;
    pFColumName?: string;
    pFDefault?: number;
    pFColumType?: string;
    pFValidation: {
        type?: any;
        regexPattern?: string;
        errorMessage?: string;
    }
}

interface Props {
    data: FormDataItem[];
    eventData?: any;
}

const FormData: React.FC<Props> = ({ data, eventData }) => {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const [formValues, setFormValues] = useState<Record<string, any>>({});
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentKeys, setPaymentKeys] = useState<any>(null);
    const [event, setEvent] = useState<any>(null);
    const [onProgress, setOnProgress] = useState<Record<string, any>>({});
    

    useEffect(() => {
        if (data.length <= 0 && eventData && event !== null) {
            setIsLoading(true);
            if (eventData?.expPrice > 0) {
                if (paymentKeys !== null) {
                    handleSubmit();
                    setIsLoading(false);
                }
            } else {
                handleSubmit();
                setIsLoading(false);
            }
        }
    }, [eventData, paymentKeys, event])

    useEffect(() => {
        if (eventData.expPrice > 0) {
            fetchPaymentSheetParams();
        }
    }, [eventData])

    useEffect(() => {
        createEventData();
    }, [eventData])

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [Keyboard]);

    const handleInputChange = (id: string, value: string) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleSelectChange = (id: string, value: string) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handlePhoneNumberChange = (id: string, value: string) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleFileUpload = (data: any) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [data?.id]: data?.data?.data,
        }));
    };

    const handleDateChange = (id: string, value: string) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const handleDateTimeChange = (id: string, value: string) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };

    const createEventData = async () => {
        const _event = {
            expo: eventData.expName,
            expoCode: eventData.expCode,
            expoPrice: eventData.expPrice,
            expoId: eventData.id,
            expoStartDate: eventData.expStartDate,
            expoEndDate: eventData.expEndDate,
            expoType: eventData.expType,
            expoPaidPrice: eventData.expPrice,
            expoDescription: eventData.expDescription,
            expoMode: eventData.expExpoMode,
            expRegStartType: eventData.expRegistrationStartType,
            expRegEndType: eventData.expRegistrationEndType,
            expRegStartDate: eventData.expRegistrationStartBefore,
            expRegEndDate: eventData.expRegistrationEndBefore,
            expTenantId: eventData.expTenantId
        }
        setEvent(_event);
    };

    const validateForm = (data: any, formValues: any) => {
        for (const field of data) {
            const value = formValues[field.pFColumName || ''];
            if (field.pFRequired !== 0 && (!value || value.trim() === '')) {
                return false;
            }
        }
        return true;
    };

    const fetchPaymentSheetParams = async () => {
        const data = {
            price: eventData.expPrice,
            successUrl: `${config.SERVER_URL}success`,
            cancelUrl: `${config.SERVER_URL}cancel`
        }
        try {
            const response = await FetchPaymentSheetParams({ data })
            if (response) {
                setPaymentKeys(response?.data?.data);
            }
            setIsLoading(false);
        } catch (err: any) {
            setIsLoading(false);
            console.log(err.response, 'err-----')
        };
    };

    const initializePaymentSheet = async () => {
        const user = await AsyncStorageUtil.getData('userData')
        //console.log(user,'ttt---');
        if (paymentKeys) {
            const { error } = await initPaymentSheet({
                merchantDisplayName: "CI, Inc.",
                customerId: paymentKeys?.customer,
                customerEphemeralKeySecret: paymentKeys?.ephemeralKey,
                paymentIntentClientSecret: paymentKeys?.paymentIntent,
                // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
                //methods that complete payment after a delay, like SEPA Debit and Sofort.
                allowsDelayedPaymentMethods: true,
                defaultBillingDetails: {
                    name: user?.data?.displayName,
                }
            });
            if (!error) {
                const paymentResponse = await presentPaymentSheet();
                if (paymentResponse.error) {
                    dispatch(showToast(paymentResponse.error.message, 'error'))
                    setIsLoading(false);
                    return;
                } else {
                    stripCheckout(paymentResponse);
                    console.log('Payment sheet result:', paymentResponse);
                }
                setIsLoading(false);
            } else {
                dispatch(showToast('Failed to initialize Payment Sheet', 'error'))
                setIsLoading(false);
            }
        }

    };

    const openPaymentSheet = async () => {
        initializePaymentSheet();
    };

    const createOrderDetails = async ({ data, userId, orderId }: any) => {
        try {
            const response = await OrderAPI({ data });
            if (response.data) {
                if (!userId && !orderId && !event?.expoId) return;
                let markParticipant = {
                    participants: [{
                        epUserId: userId,
                        epExpoId: event?.expoId,
                        epUserDetails: JSON.stringify(formValues),
                        epOrderid: orderId
                    }]
                }
                try {
                    const _participentMarked = await ParticipantApi({ data: markParticipant });
                    //console.log(_participentMarked, 'Participants')
                    if (_participentMarked) {
                        handleSuccess();
                        navigation.replace('SucessPage', { event: data, details: event });
                    }

                } catch (err: any) {
                    console.log(err, 'errfrom participant');
                    navigation.replace('FailPage');
                }
                setIsLoading(false);
            }
        } catch (err: any) {
            console.log(err.response, 'err, from order api')
            setIsLoading(false);
            navigation.replace('FailPage');
        }
    };

    const stripCheckout = async (res: any) => {
        const orderId = generateRandomId();
        const user = await AsyncStorageUtil.getData('userData')
        let user_id = user?.uuid;
        const data = {
            eoOrderId: orderId,
            eoUserId: user_id,
            eoItemDetails: JSON.stringify(event),
            eoOrderStatus: "completed",
            eoTransactionId: "txn_1234567890",
            eoPaymentResponse: JSON.stringify(res),
            eoLog: ["Log entry 1", "Log entry 2"],
            eoPaymentMode: "card"
        }
        createOrderDetails({ data, userId: user_id, orderId });
    };

    const freeOrder = async () => {
        const orderId = generateRandomId();
        const user = await AsyncStorageUtil.getData('userData')
        let user_id = user?.uuid;
        const data = {
            eoOrderId: orderId,
            eoUserId: user_id,
            eoItemDetails: JSON.stringify(event),
            eoOrderStatus: "completed",
            eoTransactionId: "txn_1234567890",
            eoPaymentResponse: "{}",
            eoLog: ["Log entry 1", "Log entry 2"],
            eoPaymentMode: "free"
        }
        createOrderDetails({ data, userId: user_id, orderId });
    };

    const handleSubmit = () => {
        setIsLoading(true);
        //console.log('Form submitted with values:', formValues);
        const isFormValid = validateForm(data, formValues);
        //console.log(isFormValid, 'isValid');
        if (isFormValid) {
            if (eventData.expPrice > 0) {
                openPaymentSheet();
            } else {
                freeOrder();
            }
        } else {
            dispatch(showToast('Please fill the fields', 'alert'))
            setIsLoading(false);
        }
    };

    const handleSuccess = () =>{
        dispatch(togglePayment());
    }

    const handleUploadComplete = async (result: {
        status: string;
        message: string;
        data: any;
        id: string;
    }) => {
        const _result = await result;
        if (_result) {
            if (_result.status === 'success') {
                handleFileUpload(_result)
            }
        }
    }

    const handleProgress = ({ id, progress, file }: any) => {
        setOnProgress(prev => ({
            ...prev,
            [id]: { progress, file },
        }));
    };

    const renderFormFields = () => {
        return data.map((field) => {
            switch (field.pFType) {
                case 'input':
                    return (
                        <View key={field._id} style={{ marginBottom: 10 }}>
                            <CustomTextField
                                label={field.pFLabel}
                                placeholder={field.pFPlaceholder || ''}
                                validationType={field?.pFValidation?.type || 'text'}
                                regex={field?.pFValidation?.regexPattern || ''}
                                isRequired={field.pFRequired !== 0}
                                customErrorText={field?.pFValidation?.errorMessage || ''}
                                helperText={field?.pFHelperText || ''}
                                value={formValues[field.pFColumName || ''] || ''}
                                onChangeText={(text) => handleInputChange(field.pFColumName || '', text)}
                            />
                        </View>
                    );
                case 'select':
                    return (
                        <View key={field._id} style={{ marginBottom: 10 }}>
                            <CustomSelector
                                label={field.pFLabel}
                                placeholder={field.pFPlaceholder}
                                options={Object.values(field.pFData) || []}
                                selectedValue={formValues[field.pFColumName || ''] || ''}
                                onValueChange={(value: any) => handleSelectChange(field.pFColumName || '', value)}
                            />
                        </View>
                    );
                case 'file':
                    return (
                        <View key={field._id} style={{ marginBottom: 10 }}>
                            <CustomFileUpload
                                label={field.pFLabel}
                                id={field?.pFColumName || ''}
                                fileName={formValues[field.pFColumName || ''] || ''}
                                maxSizeInMB={field?.pFUploadParams?.maxFileSize}
                                allowedTypes={field?.pFUploadParams?.fileType[0] === 'any' ? 'all' : field?.pFUploadParams?.fileType}
                                multiple={field?.pFUploadParams?.multiFile}
                                onFileUploadComplete={handleUploadComplete}
                                uploadPath={eventData.expTenantId ? `uploads/ci/${eventData.expTenantId}/customFilePath/` : config.CUSTOM_PATH}
                                onProgress={handleProgress}
                            />
                        </View>
                    )
                case 'phoneNumber':
                    return (
                        <View key={field._id} style={{ marginBottom: 10 }}>
                            <MobileNumberInput
                                label={field.pFLabel}
                                placeholder={field.pFPlaceholder || ''}
                                helperText={field?.pFHelperText || ''}
                                customErrorText={field.pFValidation?.errorMessage || ''}
                                value={formValues[field.pFColumName || ''] || ''}
                                onChangeText={(text) => handlePhoneNumberChange(field.pFColumName || '', text)}
                            />
                        </View>
                    );
                case 'date':
                    return (
                        <View key={field._id} style={{ marginBottom: 10 }}>
                            <CustomDateField
                                label={field.pFLabel}
                                placeholder={field.pFPlaceholder}
                                validationType={field?.pFData?.dateTimeSettings || 'any'}
                                customErrorText={field.pFHelperText}
                                value={formValues[field.pFColumName || ''] || ''}
                                onChange={(val: any) => handleDateChange(field.pFColumName || '', val)}
                            />
                        </View>
                    );
                case 'datetime':
                    return (
                        <View key={field._id} style={{ marginBottom: 10 }}>
                            <CustomDateField
                                mode='datetime'
                                label={field.pFLabel}
                                placeholder={field.pFPlaceholder}
                                validationType={field?.pFData?.dateTimeSettings || 'any'}
                                customErrorText={field.pFHelperText}
                                value={formValues[field.pFColumName || ''] || ''}
                                onChange={(val: any) => handleDateTimeChange(field.pFColumName || '', val)}
                            />
                        </View>
                    )
                default:
                    return null;
            }
        });
    };

    return (
        <View style={{ justifyContent: 'space-between', height: '100%' }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 25 }} >
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '20%' }}>
                    <Text style={{ fontSize: 32, fontWeight: '600', marginBottom: 6, color: COLORS.text.main }}>{data.length !== 0 ? 'Register Event' : 'Loading...'}</Text>
                    {data.length !== 0 && <Text style={{ fontSize: 14, fontWeight: '400', marginBottom: 28, color: COLORS.text.main }}>Fill the form to Register Event</Text>}
                </View>
                {data && renderFormFields()}
            </ScrollView>
            <View style={{ width: '100%', paddingVertical: 10, backgroundColor: keyboardVisible ? COLORS._background.primary : COLORS._background.main, paddingHorizontal: 22 }}>
                <Button label={eventData.expPrice <= 0 ? "Register" : "Checkout"} buttonClick={handleSubmit} loading={isLoading} />
            </View>
        </View>
    );
};

export default FormData;

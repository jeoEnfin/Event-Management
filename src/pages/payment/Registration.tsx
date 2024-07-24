import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
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


interface FormDataItem {
    _id: string;
    pFLabel?: string;
    pFType?: 'input' | 'select' | 'file'; // Define all possible types here
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
    const [formValues, setFormValues] = useState<Record<string, any>>({});

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

    const handleFileUpload = (id: string) => {
        // Handle file upload logic here if needed
        console.log('File uploaded for field:', id);
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
        try {
            const response = await axiosClient.post('/stripe/create-checkout-session', {
                price: 5,
            })
            console.log(response.data)
        } catch (err: any) {
            console.log(err.response, 'err-----')
        };
    };

    const freeOrder = async () => {
        const orderId = generateRandomId();
        const event = {
            expoId: eventData?.id,
            expoName: eventData?.expName,
        }
        const user = await AsyncStorageUtil.getData('user_details')
        let user_id = user?.uuid;
        const data = {
            eoOrderId: orderId,
            eoUserId: user_id,
            eoItemDetails: JSON.stringify(event),
            eoOrderStatus: "completed",
            eoTransactionId: "txn_1234567890",
            eoPaymentResponse: "{}",
            eoLog: ["Log entry 1", "Log entry 2"],
            eoPaymentMode: "invoice"
        }
        try {
            const response = await OrderAPI({ data });
            if (response.data) {
                navigation.replace('SucessPage', { event: eventData.id });
            }
        } catch (err: any) {
            console.log(err.response.data, 'err------')
        }
    };

    const handleSubmit = () => {
        console.log('Form submitted with values:', formValues);
        const isFormValid = validateForm(data, formValues);
        if (isFormValid){
            if(eventData.expPrice > 0) {
            fetchPaymentSheetParams();
        } else {
            freeOrder();
        }
    } else {
        Alert.alert('Form Submission Error', 'Please fill all Fields')
}
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
                            customErrorText={field.pFHelperText}
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
                            onFileSelect={() => { }}
                            maxSizeInMB={field?.pFUploadParams?.maxFileSize}
                            allowedTypes={field?.pFUploadParams?.fileType}
                            multiple={field?.pFUploadParams?.multiFile}
                        />
                    </View>
                );
            default:
                return null;
        }
    });
};

return (
    <View style={{ padding: 25, justifyContent: 'space-between', height: '100%' }}>
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '20%' }}>
                <Text style={{ fontSize: 32, fontWeight: '600', marginBottom: 6, color: COLORS.text.main }}>Reserve Your Slot</Text>
                <Text style={{ fontSize: 14, fontWeight: '400', marginBottom: 28, color: COLORS.text.main }}>Fill the form to Reserve Your Slot</Text>
            </View>
            {renderFormFields()}
        </ScrollView>
        <View style={{ width: '100%' }}>
            <Button label="Checkout" buttonClick={handleSubmit} />
        </View>
    </View>
);
};

export default FormData;

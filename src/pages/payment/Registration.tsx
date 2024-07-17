import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import CustomTextField from '../../components/common/CustomTextField';
import CustomSelector from '../../components/common/CustomSelector';
import { COLORS } from '../../constants';
import Button from '../../components/common/Button';
import CustomFileUpload from '../../components/common/CustomFileUpload';


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
}

const FormData: React.FC<Props> = ({ data }) => {
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

    const handleSubmit = () => {
        console.log('Form submitted with values:', formValues);
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
                                value={formValues[field._id] || ''}
                                onChangeText={(text) => handleInputChange(field._id, text)}
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
                                selectedValue={formValues[field._id] || ''}
                                onValueChange={(value: any) => handleSelectChange(field._id, value)}
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
        <View style={{ padding: 20 }}>
            <ScrollView >
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: COLORS.text.main }}>Registration</Text>
                    <Text style={{ fontSize: 14, fontWeight: '400', marginBottom: 20, color: COLORS.text.main }}>Please fill out the registration form below</Text>
                </View>
                {renderFormFields()}
                <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <View></View>
                    <View style={{ width: '50%' }}>
                        <Button label="Submit" buttonClick={handleSubmit} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default FormData;

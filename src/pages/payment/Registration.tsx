import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import InputText from '../../components/common/InputText';
import AuthContainer from '../auth/common/AuthContainer';


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
        type?: string;
        regexPattern?: string;
        errorMessage?: string;
    }
}

interface Props {
    data: FormDataItem[];
}

const FormData: React.FC<Props> = ({ data }) => {
    const renderFormFields = () => {
        return data.map((field) => {
            switch (field.pFType) {
                case 'input':
                    return (
                        <View key={field._id} style={{ marginBottom: 10 }}>
                            <InputText
                                placeholder={field.pFPlaceholder || ''}
                                autoComplete={field.pFValidation.type || ''}
                                textSecure={false}
                                errorTxt={field.pFHelperText}
                            />
                        </View>
                    );
                case 'select':
                    return (
                        <View key={field._id} style={{ marginBottom: 10 }}>
                            <Text>{field.pFLabel}</Text>
                            {/* <Picker>
                {field.pFData &&
                  Object.keys(field.pFData).map((key) => (
                    <Picker.Item key={key} label={field.pFData[key]} value={key} />
                  ))}
              </Picker> */}
                            <Text style={{ color: 'gray', fontSize: 12 }}>{field.pFHelperText}</Text>
                        </View>
                    );
                case 'file':
                    return (
                        <View key={field._id} style={{ marginBottom: 10 }}>
                            <Text>{field.pFLabel}</Text>
                            <Button title="Upload File" onPress={() => { }} />
                        </View>
                    );
                default:
                    return null;
            }
        });
    };

    return (
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Registration</Text>
                {renderFormFields()}
                <Button title="Submit" onPress={() => { }} />
            </View>
    );
};

export default FormData;


import { getRoleModules, getUserSession } from "./LocalCache";


export const getModuleAccessRules = async (module: string, _access?: string) => {
    const response = {
        error: false,
        message: "Feature access fetched successfully",
        access: {
        }
    };

    //fetch feature restriction for the account
    const userData = await getUserSession();

    const modules = await getRoleModules(userData.role || 'admin');
    //console.log(modules, "modules")

    //check module name is valid and if so, assign to a variable
    if (typeof modules[module] === "undefined") {
        response.error = true;
        response.message = "Invalid module name";
        return response;
    }
    const moduleObject = modules[module];

    //fetch feature details
    const features = userData?.featureRestrictions;

    //check whether module is connected to any feature
    if (moduleObject.connectedFeature) {
        if (!checkFeatureAvailability(features, moduleObject.connectedFeature)) {
            response.error = true;
            response.message = "This feature is not supported for this account.";
            return response;
        }
    }

    //Compare the role ACL and user ACL; Store it acl valriable 
    const aclObject = { ...userData.roleAcl, ...userData.userAcl };

    const ifModuleNotDefinedInAcl = typeof aclObject[module] === "undefined";

    /*
    * if access is given as input, function checks only the permission of that access, 
    * else it will check all access available in that module
    */
    if (_access) {
        //check module access is valid and if so, assign to a variable
        if (typeof moduleObject["accessRules"][_access] === "undefined") {
            response.error = true;
            response.message = "Invalid module access";
            return response;
        }
        const moduleAccessObject = moduleObject["accessRules"][_access];

        // check whether module access is connected to any feature
        if (moduleAccessObject.connectedFeature) {
            if (!checkFeatureAvailability(features, moduleAccessObject.connectedFeature)) {
                response.error = true;
                response.message = "This feature is not supported for this account.";
                return response;
            }
        }

        /*
        * check module is defined in aclObject. If not return as no permission
        * check module access is present in aclObject. If not return as no permission
        */
        if (ifModuleNotDefinedInAcl || typeof aclObject[module][_access] === "undefined") {
            response.access[_access] = {
                permission: false
            }
            return response;
        }
        response.access[_access] = aclObject[module][_access];
    } else {
        /*
        * moduleAccessObject contains module access objects that satisfy following condition
        * 1. Module access that is not connected with any featureKey
        * 2. Module access that is connected with any featureKey and that feature is available for the account
        */

        const moduleAccessObject: any = {};
        Object.entries(moduleObject["accessRules"]).map(([accessKey, accessRule]: [string, any]) => {
            if (!accessRule.connectedFeature || (accessRule.connectedFeature && checkFeatureAvailability(features, accessRule.connectedFeature))) {
                moduleAccessObject[accessKey] = {
                    permission: (ifModuleNotDefinedInAcl || typeof aclObject[module][accessKey] === "undefined") ? false : aclObject[module][accessKey].permission
                };
            }
        })
        response.access = moduleAccessObject;
    }

    return response;
}

const checkFeatureAvailability = (feature:any, featureKey:any) => {
    if (typeof feature[featureKey] === undefined) {
        return false;
    } else {
        return feature[featureKey]?.active;
    }
}
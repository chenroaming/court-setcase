import Util from '@/libs/util.js';

const service = Util.ajax;

/** 
 * 添加/修改授信合同信息
 */
export function addOrUpdateCtInfo (data) {
    return service({
        url: '/online/part/addOrUpdateCtInfo.jhtml',
        method: 'post',
        data
    });
}

/** 
 * 添加/修改借款合同信息
 */
export function addOrUpdateLoanCtInfo (data) {
    return service({
        url: '/online/part/addOrUpdateLoanCtInfo.jhtml',
        method: 'post',
        data
    });
}

/** 
 * 添加/修改保证合同信息
 */
export function addOrUpdateGcInfo (data) {
    return service({
        url: '/online/part/addOrUpdateGcInfo.jhtml',
        method: 'post',
        data
    });
}

/** 
 * 添加/修改抵押合同信息
 */
export function addOrUpdateMcInfo (data) {
    return service({
        url: '/online/part/addOrUpdateMcInfo.jhtml',
        method: 'post',
        data
    });
}

/** 
 * 添加/修改质押合同信息
 */
export function addOrUpdatePcInfo (data) {
    return service({
        url: '/online/part/addOrUpdatePcInfo.jhtml',
        method: 'post',
        data
    });
}

/** 
 * 查询金融借款合同纠纷要素信息
 */
export function getContractInfo (lawId,partId,infoType) {
    const params = {
        lawId,
        partId,
        infoType
    };
    return service({
        url: '/online/part/getContractInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 获取合同详情
 */
export function getCtInfo (infoType,infoId) {
    const params = {
        infoType,
        infoId
    };
    return service({
        url: '/online/part/getCtInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 删除合同信息
 */
export function delCtInfo (infoType,infoId) {
    const params = {
        infoType,
        infoId
    };
    return service({
        url: '/online/part/delCtInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 获取案件的要素信息
 */
export function getDelCtInfo (lawId) {
    const params = {
        lawId,
    };
    return service({
        url: '/online/part/delCtInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 添加/修改信用卡信息
 */
export function addUpdateCardInfo (data) {
    return service({
        url: '/online/part/addUpdateCardInfo.jhtml',
        method: 'post',
        data
    });
}

/** 
 * 获取partId
 */
export function getPartId (lawCaseId) {
    const params = {
        lawCaseId
    };
    return service({
        url: '/online/part/getPartId.jhtml',
        method: 'GET',
        params
    });
}
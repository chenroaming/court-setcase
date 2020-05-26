import Util from '@/libs/util.js';

const service = Util.ajax;

/** 
 * 添加/修改信用卡信息
 */
export function addUpdateCardInfo (cardId,partCardId,cardNo,contractName,interestAgreement,ldlTime,nowAmount,nowInterest,nowLFee,annualFeeStr,byStagesFeeStr,proAndFee,lateFeeAppointment,bondFeeAppointment,lawyerFeeStr,pFee,annouFee,enFee,anotherApponintment,nowInterestStandard,nowLateFeeStandard,gcInfoIds,cardType,applyCardTime,auditTime,overdrawRateStr,bondFeeStr,lineOfCreditStr) {
    const params = {
        cardId,partCardId,cardNo,contractName,interestAgreement,ldlTime,nowAmount,nowInterest,nowLFee,annualFeeStr,byStagesFeeStr,proAndFee,lateFeeAppointment,bondFeeAppointment,lawyerFeeStr,pFee,annouFee,enFee,anotherApponintment,nowInterestStandard,nowLateFeeStandard,gcInfoIds,cardType,applyCardTime,auditTime,overdrawRateStr,bondFeeStr,lineOfCreditStr
    };
    return service({
        url: '/online/part/addUpdateCardInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 添加/修改其他信息
 */
export function upPartOfCard (partCardId,contractName,signTime,
    joint,mgTime,dvTime,
    reasonContent,ayAmount,securities,ayFee,ayTime,mayTime,
    eayFee,emkTime,endReason,proofName) {
    const params = {
        partCardId,//必传参数
        contractName,signTime,//合同信息等
        joint,mgTime,dvTime,//夫妻共同债务
        reasonContent,ayAmount,securities,ayFee,ayTime,mayTime,//支付令
        eayFee,emkTime,endReason,proofName//终结督促程序
    };
    return service({
        url: '/online/part/upPartOfCard.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 查询保证合同纠纷要素信息
 */
export function getContractInfo (lawId,partId,infoType,cdInfoId,gcIds) {
    const params = {
        lawId,
        partId,
        infoType,
        cdInfoId,
        gcIds
    };
    return service({
        url: '/online/part/getContractInfo.jhtml',
        method: 'GET',
        params
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

/** 
 * 获取全部合同信息
 */
export function getPart (lawId) {
    const params = {
        lawId
    };
    return service({
        url: '/online/part/getPart.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 删除信用卡信息
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
 * 获取单个信用卡详情
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
 * 添加或修改保证合同信息
 */
export function addOrUpdateGcInfo (gcInfoId,name,guarantor,method,guarantorDate,signTime,scope,lawId,partId,cdInfoId) {
    const params = {
        gcInfoId,name,guarantor,method,guarantorDate,signTime,scope,lawId,partId,cdInfoId
    };
    return service({
        url: '/online/part/addOrUpdateGcInfo.jhtml',
        method: 'GET',
        params
    });
}
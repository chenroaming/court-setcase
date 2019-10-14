import Util from '@/libs/util.js';

const service = Util.ajax;

/** 
 * 添加/修改授信合同信息
 */
export function addOrUpdateCtInfo (name,isRelieve,creditGrantor,signTime,periodRange,amount,creditContractId,lawId,partId) {
    const params = {
        name,isRelieve,creditGrantor,signTime,periodRange,amount,creditContractId,lawId,partId
    };
    return service({
        url: '/online/part/addOrUpdateCtInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 添加/修改金融合同要素信息
 */
export function updatePLoan (partOfLoanId,loanTime,paymentTime,overdueRepaymentTime,ldlfTime,ppArrears,interestParam,plInterest,cInterest,nInterest,npInterest,ncdInterest,cioArrears,ldDamages,dExpense,lyFees,ptFee,acFee,adExpense,joint,marriageTime,divorceTime,legalProvisions,lawAndRegulations,preservationCaseNo,preservationRespondent,afpTime,pstAmount,pvtAmountFee,pvtTime,frvTime,PreservationSituation) {
    const params = {
        partOfLoanId,loanTime,paymentTime,overdueRepaymentTime,ldlfTime,ppArrears,interestParam,plInterest,cInterest,nInterest,npInterest,ncdInterest,cioArrears,ldDamages,dExpense,lyFees,ptFee,acFee,adExpense,joint,marriageTime,divorceTime,legalProvisions,lawAndRegulations,preservationCaseNo,preservationRespondent,afpTime,pstAmount,pvtAmountFee,pvtTime,frvTime,PreservationSituation
    };
    return service({
        url: '/online/part/updatePLoan.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 添加/修改借款合同信息
 */
export function addOrUpdateLoanCtInfo (loanCtId,name,borrower,isRelieve,signTime,amount,askTime,repaymentMethod,borrowingRate,penaltyRate,compoundRate,pcAppointment,rpAppointment,vfAppointment,bfAppointment,sendAppointment,lawId,partId) {
    const params = {
        loanCtId,name,borrower,isRelieve,signTime,amount,askTime,repaymentMethod,borrowingRate,penaltyRate,compoundRate,pcAppointment,rpAppointment,vfAppointment,bfAppointment,sendAppointment,lawId,partId
    }
    return service({
        url: '/online/part/addOrUpdateLoanCtInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 添加/修改保证合同信息
 */
export function addOrUpdateGcInfo (gcInfoId,name,guarantor,method,guarantorDate,signTime,scope,lawId,partId) {
    const params = {
        gcInfoId,name,guarantor,method,guarantorDate,signTime,scope,lawId,partId
    }
    return service({
        url: '/online/part/addOrUpdateGcInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 添加/修改抵押合同信息
 */
export function addOrUpdateMcInfo (mcInfoId,name,signTime,ownership,collateral,mortgageRange,mortgageTime,lawId,partId) {
    const params = {
        mcInfoId,name,signTime,ownership,collateral,mortgageRange,mortgageTime,lawId,partId
    }
    return service({
        url: '/online/part/addOrUpdateMcInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 添加/修改质押合同信息
 */
export function addOrUpdatePcInfo (pcInfoId,name,signTime,ownership,pledge,pledgeRange,pledgeTime,lawId,partId) {
    const params = {
        pcInfoId,name,signTime,ownership,pledge,pledgeRange,pledgeTime,lawId,partId
    }
    return service({
        url: '/online/part/addOrUpdatePcInfo.jhtml',
        method: 'GET',
        params
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

// /** 
//  * 添加/修改信用卡信息
//  */
// export function addUpdateCardInfo (data) {
//     return service({
//         url: '/online/part/addUpdateCardInfo.jhtml',
//         method: 'post',
//         data
//     });
// }

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
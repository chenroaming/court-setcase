import Util from '@/libs/util.js';

const service = Util.ajax;

export function saveLawCaseInfo (data) {
    return service({
        url: '/online/lawCase/saveLawCaseInfo.jhtml',
        method: 'post',
        data
    });
}
/** 
 * 修改案件信息
 */
export function updateLawCaseInfo (data) {
    return service({
        url: '/online/lawCase/updateLawCaseInfo.jhtml',
        method: 'post',
        data
    });
}
/** 
 * 获取单个当事人信息
 */
export function getOneLitigant (onlineLitigantId) {
    const params = {
        onlineLitigantId
    };
    return service({
        url: '/online/litigant/getLitigantInfo.jhtml',
        method: 'GET',
        params
    });
}
/** 
 * 添加当事人
 */
export function saveLitigantInfo (params) {
    return service({
        url: '/online/litigant/saveLitigantInfo.jhtml',
        method: 'post',
        params
    });
}
/** 
 * 修改当事人
 */
export function updateLitigantInfo (params) {
    return service({
        url: 'online/litigant/updateLitigantInfo.jhtml',
        method: 'post',
        params
    });
}
/** 
 * 查询常用当事人
 */
export function getCmInfo (pageNum,pageSize) {
    const params = {
        pageNum,
        pageSize
    }
    return service({
        url: '/court/common/getCmInfo.jhtml',
        method: 'get',
        params
    });
}

/** 
 * 添加常用当事人
 */
export function addCommonPerson (params) {
    return service({
        url: '/court/common/addCommonPerson.jhtml',
        method: 'get',
        params
    });
}
/** 
 * 修改常用当事人
 */
export function updateCPInfo (params) {
    return service({
        url: '/court/common/updateCPInfo.jhtml',
        method: 'get',
        params
    });
}

/** 
 * 选择常用当事人
 */
export function optCommonPerson (cpId,onlineLawCaseId,litigantStatus) {
    const params = {
        cpId,
        onlineLawCaseId,
        litigantStatus
    }
    return service({
        url: '/court/common/optCommonPerson.jhtml',
        method: 'get',
        params
    });
}
/** 
 * 删除常用当事人
 */
export function deleteCommonPerson (cpId) {
    const params = {
        cpId
    }
    return service({
        url: '/court/common/deleteCommonPerson.jhtml',
        method: 'get',
        params
    });
}

/** 
 * 添加常用代理人
 */
export function addCommonLawyer (params) {
    return service({
        url: '/court/commonLawyer/addCommonLawyer.jhtml',
        method: 'get',
        params
    });
}
/** 
 * 修改常用代理人
 */
export function updateClInfo (params) {
    return service({
        url: '/court/commonLawyer/updateClInfo.jhtml',
        method: 'get',
        params
    });
}
/** 
 * 查询常用代理人
 */
export function getCLInfo (pageNum,pageSize) {
    const params = {
        pageNum,
        pageSize
    }
    return service({
        url: '/court/commonLawyer/getCLInfo.jhtml',
        method: 'get',
        params
    });
}
/** 
 * 删除常用代理人
 */
export function delCommonLawyer (clId) {
    const params = {
        clId
    }
    return service({
        url: '/court/commonLawyer/delCommonLawyer.jhtml',
        method: 'get',
        params
    });
}
/** 
 * 选择常用代理人
 */
export function optCommonLawyer (onlineLitigantId,clId) {
    const params = {
        onlineLitigantId,
        clId,
    }
    return service({
        url: '/court/commonLawyer/optCommonLawyer.jhtml',
        method: 'get',
        params
    });
}
/**
 * 上传清单模块中的证据
 */
export function uploadEvidenceSingle (file, onlineLawCaseId,eviId) {
    let params = new FormData()
    // for(var i=0;i<file.length;i++){
    //     params.append('file', file[i])
    // }
    params.append('file', file)
    params.append('onlineLawCaseId',onlineLawCaseId)
    params.append('eviId',eviId)
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    var str = '/online/evidenceAttachment/uploadEvidenceSingle.jhtml';
    var strs = encodeURI(str)
    return service.post(strs, params, config)
    // return service({
    //     url: '/qtw/evi/editEvi.jhtml',
    //     method: 'GET',
    //     params
    // });
}

/** 
 * 获取单个代理人信息
 */
export function getLawyerInfo (onlineLawyerId) {
    const params = {
        onlineLawyerId
    };
    return service({
        url: '/online/lawyer/getLawyerInfo.jhtml',
        method: 'GET',
        params
    });
}
/** 
 * 添加代理人
 */
export function saveLawyerInfo (params) {
    return service({
        url: '/online/lawyer/saveLawyerInfo.jhtml',
        method: 'post',
        params
    });
}
/** 
 * 修改代理人
 */
export function updateLawyerInfo (params) {
    return service({
        url: '/online/lawyer/updateLawyerInfo.jhtml',
        method: 'post',
        params
    });
}

/**
 * 上传附件
 */
export function upFiles (file, fileType, onlineLawCaseId, applyType) {
    let params = new FormData()
    params.append('file', file)
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    var str = '/online/evidenceAttachment/upFiles.jhtml?fileType='+fileType+"&onlineLawCaseId="+onlineLawCaseId+ "&applyType="+applyType;
    return service.post(str, params, config)
}

/** 
 * 获取文件列表
 */
export function getFiles (onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    };
    return service({
        url: '/online/evidenceAttachment/getFiles.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 删除证据信息
 */
export function delEvidence (onlineEAId) {
    const params = {
        onlineEAId
    };
    return service({
        url: '/online/evidenceAttachment/delEvidence.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 添加证据信息
 */
export function saveEvidence (eviName,eviPage,eviProve,eviSource,original,onlineEAId) {
    const params = {
        eviName,
        eviPage,
        eviProve,
        eviSource,
        original,
        onlineEAId
    };
    return service({
        url: '/online/evidenceAttachment/saveEvidence.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 法官获取文件列表
 */
export function otherGetFiles (onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    };
    return service({
        url: '/online/evidenceAttachment/otherGetFiles.jhtml',
        method: 'GET',
        params
    });
}
/** 
 * 删除文件
 */
export function delFiles (onlineEAId,onlineLawCaseId) {
    const params = {
        onlineEAId,
        onlineLawCaseId
    };
    return service({
        url: '/online/evidenceAttachment/delFiles.jhtml',
        method: 'post',
        params
    });
}


/** 
 * 下载模板
 */
export function downFiles () {
    return service({
        url: '/online/evidenceAttachment/downFiles.jhtml',
        method: 'GET',
    });
}

/** 
 * 完成立案
 */
export function saveFiles (params) {
    return service({
        url: '/online/evidenceAttachment/saveFiles.jhtml',
        method: 'post',
        params
    });
}

/** 
 * 判断登录的用户有没创建自己的当事人信息
 */
export function userlitigant (onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    };
    return service({
        url: '/online/lawCase/loginUserIsLitigant.jhtml',
        method: 'GET',
        params
    });
}
/** 
 * 确认送达书获取信息
 */
export function getOnlineLitigantInfo (onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    };
    return service({
        url: '/online/lawCase/getOnlineLitigantInfo.jhtml',
        method: 'GET',
        params
    });
}
/** 
 * 获取案件列表
 */
export function onlineLawCaseList (params) {
    return service({
        url: '/online/lawCase/onlineLawCaseList.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 是否有保存过的案件
 */
export function getCaesState (pageNumber = '') {
    const params = {
        pageNumber
    };
    return service({
        url: '/online/lawCase/getLitigantLatelyLawCaseInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 获取保存过的案件信息
 */
export function getOnlineLawCaseEdit (onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    };
    return service({
        url: '/online/lawCase/getOnlineLawCaseEdit.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 获取保存过的当事人信息
 */
export function getLitigantInfo (onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    };
    return service({
        url: '/online/lawCase/getLitigantInfo.jhtml',
        method: 'GET',
        params
    });
}
/** 
 * 删除当事人信息
 */
export function deleteLitigantInfo (onlineLitigantId) {
    const params = {
        onlineLitigantId
    };
    return service({
        url: '/online/litigant/deleteLitigantInfo.jhtml',
        method: 'GET',
        params
    });
}
/** 
 * 获取保存过的代理人信息
 */
export function getLitigantLawyerList (onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    };
    return service({
        url: '/online/lawCase/getLawyerList.jhtml',
        method: 'GET',
        params
    });
}
/** 
 * 删除代理人信息
 */
export function deleteLawyerInfo (onlineLawyerId) {
    const params = {
        onlineLawyerId
    };
    return service({
        url: '/online/lawyer/deleteLawyerInfo.jhtml',
        method: 'GET',
        params
    });
}
/** 
 * 获取保存过的附件信息
 */
export function getFilesList (onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    };
    return service({
        url: '/online/lawCase/getLitigantEvidenceAttachmentList.jhtml',
        method: 'GET',
        params
    });
}

/** 
 *最后提交案件
 */
export function commitCae (onlineLawCaseId,isMediate,mediatePeople,meidatePhone) {
    const params = {
        onlineLawCaseId,
        isMediate,
        mediatePeople,
        meidatePhone
    };
    return service({
        url: 'online/lawCase/commitRegisterLawCase.jhtml',
        method: 'GET',
        params
    });
}


/** 
 * 获取案由
 */
export function briefMenu (briefType) {
    const params = {
        briefType
    };
    return service({
        url: '/online/brief/briefMenu.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 获取起诉方联系人
 */
export function getContacts (onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    };
    return service({
        url: 'online/lawCase/getContacts.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 获取时间轴
 */
export function getTimeline (onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    };
    return service({
        url: '/caselist/judicial_log/getTimeline.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 文书展示
 */
export function getOnlineLawCaseFiles (onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    };
    return service({
        url: '/caselist/judicial_log/getOnlineLawCaseFiles.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 根据案件查询文书下载记录
 */
export function getDiplomsDownloadRecord (onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    };
    return service({
        url: '/online/audit/diploms/getDiplomsDownloadRecord.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 撤诉申请
 */
export function withdrawalApplication (onlineLawCaseId,content,withdrawal) {
    const data = {
        onlineLawCaseId,
        content,
        withdrawal
    };
    return service({
        url: '/online/lawCase/withdrawalApplication.jhtml',
        method: 'post',
        data
    });
}

/** 
 * 获取撤诉申请书
 */
export function getWithdrawalInfo (caseNo) {
    const params = {
        caseNo
    };
    return service({
        url: '/online/lawCase/getWithdrawalInfo.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 获取引调号
 */
export function getMaxCaseNo () {
    return service({
        url: '/online/lawCase/getMaxCaseNo.jhtml',
        method: 'GET',
    });
}

/** 
 * 当事人查看撤诉
 */
export function withdrawalResult (onlineLawCase) {
    const params = {
        onlineLawCase
    };
    return service({
        url: '/online/lawCase/withdrawalResult.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 办理案件撤诉
 */
export function handlingWithdrawal (state,path,reason,onlineLawCaseId) {
    const params = {
        state,
        path,
        reason,
        onlineLawCaseId
    };
    return service({
        url: '/online/lawCase/handlingWithdrawal.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 检测当事人是否有证据
 */
export function findLitigantEvidence (onlineLitigantId) {
    const params = {
        onlineLitigantId
    };
    return service({
        url: '/online/litigant/findLitigantEvidence.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 原件核对接口
 */
// export function checkEvidence (data) {
//     return service({
//         url: '/online/evidenceAttachment/checkEvidence.jhtml',
//         method: 'post',
//         data
//     });
// }

export function checkEvidence (eviId) {
    const params = {
        eviId,
    }
    return service({
        url: '/online/evidenceAttachment/checkEvidence.jhtml',
        method: 'GET',
        params
    });
}

// export function getWithdrawalInfo (caseNo) {
//     const params = {
//         caseNo
//     };
//     return service({
//         url: '/online/lawCase/getWithdrawalInfo.jhtml',
//         method: 'GET',
//         params
//     });
// }

/**
 * 保存证明文件
 */

export function saveOrUpdateProof (Path,proofId) {
    const params = {
        Path,proofId
    }
    return service({
        url: '/online/proof/saveOrUpdateProof.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 查询证明材料
 */

export function getProofInfo (ownType,oneId) {
    const params = {
        ownType,oneId
    }
    return service({
        url: '/online/proof/getProofInfo.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 查询被告角色
 */

export function getRoles (ownType,oneId) {
    const params = {
        ownType,oneId
    }
    return service({
        url: '/online/litigantRole/getRoles.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 更改在线证据原件状态
 */
export function changeOriginal (eviId,oriType,newOriType) {
    const params = {
        eviId,oriType,newOriType
    }
    return service({
        url: '/online/lawCase/changeOriginal.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 案件移送
 */
export function transferOnlineLawCase (params) {
    return service({
        url: '/online/lawCase/transferOnlineLawCase.jhtml',
        method: 'post',
        params
    });
}

/** 
 * 新版案件案由
 */
export function getOnlineBrief (place,parentId) {
    const params = {
        place,
        parentId
    }
    return service({
        url: '/online/brief/getOnlineBrief.jhtml',
        method: 'get',
        params
    });
}

/**
 * 获取子路由
 */
export function getMateBrief (place,briefName = '') {
    const params = {
        place,
        briefName
    }
    return service({
        url: '/online/brief/getMateBrief.jhtml',
        method: 'GET',
        params
    });
}
import Util from '@/libs/util.js';

const service = Util.ajax;

export function caseList (params) {
    return service({
        url: '/online/lawCase/onlineLawCaseList.jhtml',
        method: 'post',
        params
    });
}
/** 
 * 提交审核结果
 */
export function auditOnlineLawCase (params) {
    return service({
        url: '/online/lawCase/auditOnlineLawCase.jhtml',
        method: 'post',
        params
    });
}
/** 
 * 获取列表
 */
export function getJudgeBriefCourt () {
    return service({
        url: '/online/lawCase/getJudgeBriefCourt.jhtml',
        method: 'GET',
    });
}

/** 
 * 获取支付二维码
 */
export function getPath (lawcaseId) {
    const params = {
        lawcaseId
    }
    return service({
        url: '/wxpay/payMoney.jhtml',
        method: 'GET',
        params
    });
}

/** 
 * 上传审查意见的文书
 */
export function uploadFiles (file) {
    const params = {
        file
    }
    return service({
        url: '/online/audit/diploms/uploadFiles.jhtml',
        method: 'POST',
        params
    });
}
/** 
 * 删除审查意见的文书
 */
export function delFiles (filePath) {
    const params = {
        filePath
    }
    return service({
        url: '/online/audit/diploms/delFiles.jhtml',
        method: 'POST',
        params
    });
}

/** 
 * 下载文书
 */
export function downFiles (onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    }
    return service({
        url: '/online/audit/diploms/downFiles.jhtml',
        method: 'GET',
        params
    });
}
/** 
 * 获取委托调解下拉菜单
 */
export function getMediateSort (pid) {
    const params = {
        pid
    }
    return service({
        url: '/caselist/judicial_log/getMediateSort.jhtml',
        method: 'GET',
        params
    });
}
export function generateMediateContent (id) {
    const params = {
        id
    }
    return service({
        url: '/caselist/judicial_log/generateMediateContent.jhtml',
        method: 'GET',
        params
    });
}
/** 
 * 发送司法确认书
 */
export function sendConfirmation (caseNo,confirmationUrl) {
    const params = {
        caseNo,
        confirmationUrl
    }
    return service({
        url: '/caselist/judicial_log/sendConfirmation.jhtml',
        method: 'GET',
        params
    });
}
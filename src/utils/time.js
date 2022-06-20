const formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second]
        .map(formatNumber)
        .join(':')}`;
};

const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : `0${n}`;
};
const timeConvert = timestamp => {
    //num:0 YYYY-MM-DD  num:1  YYYY-MM-DD hh:mm:ss // timestamp:时间戳
    //将时间戳转换成正常时间格式
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return Y + M + D + h + m;
};
const ConvertToDateTime = str => {
    return new Date(str);
};
const formatUnionID = id => {
    return formatTime(ConvertToDateTime(parseInt(id)));
};
const GetErrMsg = errMsg => {
    return errMsg.split(':')[1];
};
const dayOfweek = day => {
    const weekDay = ['周天', '周一', '周二', '周三', '周四', '周五', '周六'];
    return weekDay[day];
};

export {
    formatTime,
    timeConvert,
    ConvertToDateTime,
    dayOfweek,
    GetErrMsg,
    formatUnionID,
};

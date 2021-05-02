/*
 * @file: ctx.helper工具类函数拓展
 * @author: zhaoyuan
 * @copyright:   zhaoyuan
 * @createDate:   2020-02-04 14:21:07
 * @last modified by:   zhaoyuan
 * @last modified time: 2020-03-23 12:58:32
 */
"use strict";

const moment = require("moment");

/**
 * 定义规范
 * 1xx:信息响应类，表示接收到请求并且继续处理
 * 2xx:处理成功响应类，表示动作被成功接收、理解和接受
 * 3xx:重定向响应类，为了完成指定的动作，必须接受进一步处理
 * 4xx:客户端错误，客户请求包含语法错误或者是不能正确执行
 * 5xx:服务端错误，服务器不能正确执行一个正确的请求
 * @see : https://juejin.im/entry/5794c6118ac247005f266b58
 * @type {Object}
 */
const statusCode = {
    200: "请求资源成功",
    201: "同步处理资源的新建或修改成功，返回包含新资源地址的 Location 头",
    202: "资源的新建或修改进入异步",
    204: "不返回响应主体的成功请求的响应，资源删除成功",
    206: "返回部分资源",
    400: "请求资源失败",
    401: "用户信息失效，请重新登录",
    403: "没有访问API权限，访问被禁止",
    404: "资源不存在",
    405: "所请求的 HTTP 方法不允许当前认证用户访问",
    406: "请求的数据格式不存在",
    410: "资源被永久删除",
    415: "请求的媒体类型错误",
    422: "请求理解成功，但是参数验证错误",
    429: "请求频率超限",
    500: "服务器内部错误",
};

// 判断正确率状态码
const accuracyCode = [200, "200", "1", 1, 2000, "2000", true, "true"];

const ctxJSON = ({
    ctx,
    data = null,
    status = 200,
    message = statusCode[status],
}) => {
    ctx.body = {
        message,
        status,
        data,
    };
    ctx.status = status;
};

// 格式化时间
const formatTime = (time, format = "YYYY-MM-DD HH:mm:ss") =>
    moment(time).format(format);

// 获取现在时间戳
const nowTimestamp = () => {
    return +new Date();
};

/**
 * 去重
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
const unique = (arr) => {
    return Array.from(new Set(arr));
};

/**
 * 获取当前路由+方法
 * @param  {[type]} ctx [description]
 * @return {string}     /api/admin/user@get
 */
const getCurRoute = (ctx) => {
    const { request } = ctx;
    const path = request.url.split("?")[0];
    const curRoute = path + "@" + request.method.toLowerCase();
    return curRoute;
};

/**
 * 获取传参过来的token
 * @param  {[type]} ctx [description]
 * @return {string}     token
 */
const getQueryToken = (ctx) => {
    let token = "";
    const { header, query } = ctx;
    if (header && header["x-auth-token"]) {
        token = header["x-auth-token"];
    }
    if (query && query.token) {
        token = query.token;
    }
    if (query && query.Authorization) {
        token = query.Authorization;
    }
    return token;
};

/**
 * @return {Date} 转换后的时间
 * @param {*} [time] 需要转换的时间
 * @param {String} [format] 转换格式
 * @description 转换时间 Date
 */
const getFormatTime = function (time, format = "YYYY-MM-DD") {
    return moment(new Date(time)).format(format);
};

/**
 * @returns {String} 返回拼接后的字符串
 * @param {Array} timelist 聚合的订单创建时间
 */
const getDateAxis = function (timelist) {
    const date = getFormatTime(timelist[0]);
    const start = getFormatTime(timelist[0], "HH:mm:ss");
    const end = getFormatTime(timelist[timelist.length - 1], "HH:mm:ss");

    return `${date}\n${start} - ${end}`;
};

/**
 * 对象数组去重
 * @param {*} data 需要去重的对象数组
 * @param {*} name 选取比较的字段名
 */
const getArrayToheavy = function (data, name = "value") {
    const obj = {}; // 有助于增加遍历效率
    return data.reduce((current, next) => {
        if (!obj[next[name]] && next[name] !== "") {
            obj[next[name]] = true;
            current.push(next);
        }
        return current;
    }, []);
};

/**
 * @return {Array} 合并求和之后的数组
 * @param {Array} [array1] 数组1
 * @param {Array} [array2] 数组1
 * @param {String} [key] 比较的关键字key
 * @param {String} [sumName] 求和的参数
 * @description 数组求并集，并且根据某个字段求和
 */
const getUnionAndSumFromArray = function (
    array1 = [],
    array2 = [],
    key = "name",
    sumName = "value"
) {
    if (array1.length <= 0) {
        return array2;
    }
    if (array2.length <= 0) {
        return array1;
    }
    for (const item of array1) {
        let findIndex;
        const one = array2.find((ss, index) => {
            findIndex = index;
            return ss[key] === item[key];
        });
        if (one) {
            item[sumName] = item[sumName] + one[sumName];
            array2.splice(findIndex, 1);
            findIndex = undefined;
        }
    }
    return [...array1, ...array2];
};

/**
 * @returns 返回解析后的接口入参
 * @param {String} body 入参
 */
const getSearchParams = function (body) {
    if (!body) {
        return {};
    }

    const searchParams = new URLSearchParams(body);
    const params = {};
    // 显示所有的键值对
    for (const item of searchParams.entries()) {
        params[item[0]] = item[1];
    }

    return params;
};

/**
 * @returns 数组去重
 * @param {*} data 一维数组
 */
const getSingleToHeavy = function (data) {
    return Array.from(new Set(data));
};

/**
 * @returns {Array} 返回对象数组 name、value
 * @param {Array} [data] 一维数组
 */
const getArrayToObjectArray = function (data = []) {
    // 不存在直接返回空数组
    if (!data || data.length === 0) {
        return [];
    }

    let result = [];

    data.forEach((item) => {
        if (!item || item === " ") {
            return;
        }
        if (result.filter((i) => i.name === item).length) {
            result = result.map((i) => {
                if (i.name === item) {
                    i.value++;
                }
                return i;
            });
        } else {
            result.push({
                name: item,
                value: 1,
            });
        }
    });

    return result;
};

// 过滤空 name 数组
const getFilterArray = function (data) {
    // 不存在直接返回空数组
    if (!data || data.length === 0) {
        return [];
    }

    const result = [];

    data.forEach((item) => {
        if (!item.name || item.name === " ") {
            return;
        }

        result.push(item);
    });

    return result;
};

// 设置特殊字符匹配
const setSpecialCharacter = function (str) {
    const reg = ["$", "(", ")", "*", "+", ".", "[", "?", "{", "^", "|"];
    const correct = [
        "\\$",
        "\\(",
        "\\)",
        "\\*",
        "\\+",
        "\\.",
        "\\[",
        "\\?",
        "\\{",
        "\\^",
        "\\|",
    ];

    reg.forEach((item, index) => {
        if (str.indexOf(item) !== -1) {
            str = str.replace(new RegExp(`${correct[index]}`), `\\${item}`);
        }
    });

    return str;
};

module.exports = {
    unique,
    ctxJSON,
    formatTime,
    nowTimestamp,
    getCurRoute,
    getQueryToken,
    getFormatTime,
    getDateAxis,
    getArrayToheavy,
    getUnionAndSumFromArray,
    getSearchParams,
    getSingleToHeavy,
    getArrayToObjectArray,
    getFilterArray,
    setSpecialCharacter,
};

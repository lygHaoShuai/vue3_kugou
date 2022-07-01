import request from '../utils/request'

//播放
export const player = (url,id) => {
    return request(url, 'get', id)
}
//轮播图
export const slideshow = (url) => {
    return request(url, 'get')
}

//榜单
export const getSongList = (url) => {
    return request(url, 'get')
}

//榜单
export const newSongList = (url,data) => {
    return request(url, 'get',data)
}

//推荐MV
export const recommendMV = (url,data) => {
    return request(url, 'get', data)
}
//最新MV
export const newMV = (url,data) => {
    return request(url, 'get', data)
}
//MV排行
export const seniorityMV = (url,data) => {
    return request(url, 'get', data)
}

//MV所有
export const allMV = (url,data) => {
    return request(url, 'get', data)
}
export const similarMV = (url,data) => {
    return request(url, 'get',data)
}
//最热电台
export const stationHot = (url,data) => {
    return request(url, 'get', data)
}
//电台分类
export const stationClassify = (url,data) => {
    return request(url, 'get', data)
}
//电台类别
export const radioCategory = (url,data) => {
    return request(url, 'get', data)
}
//所有榜单
export const getSongListAll = (url) => {
    return request(url, 'get')
}
//所有榜单/歌单动态详情
export const getSongDetails = (url,data) => {
    return request(url, 'get',data)
}

// 榜单所有歌曲
export const playlist = (url,data) => {
    return request(url, 'get', data)
}

//热门歌单
export const special = (url,data) => {
    return request(url, 'post',data)
}
//歌单所有歌曲
export const songPlayList = (url,data) => {
    return request(url, 'post', data)
}
//热门歌手
export const singerHot = (url,data) => {
    return request(url, 'get',data)
}
//歌手详情
export const singerThe = (url,data) => {
    return request(url, 'get',data)
}
//歌手歌曲
export const singerSong = (url,data) => {
    return request(url, 'get',data)
}
//歌手专辑
export const singerAlbum  = (url,data) => {
    return request(url, 'get',data)
}
// 相似歌手
export const singerSimilar = (url,data) => {
    return request(url, 'get',data)
}


//全部新碟
export const allDVD = (url,data) => {
    return request(url, 'get',data)
}
//专辑详情
export const album = (url,data) => {
    return request(url, 'get',data)
}

//搜索建议
export const searchSuggest = (url,data) => {
    return request(url, 'get',data)
}
//搜索
export const search = (url,data) => {
    return request(url, 'get',data)
}

//验证码发送
export const sengPhone = (url,data) => {
    return request(url, 'post', data)
}
//校验验证码
export const captchaUpdate = (url,data) => {
    return request(url, 'post', data)
}
//注册账号
export const registerAccount = (url,data) => {
    return request(url, 'post', data)
}
//手机登录
export const phoneUpdate = (url,data) => {
    return request(url, 'post', data)
}




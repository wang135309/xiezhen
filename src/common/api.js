import { fetch } from "./config";

// 登录
export function LOGIN_API(params) {
  return fetch(`/api/user/login`, params, "post");
}
// 手机验证码
export function MOBILE_API(params) {
  return fetch(`/api/other/vcode_mobile`, params, "post");
}
// 升级图片
export function VIP_UPGRADE_API(params) {
  return fetch(`/api/other/vip_upgrade`, params, "post");
}
// 手机验证码
export function GET_COLLECT_API(params) {
  return fetch(`/api/collect/get_collect`, params, "post");
}
// 获取全部权限
export function GET_AUTHORITY(params) {
  return fetch(`/api/authority/get_authority`, params, "post");
}
// 注册
export function REG_API(params) {
  return fetch(`/api/user/register`, params, "post");
}
// 获取用户信息
export function GET_USER_INFO(params) {
  return fetch(`/api/user/info`, params, "post");
}
// 获取广告图片
export function GET_ADVERT_API(params) {
  return fetch(`/api/advert/get_advert`, params, "post");
}
// 获取当前图集下图片
export function GET_COLLECT_PHOTOS_API(params) {
  return fetch(`/api/collect/get_collect_photos`, params, "post");
}
// 获取标签图片
export function GET_COLLECT_BY_TAG_API(params) {
  return fetch(`/api/collect/get_collect_by_tag`, params, "post");
}
// 获取相关图集
export function GET_RELATED_API(params) {
  return fetch(`/api/collect/related`, params, "post");
}
// 获取当前用户对应权限
export function GET_AUTHORITY_API(params) {
  return fetch(`/api/user/get_authority`, params, "post");
}
// 获取邀请人
export function GET_INVITER_API(params) {
  return fetch(`/api/user/get_inviter`, params, "post");
}

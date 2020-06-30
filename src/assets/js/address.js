import addressData from "./address-data.min";

/**
 * 返回所有省份
 */
function getProvince() {
  let data = addressData.filter(item => /[1-9]{2}0000$/.test(item.code));
  data.forEach(item => (item.children = []));
  return data;
}

/**
 * 返回所有城市
 * @param {*} parent 父级
 * @param {*} auto 是否自动级别，不强制三级联动
 */
function getCity(parent, auto) {
  let p = parent.code.substring(0, 2);
  let reg = `^${p}[0-9][1-9]00$`;
  let filter_ = new RegExp(reg);
  let data = addressData.filter(item => filter_.test(item.code));
  data.forEach(item => (item.children = []));
  if (data.length > 0) return data;
  return auto ? getCounty(parent) : [parent];
}

/**
 * 返回所有县/区
 * @param {*} parent 父级id
 */
function getCounty(parent) {
  let p_f = parent.code.substring(0, 3);
  let p_n = parent.code.substring(3, 4);
  let p = p_n === "0" ? `${p_f}1` : `${p_f}${p_n}`;
  let reg = `^${p}[0-9][1-9]$`;
  let filter_ = new RegExp(reg);
  let data = addressData.filter(item => filter_.test(item.code));
  return data;
}

/**
 * 解析地址
 * @param {*} data
 */
function analysisAddress(data) {
  if (!data) return "";
  let address = "";
  try {
    address = JSON.parse(data) || [];
  } catch (error) {
    console.log("地址信息不合规范:" + error);
  }
  // let address = JSON.parse(data) || [];
  if (address instanceof Array && address.length > 0) {
    let [
      province_act = { name: "" },
      city_act = { name: "" },
      county_act = { name: "" }
    ] = address;

    return province_act.code !== city_act.code
      ? province_act.name + " " + city_act.name + " " + county_act.name
      : province_act.name + " " + county_act.name;
  }
  return "";
}

export { getProvince, getCity, getCounty, analysisAddress };

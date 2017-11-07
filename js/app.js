$(document).ready(function () {
  const HOST = 'http://47.95.204.85:3000';
  const TOKEN = '8C107BD0CADD409AB5CE76B89714A475'
  const DEFAULT_QUERY = {date: '2016-12-27', schoolGuid: 'F7127394-40A3-4934-9D8E-BDA27BA0AC78'}

  const PAGE_SIZE = 10
  const PARAM = {
    token: TOKEN,
    personType: 1,
    pageSize: PAGE_SIZE
  }
  function initQueryBody() {
    const searchs = window.location.search.replace('?', '').split('&')
    var body = {}
    searchs.forEach(function (d) {
      const query = d.split('=')
      body[query[0]] = query[1]
    })
    return body
  }
  function initRankData(list) {
    var data = []
    if (Array.isArray(list) && list.length) {
      list.forEach(function (d) {
        data.push({
          name: d.UserName,
          step: d.Steps,
          rank: Number(d.Ranks)
        })
      })
    }
    return data;
  }

  function initRank(url, page) {
    // var query = initQueryBody() || DEFAULT_QUERY
    var query =  DEFAULT_QUERY
    PARAM.date = query.date
    PARAM.schoolGuid = query.schoolGuid
    const param = page ? Object.assign({pageSize: page},PARAM) :  PARAM
    $.post(HOST + url, param, function(res){
      if (res.Code == 0) {
        console.log(initRankData(res.List), 'uuuu')
      }
    },'json');
  }
  initRank('/steps/day', 3)
  initRank('/steps/day')
  initRank('/steps/week')
  initRank('/steps/month')
})
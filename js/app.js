$(document).ready(function () {
  var HOST = 'https://banxuntong.net/API/Steps/';
  var TOKEN = '8C107BD0CADD409AB5CE76B89714A475'
  var DEFAULT_QUERY = {schoolGuid: 'F7127394-40A3-4934-9D8E-BDA27BA0AC78'}

  var PAGE_SIZE = 10
  var PARAM = {
    token: TOKEN,
    personType: 1,
    pageSize: PAGE_SIZE
  }
  function initQueryBody() {
    var searchs = window.location.search.replace('?', '').split('&')
    var body = DEFAULT_QUERY
    searchs.forEach(function (d,i) {
      var query = d.split('=')
      if (query[i] === 'date') {
        body.date = query[1]
      }
      if (query[i] === 'schoolGuid') {
        body.schoolGuid = query[1]
      }
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
  function initRank(url, type, page) {
    var query = initQueryBody()
    var param = PARAM
    if ('date' in param) {
      param.date = query.date
    }
    param.schoolGuid = query.schoolGuid
    if (page) { param.pageSize = page }
    $.ajax({
      url: HOST + url,
      type: 'POST',
      data: param,
      success: function(res) {
        console.log(res, 'data')
        if ( typeof res === 'string') { res = JSON.parse(res) }
        if(res.Code === 0) {
          const data =  initRankData(res.List)
          renderList(data, type)
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('error ' + textStatus + " " + errorThrown);
      }
    })
  }
  function getRankTop(rank) {
    if (rank < 4) {
      switch (rank) {
        case 1:
          return '<div class="sr-col-7"><i role="gold"></i></div> '
          break;
        case 2:
          return '<i role="silver"></i>'
          break;
        case 3:
          return '<i role="copper"></i>'
          break;
      }
    } else {
       return '<div class="sr-col-7 rank-box"><span>'+ rank +'</span></div>'
    }
  }
  function renderList(data, type) {
    if (Array.isArray(data) &&  data.length) {
      if (type === 'top') {
        $('.text').each(function (i) {
          $(this).append('<span>'+ data[i].name +'</span><span>'+ data[i].step +'步</span>')
        })
      } else  {
        var $ul = $('#'+type)
        data.forEach(function (d) {
          var rank =  getRankTop(d.rank)
          var html = '<li class="list-item">' +
              '<div class="sr-col-7">'+ d.name +'</div>' +
              '<div class="sr-col-10">'+ d.step +'步</div> '+
               rank +
              '</li>';
          $ul.append(html)
        })
      }
    }

  }
  initRank('GetStepRanksByDay.ashx', 'top', 3)
  initRank('GetStepRanksByDay.ashx', 'day', 10)
  initRank('GetStepRanksByWeek.ashx', 'week', 10)
  initRank('GetStepRanksByMonth.ashx', 'month', 10)
})
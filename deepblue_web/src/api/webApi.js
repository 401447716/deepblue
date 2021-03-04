const domain = '127.0.0.1:7001'

export default (opt) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://${domain}/${opt.url}`,
      data: opt.data || null,
      type: opt.type || 'GET',
      dataType: opt.dataType || 'JSON',
      contentType: opt.contentType || 'application/json',
      success: function (res) {
        resolve(res)
      }
    })
  })
}

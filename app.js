var request = require('request');
var fs = require('fs');
var http = require('http');
request('http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=f4a75ba9-7721-4363-884d-c3820b0b917c',
function (error, response, body)
{
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  //console.log('body:', body); // Print the HTML for the Google homepage. 
  fs.writeFile('./result.json',body,function(err)
  {
    if(err)
    throw err;
    console.log("save");
    var str = JSON.parse(body);
    
    for (var i =0; i<str.result.results.length;i++){
      const promise = new Promise(function(resolve, reject) {
        var url = str.result.results[i].ImageName;
        var file = fs.createWriteStream("./picture/"+i+".jpg");
        var request = http.get(url, function(response) {
          response.pipe(file);
        });
        resolve(url)
        reject(new Error('error!'))
    }) 
    promise.then((url) => {
      //console.log("download"+i+".jpg");
        return url;
    }).catch((err) => console.log(err.message))
    }
  
  });
});
/*核備文號(Ac_no),期數(St_no),序號(sno),通報類別(AppMode),X座標(X),Y座標(Y),
通報時間(AppTime),施工單位(App_Name),行政區(C_Name),施工位置(Addr),核准施工起日(Cb_Da),
核准施工迄日(Ce_Da),施工時段(Co_Ti),監工(Tc_Ma),監工電話(Tc_Tl),廠商現場施工人員(Tc_Ma3),
現場施工人員手機(Tc_Tl3),挖掘目的(NPurp),逾時原因(DType) */



/*我們可以用 JSON 進行資料交換，方法是用 JSON.stringfy 函數將物件轉成字串，對方收到後再用 JSON.parse 將字串轉回物件就可以了 */





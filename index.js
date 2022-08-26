var express = require('express'); 
var app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors()); 
const fs = require("fs")
var bodyParser = require('body-parser')
var serveIndex = require('serve-index');
const { createClient } = require('@supabase/supabase-js');
var nodemailer = require("nodemailer");
require('dotenv').config();
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors()); 
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
})); 
app.use('/assets', express.static(__dirname + '/assets'), serveIndex(__dirname + '/assets'));
const CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
const imageToBase64 = require('image-to-base64');
const http = require('http');
let process = require('process');
const server = http.createServer(app);
const fetch = require('node-fetch');
const Keyv = require('keyv');
const { json, contentType } = require('express/lib/response');
const supabase = createClient('https://ykolonqgapzhtetlnnkg.supabase.co', process.env.SUPABASE);
const keyv = new Keyv(process.env.MONGODB);
keyv.on('error', err => console.error('Keyv connection error:', err));
var compareToken;
var visitorToken;
var generatedCode;
var changepassuser;
const multer  = require('multer');
const res = require('express/lib/response');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})
var postMan = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  service:'smtp.mail.yahoo.com',
            port: 465,
            service:'yahoo',
            secure: true,
            auth: {
               user: process.env.EMAIL,
               pass: process.env.PASS
            },
  });


app.get("/", function(req, res){
 res.render("login", {"error" : ""})  
  })



app.post("/", function(req, res){
var pass = req.body.pass;
var mail = req.body.email;
let logged = false;
(async () => {
  var totalusers = await keyv.get("TotalUsers");
 if(!totalusers){
   totalusers = 0;
 }
  for(var i = 0; i < totalusers + 1; i++){
    let user = await keyv.get("user" + i)
    if(user){
      user = JSON.parse(user);
      let dbMail = CryptoJS.AES.decrypt(user.email, process.env.SALT).toString(CryptoJS.enc.Utf8)
      if(dbMail == mail){
  var dbpass = CryptoJS.AES.decrypt(user.pass, pass).toString(CryptoJS.enc.Utf8)
  if(dbpass == pass){
    let base = new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });
    var d = new Date(base)
    var ml = d.getMinutes();
    var sl = d.getSeconds();
    if(ml < 10){
      ml = "0" + ml;
    }
    if(sl < 10){
      sl = "0" + sl;
    }

    let lastSeen = wdays[d.getDay()] + ", " + d.getDate() + " de " + meses[d.getMonth()] + " de " + d.getFullYear() + " as " + d.getHours() + ":" + ml + ":" + sl
    lastSeen = CryptoJS.AES.encrypt(lastSeen, process.env.SALT).toString();
    var userJson = {"email":user.email, "username":user.username, "pass": user.pass, "image": user.image, "imagename" : user.imagename ,"roles" : user.roles, "id" : user.id, "lastseen": lastSeen}
    await keyv.set("user" + user.id, JSON.stringify(userJson));
    let username = CryptoJS.AES.decrypt(user.username, process.env.SALT).toString(CryptoJS.enc.Utf8)
    var imageURL= CryptoJS.AES.decrypt(user.image, process.env.SALT).toString(CryptoJS.enc.Utf8)
    var roles = user.roles
    var email = CryptoJS.AES.decrypt(user.email, process.env.SALT).toString(CryptoJS.enc.Utf8)
    var hemail = email.replace(/^(.)(.*)(.@.*)$/,
    (_, a, b, c) => a + b.replace(/./g, '*') + c
);
    var uid = user.id
    logged = true;
    var portifolio = 0;
    const country = {};
    const countries = [];
    const state = {};
    const states = [];
    const city = {};
    const cities = [];
    const os = {};
    const oss = [];
    const lang = {};
    const langs = [];
    const type = {};
    const types = [];
    const dates = [];
    const times = [];
    const totalcity = [];
    const totalcountry = [];
    const totalstate = [];
    const totallangs = [];
    const totalos = [];
    const pages = [];
    const vpn = {};
    const vpns = [];
    const cType = {};
    const cTypes = [];
    const host = {};
    const hosts = [];
    const rawvpn = [];
    const rawcons = [];
    const rawhost = [];
    var totalusers = await keyv.get("TotalUsers");
    var token;
    var basestring = "";
  
            var counternow = await keyv.get("AccessCounter");
            var clicksnow = await keyv.get("ClicksCounter");
            var usernames = []
            var userimages =  []
            var userLastSeens = []
            var userroles = []
           for(var i = 0; i < totalusers+1; i++)
           {
           let user = await keyv.get("user" + i);
         
           if(user){  
           user = JSON.parse(user)
           usernames.push(CryptoJS.AES.decrypt(user.username, process.env.SALT).toString(CryptoJS.enc.Utf8))
           userimages.push(CryptoJS.AES.decrypt(user.image, process.env.SALT).toString(CryptoJS.enc.Utf8))
           userLastSeens.push(CryptoJS.AES.decrypt(user.lastseen, process.env.SALT).toString(CryptoJS.enc.Utf8))
           userroles.push(user.roles)
          }
           else{
            usernames.push(" ");
            userimages.push(" ");
            userLastSeens.push(" ");
            userroles.push(" ");
           }
           }
            if(!clicksnow){
              clicksnow = 0;
            }
            let logsalt = process.env.LOGSALT;
            let pagename;
            if(counternow){
                for(var i = 0; i < counternow; i++){
                alldata = await keyv.get(i+1);  
                alldata = JSON.parse(alldata)
                if(alldata.country){
                countries.push(CryptoJS.AES.decrypt(alldata.country, logsalt).toString(CryptoJS.enc.Utf8));
                totalcountry.push(CryptoJS.AES.decrypt(alldata.country, logsalt).toString(CryptoJS.enc.Utf8));  
                }
                if(alldata.state){
                   states.push(CryptoJS.AES.decrypt(alldata.state, logsalt).toString(CryptoJS.enc.Utf8));
                   totalstate.push(CryptoJS.AES.decrypt(alldata.state, logsalt).toString(CryptoJS.enc.Utf8));  
                }
                if(alldata.city){
                cities.push(CryptoJS.AES.decrypt(alldata.city, logsalt).toString(CryptoJS.enc.Utf8));
                totalcity.push(CryptoJS.AES.decrypt(alldata.city, logsalt).toString(CryptoJS.enc.Utf8)); 
                }
                if(alldata.lang){
                  langs.push(CryptoJS.AES.decrypt(alldata.lang, logsalt).toString(CryptoJS.enc.Utf8));
                  totallangs.push(CryptoJS.AES.decrypt(alldata.lang, logsalt).toString(CryptoJS.enc.Utf8));  
                }
                if(alldata.so){
                   oss.push(CryptoJS.AES.decrypt(alldata.so, logsalt).toString(CryptoJS.enc.Utf8));
                   totalos.push(CryptoJS.AES.decrypt(alldata.so, logsalt).toString(CryptoJS.enc.Utf8));  
                }
                if(alldata.deviceType){
                  types.push(CryptoJS.AES.decrypt(alldata.deviceType, logsalt).toString(CryptoJS.enc.Utf8));
                }
                if(alldata.date){
                  dates.push(CryptoJS.AES.decrypt(alldata.date, logsalt).toString(CryptoJS.enc.Utf8));
                }
                if(alldata.time){
                  times.push(CryptoJS.AES.decrypt(alldata.time, logsalt).toString(CryptoJS.enc.Utf8));
                }
                if(alldata.page){
                  pages.push(CryptoJS.AES.decrypt(alldata.page, logsalt).toString(CryptoJS.enc.Utf8)); 
                  pagename = CryptoJS.AES.decrypt(alldata.page, logsalt).toString(CryptoJS.enc.Utf8);
                }
                if(alldata.VPN){
                  vpns.push(CryptoJS.AES.decrypt(alldata.VPN, logsalt).toString(CryptoJS.enc.Utf8));
                  rawvpn.push(CryptoJS.AES.decrypt(alldata.VPN, logsalt).toString(CryptoJS.enc.Utf8));
                }
                if(alldata.mobile){
                  cTypes.push(CryptoJS.AES.decrypt(alldata.mobile, logsalt).toString(CryptoJS.enc.Utf8));
                 rawcons.push(CryptoJS.AES.decrypt(alldata.mobile, logsalt).toString(CryptoJS.enc.Utf8));
                }
                if(alldata.host){
                 hosts.push(CryptoJS.AES.decrypt(alldata.host, logsalt).toString(CryptoJS.enc.Utf8));
                 rawhost.push(CryptoJS.AES.decrypt(alldata.host, logsalt).toString(CryptoJS.enc.Utf8));
                }                     
                 if(pagename.toLowerCase() == "en" ||pagename.toLowerCase() == "pt"){
                  portifolio ++;
                 }
                
              }
                }else{
                    counternow = 0;
                }
    
                 cnames = countries.filter(function(elem, pos) {
                    return countries.indexOf(elem) == pos;
                })
                enames = states.filter(function(elem, pos) {
                  return states.indexOf(elem) == pos;
              })
              cinames = cities.filter(function(elem, pos) {
                return cities.indexOf(elem) == pos;
            })
            osnames = oss.filter(function(elem, pos) {
              return oss.indexOf(elem) == pos;
          })
          langnames = langs.filter(function(elem, pos) {
            return langs.indexOf(elem) == pos;
        })
        typenames = types.filter(function(elem, pos) {
          return types.indexOf(elem) == pos;
      })
     vpntotal = vpns.filter(function(elem, pos) {
        return vpns.indexOf(elem) == pos;
    })
   ctypetotal = cTypes.filter(function(elem, pos) {
      return cTypes.indexOf(elem) == pos;
  })
  hosttotal = hosts.filter(function(elem, pos) {
    return hosts.indexOf(elem) == pos;
})
                countries.forEach(function (x) { country[x] = (country[x] || 0) + 1; });
                states.forEach(function (x) { state[x] = (state[x] || 0) + 1; });
                cities.forEach(function (x) { city[x] = (city[x] || 0) + 1; });
                oss.forEach(function (x) { os[x] = (os[x] || 0) + 1; });
                langs.forEach(function (x) { lang[x] = (lang[x] || 0) + 1; });
                types.forEach(function (x) { type[x] = (type[x] || 0) + 1; });
                vpns.forEach(function (x) { vpn[x] = (vpn[x] || 0) + 1; });
               cTypes.forEach(function (x) { cType[x] = (cType[x] || 0) + 1; });
               hosts.forEach(function (x) { host[x] = (host[x] || 0) + 1; });
                imageURL = imageURL + "?" + new Date().getTime();
           if(roles.toLowerCase() == "admin"){
            for( ; basestring.length < 50; basestring  += Math.random().toString(36).substr(2));
            token = basestring.substr(0, 50);
            compareToken = token;
            return res.render("index", {"totalcity" : JSON.stringify(totalcity), "homepage" : portifolio, "rawvpn": JSON.stringify(rawvpn), "rawcons": JSON.stringify(rawcons), "rawhost": JSON.stringify(rawhost), "pages": JSON.stringify(pages), "totalstate":  JSON.stringify(totalstate), "totalcountry":  JSON.stringify(totalcountry), "totallangs":  JSON.stringify(totallangs),  "totalos": JSON.stringify(totalos) ,"total": counternow, "countryTotal" : JSON.stringify(country), "countryNames" : JSON.stringify(cnames), "stateTotal" : JSON.stringify(state), "stateNames" : JSON.stringify(enames), "cityTotal" : JSON.stringify(city), "cityNames" : JSON.stringify(cinames), "vpntotal": JSON.stringify(vpn), "vpnusers": JSON.stringify(vpntotal), "hosttotal": JSON.stringify(hosttotal), "host": JSON.stringify(host), "connectionstotal": JSON.stringify(cType), "connections": JSON.stringify(ctypetotal), "dates" : JSON.stringify(dates), "times": JSON.stringify(times) , "osTotal" : JSON.stringify(os), "osNames" : JSON.stringify(osnames), "langTotal" : JSON.stringify(lang), "langNames" : JSON.stringify(langnames), "usersRole": JSON.stringify(userroles),"typeTotal" : JSON.stringify(type), "typeNames" : JSON.stringify(typenames), "interactions" : clicksnow, "username" : username, "avatar" : imageURL, "securityToken" : token, "usernames" : JSON.stringify(usernames), "userimages" : JSON.stringify(userimages), "lss" : JSON.stringify(userLastSeens),"roles" : roles, "email" : email, "hemail" : hemail, "id" : uid})  
        }else if(roles.toLowerCase() == "viewer"){
          var vtoken;
          for( ; basestring.length < 50; basestring  += Math.random().toString(36).substr(2));
            vtoken = basestring.substr(0, 50);
            visitorToken = vtoken;
           return res.render("viewer", {"total": counternow, "homepage" : portifolio, "countryTotal" : JSON.stringify(country),"securityToken" : visitorToken, "countryNames" : JSON.stringify(cnames), "stateTotal" : JSON.stringify(state), "stateNames" : JSON.stringify(enames), "cityTotal" : JSON.stringify(city), "cityNames" : JSON.stringify(cinames) ,"vpntotal": JSON.stringify(vpn), "vpnusers": JSON.stringify(vpntotal), "connectionstotal": JSON.stringify(cType), "connections": JSON.stringify(ctypetotal), "osTotal" : JSON.stringify(os), "osNames" : JSON.stringify(osnames), "langTotal" : JSON.stringify(lang), "langNames" : JSON.stringify(langnames), "hosttotal": JSON.stringify(hosttotal), "host": JSON.stringify(host), "usersRole": JSON.stringify(userroles),"typeTotal" : JSON.stringify(type), "typeNames" : JSON.stringify(typenames), "interactions" : clicksnow, "username" : username, "avatar" : imageURL, "usernames" : JSON.stringify(usernames), "userimages" : JSON.stringify(userimages), "lss" : JSON.stringify(userLastSeens),"roles" : roles, "email" : email, "hemail" : hemail, "id" : uid});  
          }else{
            logged = false;
            res.render("login", {"error" : "Usuário inválido!"})
          }
  }else{
      
  }
      }
    }
  }
    if(logged == false){
      res.render("login", {"error" : "Usuário inválido!"})  
    }
 })();
})

app.post('/edit', upload.single('avatar'), function (req, res) {
  (async () => {
  var userId = req.body.id;
  var email = req.body.email
  var username = req.body.username
  var token = req.body.token;
  var user = await keyv.get("user" + parseInt(userId))
  user = JSON.parse(user);
  var roles = user.roles;
   var id = user.id;
   var pass = user.pass;
   var lastseen = user.lastseen;
   var imagename;
   if(req.file != undefined){ 
    var ext = req.file.mimetype.substr(req.file.mimetype.indexOf('/')+1);
     imagename = id + "." + ext;
     var userImage = user.imagename;
     if(userImage){
       userImage = CryptoJS.AES.decrypt(userImage, process.env.SALT).toString(CryptoJS.enc.Utf8)
     const { a, b } = await supabase
        .storage
        .from('avatars')
        .remove([userImage])
     }
    fs.rename(__dirname + "/uploads/" + req.file.filename, __dirname + "/uploads/" + id + "." + ext, async() => { 
    const imageData = await fs.promises.readFile(__dirname + "/uploads/" + id + "." + ext)
   const { data, error } = await supabase
   .storage
   .from('avatars')
   .upload(id + "." + ext, imageData, {
     cacheControl: '3600',
     upsert: false
   })
   })
     var userimgurl = "https://ykolonqgapzhtetlnnkg.supabase.co/storage/v1/object/public/avatars/" + id + "." + ext;
     userimgurl = CryptoJS.AES.encrypt(userimgurl, process.env.SALT).toString();
     imagename = CryptoJS.AES.encrypt(imagename, process.env.SALT).toString();
 }else{
   var imagename = user.imagename;
   var userimgurl = user.image;
 }  
  

     email = CryptoJS.AES.encrypt(email, process.env.SALT).toString();
     username = CryptoJS.AES.encrypt(username, process.env.SALT).toString();
     
     var totalUsers = await keyv.get("TotalUsers");
     var userJson = {"email":email, "username":username, "pass": pass, "image": userimgurl, "imagename" : imagename ,"roles" : roles, "id" : id, "lastseen": lastseen}
     if(!totalUsers){
       totalUsers = 0;
     }
     if(token == compareToken || token == visitorToken){
      await keyv.set("user" + parseInt(userId), JSON.stringify(userJson))
      res.redirect('/');
     }else{
      res.sendFile(__dirname + "/views/token.html")
     }     
       } )();
     })

app.post("/wipedata", function(req, res){
if(req.body.delete){
  if(req.body.delete == compareToken){
    (async () => {
      var accessize = await keyv.get("AccessCounter");
          for(var i = 0; i < accessize; i++){
          await keyv.delete(i + 1);     
          }
     await keyv.set("AccessCounter", 0);
     await keyv.set("ClicksCounter", 0);
    res.send("reload");
  })();
  }else{
    res.send("Token de sessão inválido!");
  }
}
})

app.post("/analyticsclick", async function(req, res){
  var click = req.body.click;
 var clicks = await keyv.get("ClicksCounter");
  if(click == "true"){
    await keyv.set("ClicksCounter", parseInt(clicks) + 1);
  }else{
    console.log(click); 
  }
})

app.post('/cadastro', upload.single('avatar'), function (req, res) {
 (async () => {
  var totalUsers = await keyv.get("TotalUsers");
  if(!totalUsers){
    totalUsers = 0;
  }
  var id = totalUsers + 1 
var imagename;
  if(req.file != undefined){ 
    var ext = req.file.mimetype.substr(req.file.mimetype.indexOf('/')+1);
    imagename = id + "." + ext;
    fs.rename(__dirname + "/uploads/" + req.file.filename, __dirname + "/uploads/" + id + "." + ext, async() => { 
     const imageData = await fs.promises.readFile(__dirname + "/uploads/" + id + "." + ext)
   
  const { data, error } = await supabase
  .storage
  .from('avatars')
  .upload(id + "." + ext, imageData, {
    cacheControl: '3600',
    upsert: false
  })
 })
    var userimgurl = "https://ykolonqgapzhtetlnnkg.supabase.co/storage/v1/object/public/avatars/" + id + "." + ext;
}else{
  var imagename = " ";
  var userimgurl = "https://ykolonqgapzhtetlnnkg.supabase.co/storage/v1/object/public/avatars/noimage.png"
}
    var pass = req.body.pass
    var token = req.body.tokencadastro
    var email = req.body.email
    var username = req.body.username
    var roles = req.body.roles;
    if(roles != "admin"){
      roles = "viewer"
    }else{
      roles = "Admin"
    }
    email = CryptoJS.AES.encrypt(email, process.env.SALT).toString();
    username = CryptoJS.AES.encrypt(username, process.env.SALT).toString();
    userimgurl = CryptoJS.AES.encrypt(userimgurl, process.env.SALT).toString();
    imagename = CryptoJS.AES.encrypt(imagename, process.env.SALT).toString();
    pass = CryptoJS.AES.encrypt(pass, pass).toString();
    var userJson = {"email":email, "username":username, "pass": pass, "image": userimgurl, "imagename" : imagename ,"roles" : roles, "id" : parseInt(totalUsers) + 1, "lastseen": "nunca ._."}
    if(!totalUsers){
      totalUsers = 0;
    }
    if(token == compareToken){
     await keyv.set("user" + (parseInt(totalUsers) + 1), JSON.stringify(userJson))
     await keyv.set("TotalUsers", parseInt(totalUsers) + 1);
     res.redirect("/")
    }else{
      res.sendFile(__dirname + "/views/token.html")
    }
      } )();
    })
  

  app.post("/deleteuser", function(req, res){
    if(req.body.user){
      if(req.body.token == compareToken){
        (async () => {
       var imagename = JSON.parse(await keyv.get("user" + parseInt(req.body.user))).imagename;
       
      if(imagename){
        imagename = CryptoJS.AES.decrypt(imagename, process.env.SALT).toString(CryptoJS.enc.Utf8)
        const { data, error } = await supabase
        .storage
        .from('avatars')
        .remove([imagename])
      }
      await keyv.delete("user" + parseInt(req.body.user))
      res.send("reload");
      })();
      }else{
        res.send("Token de sessão inválido!");
      }
    }else{
      res.send("Dados insuficientes para a API");
    }
    })

  app.post("/analytics", function(req, res){
    var userIP = req.headers['x-forwarded-for'];

    fetch("http://ip-api.com/json/" + userIP + "?lang=pt-BR&fields=status,message,country,regionName,city,district,isp,org,as,mobile,proxy,hosting")
 .then(function (ipinfo) {
   return ipinfo.json();
 })
 .then(function (ipdata) {
    let json = req.body;
    var city = ipdata.city;
    var region = ipdata.regionName;
    var country = ipdata.country;
    var mobile = ipdata.mobile;
    var vpn = ipdata.proxy; 
    var host = ipdata.hosting; 
    var device = json.deviceType;
    var lang = json.lang;
    var page = json.page;
    let base = new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });
    let d = new Date(base)
    var dateString = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
    var timeString = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
city = city.replace(/[&\/\\#,+(`)$~%.'":;*?<>{}]/g, '');
region = region.replace(/[&\/\\#,+(`)$~%.'":;*?<>{}]/g, '');
country = country.replace(/[&\/\\#,+(`)$~%.'":;*?<>{}]/g, '');
page = page.replace(/[&\/\\#,+(`)$~%.'":;*?<>{}]/g, '');

if(mobile == true){
  mobile = "Dados Móveis";
}else{
  mobile = "Wi-Fi";
}
if(vpn == true){
  vpn = "Sim";
}else{
  vpn ="Não"
}
if(host == true){
  host = "Sim";
}else{
  host ="Não"
}

  const languageNames = new Intl.DisplayNames(['pt-br'], {
    type: 'language'
  });
  if(lang){
language = languageNames.of(lang)
  }
var so = "Desconhecido";
if (device.indexOf("Windows NT 10.0")!= -1) so="Windows 10";
if (device.indexOf("Windows NT 6.3") != -1) so="Windows 8.1";
if (device.indexOf("Windows NT 6.2") != -1) so="Windows 8";
if (device.indexOf("Windows NT 6.1") != -1) so="Windows 7";
if (device.indexOf("Windows NT 6.0") != -1) so="Windows Vista";
if (device.indexOf("Windows NT 5.1") != -1) so="Windows XP";
if (device.indexOf("Windows NT 5.0") != -1) so="Windows 2000";
if (device.indexOf("Mac")            != -1) so="Mac/iOS";
if (device.indexOf("X11")            != -1) so="UNIX";
if (device.indexOf("Linux")          != -1) so="Linux";
if (device.indexOf("Android")          != -1) so="Android";
if (/Mobi|Android/i.test(device)) {
   var dtype = "Móvel"
}else{
    var dtype = "Outros"
}
    (async () => {

var counternow = await keyv.get("AccessCounter");
if(!counternow){
    counternow = 0;
}
let logsalt = process.env.LOGSALT;
    if(city){
      city = CryptoJS.AES.encrypt(city, logsalt).toString();
    }
    if(region){
      region = CryptoJS.AES.encrypt(region, logsalt).toString();
    }
    if(country){
     country = CryptoJS.AES.encrypt(country, logsalt).toString();
    }
    if(dtype){
      dtype = CryptoJS.AES.encrypt(dtype, logsalt).toString();
    }
    if(so){
      so = CryptoJS.AES.encrypt(so, logsalt).toString();
    }
    if(language){
      language = CryptoJS.AES.encrypt(language, logsalt).toString();
    }
    if(timeString){
      timeString = CryptoJS.AES.encrypt(timeString, logsalt).toString();
    }
    if(page){
      page = CryptoJS.AES.encrypt(page, logsalt).toString();
    }
    if(vpn){
      vpn = CryptoJS.AES.encrypt(vpn, logsalt).toString();
    }
    if(mobile){
     mobile = CryptoJS.AES.encrypt(mobile, logsalt).toString();
    }
    if(host){
      host = CryptoJS.AES.encrypt(host, logsalt).toString();
    }
   

    keyv.set("AccessCounter", counternow + 1);
  let formatedData = {"city" : city, "state" : region, "country" : country, "deviceType" : dtype, "so" : so, "lang" : language, "time" : timeString, "date" : dateString, "page": page, "VPN": vpn, "mobile": mobile, "host": host}
     keyv.set((parseInt(counternow) + 1), JSON.stringify(formatedData));
    })();
}).catch(function(err){
console.log(err);
})
})






app.get("/recovery", function(req,res){
  res.render("recovery", {"error" : ""})  
})

app.post("/recovery", function(req, res){
var mail = req.body.email;
let logged = false;
(async () => {
  var totalusers = await keyv.get("TotalUsers");
 if(!totalusers){
   totalusers = 0;
 }
  for(var i = 0; i < totalusers + 1; i++){
    let user = await keyv.get("user" + i)
    if(user){
      user = JSON.parse(user);
      let dbMail = CryptoJS.AES.decrypt(user.email, process.env.SALT).toString(CryptoJS.enc.Utf8)
      var username = CryptoJS.AES.decrypt(user.username, process.env.SALT).toString(CryptoJS.enc.Utf8)
      if(dbMail == mail){
        changepassuser = user.id;
          var theCode = Math.floor(100000 + Math.random() * 900000);
        generatedCode = theCode;
         var email =  "<body style='background-color:rgba(0, 0, 0, 0.9);color: white; text-align: center;'> <p style='font-size: 20px; margin-top: 10%;'> Olá, " + username + "</p><p style='font-size:17px;'>Seu código de verificação é</p> <h1>" + theCode + "</h1><p style='font-size:12px;'>se não reconhece esse email, por favor, desconsidere.</p></body>"
        var theMail = {
          from: process.env.EMAIL,
          to: dbMail,
          subject: "Código de verificação",
          html: email,
          };
          postMan.sendMail(theMail, function(error){
              if (error) {
              console.log(error);
              }
              });
              res.render("recoveryb", {"error" : ""})  
      }
    }
  }
  if(logged == false){
    res.render("recovery", {"error" : "Usuário inválido!"})  
  }
 })();
})

app.post("/recoverycode", function(req, res){
var code = req.body.code
if(code == generatedCode){
  res.render("changepass", {"error" : ""})  
}else{
  res.render("recoveryb", {"error" : "Código inválido!"})  
}
})

app.post("/recoveryc", function(req, res){
var pass = req.body.pass;
var cpass = req.body.cpass;
if(cpass == pass){
  (async () => {
    var user = await keyv.get("user" + changepassuser);
    if(user){
      user = JSON.parse(user);
    
    var newpass = CryptoJS.AES.encrypt(pass, pass).toString();
    let dbMail = CryptoJS.AES.decrypt(user.email, process.env.SALT).toString(CryptoJS.enc.Utf8)
    let username = CryptoJS.AES.decrypt(user.username, process.env.SALT).toString(CryptoJS.enc.Utf8)
    var userJson = {"email":user.email, "username":user.username, "pass": newpass, "image": user.image, "imagename" : user.imagename ,"roles" : user.roles, "id" : user.id, "lastseen": user.lastseen}
    await keyv.set("user" + changepassuser, JSON.stringify(userJson));
    res.redirect("/");
    changepassuser = "";
    generatedCode = "";
    var email =  "<body style='background-color:rgba(0, 0, 0, 0.9);color: white; text-align: center;'> <p style='font-size: 20px; margin-top: 10%;'> Olá, " + username + "</p><p style='font-size:17px;'>Sua senha foi alterada recentemente</p> <p> Se não foi você, altere ela</p><p style='font-size:12px;'>se não reconhece esse email, por favor, desconsidere.</p></body>"
    var theMail = {
      from: process.env.EMAIL,
      to: dbMail,
      subject: "Alteração de senha",
      html: email,
      };
      postMan.sendMail(theMail, function(error){
          if (error) {
          console.log(error);
          }
          });
  }
  })();
}else{
  res.render("changepass", {"error" : "As senhas não combinam"})  
}
})

server.listen(process.env.PORT || 5000, () => {
    console.log("Listening Ports")
})

app.get('*', function(req, res){
  res.status(404).sendFile(__dirname + "/views/404.html")
});

var meses = [
  "Janeiro",
  "Fevereiro",
  "Março", 
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
]
var wdays = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb"
]




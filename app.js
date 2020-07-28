const express=require("express");
const app=express();
const parser=require("body-parser");
//const trequest=require("request");
const https=require("https");
app.use(express.static("kpublic"))

app.use(parser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})

app.post("/failure",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){

  const fname=req.body.fname;
  const lname= req.body.lname;
  const temail=req.body.email;

  const mdata={
    members:[
      {
        email_address:temail,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }

      }
    ]
  }

  const jsonData=JSON.stringify(mdata)
  const url="https://us17.api.mailchimp.com/3.0/lists/981c752389"
  const options={
    method:"POST",
    auth:"dumbo:ce494e0533b76461836684da47566799-us17"
  }

  const request1=https.request(url,options,function(response){
    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html")
    }
    else{
      res.sendFile(__dirname+"/failure.html")
    }

    response.on("data",function(data){
      //console.log(JSON.parse(data))
    })

  })

  request1.write(jsonData);
  request1.end();

})

app.listen(process.env.PORT || 3000,function(){
  console.log("listening on port 3000...")
})
//ce494e0533b76461836684da47566799-us17
//981c752389

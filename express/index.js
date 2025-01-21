const express = require("express");
const app = express();

const users=[{
    name:"Alice",
    kidneys : [{
        healthy : true,
    }]
}];
app.use(express.json()) ; 
app.get("/", function (req, res){
    const aliceKidneys = users[0].kidneys;
    const numberOfKidneys = aliceKidneys.length;
    let numberOfHealthyKidneys = 0;
    for (let i=0; i<numberOfKidneys; i++){
        if (users[0].kidneys[i].healthy){
            numberOfHealthyKidneys++;
        }
    }
    numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys,
    });

});

app.post("/", function(req, res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg:"Done!"
    });
})

app.put("/", function(req, res){
    if(hasUnhealthyKidney()){
        for(let i=0; i<users[0].kidneys.length;i++){
            users[0].kidneys[i].healthy = true;
        }
        res.json({
            msg:"Done!"
        });
    }
    else{
        res.status(411).json({
            msg:"You don't have any unhealthy kidney!!"
        })
    }
   
})

app.delete("/", function(req, res){
    if(hasUnhealthyKidney()){
        let newKidney = [];
    for (let i=0; i<users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy){
            newKidney.push({
                healthy:true
            })
        }
    }
    users[0].kidneys = newKidney;
    res.json({
        msg:"Done!"
    });
} else{
    res.status(411).json({
        msg:"you don't have any unhealthy kidney!!"
    })
}
})
//if there is atleast one unhealthy kidney
function hasUnhealthyKidney(){
    let unhealthyKidney = false;
    for(let i=0; i<users[0].kidneys.length; i++){
        if (!users[0].kidneys[i].healthy){
            unhealthyKidney = true;
        }
    }
    return unhealthyKidney;
}
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

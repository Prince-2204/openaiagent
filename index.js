const express = require('express')
const OpenAIApi = require("openai");
const Configuration = require("openai");
const app = express()
const port =3000
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.engine('html', require('ejs').renderFile);

async function getHaiku(prompt_new,content_text) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: prompt_new },
            {
                role: "user",
                content: content_text,
            },
        ],
    });
    console.log(completion.choices[0].message.content)
    // Return the actual text content of the message
    return completion.choices[0].message.content;
}
app.get('/',(req,res)=>{
    res.send("Yes you just started")
})


app.get('/main',async function(req,res){

    var name = "Prince";
    const prompt_new = "You are an helpful assistant/your role is to plan a <city> tour where to visit, where to eat all these this based on <city> mentioned and time duration.Give output in the form of a single short Paragraph.";
    const content_text = "Bilaspur,Chhatishgarh,India 8hrs";
    const haiku = await getHaiku(prompt_new,content_text);
    res.render(__dirname + "/public/index.html",{name:haiku})
})



app.listen(port, ()=>{

    console.log(`Running on the port ${port}`)
})
var path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

class SummarizeController{
    async index(req, res, next){
        res.sendFile(path.join(__dirname + '/../public/views/summarize.html'));
    }
    async summarize(req, res, next){
        const text = req.body.text;
        const algorithm = req.body.algorithm;
        const language = req.body.language;
        const compression = req.body.compression;
        const maxWord = req.body.maxWord
        fs.writeFile('./Model/tempInput.txt', text, (err) => {
            if (err) {
                console.error('Error saving text to file:', err);
            } else {
                console.log('Text saved to file successfully');
            }
        });
        // Execute the Python script
        const pythonScript = `python ./Model/main.py ${algorithm} ${language} ${compression}`
        const envScript = 'source ./Model/tutorial-env/bin/activate'
        const mergeScript = `${envScript} && ${pythonScript}` 
        console.log(mergeScript);
    
        exec(mergeScript, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing Python script: ${error}`);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                // Send the output of the Python script as the response
                console.log("call 200 ne" + stdout)
                res.status(200).json({ message: stdout });
            }
        });
    }
}

module.exports = new SummarizeController;
var path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

class TrainingController{
    async index(req, res, next){
        res.sendFile(path.join(__dirname + '/../public/views/training.html'));
    }
    async dataset(req, res, next){
        res.sendFile(path.join(__dirname + '/../public/views/dataset.html'));
    }
    async addDataset(req, res, next){
        const { text, summary, language } = req.body;
        // console.log(summary)
        // fs.writeFile('./Model/tempInput.txt', text, (err) => {
        //     if (err) {
        //         console.error('Error saving text to file:', err);
        //     } else {
        //         console.log('Text saved to file successfully');
        //     }
        // });
        // const pythonScript = 'python parse.py'
        // exec(pythonScript, (error, stdout, stderr) => {
        //     if (error) {
        //         console.error(`Error executing Python script: ${error}`);
        //         res.status(500).json({ error: 'Internal Server Error' });
        //     } else {
        //         const newData = `${stdout.slice(0, -2)},${summary};\n`;
        //         var filename = 'en_dataset.xlsx'
        //         if (language === 'vietnamese') {
        //             filename = 'vi_dataset.xlsx'
        //         }
        //         console.log(newData)
        //         fs.appendFile(filename, newData, (err) => {
        //             if (err) throw err;
        //             console.log('Data added to CSV file');
        //         });
        //     }
        // });
        var filename = 'en_dataset.json'
        if (language === 'vietnamese') {
            filename = 'vi_dataset.json'
        }
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                return;
            }
    
            try {
                // Parse the existing JSON data
                let jsonData = data ? JSON.parse(data) : { essay: '', listessay: '' };

                // Update the JSON data with the new essay and list of essays
                jsonData.text = text;
                jsonData.summary = summary;
    
                // Convert the updated JSON data back to a string
                const updatedData = JSON.stringify(jsonData, null, 2);
    
                // Write the updated data back to the JSON file
                fs.writeFile(filename, updatedData, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing to JSON file:', err);
                        return;
                    }
    
                    console.log('Essays saved successfully!');
                });
            } catch (parseError) {
                console.error('Error parsing JSON data:', parseError);
            }
        });
    } 
}

module.exports = new TrainingController;
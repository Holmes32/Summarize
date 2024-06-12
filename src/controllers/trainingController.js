var path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

class TrainingController {
    async index(req, res, next) {
        res.sendFile(path.join(__dirname + '/../public/views/training.html'));
    }

    async addDataset(req, res, next) {
        const { text, summary, language } = req.body;
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
                let dataArray = data ? JSON.parse(data) : [];

                // Add the new essay and list of essays to the array
                dataArray.push({
                    text: text,
                    summary: summary
                });

                // Convert the updated array back to a string
                const updatedData = JSON.stringify(dataArray, null, 2);

                // Write the updated data back to the JSON file
                fs.writeFile(filename, updatedData, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing to JSON file:', err);
                        return;
                    }

                    console.log('Essays saved successfully!');
                    res.status(200).json({ message: "success" });
                });
            } catch (parseError) {
                console.error('Error parsing JSON data:', parseError);
            }
        });
    }
}

module.exports = new TrainingController;
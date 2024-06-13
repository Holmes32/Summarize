var path = require('path');
const fs = require('fs');
class DatasetController {
    async index(req, res, next) {
        res.sendFile(path.join(__dirname + '/../public/views/dataset.html'));
    }
    async getDataset(req, res, next) {
        const language = req.body.language;
        var filename = 'en_dataset.json'
        if (language === 'vietnamese') {
            filename = 'vi_dataset.json'
        }
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            try {
                // Parse the JSON data
                const jsonData = data ? JSON.parse(data) : [];

                // Output the data to the console
                console.log('data:', jsonData);
                res.status(200).json(jsonData);
            } catch (parseError) {
                console.error('Error parsing JSON data:', parseError);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    async downloadDataset(req, res, next) {
        const language = req.body.language;
        var filename = 'en_dataset.json'
        if (language === 'vietnamese') {
            filename = 'vi_dataset.json'
        }
        // Path at which image will get downloaded 
        res.download(filename);
    }

    async postEditDataset(req, res, next) {
        const index = req.body.index;
        const language = req.body.language

        const data = {
            index: index,
            language: language
        }

        const updatedData = JSON.stringify(data, null, 2);

        fs.writeFile('temp.txt', updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to tempt file:', err);
                return;
            }
            console.log('Data saved successfully!');
        });

        res.redirect('/dataset/edit');
    }

    async getEditDataset(req, res, next) {
        res.sendFile(path.join(__dirname + '/../public/views/editDataset.html'));
    }

    async getDataEdit(req, res, next) {
        fs.readFile('temp.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            try {
                // Parse the JSON data
                const jsonData = JSON.parse(data);

                const language = jsonData.language;
                var filename = 'en_dataset.json'
                if (language === 'vietnamese') {
                    filename = 'vi_dataset.json'
                }
                fs.readFile(filename, 'utf8', (err, dataset) => {
                    if (err) {
                        console.error('Error reading JSON file:', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    // Parse the JSON data
                    const jsonDataset = JSON.parse(dataset);
                    const dataSend = jsonDataset[jsonData.index]
                    dataSend.index = jsonData.index
                    dataSend.language = language

                    // Output the data to the console
                    console.log('data:', dataSend);
                    res.status(200).json(dataSend);
                });
            } catch (parseError) {
                console.error('Error parsing JSON data:', parseError);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }

    async saveDataset(req, res, next) {
        const index = req.body.index;
        const language = req.body.language
        const text = req.body.text
        const summary = req.body.summary 

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
                const addData = {
                    text: text,
                    summary: summary
                }
                dataArray[index] = addData

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

    async deleteDataset(req, res, next) {
        const index = req.body.index;
        const language = req.body.language

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
                dataArray.splice(index, 1)

                // Convert the updated array back to a string
                const updatedData = JSON.stringify(dataArray, null, 2);

                // Write the updated data back to the JSON file
                fs.writeFile(filename, updatedData, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing to JSON file:', err);
                        return;
                    }

                    console.log('Essays deleted successfully!');
                    res.status(200).json({ message: "success" });
                });
            } catch (parseError) {
                console.error('Error parsing JSON data:', parseError);
            }
        });
    }
}

module.exports = new DatasetController;
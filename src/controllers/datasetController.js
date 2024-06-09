// const download = require('download');
var path = require('path');
const fs = require('fs');
class DatasetController {
    async index(req, res, next) {
        res.sendFile(path.join(__dirname + '/../public/views/dataset.html'));
    }
    async getDataset(req, res, next) {
        var filename = 'en_dataset.json'
        // if (language === 'vietnamese') {
        //     filename = 'vi_dataset.json'
        // }
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
    
            try {
                // Parse the JSON data
                const jsonData = JSON.parse(data);
    
                // Output the data to the console
                console.log('data:', jsonData);
                res.status(200).json(jsonData);
            } catch (parseError) {
                console.error('Error parsing JSON data:', parseError);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    // async getDataset(req, res, next) {
    //     var filename = 'en_dataset.json'
    //     // if (language === 'vietnamese') {
    //     //     filename = 'vi_dataset.json'
    //     // }
    //     // Path at which image will get downloaded 
    //     const filePath = `${__dirname}/files`;

    //     download(filename, filePath)
    //         .then(() => {
    //             console.log('Download Completed');
    //         })
    // }
}

module.exports = new DatasetController;
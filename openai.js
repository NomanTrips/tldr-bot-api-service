const axios = require('axios').default;

function callOpenaiApi(text) {
    var auth_key = 'Bearer ' + process.env.BEARER_KEY;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': auth_key,
      } //process.env.BEARER_KEY
    text = text + '\r\n\r\n' + 'tl;dr:'

    return axios.post('https://api.openai.com/v1/engines/davinci/completions', {
        prompt: text,
        max_tokens: 60,
        temperature: .3,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
    }, {
        headers: headers
      }
    ).then(response => response.data)
    /*
        .then(function (response) {
            console.log(response.data.choices);
        })
        .catch(function (error) {
            console.log(error);
        });
*/

}

module.exports = { callOpenaiApi };
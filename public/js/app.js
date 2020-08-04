document.addEventListener('DOMContentLoaded', function () {

    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');

    const messageOne = document.querySelector('#message-1');
    const messageTwo = document.querySelector('#message-2');
    const messageThree = document.querySelector('#message-3');

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const location = search.value;

        fetch('/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;  
                    messageTwo.textContent = '';
                    messageThree.textContent = '';
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.responseObj.description + 
                                            " Feels like: " + data.responseObj.feelsLlike + 
                                            " Tempreture: " + data.responseObj.tepreture;
                    messageThree.textContent = "Pressure: " + data.responseObj.pressure + 
                                               " Humidity: " + data.responseObj.humidity;
                                            
                    console.log(data);
                }
            })
        })




    });


});
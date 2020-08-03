console.log("client side js file loaded!");

document.addEventListener('DOMContentLoaded', function () {

    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');

    const messageOne = document.querySelector('#message-1');
    const messageTwo = document.querySelector('#message-2');

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const location = search.value;

        fetch('http://localhost:3000/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                   // console.log(data.error);
                    messageOne.textContent = data.error;  
                    messageTwo.textContent = '';
                } else {
                  //  console.log(data.location);
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.responseObj.description + 
                                            " Feels like: " + data.responseObj.feelsLlike + 
                                            " Tempreture: " + data.responseObj.tepreture;
                                            
                    console.log(data);
                }
            })
        })




    });


})



// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data.location);
//             console.log(data.responseObj.description + "Feels like: " + data.responseObj.feelsLlike + " Tempreture: " + data.responseObj.tepreture);
//             console.log(data);
//         }
//     })
// })









        //fetch example
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// }) 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    
    url = '/weather?address=' + location
    
    messageOne.textContent = "Loading...."
    messageTwo.textContent = ""

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.success == false){
                messageOne.textContent = "Unable to find the location !"
            } else if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = location + ", " + data.location
                messageTwo.textContent = "Forecast : " + data.forecast + " with temperature " + data.temperature + " as of " + data.time
            }
        })
    })
}) 
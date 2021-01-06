console.log("client side javascripe file is loaded ")



const weatherForm = document.querySelector('form')
const serachElecment = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = serachElecment.value

    messageOne.textContent = "Loading ...."
    messageTwo.textContent = " "

    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error) {
                messageOne.textContent = data.error 
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
    
})





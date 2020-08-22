console.log('Hi in javascript')


const weatherform = document.querySelector('form')
const address = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherform.addEventListener('submit' , (e) =>{
    e.preventDefault()
    message1.textContent = 'Loding...'
    message2.textContent = ''
    fetch('/weather?address=' + address.value).then( (response)=>{
        response.json().then( (data)=>{
            if(data.error){
                message1.textContent = 'Please provide valid Address ! Try another Search'
            }
            else{
                message1.textContent = data.address
                message2.textContent = data.forcast
            }
        })    
    })
})
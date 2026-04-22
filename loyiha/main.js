const btn = document.querySelector(".btn")
const btn2 = document.querySelector(".btn2")
const modalContainer = document.querySelector(".modal-container")
btn.addEventListener("click",() => {
    modalContainer.classList.remove('hide')
})
btn2.addEventListener("click", () => {
    modalContainer.classList.add('hide')
})
//======================================================
const massage = document.querySelector(".massage")
const text = document.querySelector(".text")
const span = document.querySelector("span")
const myform = document.querySelector(".myform")
const tbody = document.querySelector(".tbody")
let intervalId
//============================================
//users
const users= JSON.parse(localStorage.getItem("users")) || []

function messageFunc(msg, type) {
    massage.classList.remove("hide")
    text.textContent = msg
    if (type === "success") massage.style.backgroundColor = "green"
    else massage.style.backgroundColor = "red"

    let count = 3
    span.textContent = count
    clearInterval(intervalId)
    intervalId = setInterval(()=>{
    count--
    span.textContent = count
    if( count===0){
        clearInterval(intervalId)
        massage.classList.add("hide")
    }
    },1000)
}
//=================================================================
function deleteItem(id) {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const filterusers = users.filter((item, index)=>{
        return id !=index
    })
    localStorage.setItem("users", JSON.stringify(filterusers))
    renderUsers()
}

function renderUsers(){
    const users = JSON.parse(localStorage.getItem("users")) || []
    tbody.innerHTML = ""
    users.forEach((item, index)=>{
        tbody.innerHTML+=`
             <tr>
                    <td>${index+ 1}</td>
                    <td>${item.username}</td>
                    <td>${item.email}</td>
                    <td>${item.password}</td>
                    <td><button onclick="deleteItem(${index})" class="delete_btn">Delete</button></td>
                </tr>
        `
    })
}
renderUsers()
//----------------------------------------------------------------
myform.addEventListener("submit", (e)=>{
    const users= JSON.parse(localStorage.getItem("users")) || []
    e.preventDefault()
    const username = myform.username.value
    const email = myform.email.value
    const password1 = myform.password1.value
    const password2 = myform.password2.value
    const newEvent = {
        username : username,
        email : email,
        password :  password1
    }
    users.push(newEvent)
    modalContainer.classList.add('hide')
    localStorage.setItem("users", JSON.stringify(users))
    renderUsers()
    if(password1==password2){
        messageFunc("Parol to'g'ri", "success")
    }
    else {
        messageFunc("Parol xato", "error")
    }
})
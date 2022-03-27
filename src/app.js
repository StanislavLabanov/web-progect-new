import {Question} from './question'
import './style.css'
import { isValid } from './utils'
import { createModal } from './utils'
import { getAuthForm } from './authoriz'
import { authWithEmailAndPassword } from './authoriz'

const form = document.querySelector('#form')
const modalBtn = document.querySelector('#modal-btn')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')

window.addEventListener('load',  Question.renderList)
modalBtn.addEventListener('click', openModal)
form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
   submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(e){
   e.preventDefault()

   if(isValid(input.value)){
      const question = {
         text: input.value.trim(),
         date: new Date().toJSON()
      }

      submitBtn.disabled = true
      //Отправка запроса на сервер
      Question.create(question).then(() => {
         input.value = ''
         input.className = ''
         submitBtn.disabled = false
      })
   }
}

function openModal(e){
   createModal('Авторизация', getAuthForm())
   document.querySelector('#auth-form').addEventListener('submit', authFormHandler)
}

function authFormHandler(e){
   e.preventDefault()

   const btn = e.target.querySelector('button')
   const email = e.target.querySelector('#email').value
   const password = e.target.querySelector('#password').value

   btn.disabled = true
   authWithEmailAndPassword(email, password)   
   .then(token => {
         return Question.fetch(token)
   })
   .then(token => renderModalAfterAuth(token))
   .then(() => btn.disabled = false)
}


function renderModalAfterAuth(content){
   if(typeof content === 'string'){
      createModal('Ошибка!', content)
   }else{
      createModal('Список вопросов', Question.ListToHTML(content))
   }
}
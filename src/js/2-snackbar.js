// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form')

const makePromise = (state, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const delay = formData.get("delay");
  const state = formData.get("state");

  makePromise(state, delay)
    .then((delay) => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`
      });
    })
    .catch((delay) => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`
      });
    });
});
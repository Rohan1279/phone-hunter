fetch('https://jsonplaceholder.typicode.com/todos/1')
.then(res => res.json())
.then(data => console.log(data))
.catch(error => console.log(error))
// document.getElementById('ada')




console.log(1)
setTimeout(() => {
    console.log(2)
}, 2000);
console.log(3)
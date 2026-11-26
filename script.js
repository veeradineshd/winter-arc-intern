console.log("Hi");
age =25;
console.log(age);
let time = "8:00 PM"
{
    time = "9:00 PM"
}
console.log(time);
let student = {
    name: "John",
    age: 25,
    department: "Computer Science",
};
console.log(student.name);
console.log(student.age);
console.log(student.department);
console.log(student);

let a=10;
let b="10";
console.log(a==b);
console.log(a === b);

function addNumbers(num1, num2){
    return num1 + num2;
}
console.log(addNumbers(5, 10));
console.log(addNumbers(20, 30));

function greet(name){
    return "Hello, " + name + "!";
}
console.log(greet("Alice"));
console.log(greet("Bob"));

let fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);

fruits.push("Date");
console.log(fruits);

console.log("function to check if a number is even or odd");
function checkEvenOdd(num){
    if(num % 2 === 0){
        return num + " is even";
    } else {
        return num + " is odd";
    }
}
console.log(checkEvenOdd(4));
console.log(checkEvenOdd(7));

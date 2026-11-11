console.log("1 - Start");

setTimeout(() => {
    console.log("2 - This is delayed");
}, 2000);

console.log("3 - End");

// Exercise 1: Predict the output
console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");

function loadUser(userId, callback) {
    setTimeout(() => {
        const user = {
            id: userId,
            name: "Evans",
            age: 22
        };

        callback(user);
    }, 1500);
}

loadUser(1, function(user) {
    console.log("Data received:", user);
});

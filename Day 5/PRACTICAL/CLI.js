//                       Command-Line Interface (CLI) 
//                       ----------------------------


    const num1 = Number(process.argv[2])    //    first value to type in terminal after node CLI.js. Eg:-5
    const operator = process.argv[3]        //    second value(operator).Eg:- '+'    
    const num2 = Number(process.argv[4])    //    third  value. Eg:- 6

    let result;


        if (operator === "+" || operator === "add") {
          result = num1 + num2;
        } else if (operator === "-" || operator === "sub") {
          result = num1 - num2;
        } else if (operator === "*" || operator === "mul") {
            result = num1 * num2;
        } else if (operator === "/" || operator === "div") {
            result = num1 / num2;
       } else {
            result = "Invalid operator";
}


console.log(`Result: ${result}`);


//   if we run the code with numbers for calculation in the terminal like this:- 
//   PS C:\Users\User\Desktop\SHANU EONIX\NodeJS\Week-6 Nodejs\Day 5\PRACTICAL> 
//       node CLI.js 5 + 6 
//    OutPut will be like this:- Result: 11

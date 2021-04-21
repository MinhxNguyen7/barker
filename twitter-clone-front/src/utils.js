export function scramble(word){
    const letterArr = word.split("");
    let newArr = [];

    const len = letterArr.length;
    for (let start = 0; start < len; start++) {
        // Get a random number between 0 and the highest array index and put it in the new array
        let num = Math.floor(Math.random() * letterArr.length)
        newArr.push(letterArr[num]);
        
        // Remove letter from original array
        letterArr.splice(num,1);
      }

    return(newArr.join(""))
}

export default {scramble}
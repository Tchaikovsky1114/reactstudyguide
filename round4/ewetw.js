const arr = [1,2,3,4,5,6,7,8]
let count = 8

let result = 0
for(let i = 0; i< count; i++){
  let cnt = 0
  for(let j = 0; j < 5; j++){
    if(arr.slice(i,i + 5).includes(arr[i] + j)){
      cnt ++
    }
  }
  result = Math.max(result,cnt)
}


console.log(5 - result)
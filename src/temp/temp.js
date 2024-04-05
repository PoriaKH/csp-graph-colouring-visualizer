export function temp_func(){
    let a = [0, 1, 2, 3, 4]
    // let b = [1, 2, 3]
    // let b = a[0]
    // for(let x of a[3]){
    //     if(x === 2){
    //         console.log("Right!")
    //     }
    // }
    // let index = a.indexOf([1,2,3])
    // if(a.includes(b)){
    //     console.log("Right!")
    //     // console.log("index = ", index)
    // }
    // for(let x of a){
    //     if(x === 1){
    //         x = 5
    //     }
    // }
    // console.log("a.length = ", a.length)
    // temp_func2(a)
    // console.log("a.length = ", a.length)
    a.splice(0, 1)
    console.log(a)
}
function temp_func2(arr){
    arr.splice(1, 1)
}
export function temp_func(){
    let a = [[1, 2, 3], [2, 23, 45]]
    // let b = [1, 2, 3]
    let b = a[0]
    // for(let x of a[3]){
    //     if(x === 2){
    //         console.log("Right!")
    //     }
    // }
    let index = a.indexOf([1,2,3])
    if(a.includes(b)){
        console.log("Right!")
        // console.log("index = ", index)
    }
}
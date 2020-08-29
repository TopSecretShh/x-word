const arr = Array(225).fill(false)

let pattern_1 = [4, 10, 19, 25, 34, 40, 55, 60, 61, 62, 67, 72, 73, 74, 81, 95, 101, 109, 115, 123, 129, 143,  150, 151, 152, 157, 162, 163, 164, 171, 184, 190, 199, 205, 214, 220]

pattern_1.forEach(s => {
    arr[s] = !arr[s]
})  

let PATTERNONE = arr

export default PATTERNONE;
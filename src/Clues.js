import React from 'react';  

function Clues({blocks}) {
    console.log(blocks)
    let across = blocks.map((b, i) => {
        return b[1] === 'across' || b[1] === 'acrossdown' ? <li>{b[0]}</li> : null
    })
    across.unshift(<h3>Across</h3>)
    let down = blocks.map((b, i) => {
        return b[1] === 'down' || b[1] === 'acrossdown' ? <li>{b[0]}</li> : null
    })
    down.unshift(<h3>Down</h3>)
    return <div className='clues'>
        <ul className='clues__list'>{across}</ul>
        <ul className='clues__list'>{down}</ul>
    </div>   
}
export default Clues
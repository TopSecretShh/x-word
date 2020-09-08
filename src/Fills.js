import React from 'react'; 

export default class Fills extends React.Component{
    state ={
        fills: []   
    }
    
    capitalize = (str) => str.charAt(0).toUpperCase()+str.slice(1);

    search = () => {
        let word = this.props.word.map(w => w ? w : '?').join('')
        fetch(`https://api.datamuse.com/words?sp=${word}`)
                .then(response => response.json())
                .then(data => {
                    let words = data.map(word => word.score > 100 ? word.word : "")
                    this.setState({
                        fills: words
                    })
                
                });
    }

    render() {
        let fills = this.state.fills.map(fill => <li key={fill}>{this.capitalize(fill)}</li>)
        
        return (
            <div className="fills">
            <h3>Fills</h3>
                <ul className="fills">{fills}</ul>
                <button onClick={() => this.search()}>Find Fills</button>
            </div>
        )
    }

}


import React from 'react';
import {TestForm} from "./TestForm";

export class Tab extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            query: ""
        };

        this.inc = this.inc.bind(this);
        this.dec = this.dec.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);

        this.current = null;
    }

    add(){
        const test = React.createElement(this.props.form, {
            obj: {}
            // rerender: this.forceUpdate
        })
        this.props.setForm(test)
    }

    remove(){
        if(this.props.PreRemove){
            this.props.PreRemove(this.current);
        }

        this.props.collection.remove(this.current._id);
        this.props.setForm(null);
    }

    // static getDerivedStateFromProps(props, state) {
    //     if()
    //     return {
    //         page: 0
    //     }
    // }

    render() {

        const rows = [];

        let start = this.state.page;
        start *= 10;
        const stop = start + 10;

        for(let i = start; i < stop; i++){
            if(this.props.data[i]) {
                const click = e => {
                    this.current = this.props.data[i];
                    const test = React.createElement(this.props.form, {
                        obj: this.props.data[i],
                    })
                    this.props.setForm(test)
                };

                const row = [];

                for(const key in this.props.columns){
                    if(this.props.columns[key] instanceof Function){
                        row.push(<td>{this.props.columns[key](this.props.data[i])}</td>);
                    }else{
                        row.push(<td>{this.props.data[i][this.props.columns[key]]}</td>);
                    }
                }

                rows.push(<tr onClick={click}>{row}</tr>);

            }
            else
                break
        }

        return <div>
            <input value={this.state.query} onChange={event => {
                this.setState({query: event.target.value})
                this.props.setQuery(event.target.value === "" ? null : event.target.value);
            }}/>
            <button onClick={this.add}>add</button>
            <button onClick={this.remove}>remove</button>
            <table>
                <thead>
                <tr>
                    {Object.keys(this.props.columns).map(key => <th>{key}</th>)}
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>

            <span>{this.state.page}</span>
            <button onClick={this.dec}>prev</button>
            <button onClick={this.inc}>next</button>
        </div>
    }

    inc() {
        // console.log(this.props.data.count);
        this.setState(prevState => ({
            page: (this.props.data.length / 10)-1 > prevState.page ? prevState.page+1 : prevState.page
        }));
    }

    dec(){
        this.setState(prevState => ({
            page:  prevState.page !== 0 ? prevState.page-1 : prevState.page
        }));
    }
}
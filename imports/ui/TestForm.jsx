import React from 'react';
import { TestCollection } from '../api/testCollection';

//
// export class TestForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.saveCurrent = this.saveCurrent.bind(this)
//         this.change = this.change.bind(this)
//
//         const result = {};
//
//         for(const key in this.props.obj){
//             if(key !== "_id") {
//                 result["input_" + key] = this.props.obj[key];
//             }
//         }
//         console.log(props.obj)
//         // console.log(result)
//         this.state = result;
//
//     }
//
//     static getDerivedStateFromProps(props, state) {
//         const result = {};
//
//         for(const key in props.obj){
//             if(key !== "_id") {
//                 result["input_" + key] = props.obj[key];
//             }
//         }
//         return result;
//     }
//
//     saveCurrent(){
//         TestCollection.update(this.props.obj._id, {
//             $set: {
//                 Text: this.props.obj.Text
//             }
//         })
//     }
//
//     change(event, key){
//         this.setState(prevState => {
//             prevState[key] = event.target.value;
//             return prevState;
//         })
//     }
//
//     render() {
//
//         const result = [];
//
//
//
//         // for(let i = 0; i < this.state.fields.length; i++){
//             // console.log(this.state.fields[i])
//
//             // const updateInput = e => {
//             //
//             //     this.setState(prevState => {
//             //         prevState.fields[i] = e.target.value;
//             //         return prevState;
//             //     });
//             // }
//
//             // const [text, setText] = React.useState(this.state.fields[i]);
//
//             // result.push(<p><input value={text} onChange={event => {setText(event.target.value)}}/></p>)
//         // }
//
//         // for(const text in this.state.fields){
//         //     result.push(<p><input value={text} onChange={(e) => text = e.target.value/></p>)
//         // }
//
//         for(const key in this.state){
//             result.push(<p><input value={this.state[key]} onChange={e => this.setState({input_text: e.target.value})}/></p>)
//         }
//
//         return <div>
//             <form>
//             {result}
//             <input type={"submit"} onSubmit={this.saveCurrent}/>
//             </form>
//         </div>
//     }
// }

// export const TestForm = (props) => {
//     console.log(props.obj.text)
//     const [text, setText] = React.useState(props.obj.text)
//
//     return <div>
//         <form>
//             <input value={text} onChange={e => setText(e.target.value)}/>
//         </form>
//     </div>
// }

export class TestForm extends React.Component {
    constructor(props) {
        super(props);

        this.saveCurrent = this.saveCurrent.bind(this);

        this.state = {
            obj: props.obj,
            text: props.obj.text
        }
    }

    static getDerivedStateFromProps(props, state) {
        // if(Object.keys(props.obj).length === 0 && !state.obj._fix_){
        //     return {
        //         obj: {_fix_:"undefined"},
        //         text: ""
        //     }
        // }
        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                text: props.obj.text ? props.obj.text : ""
            }
        }else{
            return state;
        }
    }

    saveCurrent(event){
        event.preventDefault();
        TestCollection.update(this.state.obj._id, {
            $set: {
                text: this.state.text
            },

        },{upsert: true});
        // this.props.tab.forceUpdate();
    }

    render() {
        return <div>
            <form onSubmit={this.saveCurrent}>
                <input value={this.state.text} onChange={e => {this.setState({text: e.target.value})}}/>
                <input type={"submit"}/>
            </form>
        </div>
    }
}
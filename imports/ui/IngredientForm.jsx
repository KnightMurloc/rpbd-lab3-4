import React from 'react';
import {InredientsCollection} from "../api/IngredientsCollection";

export class IngredientForm extends React.Component {
    constructor(props) {
        super(props);

        this.saveCurrent = this.saveCurrent.bind(this);

        this.state = {
            obj: props.obj,
            name: props.obj.name,
            unit: props.obj.unit,
            error: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        // if(Object.keys(props.obj).length === 0){
        //     return {
        //         obj: {_fix_:undefined},
        //         name: "",
        //         unit: "",
        //         error: null
        //     }
        // }
        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                name: props.obj.name ? props.obj.name : "",
                unit: props.obj.unit ? props.obj.unit : "",
                error: null
            }
        }else{
            return state;
        }
    }

    saveCurrent(event){
        event.preventDefault();

        if(!this.state.name || this.state.name.length === 0){
            this.setState(state => {
               state.error = <p>имя не указано</p>
            });
            return;
        }

        if(!this.state.unit || this.state.unit.length === 0){
            this.setState(state => {
                state.error = <p>еденицы не указаны</p>
            });
            return;
        }

        InredientsCollection.update(this.state.obj._id, {
            $set: {
                name: this.state.name,
                unit: this.state.unit,
            }
        },{upsert: true});

        // TestCollection.update(this.state.obj._id, {
        //     $set: {
        //         text: this.state.text
        //     },
        //
        // },{upsert: true});
        // this.props.tab.forceUpdate();
    }

    render() {
        return <div>
            <form onSubmit={this.saveCurrent}>
                <label>название</label>
                <input value={this.state.name} onChange={e => {this.setState({name: e.target.value})}}/><br/>
                <label>еденица измерения</label>
                <input value={this.state.unit} onChange={e => {this.setState({unit: e.target.value})}}/><br/>
                <input type={"submit"}/>
            </form>
            {this.state.error}
        </div>
    }
}
import React from 'react';
import {SnackCollection} from "../api/snackCollection";
import {InredientsCollection} from "../api/IngredientsCollection";

export class SnackForm extends React.Component{
    constructor(props) {
        super(props);

        this.removeIng = this.removeIng.bind(this);
        this.addIng = this.addIng.bind(this);
        this.saveCurrent = this.saveCurrent.bind(this);

        this.state = {
            obj: props.obj,
            name: props.obj.name,
            size: props.obj.size,
            ingredients: props.obj.ingredients,
            count: 0,
            error: null
        }
    }

    removeIng(e, ing){
        e.preventDefault();
        this.setState(old =>{
            const index = old.ingredients.indexOf(ing);
            if(index !== -1){
                old.ingredients.splice(index, 1);
            }
            return old;
        })
    }

    addIng(e, ing){
        e.preventDefault();
        this.setState(state => {
            if(state.ingredients == null){
                state.ingredients = [];
            }
            state.ingredients.push({ingredient: ing._id,count: state.count});
            state.count = 0;
            return state;
        })
    }

    static getDerivedStateFromProps(props, state) {
        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                name: props.obj.name ? props.obj.name : "",
                size: props.obj.size ? props.obj.size : 0,
                ingredients: props.obj.ingredients ? props.obj.ingredients : [],
                count: 0,
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
                state.error = <p>не указано имя</p>
            })
            return;
        }

        if(!this.state.size || this.state.size.length === 0){
            this.setState(state => {
                state.error = <p>размер не указан</p>
                return state;
            })
            return;
        }

        SnackCollection.update(this.state.obj._id, {
            $set: {
                name: this.state.name,
                size: this.state.size,
                ingredients: this.state.ingredients
            },

        },{upsert: true});
        // this.props.tab.forceUpdate();
    }

    render() {
        
        const rows = [];


        if(this.state.ingredients)
        for(let i = 0; i < this.state.ingredients.length; i++){
            const ing = this.state.ingredients[i];
            const name = InredientsCollection.findOne({_id: ing.ingredient}).name;
            // console.log(InredientsCollection.find({_id: ing.ingredient}));
            rows.push(<tr><td>{name}</td><td>{ing.count}</td><td><button onClick={e => this.removeIng(e,ing)}>-</button></td></tr>);
        }

        // for(const ing in this.state.ingredients){
        //     console.log(ing);
        //     // const name = InredientsCollection.find({_id: ing.ingredient}).name;
        //     // rows.push(<tr><td>{name}</td><td>{ing.count}</td></tr>)
        // }
        
        return <div>
            <form onSubmit={this.saveCurrent}>
                <label>название</label>
                <input value={this.state.name} onChange={e => {this.setState({name: e.target.value})}}/><br/>
                <label>размер</label>
                <input value={this.state.size} onChange={e => {this.setState({size: e.target.value})}}/><br/>
                <div>
                    <table>
                        <thead>
                            <th>название</th>
                            <th>количество</th>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                </div>
                <input type={"submit"}/>
            </form>

            {this.state.error}

            <input value={this.state.count} onChange={e => {this.setState({count: e.target.value})}}/>

            <table>
                <thead>
                    <th>name</th>
                </thead>

                <tbody>

                {InredientsCollection.find({}).fetch().map(ing => <tr><th>{ing.name}</th><th><button onClick={e => this.addIng(e,ing)}>+</button></th></tr>)}

                </tbody>
            </table>
        </div>
    }
}
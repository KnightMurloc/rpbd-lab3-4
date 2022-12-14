import React from 'react';
import {SnackOrdersCollection} from "../api/SnackOrdersCollection";
import {SnackCollection} from "../api/snackCollection";
import {EmployeesCollection} from "../api/EmployeesCollection";

// "waiter": "kYpjMCtmGWq2Yp3b9",
//     "snack": ObjectId("63821617638df41bfdc6d149"),
//     "table": 41

const centerStyle = {
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
};

export class SnackOrderForm extends React.Component{
    constructor(props) {
        super(props);

        this.selectEmployee = this.selectEmployee.bind(this);
        this.selectSnack = this.selectSnack.bind(this);
        this.saveCurrent = this.saveCurrent.bind(this);

        this.state = {
            obj: props.obj,
            waiter: props.obj.waiter,
            snack: props.obj.snack,
            table: props.obj.table,
            error: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                waiter: props.obj.waiter ? props.obj.waiter : null,
                snack: props.obj.snack ? props.obj.snack : null,
                table: props.obj.table ? props.obj.table : 0,
                error: null
            }
        }else{
            return state;
        }
    }

    selectEmployee(emp){
        this.setState(state =>{
            state.waiter = emp._id;
            return state;
        });
    }

    selectSnack(snack){
        this.setState(state =>{
            state.snack = snack._id;
            return state;
        });
    }

    saveCurrent(event){
        event.preventDefault();

        if(this.state.waiter == null){
            this.setState(state => {
                state.error = <p>офицант не указан</p>
                return state;
            })
            return;
        }

        if(this.state.snack == null){
            this.setState(state => {
                state.error = <p>закуска не указана</p>
                return state;
            })
            return;
        }

        if(!this.state.table || this.state.table.length === 0){
            this.setState(state => {
                state.error = <p>столик не указан</p>
                return state;
            })
            return;
        }

        SnackOrdersCollection.update(this.state.obj._id, {
            $set: {
                waiter: this.state.waiter,
                snack: this.state.snack,
                table: this.state.table,
            }
        }, {upsert: true});
    }

    render() {
        return <div>
            <form onSubmit={this.saveCurrent}>
                <label>столик</label>
                <input value={this.state.table} onChange={e => this.setState({table: e.target.value})}/><br/>

                <label>офицант: </label>
                <span>{this.state.waiter == null ? "none" : EmployeesCollection.findOne({_id: this.state.waiter}).last_name}</span><br/>
                <label>закуска: </label>
                <span>{this.state.snack == null ? "none" : SnackCollection.findOne({_id: this.state.snack}).name}</span><br/>
                <input type={"submit"}/>
            </form>
            {this.state.error}

            <div style={centerStyle}>
                <div style={{display: "flex",flexDirection: "row"}}>
                    <div style={{overflow: "scroll",width: '50%'}}>
                        <p>поставщик</p>
                        <table>
                            <thead>
                            <th>имя</th>
                            <th>фамилия</th>
                            </thead>
                            <tbody>
                            {EmployeesCollection.find({}).fetch().map(emp => <tr onClick={e => {this.selectEmployee(emp)}}><td>{emp.first_name}</td><td>{emp.last_name}</td></tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div style={{overflow: "scroll",width: '50%'}}>
                        <p>ингредиент</p>
                        <table>
                            <thead>
                            <th>название</th>
                            </thead>
                            <tbody>
                            {SnackCollection.find({}).fetch().map(snack => <tr onClick={e => {this.selectSnack(snack)}}><td>{snack.name}</td></tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    }
}
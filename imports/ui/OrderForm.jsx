import React from 'react';
import {OrderCollection} from "../api/OrderCollection";
import {EmployeesCollection} from "../api/EmployeesCollection";


const centerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export class OrderForm extends React.Component{
    constructor(props) {
        super(props);

        this.selectEmployee = this.selectEmployee.bind(this);
        this.saveCurrent = this.saveCurrent.bind(this);

        this.state = {
            obj: props.obj,
            reason: props.obj.reason,
            order_number: props.obj.order_number,
            order_date: props.obj.order_date,
            Employees: props.obj.Employees,
            post: props.obj.post,
            error: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        // if(Object.keys(props.obj).length === 0){
        //     return {
        //         obj: {},
        //         reason: "",
        //         order_number: "",
        //         order_date: "",
        //         Employees: null,
        //         post: "",
        //         error: null
        //     }
        // }

        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                reason: props.obj.reason ? props.obj.reason : "",
                order_number: props.obj.order_number ? props.obj.order_number : "",
                order_date: props.obj.order_date ? props.obj.order_date : "",
                Employees: props.obj.Employees ? props.obj.Employees : null,
                post: props.obj.post ? props.obj.post : "",
                error: null
            }
        }else{
            return state;
        }
    }

    saveCurrent(event){
        event.preventDefault();

        if(!this.state.reason || this.state.reason.length === 0){
            this.setState(old => {
                old.error = <p>не указана причина</p>
                return old;
            });
            return;
        }

        if(!this.state.order_number || this.state.order_number.length === 0){
            this.setState(old => {
                old.error = <p>не указан номер приказа</p>
                return old;
            });
            return;
        }

        if(!this.state.order_number || this.state.order_number.length === 0){
            this.setState(old => {
                old.error = <p>не указан номер приказа</p>
                return old;
            });
            return;
        }

        if(!this.state.order_date || this.state.order_date.length === 0){
            this.setState(old => {
                old.error = <p>дата не указана</p>
                return old;
            });
            return;
        }

        const date = new Date(this.state.order_date);
        if(!(date instanceof Date && !isNaN(date.valueOf()))){
            this.setState(old_state => {
                old_state.error = <p>некоректная дата</p>;
                return old_state;
            })
            return;
        }

        if(!this.state.post || this.state.post.length === 0){
            this.setState(old => {
                old.error = <p>должность не указана</p>
                return old;
            });
            return;
        }

        // console.log(this.state.Employees);
        OrderCollection.update(this.state.obj._id,{
           $set: {
               reason: this.state.reason,
               order_number: this.state.order_number,
               order_date: this.state.order_date,
               Employees: this.state.Employees,
               post: this.state.post,
           },
        },{upsert: true});
    }

    selectEmployee(emp){
        console.log(emp._id)
        this.setState(old => {
           old.Employees = emp._id;
           return old;
        });
    }

    render() {
        return <div>
            <form onSubmit={this.saveCurrent}>
                <label>причина</label>
                <input value={this.state.reason} onChange={e => {this.setState({reason: e.target.value})}}/><br/>
                <label>номер приказа</label>
                <input value={this.state.order_number} onChange={e => {this.setState({order_number: e.target.value})}}/><br/>
                <label>дата приказа</label>
                <input value={this.state.order_date} onChange={e => {this.setState({order_date: e.target.value})}}/><br/>
                <label>сотрудник</label>
                <p>{this.state.Employees == null ? "none" : EmployeesCollection.findOne({_id: this.state.Employees}).last_name}</p>
                <label>должность</label>
                <input value={this.state.post} onChange={e => {this.setState({post: e.target.value})}}/><br/>
                <input type={"submit"}/>
            </form>
            {this.state.error}

            <div style={centerStyle}>
                <div style={{overflow: "scroll"}}>
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
            </div>
        </div>
    }
}
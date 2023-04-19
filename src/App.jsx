import React, { useEffect, useState } from "react";
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'


export default function App() {

    const getDataFs = () => {
        let data = localStorage.getItem('student')
        if (data) {
            return JSON.parse(data)
        }
        else {
            return [];
        }
    }

    // var [student,setStudent]=useState([])
    var [student, setStudent] = useState(getDataFs())

    var [id, setId] = useState('')
    var [name1, setName1] = useState('')
    var [age, setAge] = useState('')
    var [class1, setClass1] = useState('')
    var [email, setEmail] = useState('')

    let [toggleUp,setToggleUp]=useState(true)
    let [edit,setEdit]=useState(null)


    const saveData = () => {

        if(!id && !name1){
            alert('please fill the data')
        }
        else if(id && !toggleUp){
            setStudent(
                student.map((elem)=>{
                    if(elem.id === edit){
                        return {...elem, id:id,name1:name1,age:age,class1:class1,email:email}
                    }
                    return elem
                })
            )
            setToggleUp(true)
            setEdit(null)

            setId('')
            setName1('')
            setAge('')
            setClass1('')
            setEmail('')
        }
        else{
            let students = {
                id,
                name1,
                age,
                class1,
                email
            }
            setStudent([...student, students])
            setId('')
            setName1('')
            setAge('')
            setClass1('')
            setEmail('')
        }
    }

    useEffect(() => {
        localStorage.setItem('student', JSON.stringify(student))
    }, [student])


    const deleteStd = (id) => {
        // alert(id)
        const delStud = student.filter((element) => {
            return element.id !== id
        })
        setStudent(delStud)

    }

    const editItem = (id) => {
        const editAll = student.find((item) => item.id === id)

        setToggleUp(false)
        setEdit(id)

        setName1(editAll.name1)
        setId(editAll.id)
        setAge(editAll.age)
        setClass1(editAll.class1)
        setEmail(editAll.email)
    }
    return (
        <>
            <div className="container-fluid">
                <h2 className="text-center pt-3">Register Student</h2>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <span className="text-dark fw-bold">Id :</span><br />
                        <input type="number" className="form-control" value={id} onChange={(e) => { setId(e.target.value) }} placeholder="Enter Your Id..." /><br />
                        <span className="text-dark fw-bold">NAME :</span><br />
                        <input type="text" className="form-control" value={name1} onChange={(e) => { setName1(e.target.value) }} placeholder="Enter Your Name..." /><br />
                        <span className="text-dark fw-bold">AGE :</span><br />
                        <input type="number" className="form-control" value={age} onChange={(e) => { setAge(e.target.value) }} placeholder="Enter Your Name..." /><br />
                        <span className="text-dark fw-bold">CLASS :</span><br />
                        <input type="text" className="form-control" value={class1} onChange={(e) => { setClass1(e.target.value) }} placeholder="Enter Your Name..." /><br />
                        <span className="text-dark fw-bold">EMAIL :</span><br />
                        <input type="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Your Name..." /><br />
                        {
                            toggleUp ?<input type="button" className="btn btn-outline-info fw-bold fs-5" value="save" onClick={saveData} />:
                            <input type="button" className="btn btn-outline-info fw-bold fs-5" value="update" onClick={saveData} />
                        }
                    </div>
                    <div className="col-md-6">
                        <table className="table">
                            <thead>
                                <th>id</th>
                                <th>name</th>
                                <th>age</th>
                                <th>class</th>
                                <th>email</th>
                                <th>Active</th>
                            </thead>
                            <tbody>
                                {
                                    student.map((item, index) => {
                                        return <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name1}</td>
                                            <td>{item.age}</td>
                                            <td>{item.class1}</td>
                                            <td>{item.email}</td>
                                            <td><button className="btn btn-outline-danger" onClick={() => deleteStd(item.id)}>DELETE</button></td>
                                            <td><button className="btn btn-outline-danger" onClick={() => editItem(item.id)}>UPDATE</button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )

}

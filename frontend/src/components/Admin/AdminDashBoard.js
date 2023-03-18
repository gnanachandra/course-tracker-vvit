import { MenuItem,TextField,Button,Card,CardHeader,CardContent,Table,TableCell,TableRow,TableBody,Paper,TableHead,TableContainer } from '@mui/material'
import React, { useState,useEffect } from 'react';
import "./AdminDashBoard.css";
import { APSCHE_Courses,AICTE_Courses,years ,sections ,branch} from '../../Data/CourseNames';


const AdminDashBoard = () => {
    const [data,setData] = useState([]);
    const [form,setForm] = useState({
        branch : "",
        section : "",
        year : "",
        courseName : ""
    })
    const handleFormChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value});
    }

    useEffect(()=>{
        fetch("http://localhost:4000/getStudents",{
            method:"POST",
            body:JSON.stringify(form),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((result)=>result.json()).then((res)=>setData(res.message)).catch((err)=>console.log(err));
    })
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
        fetch("http://localhost:4000/getStudents",{
            method:"POST",
            body:JSON.stringify(form),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((result)=>result.json()).then((res)=>setData(res.message)).catch((err)=>console.log(err));
    }
  return (
    <>
        <div className='adminDashBoard'>
            <form onSubmit={handleSubmit} className="detailsForm">
                <TextField
                        size='small'
                        label="branch"
                        name="branch"
                        select
                        value={form.branch}
                        onChange={handleFormChange}>

                    {
                        branch.map((branchName)=>{
                            return (
                                <MenuItem value={branchName} key={branchName}>
                                    {branchName}
                                </MenuItem>
                            )
                        })
                    }

                </TextField>
                <TextField
                        size='small'
                        label="section"
                        name="section"
                        select
                        value={form.section}
                        fullWidth
                        onChange={handleFormChange}>

                    {
                        sections.map((section)=>{
                            return (
                                <MenuItem value={section} key={section}>
                                    {section}
                                </MenuItem>
                            )
                        })
                    }

                </TextField>
                <TextField label="Course" size='small' name = "courseName" select value = {form.courseName} fullWidth onChange={handleFormChange}>
                    {
                        APSCHE_Courses.map((name) => {
                            return (
                            <MenuItem value={name} key={name}>
                                {name}
                            </MenuItem>
                            );
                        })
                    }
                    {
                        AICTE_Courses.map((name) => {
                            return (
                            <MenuItem value={name} key={name}>
                                {name}
                            </MenuItem>
                            );
                        })
                    }

                </TextField>
                <TextField
                        label="year"
                        name="year"
                        select
                        size='small'
                        value={form.year}
                        fullWidth
                        onChange={handleFormChange}>
                            {
                                years.map((year)=>{
                                    return (<MenuItem value = {year} key={year}>{year}</MenuItem>)
                                })
                            }       
                </TextField>
                <Button variant='contained' type='submit' id="getData">Display</Button>
            </form>
        </div>

        <div className='studentsData'>
            {
                data.length > 0 && data.map((student)=>{
        
                    return (
                        
                        <Card sx={{ maxWidth: 600 }}>
                            <CardHeader
                                title={student.name}
                                subheader = {`${student.rollNo} - ${student.branch} ${student.section}`}
                            />
                            <CardContent>
                                <TableContainer component={Paper}>
                                    <Table sx={{ maxWidth : 600}} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Platform</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Enrolled Sem</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                student['courses'].map((course)=>{
                                                    return(
                                                        <TableRow>
                                                            <TableCell>{course.platform}</TableCell>
                                                            <TableCell>{course.courseName}</TableCell>
                                                            <TableCell>{course.enrolledIn}</TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                            
                        </Card>
                    )
                })
            }
            {
                data.length === 0 && <h1>Data Not Available with selected Filters</h1>
            }
        </div>
    </>
    
  )
}

export default AdminDashBoard
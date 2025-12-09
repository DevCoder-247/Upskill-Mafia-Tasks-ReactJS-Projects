import React, { useEffect, useState } from 'react'
import API from '../api'
import { Link } from 'react-router-dom'
import Pagination from '../components/Pagination'

export default function StudentList() {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [limit] = useState(5)
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState('')
    const [courseSearch, setCourseSearch] = useState('')

    const fetchStudent = async () => {
        setLoading(true)
        try{
            const params = {
                _page: page,
                _limit: limit,
            }

            if (search) params.name_like = search
            if(courseSearch) params.course_like = courseSearch

            const res = await API.get('/students', {params})
            setStudents(res.data);

            const totalCount = parseInt(res.headers['x-total-count'] || res.data.length);
            setTotal(totalCount);

        } catch(err) {
            console.error(err);    
        } finally {
            setLoading(false);
       }
    }

    useEffect(() => {
        fetchStudent();
    }, [page, search, courseSearch]);

    const handleDelete = async (id) => {
        if (!confirm('Delete this student ? ')) return;

        try {
            await API.delete(`/students/${id}`)
            fetchStudent();
        } catch (err) {
            console.error(err);
            alert("Delete Failed");
        }
    }

    return (
        <div>
            <h2>Students</h2>
            
            <div className='search-row'>
                <input placeholder='Search By Name' value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                <input placeholder='Search By Course' value={courseSearch} onChange={e => { setCourseSearch(e.target.value); setPage(1); }}/>
            </div>

            {loading ? <p>Loading....</p> : (
                <>
                    <table className='students-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Couse</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(s => (
                                <tr key={s.id}>
                                    <td>{s.id}</td>
                                    <td>{s.name}</td>
                                    <td>{s.age}</td>
                                    <td>{s.course}</td>
                                    <td>{s.email}</td>
                                    <td>
                                        <Link to={`/edit/${s.id}`}>Edit</Link> 
                                        {' | '}
                                        <button className='link-btn' onClick={() => handleDelete(s.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination page={page} setPage={setPage} total={total} limit={limit} />
                </>
            )}
        </div>
    )
}
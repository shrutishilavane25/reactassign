import React, { useEffect, useState } from 'react'

export const Employeelist = () => {
    const [data, setData]= useState([]);
  const [showdata, setshowData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] =  useState({ gender: "", country: "" })


        const getData = async () => {
          const response = await fetch('https://dummyjson.com/users?limit=10')
            const result = await response.json();
            setData(result.users);
            setshowData(result.users.slice(0, 10));
        }
        useEffect(()=>{
            getData();
        }, []);
    
        const displayData = () => {
            const nextpage = page=1;
            const newdata = data.slice(nextpage * 10, (nextpage+1)*10);
            setshowData([...showdata, ...newdata]);
            setPage(nextpage);
            if(newdata.length === 0) setHasMore(false);

        };
        const sortData = (key) => {
            const sortedData = [...showdata].sort((a, b) => a[key] > b[key] ? 1 : -1);
            setshowData(sortedData);
          };
        
        const applyFilter = () => {
            let filtered = data;
        
            if (filters.gender) {
              filtered = filtered.filter(item => item.gender === filters.gender);
            }
        
            if (filters.country) {
              filtered = filtered.filter (item => item.address.city.toLowerCase().includes(filters.country.toLowerCase()))
            }
        
            setshowData(filtered.slice(0,10));
            setPage(0);
            setHasMore(filtered.length > 10);
          };
        
            const filterChange = (e) => {
                setFilters({...filters, [e.target.firstName]: e.target.value})
            };
            useEffect(()=> {
                applyFilter();

            }, [filters]);
        
  return (
   <> 
   <div className='container m-1 py-2'>
    <h3>Employee List</h3>

   </div>
   <div className='d-flex' style={{marginLeft:"80%"}}>
        <label>
          Gender:
          <select name='gender' onChange={filterChange}>
            <option value='all'>All</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </label>

        <label>
          Country:
         <input type="text" name="country" onChange={filterChange} />
        </label>
    </div>
     <InfiniteScroll
        dataLength={showdata.length}
        next={displayData}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
        endMessage={<p>No more items to load</p>}
      > 

    <table className='responsive table table-border'>
        <thead>
        <tr cellpadding="1 px"> 
            <th onClick={()=> sortData('id')}>Id</th>
            <th>Image</th>
            <th onClick={() => sortData ('firstName')}>Fisrt Name</th>
            <th onClick={() => sortData ('lastName')}>Last Name</th>

            <th onClick={()=> sortData('age')}>age</th>
            <th>Location</th>
           
        </tr>
        </thead>
        <tbody>
            {
                showdata.map((d,i) => (
                    <tr key={d.id}>
                         <td>{d.id}</td>
                        <td><img src={d.image} alt="" style={{height:"8%", width:"8%"}}/></td>
                        <td>{d.firstName} </td>
                        <td>{d.lastName}</td>

                        <td>{d.gender.charAt(0).toUpperCase()}/{d.age}</td>
                        <td>{d.address.country}</td>
                    </tr>
                        
                ))
            }
           
        </tbody>
    </table>
    </InfiniteScroll>
    </>
)
}

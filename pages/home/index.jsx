
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Home=()=>{
const router=useRouter();
    const [name,setName]=useState('name');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( ()=>{
        const fetchData=async()=>{
            const email=router.query.email;
            const apiUrlEndpoint = `http://localhost:3000/api/getName?email=${email}`;
            const response = await fetch(apiUrlEndpoint);
            const res = await response.json();
            if (res.result) {
                setName(res.name);
              }
        }
    

    fetchData().catch(console.error)

    });
    
    return (
    <>
    
        <div className="border-blue-100 border-2 flex flex-col items-center justify-center mt-10">
            <h1 className="uppercase text-center">Welcome {name}</h1>
            <div>
            <button className="m-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
            Export
            </button>
            </div>
        </div>
    </>
    )
}

export default  Home;
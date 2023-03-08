import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { saveAs } from "file-saver";

const Home = () => {
  const router = useRouter();
  const [name, setName] = useState("name");
  const [allData, setAllData] = useState({ keys: [""], data: [] });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchName = async () => {
      const email = router.query.email;
      const apiUrlEndpoint = `http://localhost:3000/api/getName?email=${email}`;
      const response = await fetch(apiUrlEndpoint);
      const res = await response.json();
      if (res.result) {
        setName(res.name);
      }
    };

    fetchName().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      const apiUrlEndpoint = `http://localhost:3000/api/getalldata`;
      const response = await fetch(apiUrlEndpoint);
      const res = await response.json();

      setAllData(res.data);
    };

    fetchAllData().catch(console.error);
  }, []);
  const exportFile = async () => {
    const email = router.query.email;
    const apiUrlEndpoint = `http://localhost:3000/api/getfile?email=${email}`;
    const response = await fetch(apiUrlEndpoint);

    const blob = await response.blob();
    saveAs(blob, name + ".xlsx");
  };

  const exportAllDataFile = async () => {
    const email = router.query.email;
    const apiUrlEndpoint = `http://localhost:3000/api/getalldatafile`;
    const response = await fetch(apiUrlEndpoint);

    const blob = await response.blob();
    saveAs(blob, name + ".xlsx");
  };

  return (
    <>
      <div className="border-blue-100 border-2 flex flex-col items-center justify-center mt-10">
        <h1 className="uppercase text-center">Welcome {name}</h1>
        <div>
          <button
            className="m-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              exportAllDataFile();
            }}
          >
            Export
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <table className="table-auto">
          <thead>
            <tr>
              {allData.keys &&
                allData.keys.map((ele, i) => {
                  return (
                    <th className="p-10" key={i}>
                      {ele}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {allData.data.map((ele, i) => {
              return (
                <tr key={i}>
                  {ele.map((ele: string[], i: number) => {
                    return (
                      <td key={i} className="p-2 justify-center text-center">
                        {ele}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UsersContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { AiOutlineDownload } from "react-icons/ai";
import Loader from './Loader';

type ID = {
  id?: string
}

function Documents({ id }: ID) {
  const [docFiles, setDocFiles] = useState<any>()
  const [allDocs, setAllDocs] = useState<any>([])
  const context = useContext(UsersContext)
  const navigate = useNavigate()

  //Get all the documents using id
  const getDocs = async () => {
    context?.setIsLoading(true)
    try {
      let addedDocs = await axios.get(`http://localhost:8081/doc/${id}`)
      context?.setIsLoading(false)
      setAllDocs(addedDocs.data)
    }
    catch (e) {
      context?.setIsLoading(false)
      console.log(e)
    }
  }

  useEffect(() => {
    getDocs();
  }, [id])


  //On document change
  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const docs = e.target.files?.[0];
    setDocFiles(docs)
  };

  const docData = new FormData();
  docData.append("filename", docFiles)

  //On submit upload document
  const uploadFile = async (e: any) => {
    context?.setIsLoading(true)
    e.preventDefault()
    try {
      let res = await axios.post(`http://localhost:8081/doc/${id}`, docData)
      console.log(res)
      getDocs();
    } catch (e) {
      context?.setIsLoading(true)
      console.error(e)
    }
  }

  //Loading Spinner
  if (context?.isLoading) {
    return (<>
      <Loader />
    </>)
  }


  return (
    <div className='documents'>
      {/* <h3 className='flex'>Add Documents</h3> */}
      <div className='upload-btns' >
        <form encType='multipart/form-data'>
          <input type="file" id="myFile" name="filename" onChange={handleDocChange} required />
          <button className='doc-upload' onClick={uploadFile}>Upload Document</button>
        </form>
      </div>
      <table className="table">
        <thead className="thead-dark" style={{ backgroundColor: "darkslategray" }}>
          <tr>
            <th scope="col" style={{ color: "antiquewhite" }}>#</th>
            <th scope="col" style={{ color: "antiquewhite" }}>FileName</th>
            <th scope="col" style={{ color: "antiquewhite" }}>DateUploaded</th>
            <th scope="col" style={{ color: "antiquewhite" }}>Download</th>
          </tr>
        </thead>
        <tbody>
          {allDocs.length!=0?
            allDocs.map((doc: any, i: number) => (
              <tr>
                <th scope="row">{i + 1}</th>
                <td>{doc.Name}</td>
                <td>{doc.TimeCreated}</td>
                <td style={{ fontSize: "25px" }}><AiOutlineDownload /></td>
              </tr>
            ))
          :<h1>No files found!!!!!......</h1>}
        </tbody>
      </table>
    </div>
  )
}

export default Documents
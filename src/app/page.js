"use client"
import { useEffect, useState } from "react"
import Head from "../../head/Head";
import { useRouter } from "next/navigation";

export default function Test() {
  const [results, setResults] = useState([]);
  const [isClicked, setIsClicked] = useState(false)
  const [input, setInput] = useState({});


  const router = useRouter()

  useEffect(() => {
    async function getData() {
      let resp = await fetch("/getRow", {
        method: "GET"
      })
      let json = await resp.json()
      console.log(json)
      setResults(json)
    }

    getData()
  }, [])

  return (
    <>

      <body><div class="bg-gray-400 h-screen flex flex-col justify-center items-center ">
        <Head />
        {
          results.map((result) => {
            return (
              <div class="flex flex-row justify-center items-center">
                <div class="flex flex-row">
                  <div class="border px-4 py-2 w-100">{result.team_id}</div>
                  <div class="border px-4 py-2 w-100">{result.team_name}</div>
                </div>
              </div>
            );
          })
        }
        <div class="flex flex-row justify-center items-center"><button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => {
          setIsClicked(true)
        }} >Add</button ></div>
        {
          isClicked ? (
            <><div class="flex flex-row justify-center items-center  text-blue-800">
              <input className={" text-black"} class="mx-2 border-2 border-blue-600 " onChange={(e) => {
                setInput({
                  ...input,
                  team_id: e.target.value
                })
              }} placeholder={"Team ID"} />
              <input className={" text-black"} class="mx-2 border-2 border-blue-600" onChange={(e) => {
                setInput({
                  ...input,
                  team_name: e.target.value
                })
              }} placeholder={"Team Name"} />
              <button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={async (e) => {
                let resp = await fetch("/server", {
                  method: "POST",
                  body: JSON.stringify(input)
                })
                setResults([...results, input])
              }}>submit</button>
            </div> </>
          ) : null
        }

        <button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold my-3 px-4 rounded" onClick={(e) => {
          router.push("/test2")
        }}>Confirm</button></div>
      </body></>
  )
}
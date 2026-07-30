"use client";

import { useState } from "react";

export default function CommandTable({
  commands,
}: {
  commands: any[];
}) {

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState("");



  async function execute(command:string) {

    setLoading(command);

    try {

      const res = await fetch(
        "http://localhost:3000/control/chat",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            message:command
          }),
        }
      );


      const data = await res.json();

      setResult(data);


    } catch(error:any){

      setResult({
        الحالة:"خطأ",
        الرسالة:error.message
      });

    }


    setLoading("");

  }



  return (

    <div>

      <table
        style={{
          width:"100%",
          borderCollapse:"collapse"
        }}
      >

        <thead>

          <tr>

            <th
              style={{
                textAlign:"right",
                padding:10
              }}
            >
              الأمر
            </th>


            <th
              style={{
                textAlign:"right",
                padding:10
              }}
            >
              الوصف
            </th>


            <th
              style={{
                padding:10
              }}
            >
              التنفيذ
            </th>


          </tr>

        </thead>


        <tbody>


        {commands.map((cmd:any)=> (

          <tr key={cmd.الأمر}>


            <td
              style={{
                padding:10
              }}
            >
              {cmd.الأمر}
            </td>


            <td
              style={{
                padding:10
              }}
            >
              {cmd.الوصف}
            </td>


            <td
              style={{
                padding:10
              }}
            >

              <button

                onClick={()=>execute(cmd.الأمر)}

                disabled={loading===cmd.الأمر}

              >

                {
                  loading===cmd.الأمر
                  ?
                  "جاري التنفيذ..."
                  :
                  "تنفيذ"
                }

              </button>


            </td>


          </tr>


        ))}


        </tbody>


      </table>



      {
        result && (

          <pre

            style={{
              marginTop:20,
              background:"#111",
              color:"#0f0",
              padding:15,
              borderRadius:8
            }}

          >

{JSON.stringify(result,null,2)}

          </pre>

        )
      }


    </div>

  );

}
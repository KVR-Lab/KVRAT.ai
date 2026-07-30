"use client";

import { useState } from "react";

export default function CommandConsole() {

  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function send() {

    if (!message) return;

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:3000/control/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );


      const data = await res.json();

      setResult(data);

    } catch (error:any) {

      setResult({
        الحالة: "خطأ",
        الرسالة: error.message
      });

    }

    setLoading(false);
  }


  return (

    <div
      style={{
        marginTop:30,
        padding:20,
        border:"1px solid #ddd",
        borderRadius:10
      }}
    >

      <h2>
        مركز أوامر KVR-Core
      </h2>


      <input

        style={{
          width:"70%",
          padding:12,
          fontSize:16
        }}

        value={message}

        onChange={
          e=>setMessage(e.target.value)
        }

        placeholder="اكتب الأمر مثل build أو status"
      />


      <button

        style={{
          marginLeft:10,
          padding:"12px 25px"
        }}

        onClick={send}

        disabled={loading}

      >

        {loading ? "تنفيذ..." : "تنفيذ"}

      </button>



      {
        result && (

          <pre

            style={{
              marginTop:20,
              padding:15,
              background:"#111",
              color:"#0f0",
              borderRadius:8,
              overflow:"auto"
            }}

          >

{JSON.stringify(result,null,2)}

          </pre>

        )
      }


    </div>

  );

}
"use client";

export default function AgentActions({name}: {name:string}) {

  async function action(type:string){

    await fetch(
      `http://localhost:3000/control/agent/${type}`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name
        })
      }
    );

    alert(
      type === "start"
      ? `${name} تم تشغيله`
      : `${name} تم إيقافه`
    );
  }


  return (
    <div style={{marginTop:10}}>

      <button
        onClick={()=>action("start")}
        style={{
          marginRight:10,
          padding:"8px 15px"
        }}
      >
        تشغيل
      </button>


      <button
        onClick={()=>action("stop")}
        style={{
          padding:"8px 15px"
        }}
      >
        إيقاف
      </button>

    </div>
  );
}
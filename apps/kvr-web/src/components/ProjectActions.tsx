"use client";

export default function ProjectActions({
  name
}:{
  name:string
}){

async function openProject(){

  await fetch(
    "http://localhost:3000/control/project/open",
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

  alert(`${name} تم فتحه`);
}


return (
<button
onClick={openProject}
style={{
padding:"8px 15px",
marginTop:10
}}
>
فتح المشروع
</button>
);

}
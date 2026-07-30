"use client";

export default function ProjectCard({
  project,
}: {
  project: any;
}) {

  async function openProject() {

    const res = await fetch(
      "http://localhost:3000/control/project/open",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: project.الاسم,
        }),
      }
    );

    const data = await res.json();

    alert(
      `${data.المشروع}\n${data.الحالة}`
    );
  }

  return (

    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
      }}
    >

      <h3>{project.الاسم}</h3>

      <p>
        <b>المسار:</b> {project.المسار}
      </p>

      <p>
        <b>الحالة:</b> {project.الحالة}
      </p>

      <button
        onClick={openProject}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        فتح المشروع
      </button>

    </div>

  );

}
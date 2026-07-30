import AgentActions from "./AgentActions";


export default function AgentCard(
{
 agent
}:{
 agent:any
}){

return (

<div
style={{
border:"1px solid #ddd",
padding:20,
borderRadius:10,
marginBottom:15
}}
>

<h3>{agent.الاسم}</h3>

<p>{agent.الدور}</p>

<strong>
{agent.الحالة}
</strong>


<AgentActions name={agent.الاسم}/>


</div>

);

}
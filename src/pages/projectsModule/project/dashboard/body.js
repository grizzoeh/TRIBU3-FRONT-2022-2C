import StateContainer from "./StateContainer";

// To do: Fetch projects from API.

export default function Body({projects, getProjects, resources, clients}) {

    return (
        <>
            <StateContainer projects={projects} getProjects={getProjects} resources={resources} clients={clients}/>
        </>
    );
}

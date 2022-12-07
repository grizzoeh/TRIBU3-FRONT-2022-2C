import StateContainer from "./StateContainer";

// To do: Fetch projects from API.

export default function Body({projects, getProjects, resources, clients, setRefreshKey}) {

    return (
        <>
            <StateContainer projects={projects} getProjects={getProjects} resources={resources} clients={clients} setRefreshKey={setRefreshKey}/>
        </>
    );
}

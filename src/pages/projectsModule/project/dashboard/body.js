import StateContainer from "./StateContainer";

// To do: Fetch projects from API.

export default function Body({projects}) {

    return (
        <>
                    <StateContainer
                                    projects={projects}
                    />


        </>
    );
}

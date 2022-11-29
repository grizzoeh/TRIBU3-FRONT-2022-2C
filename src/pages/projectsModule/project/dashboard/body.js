import StateContainer from "./StateContainer";

// To do: Fetch projects from API.

import MockProjects from "../../../../Mock/projects";
export default function Body({projects,filtrosStado}) {

    return (
        <>


            {filtrosStado.map((filtroStado) => {
                            return (
                                <tr>
                                    <StateContainer className={"row-cards mt-4 row"}
                                                    stateName={filtroStado.name}
                                                    projects={projects}
                                    /></tr>
                            );
                        })
                    }

        </>
    );
}

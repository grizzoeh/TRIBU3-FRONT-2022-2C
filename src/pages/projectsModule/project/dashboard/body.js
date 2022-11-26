import StateContainer from "./StateContainer";

// To do: Fetch projects from API.
import MockProjects from "../../../../Mock/projects";

export default function Body({projects}) {
  let projectWithoutState = projects.filter(
    (project) => project.status === "pendiente"
  );
  let projectInAnalysis = projects.filter(
    (project) => project.status === 2
  );
  let projectInProgress = projects.filter(
    (project) => project.status === 3
  );
  let projectInTesting = projects.filter(
    (project) => project.status === 4
  );
  let projectInProduction = projects.filter(
    (project) => project.status === 5
  );
  let projectInPostProduction = projects.filter(
    (project) => project.status === 6
  );
  let projectInFinished = projects.filter(
    (project) => project.status === 7
  );

  return (
    <table>
      <tr>
        <td>
            <StateContainer
                stateName={"Sin Estado"}
                projects={projectWithoutState}
            />
        </td>
        <td>
            <StateContainer
                stateName={"En Analisis"}
                projects={projectInAnalysis}
            />
        </td>
        <td>
            <StateContainer
                stateName={"En desarrollo"}
                projects={projectInProgress}
            />
        </td>
        <td>
            <StateContainer
                stateName={"En prueba"}
                projects={projectInTesting}
            />
        </td>
        <td>
            <StateContainer
                stateName={"En producción"}
                projects={projectInProduction}
            />
        </td>
        <td>
            <StateContainer
                stateName={"En post-producción"}
                projects={projectInPostProduction}
            />
        </td>
        <td>
            <StateContainer
                stateName={"Finalizado"}
                projects={projectInFinished}
            />
        </td>
      </tr>
    </table>
  );
}

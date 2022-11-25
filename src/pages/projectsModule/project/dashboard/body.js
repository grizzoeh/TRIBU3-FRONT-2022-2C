import StateContainer from "./StateContainer";

// To do: Fetch projects from API.
import MockProjects from "../../../../Mock/projects";

export default function Body() {
  let projectWithoutState = MockProjects.filter(
    (project) => project.StateId === 1
  );
  let projectInAnalysis = MockProjects.filter(
    (project) => project.StateId === 2
  );
  let projectInProgress = MockProjects.filter(
    (project) => project.StateId === 3
  );
  let projectInTesting = MockProjects.filter(
    (project) => project.StateId === 4
  );
  let projectInProduction = MockProjects.filter(
    (project) => project.StateId === 5
  );
  let projectInPostProduction = MockProjects.filter(
    (project) => project.StateId === 6
  );
  let projectInFinished = MockProjects.filter(
    (project) => project.StateId === 7
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

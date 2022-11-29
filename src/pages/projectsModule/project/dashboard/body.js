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
      </tr>
    </table>
  );
}

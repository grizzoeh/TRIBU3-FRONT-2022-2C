import StateContainer from "./StateContainer";

// To do: Fetch projects from API.
import MockProjects from "../../../../Mock/projects";

export default function Body() {

  let ProjectWithoutState = MockProjects.filter(
    (project) => project.StateId === 1
  );
  let ProjectInAnalysis = MockProjects.filter(
    (project) => project.StateId === 2
  );
  let ProjectInProgress = MockProjects.filter(
    (project) => project.StateId === 3
  );

  return (
    <table>
      <tr>
        <td>
            <StateContainer
                stateName={"Sin Estado"}
                projects={ProjectWithoutState}
            />
        </td>
        <td>
            <StateContainer
                stateName={"En Analisis"}
                projects={ProjectInAnalysis}
            />
        </td>
        <td>
            <StateContainer
                stateName={"En desarrollo"}
                projects={ProjectInProgress}
            />
        </td>
      </tr>
    </table>
  );
}

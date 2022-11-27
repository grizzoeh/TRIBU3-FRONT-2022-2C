import { useParams } from 'react-router-dom';


export default function NewProject(props) {
  const params = useParams()

    // yuo can find all params from here
    console.log(params)
      return(
        <div>
          <h1> hello world </h1>
        </div>
      )
  }
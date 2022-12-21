import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faFlagCheckered, faFlag } from '@fortawesome/free-solid-svg-icons';

interface Props {
  status: string
}

function AntStatus(props: Props) {
    if(props.status === "loading"){
        return <FontAwesomeIcon icon={faSpinner} className="float-right animate-spin"/>;
    } 

    if(props.status === "complete"){
        return <FontAwesomeIcon icon={faFlagCheckered} className="float-right text-green-700"/>;
    }

    //default to pre-race
    return <FontAwesomeIcon icon={faFlag} className="float-right"/>;
}

export default AntStatus;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import StatusIcon from '../StatusIcon/StatusIcon';

interface Props {
  ant: Ant,
  key: number
}

function AntCard(props: Props) {
  return (
    <div className="max-w-full rounded overflow-hidden shadow-lg p-4 text-gray-700 text-base">
        <FontAwesomeIcon icon={faBug} style={{color: props.ant.color.toLowerCase()}}/>
        {props.ant.status && <StatusIcon status={props.ant.status} />}
        <p className="text-md text-gray-900">{props.ant.name}</p>
        <p className="text-sm text-gray-600">Length: {props.ant.length} | Weight: {props.ant.weight}</p>
        {props.ant.status && props.ant.status === "complete" && <p className="text-xs mt-4 text-gray-600">Likelihood of Winning: {props.ant.result && (props.ant.result * 100).toFixed(2)}%</p>}
    </div>
  );
}

export default AntCard;


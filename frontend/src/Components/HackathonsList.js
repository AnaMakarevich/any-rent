import * as React from 'react';

const HackathonsList = (props) => {
    return (
        <div>
            {props.hackathons && props.hackathons.map(
                hackathon => {
                    return (
                        <div key={hackathon.id}>
                        <p>{ hackathon.name }</p>
                    </div>)
                }
            )}
        </div>
    )
}
export default HackathonsList;
import React, { useEffect } from 'react'

export default function HomeRoute() {
    useEffect(()  => {
        fetch("http://127.0.0.1:5000/hackathons").then(data => console.log(data));
    })

    return (
        <div>
            homeee
        </div>
    )
}

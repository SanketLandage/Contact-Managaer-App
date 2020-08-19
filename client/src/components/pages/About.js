import React from 'react'

 const About = () => {
    return (
        <div className="container pad2 text-sm-center">
            <h2>About this App</h2>
            <p>Contact manager to keep a track of your contacts</p>
            <p>Technology Used : React , MongoDb , Express ,Node</p>
            <p>By : Sanket L.</p>
            <p><a href="https://www.linkedin.com/in/sanket-landage-sl7333?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BwUJHMCMFRVWmJntqDpAkfw%3D%3D"><span className="fa fa-linkedin-square fa-lg"> LinkedIn</span></a></p>
            <p><a href="mailto:sanket.landage@gmail.com" ><span className="fa fa-envelope-o fa-lg"></span> Send email</a></p>
        </div>
    )
}

export default About;
import React from 'react'
import JobseekerAboutSetting from '../layouts/JobseekerSettings/JobseekerAboutSetting'
import JobseekerEducationSetting from '../layouts/JobseekerSettings/JobseekerEducationSetting'
import JobseekerExperienceSetting from '../layouts/JobseekerSettings/JobseekerExperienceSetting'

export default function JobseekerSettings() {

    return (
        <div>
            <Route exact path="/jsabout" component={JobseekerAboutSetting}/>
            <Route exact path="/jseducation" component={JobseekerEducationSetting}/>
            <Route exact path="/jsexperience" component={JobseekerExperienceSetting}/>
        </div>
    )
}

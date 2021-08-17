import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown, Menu, Icon } from 'semantic-ui-react'
import { userLogout } from "../store/actions/authActions"

export default function SignedIn() {

    //Redux states to use in the component
    const { authItem } = useSelector(state => state.auth)

    const history = useHistory(); // For using the router to change the component

    // Redux functions to use the redux actions
    const dispatch = useDispatch()
    const handleLogout = (user) => {
        dispatch(userLogout(user))
        history.push("/")
    }

    return (
        <div>
            <Menu.Item>
                <Dropdown pointing="top right" text={authItem[0].user.name}>
                    <Dropdown.Menu>
                        {authItem[0].user.userType === 1 && <Dropdown.Item as={Link} to={`/profile`}><Icon name='user' />Profile</Dropdown.Item>}
                        {authItem[0].user.userType === 2 && <Dropdown.Item as={Link} to={`/profileEmployer`}><Icon name='suitcase' />Company Profile</Dropdown.Item>}
                        <Dropdown.Item onClick={() => handleLogout(authItem[0].user)}><Icon name='sign-out' /> Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
